---
title: General
description: 一组通用的高级工具类型。
---

## `Suggest<T>`

`Suggest<T>` 类型允许您在获得特定字符串字面量（如 `'red' | 'blue'`）的 IDE 自动补全提示的同时，仍然可以接受任何其他字符串。

```ts [Source]
export type Suggest<T extends string> = T | (string & {})
```

```ts [Example]
import type { Suggest } from '@movk/core'

type Color = Suggest<'red' | 'green' | 'blue'>

let color1: Color = 'red'     // IDE 会提示 'red', 'green', 'blue'
let color2: Color = 'yellow'  // 也完全有效
```

## `ReactiveValue<T, CTX>`

`ReactiveValue` 是 Vue 的 `MaybeRefOrGetter` 的扩展，它额外支持一个上下文参数。这在创建接收响应式数据或上下文相关回调的组件或组合式函数时非常有用。

```ts [Source]
export type ReactiveValue<T, CTX = never> = [CTX] extends [never]
  ? MaybeRefOrGetter<T>
  : MaybeRefOrGetter<T> | ((ctx: CTX) => T)
```

```ts [Example]
import type { ReactiveValue } from '@movk/core'

type Context = { user: { isAdmin: boolean } }

const visible: ReactiveValue<boolean, Context> = (ctx) => ctx.user.isAdmin

// 它可以是 ref, getter, 普通值, 或带上下文的函数
```

## `StripNullable<T>`

从类型 `T` 中移除 `null` 和 `undefined`。

```ts [Source]
export type StripNullable<T> = T extends null | undefined ? never : T
```

```ts [Example]
import type { StripNullable } from '@movk/core'

type MaybeString = string | null | undefined

// Result is string
type Result = StripNullable<MaybeString>
```
