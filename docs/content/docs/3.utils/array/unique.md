---
title: unique
description: 移除数组中的重复元素。
---

## `unique`

`unique` 函数接收一个数组，并返回一个不包含重复元素的新数组。它利用 `Set` 的特性来实现高效去重。

### 用法

```ts
import { unique } from '@movk/core'

const numbers = [1, 2, 2, 3, 4, 3, 5]
const uniqueNumbers = unique(numbers)
//=> [1, 2, 3, 4, 5]

const strings = ['a', 'b', 'a', 'c', 'b']
const uniqueStrings = unique(strings)
//=> ['a', 'b', 'c']
```

### API

`unique<T>(arr: T[]): T[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="arr" type="T[]" required}
  需要去重的源数组。
  ::
::

#### 返回值

::field-group
  ::field{name="T[]"}
  返回一个不含重复元素的新数组。
  ::
::
