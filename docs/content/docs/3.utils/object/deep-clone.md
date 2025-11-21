---
title: deepClone
description: 深拷贝任意 JavaScript 值，包括循环引用和各种内建类型。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/deepClone.ts
---

## `deepClone`

`deepClone` 函数可以深拷贝任意 JavaScript 值，包括循环引用和各种内建类型（如 `Date`, `RegExp`, `Map`, `Set` 等）。它优先使用原生的 `structuredClone` 以获得最佳性能，并在不支持的环境中提供可靠的回退实现。

### 用法

```ts
import { deepClone } from '@movk/core'

const original = {
  a: 1,
  b: new Date(),
  c: new Map([['key', { value: 'nested' }]]),
  d: new Set([1, 2]),
}
original.self = original // 创建循环引用

const cloned = deepClone(original)

console.log(cloned.c === original.c) // false
console.log(cloned.c.get('key') === original.c.get('key')) // false
console.log(cloned.self === cloned) // true
```

### API

`deepClone<T>(obj: T, cache?: WeakMap<object, any>): T`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="obj" type="T" required}
  需要被深拷贝的值。
  ::
::

#### 返回值

::field-group
  ::field{name="T"}
  返回一个与源对象结构相同但完全独立的新对象。
  ::
::
