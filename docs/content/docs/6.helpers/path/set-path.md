---
title: setPath
description: 在对象指定路径写入值
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/setPath.ts
---

## 用法

`setPath` 函数用于在对象指定路径写入值。

```ts
import { setPath } from '@movk/core'

const obj: any = {}
setPath(obj, 'a.b[0].c', 7)
// obj => { a: { b: [{ c: 7 }] } }

setPath(obj, 'a.b[2].d', 8)
// 数组自动扩容到长度 3
// obj.a.b[2] => { d: 8 }

setPath(obj, 'a.0.b', 1) // 点语法数字键保持为字符串键
// obj => { a: { 0: { b: 1 } } }
setPath(obj, 'a[0].b', 2) // 索引用方括号
// obj.a[0].b => 2
```

## API

### `setPath(object, path, value)`{lang="ts-type"}

在对象指定路径写入值。

### 参数

::field-group
  ::field{name="object" type="T" required}
  目标对象(原地修改并返回同一引用)。
  ::

  ::field{name="path" type="PathInput" required}
  路径字符串或片段数组。
  ::

  ::field{name="value" type="unknown" required}
  要写入的值。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="T"}
  原对象(已修改)。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
