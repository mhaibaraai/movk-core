---
title: API
description: 一组用于处理异步函数和 Promise 的工具类型。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/api.ts
---

## `ApiAwaitable<T>`

统一同步和异步操作的返回类型。

```ts [Source]
export type ApiAwaitable<T> = T | Promise<T>
```

```ts [Example]
import type { ApiAwaitable } from '@movk/core'

// a: string | Promise<string>
let a: ApiAwaitable<string>
```

## `ApiUnwrapPromise<T>`

提取 `Promise` 中包含的类型。

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

提取一个异步函数的返回类型。

```ts [Source]
export type ApiAwaitedReturn<TFn> = TFn extends (...args: any[]) => ApiAwaitable<infer R> ? R : never
```

```ts [Example]
import type { ApiAwaitedReturn } from '@movk/core'

type MyFn = () => Promise<string>

// R is string
type R = ApiAwaitedReturn<MyFn>
```
