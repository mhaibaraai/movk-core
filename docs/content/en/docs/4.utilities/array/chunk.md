---
title: chunk
description: Split an array into smaller arrays of a fixed size, returning a new array of chunks without mutating the original input array.
seo:
  title: chunk
  description: Split an array into smaller arrays of a fixed size, returning a new array of chunks without mutating the original input array.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/array/chunk.ts
---

## Usage

`chunk` splits an array into multiple sub-arrays of a given size. Commonly used for pagination, batch processing, and data partitioning.

```ts
import { chunk } from '@movk/core'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const chunks = chunk(numbers, 3)
console.log(chunks) // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
const pairs = chunk(names, 2)
console.log(pairs) // [['Alice', 'Bob'], ['Charlie', 'David'], ['Eve']]
```

## API

### `chunk<T>(arr, size)`{lang="ts-type"}

Split an array into chunks of the specified size.

### Parameters

::field-group
  ::field{name="arr" type="T[]" required}
  The array to split.
  ::

  ::field{name="size" type="number" required}
  The size of each chunk.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="T[][]"}
  A two-dimensional array where each sub-array has at most `size` elements.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/array"}
