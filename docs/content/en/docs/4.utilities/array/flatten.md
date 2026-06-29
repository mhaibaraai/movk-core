---
title: flatten
description: Flatten a nested array to a given depth, returning a new flattened array while leaving the original nested structure untouched.
seo:
  title: flatten
  description: Flatten a nested array to a given depth, returning a new flattened array while leaving the original nested structure untouched.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/array/flatten.ts
---

## Usage

`flatten` flattens a nested array to the specified depth.

```ts
import { flatten } from '@movk/core'

const nested = [1, [2, 3], [4, [5, 6]]]
const flat1 = flatten(nested)
console.log(flat1) // [1, 2, 3, 4, [5, 6]]

const flat2 = flatten(nested, 2)
console.log(flat2) // [1, 2, 3, 4, 5, 6]
```

## API

### `flatten<T>(arr, depth?)`{lang="ts-type"}

Flatten a nested array to the specified depth.

### Parameters

::field-group
  ::field{name="arr" type="T[]" required}
  The nested array to flatten.
  ::

  ::field{name="depth" type="number"}
  The depth to flatten to. Defaults to `1`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="any[]"}
  The flattened array.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/array"}
