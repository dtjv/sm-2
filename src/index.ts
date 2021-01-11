export enum SuperMemoQuality {
  FAIL_WITH_TOTAL_BLACKOUT,
  FAIL_BUT_FAMILIAR,
  FAIL_BUT_EASY,
  PASS_WITH_DIFFICULTY,
  PASS_WITH_HESITATION,
  PASS_WITH_PERFECT_RECALL,
}

export interface SuperMemoItem {
  rep: number
  repInterval: number
  eFactor: number
}

export const sm2 = (
  item: SuperMemoItem,
  grade: SuperMemoQuality
): SuperMemoItem => {
  const newItem: SuperMemoItem = { rep: 0, repInterval: 1, eFactor: 2.5 }

  if (grade >= SuperMemoQuality.PASS_WITH_DIFFICULTY) {
    newItem.rep = item.rep + 1

    newItem.repInterval =
      item.rep === 0
        ? 1
        : item.rep === 1
        ? 6
        : Math.ceil(item.repInterval * item.eFactor)

    newItem.eFactor =
      item.eFactor < 1.3
        ? 1.3
        : item.eFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  } else {
    newItem.rep = 0
    newItem.repInterval = 1
  }

  return newItem
}
