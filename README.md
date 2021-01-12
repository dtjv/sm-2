# SM-2

An implementation of the [SM-2](https://super-memory.com/english/ol/sm2.htm) algorithm written in Typescript.

## Install

```sh
$ npm install @dtjv/sm-2
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
} from '@dtjv/sm-2'

interface Card extends SuperMemoItem {
  term: string
  definition: string
}

let card: Card = {
  term: '🍩',
  definition: '😋😋😋',
  ...SuperMemoDefaultItem, // adds read-only default values
}

card = { ...card, ...sm2(card, SuperMemoQuality.PASS_WITH_PERFECT_RECALL) }

/*
 * expect `card` to be:
 *
 * {
 *   term: '🍩',
 *   definition: '😋😋😋',
 *   rep: 1,
 *   repInterval: 1,
 *   easyFactor: 2.36,
 * }
 */
```

## Reference

- https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
- https://en.wikipedia.org/wiki/SuperMemo

## License

[MIT License](LICENSE)
