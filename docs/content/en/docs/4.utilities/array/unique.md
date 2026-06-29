---
title: unique
description: Remove duplicate values from an array and return a new array of unique items, preserving the order of first appearance.
seo:
  title: unique
  description: Remove duplicate values from an array and return a new array of unique items, preserving the order of first appearance.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/array/unique.ts
---

## Usage

`unique` removes duplicate elements from an array.

```ts
import { unique } from '@movk/core'

const numbers = [1, 2, 2, 3, 3, 4]
const uniqueNumbers = unique(numbers)
console.log(uniqueNumbers) // [1, 2, 3, 4]

const strings = ['a', 'b', 'a', 'c']
const uniqueStrings = unique(strings)
console.log(uniqueStrings) // ['a', 'b', 'c']
```

## API

### `unique<T>(arr)`{lang="ts-type"}

Remove duplicate values from an array and return a new array of unique items.

### Parameters

::field-group
  ::field{name="arr" type="T[]" required}
  The array to deduplicate.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="T[]"}
  A new array with duplicates removed.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/array"}
