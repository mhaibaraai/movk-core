---
title: General
description: A collection of general-purpose advanced TypeScript utility types, covering common helpers such as Nullable, DeepPartial, and more.
seo:
  title: General Types
  description: Reference for general-purpose @movk/core utility types such as Suggest, MaybeFn, ReactiveValue, StripNullable, IsAny, and WidenLiteral.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/general.ts
---

## `Suggest<T>`

`Suggest<T>` allows you to get IDE autocomplete suggestions for specific string literals (e.g. `'red' | 'blue'`) while still accepting any other string value.

```ts [Source]
export type Suggest<T extends string> = T | (string & {})
```

```ts [Example]
import type { Suggest } from '@movk/core'

type Color = Suggest<'red' | 'green' | 'blue'>

const color1: Color = 'red' // IDE suggests 'red', 'green', 'blue'
const color2: Color = 'yellow' // also perfectly valid
```

## `ReactiveValue<T, CTX>`

`ReactiveValue` is an extension of Vue's `MaybeRefOrGetter` that additionally supports a context parameter. This is useful when creating components or composables that accept reactive data or context-aware callbacks.

```ts [Source]
export type ReactiveValue<T, CTX = never> = [CTX] extends [never]
  ? MaybeRefOrGetter<T>
  : MaybeRefOrGetter<T> | ((ctx: CTX) => T)
```

```ts [Example]
import type { ReactiveValue } from '@movk/core'

interface Context { user: { isAdmin: boolean } }

const visible: ReactiveValue<boolean, Context> = ctx => ctx.user.isAdmin

// It can be a ref, getter, plain value, or context-aware function
```

## `StripNullable<T>`

Removes `null` and `undefined` from type `T`.

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

Detects whether type `T` is `any`.

Leverages the fact that `any` penetrates type operations (`1 & any` is `any`, `0 extends any` is `true`).

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

Widens literal types to their corresponding base types while preserving optionality (`undefined`).

Primarily used for props inference in factory methods, preventing literal type pollution from SFC generic default parameters from affecting call signatures.

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
type D = WidenLiteral<number> // number (not a literal, unchanged)
type E = WidenLiteral<any> // any (unchanged)
```

## Changelog

:commit-changelog{prefix="types"}
