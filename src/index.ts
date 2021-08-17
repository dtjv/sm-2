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

export const SuperMemoItemDefaults: SuperMemoItem = {
  rep: 0,
  repInterval: 1,
  easyFactor: 2.5,
}

export const sm2 = <T extends SuperMemoItem>(
  item: T,
  grade: SuperMemoQuality
): T => {
  let { rep, repInterval, easyFactor } = item

  rep += 1

  if (grade < SuperMemoQuality.PASS_WITH_DIFFICULTY) {
    rep = 0
    repInterval = 1
  } else {
    easyFactor = easyFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))

    if (easyFactor < 1.3) {
      easyFactor = 1.3
    }

    repInterval =
      rep === 1 ? 1 : rep === 2 ? 6 : Math.ceil(repInterval * easyFactor)
  }

  return { ...item, rep, repInterval, easyFactor }
}
