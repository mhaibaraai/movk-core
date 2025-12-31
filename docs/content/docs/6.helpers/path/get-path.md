---
title: getPath
description: 读取对象指定路径的值
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/getPath.ts
---

## 用法

`getPath` 函数用于读取对象指定路径的值。

```ts
import { getPath } from '@movk/core'

const obj = { a: { b: { c: 1, d: undefined }, e: null }, arr: [{ x: 9 }] }
getPath(obj, 'a.b.c') // 1
getPath(obj, 'a.b.d', 42) // 42(d 为 undefined,使用默认值)
getPath(obj, 'a.e', 100) // null(null 不触发默认值)
getPath(obj, 'arr[0].x') // 9
getPath(obj, '') // 返回 obj 本身
```

## API

### `getPath(object, path, defaultValue?)`{lang="ts-type"}

读取对象指定路径的值。

### 参数

::field-group
  ::field{name="object" type="T" required}
  源对象。
  ::

  ::field{name="path" type="PathInput" required}
  路径字符串或片段数组。
  ::

  ::field{name="defaultValue" type="D"}
  结果为 `undefined` 时返回的默认值。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="unknown | D"}
  读取到的值或默认值。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
