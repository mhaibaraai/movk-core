---
title: isDeepEqual
description: 纯数据结构化深比较，结构与值均相同即视为相等
seo:
  title: isDeepEqual
  description: Structurally compare plain data (primitives, arrays, own enumerable keys) so fresh literals with identical values count as equal.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/isDeepEqual.ts
navigation.badge: v1.5.0
---

## 用法

`isDeepEqual` 递归比较原始值、数组与对象的自有可枚举键，适合判定 options 等纯数据是否真正变化。

```ts
import { isDeepEqual } from '@movk/core'

isDeepEqual({ a: [1, 2] }, { a: [1, 2] }) // true
isDeepEqual({ a: { b: 1 } }, { a: { b: 2 } }) // false
isDeepEqual({ a: 1 }, { a: 1, b: undefined }) // false
isDeepEqual(Number.NaN, Number.NaN) // true
```

::note
与 [`equalsBy`](/docs/helpers/object/equals-by) 的区别：`equalsBy` 判断两个值是否指向“同一项”（按 id 等键），`isDeepEqual` 判断两份数据的内容是否完全一致。
::

::warning
不处理 `Map`、`Set`、`Date`、类实例等内建类型的内部状态，也不处理循环引用，仅用于纯数据。
::

## API

### `isDeepEqual(a, b)`{lang="ts-type"}

纯数据结构化深比较。

### 参数

::field-group
  ::field{name="a" type="unknown" required}
  待比较值。
  ::

  ::field{name="b" type="unknown" required}
  待比较值。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  结构与值均相同时返回 `true`。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
