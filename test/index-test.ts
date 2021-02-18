import { test } from 'tap'
import {
  sm2,
  SuperMemoItem,
  SuperMemoQuality,
  SuperMemoDefaultItem,
} from '../src'

test('sm2', async (t) => {
  const grades: SuperMemoQuality[] = [
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.FAIL_WITH_TOTAL_BLACKOUT,
    SuperMemoQuality.FAIL_BUT_EASY,
    SuperMemoQuality.PASS_WITH_DIFFICULTY,
    SuperMemoQuality.PASS_WITH_HESITATION,
    SuperMemoQuality.PASS_WITH_PERFECT_RECALL,
  ]

  let item: SuperMemoItem = {
    ...SuperMemoDefaultItem,
  }

  // process `item` repeatedly
  const results = grades.map((grade) => {
    item = sm2(item, grade)
    return item
  })

  const expected = [
    {
      rep: 1,
      repInterval: 1,
      easyFactor: 2.36,
    },
    {
      rep: 2,
      repInterval: 6,
      easyFactor: 2.2199999999999998,
    },
    {
      rep: 3,
      repInterval: 14,
      easyFactor: 2.0799999999999996,
    },
    {
      rep: 4,
      repInterval: 30,
      easyFactor: 1.9399999999999997,
    },
    {
      rep: 5,
      repInterval: 59,
      easyFactor: 1.7999999999999998,
    },
    {
      rep: 6,
      repInterval: 107,
      easyFactor: 1.66,
    },
    {
      rep: 7,
      repInterval: 178,
      easyFactor: 1.52,
    },
    {
      rep: 8,
      repInterval: 271,
      easyFactor: 1.3800000000000001,
    },
    {
      rep: 9,
      repInterval: 374,
      easyFactor: 1.3,
    },
    {
      rep: 0,
      repInterval: 0,
      easyFactor: 2.5,
    },
    {
      rep: 0,
      repInterval: 0,
      easyFactor: 2.5,
    },
    {
      rep: 1,
      repInterval: 1,
      easyFactor: 2.36,
    },
    {
      rep: 2,
      repInterval: 6,
      easyFactor: 2.36,
    },
    {
      rep: 3,
      repInterval: 15,
      easyFactor: 2.46,
    },
  ]

  t.deepEqual(results, expected)
})

test('sm2 returns all item properties', async (t) => {
  interface Card extends SuperMemoItem {
    term: string
    definition: string
  }

  const card: Card = {
    term: '☕️',
    definition: '🤩🤩🤩',
    ...SuperMemoDefaultItem,
  }
  const expected = {
    term: '☕️',
    definition: '🤩🤩🤩',
    rep: 1,
    repInterval: 1,
    easyFactor: 2.36,
  }
  const newCard: Card = sm2(card, SuperMemoQuality.PASS_WITH_DIFFICULTY)

  t.same(newCard, expected)
})

test('sm2 does not modify item passed in', async (t) => {
  interface Card extends SuperMemoItem {
    term: string
    definition: string
  }

  const card: Card = {
    term: '☕️',
    definition: '🤩🤩🤩',
    ...SuperMemoDefaultItem,
  }
  const expected = {
    term: '☕️',
    definition: '🤩🤩🤩',
    ...SuperMemoDefaultItem,
  }
  const newCard: Card = sm2(card, SuperMemoQuality.PASS_WITH_DIFFICULTY)

  t.same(card, expected)
  t.notSame(newCard, card)
})
