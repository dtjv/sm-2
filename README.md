# SM-2

An implementation of the [SM-2](https://super-memory.com/english/ol/sm2.htm) algorithm written in TypeScript.

## Install

```sh
$ npm install @dtjv/sm-2
```

## Usage

### CommonJS

```javascript
// example.js
const { sm2, SuperMemoQuality, SuperMemoItemDefaults } = require('@dtjv/sm-2')
```

### ESM

```javascript
// example.mjs
import SM2 from '@dtjv/sm-2'
const { sm2, SuperMemoQuality, SuperMemoItemDefaults } = SM2
```

### TypeScript

```typescript
// example.ts
import { sm2, SuperMemoQuality, SuperMemoItemDefaults } from '@dtjv/sm-2'
import type { SuperMemoItem } from '@dtjv/sm-2'
```

### Example

For more examples, see [test file](./tests/index-test.ts).

```typescript
// example.ts

import { sm2, SuperMemoQuality, SuperMemoItemDefaults } from '@dtjv/sm-2'
import type { SuperMemoItem } from '@dtjv/sm-2'

interface Card extends SuperMemoItem {
  term: string
  definition: string
}

const card: Card = {
  term: '🍩',
  definition: '😋😋😋',
  ...SuperMemoItemDefaults, // adds read-only default values
}

const newCard = sm2<Card>(card, SuperMemoQuality.PASS_WITH_PERFECT_RECALL)
console.log(newCard)
/*
 * expect `newCard` to be:
 *
 * {
 *   term: '🍩',
 *   definition: '😋😋😋',
 *   rep: 1,
 *   repInterval: 1,
 *   easyFactor: 2.6,
 * }
 */
```

## Types

```typescript
interface SuperMemoItem {
  readonly rep: number
  readonly repInterval: number
  readonly easyFactor: number
}
```

## Constants

```typescript
enum SuperMemoQuality {
  FAIL_WITH_TOTAL_BLACKOUT,
  FAIL_BUT_FAMILIAR,
  FAIL_BUT_EASY,
  PASS_WITH_DIFFICULTY,
  PASS_WITH_HESITATION,
  PASS_WITH_PERFECT_RECALL,
}
```

## API

### sm2(item, grade)

Returns a **new** `item` with updated SM-2 fields. Throws an error for invalid
parameters.

#### item

Type: `SuperMemoItem`\
Required

The item to compute new SM-2 values.

#### grade

Type: `SuperMemoQuality`\
Required

The quality grade used to compute new SM-2 values.

## Author

- [David Valles](https://dtjv.io)

## Reference

- https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
- https://en.wikipedia.org/wiki/SuperMemo

## License

[MIT License](LICENSE)
