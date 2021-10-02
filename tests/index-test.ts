/* eslint-disable @typescript-eslint/no-floating-promises */

import { test } from 'tap'
import { sm2, SuperMemoQuality, SuperMemoItemDefaults } from '../src'
import type { SuperMemoItem } from '../src'

test('should throw on invalid item', async (t) => {
  t.throws(() => sm2(undefined, SuperMemoQuality.PASS_WITH_DIFFICULTY))
  // Expected type checking error for '{}' argument. Ignore.
  t.throws(() => sm2({}, SuperMemoQuality.PASS_WITH_DIFFICULTY))
  t.throws(() =>
    sm2(
      { rep: '0', repInterval: '0', easyFactor: true },
      SuperMemoQuality.PASS_WITH_DIFFICULTY
    )
  )
})

test('should throw on invalid grade', async (t) => {
  const item: SuperMemoItem = { ...SuperMemoItemDefaults }
  // Expected type checking error for 'undefined' argument. Ignore.
  t.throws(() => sm2(item, undefined), 'grade must be defined')
  t.throws(() => sm2({ ...SuperMemoItemDefaults }, 7), 'grade must be in range')
})

test('should return a new item', async (t) => {
  interface Item extends SuperMemoItem {
    a: string
    b: number
  }
  const item: Item = { a: 'a', b: 0, ...SuperMemoItemDefaults }
  const actual = sm2(item, SuperMemoQuality.FAIL_WITH_TOTAL_BLACKOUT)
  t.same(actual, item, 'should each have same values')
  t.not(actual, item, 'should not be the same obj reference')
})

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

  const previousRepInterval = item.repInterval

  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  t.same(item.repInterval, Math.ceil(previousRepInterval * item.easyFactor))
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

test('increments rep for quality ratings >= 3', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }
  const reps: number[] = []

  item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  reps.push(item.rep)
  item = sm2(item, SuperMemoQuality.PASS_WITH_HESITATION)
  reps.push(item.rep)
  item = sm2(item, SuperMemoQuality.PASS_WITH_PERFECT_RECALL)
  reps.push(item.rep)

  t.same(reps, [1, 2, 3])
})

test('limits E-Factor to 1.3 for E-Factor < 1.3', async (t) => {
  let item: SuperMemoItem = { ...SuperMemoItemDefaults }

  // It takes 9 repetitions with rating of 3 to get an E-Factor < 1.3
  for (let i = 0; i < 9; i += 1) {
    item = sm2(item, SuperMemoQuality.PASS_WITH_DIFFICULTY)
  }

  t.same(item.easyFactor, 1.3)
})
