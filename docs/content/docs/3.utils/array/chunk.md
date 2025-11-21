---
title: chunk
description: 将数组分割成指定大小的块。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/array/operations.ts
---

## `chunk`

`chunk` 函数将一个数组按照指定的 `size` 分割成多个数组块，并返回一个包含这些块的二维数组。

### 用法

```ts
import { chunk } from '@movk/core'

const data = [1, 2, 3, 4, 5, 6, 7]

const chunksOf3 = chunk(data, 3)
//=> [[1, 2, 3], [4, 5, 6], [7]]

const chunksOf2 = chunk(data, 2)
//=> [[1, 2], [3, 4], [5, 6], [7]]
```

### API

`chunk<T>(arr: T[], size: number): T[][]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="arr" type="T[]" required}
  需要分块的源数组。
  ::
  ::field{name="size" type="number" required}
  每个数组块的大小。
  ::
::

#### 返回值

::field-group
  ::field{name="T[][]"}
  返回一个包含分块后数组的二维数组。如果无法平均分割，最后一个块将包含剩余的元素。
  ::
::
