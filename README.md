# SM-2

An implementation of the [SM-2](https://super-memory.com/english/ol/sm2.htm) algorithm written in Typescript.

## Install

```sh
$ npm install @dtjv/sm2
```

## Demo

```sh
$ npm run example
```

## Usage

> _If you use CommonJS, then require the module as `const { sm2 } = require('@dtjv/sm2')`_

```typescript
import { sm2, SuperMemoItem, SuperMemoQuality } from '@dtjv/sm2'

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
  rep: 0,
  repInterval: 0,
  eFactor: 2.5,
}

card = studyCard(card, SuperMemoQuality.PASS_WITH_PERFECT_RECALL)
console.log(card)
/*
 * Expect:
 *
 * {
 *   term: '☕️',
 *   definition: '🤩🤩🤩',
 *   rep: 1,
 *   repInterval: 1,
 *   eFactor: 2.36,
 * }
 */
```

## License

[MIT License](LICENSE)
