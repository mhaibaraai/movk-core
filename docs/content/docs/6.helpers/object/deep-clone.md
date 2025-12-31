---
title: deepClone
description: 深拷贝任意 JavaScript 值
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/deepClone.ts
---

## 用法

`deepClone` 函数用于深拷贝任意 JavaScript 值。

优先使用原生 `structuredClone`（若可用），对不支持的环境使用回退实现，支持循环引用、内建类型专项处理。

```ts
import { deepClone } from '@movk/core'

const source = { a: 1, d: new Date(), m: new Map([[1, { x: 2 }]]) }
const cloned = deepClone(source)
cloned !== source // true
cloned.d !== source.d // true
cloned.m !== source.m // true
cloned.m.get(1) !== source.m.get(1) // true
```

## API

### `deepClone<T>(obj, cache?)`{lang="ts-type"}

深拷贝任意 JavaScript 值。

### 参数

::field-group
  ::field{name="obj" type="T" required}
  要被深拷贝的值。
  ::

  ::field{name="cache" type="WeakMap<object, any>"}
  内部使用的 `WeakMap`（循环引用记忆化），一般不需要传入。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="T"}
  新的深拷贝值，与输入值结构等价、引用独立。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
