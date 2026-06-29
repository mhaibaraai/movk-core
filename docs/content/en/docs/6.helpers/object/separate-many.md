---
title: separateMany
description: Partition an object into several named groups of keys plus an others catch-all, returning a new object for each group in one pass.
seo:
  title: separateMany
  description: Partition an object into several named groups of keys plus an others catch-all, returning a new object for each group in one pass.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/separateMany.ts
---

## Usage

The `separateMany` function partitions an object into multiple named groups by key sets.

```ts
import { separateMany } from '@movk/core'

const options = { id: 1, name: 'John', email: 'a@b.com', role: 'admin' }
const { a, b, others } = separateMany(options, { a: ['id'], b: ['name'] as const })
// a: { id: 1 }
// b: { name: 'John' }
// others: { email: 'a@b.com', role: 'admin' }
```

## API

### `separateMany(obj, groups)`{lang="ts-type"}

Partitions an object into multiple named groups by key sets.

### Parameters

::field-group
  ::field{name="obj" type="T" required}
  The source object.
  ::

  ::field{name="groups" type="M" required}
  Group mapping, e.g. `{ a: ['x', 'y'], b: ['z'] }`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="{ [P in keyof M]: PickByKey<T, M[P][number]> } & { others: OmitByKey<T, M[keyof M][number]> }"}
  An object containing a sub-object for each group plus `others` (all keys not captured by any group).
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
