---
title: chunk
description: 将数组分割成指定大小的块
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/array/chunk.ts
---

## 用法

`chunk` 函数用于将一个数组分割成多个指定大小的子数组，常用于分页、批处理等场景。

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

将数组分割成指定大小的块。

### 参数

::field-group
  ::field{name="arr" type="T[]" required}
  待分割的数组。
  ::

  ::field{name="size" type="number" required}
  每个块的大小。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="T[][]"}
  分割后的二维数组，每个子数组的长度不超过 `size`。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/array"}
