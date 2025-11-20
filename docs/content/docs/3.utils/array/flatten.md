---
title: flatten
description: 将嵌套数组展平到指定深度。
---

## `flatten`

`flatten` 函数将一个嵌套数组“拉平”为指定深度的一维数组。

### 用法

```ts
import { flatten } from '@movk/core'

const nested = [1, [2, 3], [4, [5, 6]]]

// 默认深度为 1
const flat1 = flatten(nested)
//=> [1, 2, 3, 4, [5, 6]]

// 指定深度为 2
const flat2 = flatten(nested, 2)
//=> [1, 2, 3, 4, 5, 6]
```

### API

`flatten<T>(arr: T[], depth = 1): any[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="arr" type="T[]" required}
  需要扁平化的嵌套数组。
  ::
  ::field{name="depth" type="number"}
  扁平化的深度。默认为 `1`。
  ::
::

#### 返回值

::field-group
  ::field{name="any[]"}
  返回一个扁平化处理后的新数组。
  ::
::
