//------------------------------------------------------------------------------
// module
//------------------------------------------------------------------------------
type SuperMemoGrade = 0 | 1 | 2 | 3 | 4 | 5

interface SuperMemoItem {
  rep: number
  repInterval: number
  eFactor: number
}

const sm2 = (item: SuperMemoItem, grade: SuperMemoGrade): SuperMemoItem => {
  const newItem: SuperMemoItem = { rep: 0, repInterval: 1, eFactor: 2.5 }

  newItem.rep = grade < 3 ? 1 : item.rep + 1

  newItem.eFactor =
    item.eFactor < 1.3
      ? 1.3
      : item.eFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))

  newItem.repInterval =
    newItem.rep === 1
      ? 1
      : newItem.rep === 2
      ? 6
      : Math.ceil(item.repInterval * item.eFactor)

  return newItem
}

//------------------------------------------------------------------------------
// app
//------------------------------------------------------------------------------

interface Card extends SuperMemoItem {
  data: string
}

let card: Card = {
  data: '',
  rep: 0,
  repInterval: 1,
  eFactor: 2.5,
}

const practice = (card: Card, grade: SuperMemoGrade): Card => ({
  ...card,
  ...sm2(card, grade),
})

console.log(card)

const grades: SuperMemoGrade[] = [2, 3, 4, 2, 4, 4, 5]

grades.forEach((grade) => {
  console.log(grade)
  card = practice(card, grade)
  console.log(card)
})
