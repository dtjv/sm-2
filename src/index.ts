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
  if (!isSuperMemoItem(item)) {
    throw new TypeError(`Parameter 'item' must be type 'SuperMemoItem'.`)
  }

  if (!isGrade(grade)) {
    throw new TypeError(`Parameter 'grade' must be a 'SuperMemoQuality' value.`)
  }

  let { rep, repInterval, easyFactor } = item

  rep += 1

  if (grade < SuperMemoQuality.PASS_WITH_DIFFICULTY) {
    rep = 0
    repInterval = 1
  } else {
    easyFactor += 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)

    if (easyFactor < 1.3) {
      easyFactor = 1.3
    }

    repInterval =
      rep === 1 ? 1 : rep === 2 ? 6 : Math.ceil(repInterval * easyFactor)
  }

  return { ...item, rep, repInterval, easyFactor }
}

function isSuperMemoItem(item: SuperMemoItem): boolean {
  const { rep, repInterval, easyFactor } = item
  return (
    typeof rep === 'number' &&
    typeof repInterval === 'number' &&
    typeof easyFactor === 'number'
  )
}

function isGrade(grade: number): boolean {
  const grades = [
    ...Object.keys(SuperMemoQuality)
      .map((grade) => Number.parseInt(grade, 10))
      .filter((grade) => !Number.isNaN(grade)),
  ]
  return grades.includes(grade)
}
