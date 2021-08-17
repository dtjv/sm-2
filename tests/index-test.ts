/* eslint-disable @typescript-eslint/no-floating-promises */

import { test } from 'tap'
import { sm2, SuperMemoQuality, SuperMemoItemDefaults } from '../src'
import type { SuperMemoItem } from '../src'

test('returns correct interval for rep 1', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }
  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  t.same(item.repInterval, 1)
})

test('returns correct interval for rep 2', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }
  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  t.same(item.repInterval, 6)
})

test('returns correct interval for rep > 2', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }
  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)

  const prevRepInterval = item.repInterval

  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  t.same(item.repInterval, Math.ceil(prevRepInterval * item.easyFactor))
})

test('a 4 quality rating does not change E-Factor', async (t) => {
  const item1: SuperMemoItem = { ...SuperMemoItemDefaults }
  const item2: SuperMemoItem = sm2(item1, SuperMemoQuality.PASS_WITH_HESITATION)
  t.same(item1.easyFactor, item2.easyFactor)
})

test('returns rep and repInterval defaults for quality rating 0', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }
  item = sm2(item, SuperMemoQuality.PASS_WITH_PERFECT_RECALL)
  item = sm2(item, SuperMemoQuality.FAIL_WITH_TOTAL_BLACKOUT)
  t.same(item.rep, SuperMemoItemDefaults.rep)
  t.same(item.repInterval, SuperMemoItemDefaults.repInterval)
})

test('returns rep and repInterval defaults for quality rating 1', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }
  item = sm2(item, SuperMemoQuality.PASS_WITH_PERFECT_RECALL)
  item = sm2(item, SuperMemoQuality.FAIL_BUT_FAMILIAR)
  t.same(item.rep, SuperMemoItemDefaults.rep)
  t.same(item.repInterval, SuperMemoItemDefaults.repInterval)
})

test('returns rep and repInterval defaults for quality rating 2', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }
  item = sm2(item, SuperMemoQuality.PASS_WITH_PERFECT_RECALL)
  item = sm2(item, SuperMemoQuality.FAIL_BUT_EASY)
  t.same(item.rep, SuperMemoItemDefaults.rep)
  t.same(item.repInterval, SuperMemoItemDefaults.repInterval)
})

test('limits E-Factor to 1.3 for E-Factor < 1.3', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }

  // it takes 9 repetitions with rating of 3 to get an E-Factor < 1.3
  for (let i = 0; i < 9; i += 1) {
    item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  }

  t.same(item.easyFactor, 1.3)
})
