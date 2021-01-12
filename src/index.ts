export enum SuperMemoQuality {
  FAIL_WITH_TOTAL_BLACKOUT,
  FAIL_BUT_FAMILIAR,
  FAIL_BUT_EASY,
  PASS_WITH_DIFFICULTY,
  PASS_WITH_HESITATION,
  PASS_WITH_PERFECT_RECALL,
}

export interface SuperMemoItem {
  readonly rep: number
  readonly repInterval: number
  readonly easyFactor: number
}

export const SuperMemoDefaultItem: SuperMemoItem = {
  rep: 0,
  repInterval: 0,
  easyFactor: 2.5,
}

export const sm2 = (
  item: SuperMemoItem,
  grade: SuperMemoQuality
): SuperMemoItem => {
  let rep = 0
  let repInterval = 0
  let easyFactor = 2.5

  if (grade >= SuperMemoQuality.PASS_WITH_DIFFICULTY) {
    repInterval =
      item.rep === 0
        ? 1
        : item.rep === 1
        ? 6
        : Math.ceil(item.repInterval * item.easyFactor)

    easyFactor =
      item.easyFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))

    if (easyFactor < 1.3) {
      easyFactor = 1.3
    }

    rep = item.rep + 1
  } else {
    rep = 0
    repInterval = 0
  }

  const newItem: SuperMemoItem = { rep, repInterval, easyFactor }

  return newItem
}
