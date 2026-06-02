---
title: isFunction
description: 检查一个值是否为函数的 TypeScript 类型保护函数，支持判断普通函数、箭头函数及 async 函数。
seo:
  title: isFunction
  description: A TypeScript type guard that checks whether a value is callable, narrowing it to a function type so you can safely invoke it in your code.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isFunction.ts
---

## 用法

检查一个值是否为函数。这是一个 TypeScript 类型保护函数。

```ts
import { isFunction } from '@movk/core'

isFunction(() => {}) // => true
isFunction(Math.abs) // => true
isFunction({}) // => false
```

## API

`isFunction(value: any): value is (...args: any[]) => any`{lang="ts-type"}

### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

### 返回值

::field-group
  ::field{name="boolean"}
  如果值为函数，则返回 `true`，否则返回 `false`。
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
