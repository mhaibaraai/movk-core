---
title: General
description: 一组通用的高级工具类型。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/general.ts
---

## `Suggest<T>`

`Suggest<T>` 类型允许您在获得特定字符串字面量（如 `'red' | 'blue'`）的 IDE 自动补全提示的同时，仍然可以接受任何其他字符串。

```ts [Source]
export type Suggest<T extends string> = T | (string & {})
```

```ts [Example]
import type { Suggest } from '@movk/core'

type Color = Suggest<'red' | 'green' | 'blue'>

const color1: Color = 'red' // IDE 会提示 'red', 'green', 'blue'
const color2: Color = 'yellow' // 也完全有效
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

interface Context { user: { isAdmin: boolean } }

const visible: ReactiveValue<boolean, Context> = ctx => ctx.user.isAdmin

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

## `IsAny<T>`

检测类型 `T` 是否为 `any`。

利用 `any` 会穿透类型运算的特性（`1 & any` 为 `any`，`0 extends any` 为 `true`）实现检测。

```ts [Source]
export type IsAny<T> = 0 extends (1 & T) ? true : false
```

```ts [Example]
import type { IsAny } from '@movk/core'

type A = IsAny<any> // true
type B = IsAny<string> // false
type C = IsAny<never> // false
type D = IsAny<unknown> // false
```

## `WidenLiteral<T>`

将字面量类型宽化为其对应的基础类型，同时保留可选性（`undefined`）。

主要用于工厂方法的 props 推断，防止 SFC 泛型默认参数产生的字面量类型污染调用签名。

```ts [Source]
export type WidenLiteral<T>
  = IsAny<T> extends true ? T
    : [NonNullable<T>] extends [never] ? unknown
        : NonNullable<T> extends boolean ? boolean | Extract<T, undefined>
          : NonNullable<T> extends string ? string | Extract<T, undefined>
            : T
```

```ts [Example]
import type { WidenLiteral } from '@movk/core'

type A = WidenLiteral<'hello'> // string
type B = WidenLiteral<true> // boolean
type C = WidenLiteral<'foo' | undefined> // string | undefined
type D = WidenLiteral<number> // number（非字面量，保持原样）
type E = WidenLiteral<any> // any（保持原样）
```

## Changelog

:commit-changelog{prefix="types"}
