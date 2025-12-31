---
title: flatten
description: 数组扁平化，将嵌套数组展平到指定深度
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/array/flatten.ts
---

## 用法

`flatten` 函数用于将嵌套数组展平到指定深度。

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

将嵌套数组展平到指定深度。

### 参数

::field-group
  ::field{name="arr" type="T[]" required}
  待扁平化的数组。
  ::

  ::field{name="depth" type="number"}
  扁平化深度，默认为 `1`。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="any[]"}
  扁平化后的数组。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/array"}
