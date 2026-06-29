---
title: deepClone
description: Deep clone any value, preferring structuredClone with a fallback that handles circular references, dates, maps, sets, and typed arrays.
seo:
  title: deepClone
  description: Deep clone any value, preferring structuredClone with a fallback that handles circular references, dates, maps, sets, and typed arrays.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/deepClone.ts
---

## Usage

The `deepClone` function deep-clones any JavaScript value.

It prefers the native `structuredClone` when available, falling back to a custom implementation for unsupported environments, with dedicated handling for circular references and built-in types.

```ts
import { deepClone } from '@movk/core'

const source = { a: 1, d: new Date(), m: new Map([[1, { x: 2 }]]) }
const cloned = deepClone(source)
cloned !== source // true
cloned.d !== source.d // true
cloned.m !== source.m // true
cloned.m.get(1) !== source.m.get(1) // true
```

## API

### `deepClone<T>(obj, cache?)`{lang="ts-type"}

Deep-clones any JavaScript value.

### Parameters

::field-group
  ::field{name="obj" type="T" required}
  The value to deep-clone.
  ::

  ::field{name="cache" type="WeakMap<object, any>"}
  An internal `WeakMap` used for circular reference memoization. You rarely need to pass this manually.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="T"}
  A new deep-cloned value structurally equal to the input but with independent references.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
