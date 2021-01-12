// -----------------------------------------------------------------------------
// example.ts
//
// To run this example, type: `npm run example`
// -----------------------------------------------------------------------------
import { sm2, SuperMemoItem, SuperMemoQuality, SuperMemoDefaultItem } from '.'

interface Card extends SuperMemoItem {
  term: string
  definition: string
}

const studyCard = (card: Card, grade: SuperMemoQuality): Card => ({
  ...card,
  ...sm2(card, grade),
})

let card: Card = {
  term: '☕️',
  definition: '🤩🤩🤩',
  ...SuperMemoDefaultItem,
}

const grades: SuperMemoQuality[] = [
  SuperMemoQuality.FAIL_BUT_EASY,
  SuperMemoQuality.PASS_WITH_DIFFICULTY,
  SuperMemoQuality.PASS_WITH_HESITATION,
]

console.log(card)

grades.forEach((grade) => {
  card = studyCard(card, grade)
  console.log(card)
})
