# SM-2

An implementation of the [SM-2](https://super-memory.com/english/ol/sm2.htm) algorithm written in Typescript.

## Install

```sh
$ npm install @dtjv/sm2
```

## Example

```sh
$ npm run example
```

## Usage

> _If you use CommonJS, then require the module as `const { sm2 } = require('@dtjv/sm2')`_

```typescript
import {
  sm2,
  SuperMemoItem,
  SuperMemoQuality,
  SuperMemoDefaultItem,
} from '@dtjv/sm2'

interface Card extends SuperMemoItem {
  term: string
  definition: string
}

let card: Card = {
  term: '☕️',
  definition: '🤩🤩🤩',
  ...SuperMemoDefaultItem, // read-only properties added
}

card = { ...card, ...sm2(card, SuperMemoQuality.PASS_WITH_PERFECT_RECALL) }

/*
 * expect `card` to be:

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
