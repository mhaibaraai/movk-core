---
title: pipe
description: 从左到右组合函数，前一个的返回值作为后一个的入参，支持类型逐级演进
seo:
  title: pipe
  description: Compose functions from left to right so each return value feeds the next, with overloads that carry types through every step.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/function/pipe.ts
navigation.badge: v1.4.0
---

## 用法

`pipe` 函数把多个函数组合成一个，执行时从左到右依次调用，前一个的返回值作为后一个的入参。

```ts
import { pipe } from '@movk/core'

const parse = pipe(
  (v: string) => v.trim(),
  (v: string) => Number(v),
  (v: number) => Math.round(v),
)

parse('  4.6 ') // 5
```

类型逐级演进，`parse` 的类型推导为 `(v: string) => number`。

### 首个函数可接收多个参数

其后的函数一律单参串联。

```ts
const total = pipe(
  (a: number, b: number) => a + b,
  (v: number) => v * 10,
)

total(2, 3) // 50
```

### 同签名链式合成

多个互不相干的处理函数共享同一签名时，`pipe` 就是那条链的底层。

```ts
interface NodeAttrs { size: number, hidden?: boolean }

const enlarge = (attrs: NodeAttrs): NodeAttrs => ({ ...attrs, size: attrs.size * 2 })
const hide = (attrs: NodeAttrs): NodeAttrs => ({ ...attrs, hidden: true })

const chained = pipe(enlarge, hide)
chained({ size: 4 }) // { size: 8, hidden: true }
```

### 边界情况

类型重载覆盖到 8 个函数，超出部分退化为同签名变参形态，运行时行为不变；未传入任何函数时返回恒等函数。

```ts
pipe()(42) // 42
```

## API

### `pipe(...fns)`{lang="ts-type"}

从左到右组合函数。

### 参数

::field-group
  ::field{name="fns" type="Array<(...args: any[]) => any>" required}
  待组合的函数序列。首个函数可接收多个参数，其后每个函数依次接收上一个的返回值。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="(...args: any[]) => any"}
  组合后的函数，参数签名同首个函数，返回值类型同末个函数。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/function"}
