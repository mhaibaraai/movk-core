---
title: unique
description: 数组去重，返回去除重复元素后的新数组
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/array/unique.ts
---

## 用法

`unique` 函数用于去除数组中的重复元素。

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

数组去重，返回去除重复元素后的新数组。

### 参数

::field-group
  ::field{name="arr" type="T[]" required}
  待去重的数组。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="T[]"}
  去重后的新数组。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/array"}
