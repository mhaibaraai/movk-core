---
title: API
description: A collection of utility types for handling async functions and Promises.
seo:
  title: API Types
  description: Reference for @movk/core async and Promise utility types, including awaitable values, unwrapped promises, and awaited function return types.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/api.ts
---

## `ApiAwaitable<T>`

Unifies the return type of synchronous and asynchronous operations.

```ts [Source]
export type ApiAwaitable<T> = T | Promise<T>
```

```ts [Example]
import type { ApiAwaitable } from '@movk/core'

// a: string | Promise<string>
let a: ApiAwaitable<string>
```

## `ApiUnwrapPromise<T>`

Extracts the type contained within a `Promise`.

```ts [Source]
export type ApiUnwrapPromise<T> = T extends Promise<infer U> ? U : T
```

```ts [Example]
import type { ApiUnwrapPromise } from '@movk/core'

type P = Promise<number>

// U is number
type U = ApiUnwrapPromise<P>
```

## `ApiAwaitedReturn<TFn>`

Extracts the return type of an async function.

```ts [Source]
export type ApiAwaitedReturn<TFn> = TFn extends (...args: any[]) => ApiAwaitable<infer R> ? R : never
```

```ts [Example]
import type { ApiAwaitedReturn } from '@movk/core'

type MyFn = () => Promise<string>

// R is string
type R = ApiAwaitedReturn<MyFn>
```

## Changelog

:commit-changelog{prefix="types"}
