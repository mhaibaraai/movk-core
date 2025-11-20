---
title: Vue
description: 一组用于从 Vue 组件中提取类型信息的辅助类型。
---

这些类型主要用于在 TypeScript 环境下更精确地推断 Vue 组件的 `props`、`slots`、`emits` 等。

## `ComponentProps<T>`

从一个组件类型 `T` 中提取其 `props` 类型。

```ts [Source]
export type ComponentProps<T> = T extends new (...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
    : {}
```

```ts [Example]
import MyComponent from './MyComponent.vue'
type Props = ComponentProps<typeof MyComponent>
// Props will be the type of MyComponent's props
```

## `ComponentSlots<T>`

从一个组件类型 `T` 中提取其 `slots` 类型。

```ts [Source]
export type ComponentSlots<T> = T extends new (...args: any) => { $slots: infer S } ? NonNullable<S>
  : T extends (props: any, ctx: { slots: infer S, attrs: any, emit: any }, ...args: any) => any ? NonNullable<S>
    : {}
```

## `ComponentAttrs<T>`

从一个组件类型 `T` 中提取其 `attrs` 类型。

```ts [Source]
export type ComponentAttrs<T> = T extends new (...args: any) => { $attrs: infer A } ? NonNullable<A>
  : T extends (props: any, ctx: { slots: any, attrs: infer A, emit: any }, ...args: any) => any ? NonNullable<A>
    : {}
```

## `ComponentEmit<T>`

从一个组件类型 `T` 中提取其 `emit` 函数的类型。

```ts [Source]
export type ComponentEmit<T> = T extends new (...args: any) => { $emit: infer E } ? NonNullable<E>
  : T extends (props: any, ctx: { slots: any, attrs: any, emit: infer E }, ...args: any) => any ? NonNullable<E>
    : {}
```

## `ComponentExposed<T>`

从一个组件类型 `T` 中提取其 `expose` 的类型。

```ts [Source]
export type ComponentExposed<T> = T extends new (...args: any) => infer E ? E
  : T extends (props: any, ctx: any, expose: (exposed: infer E) => any, ...args: any) => any ? NonNullable<E>
    : {}
```
