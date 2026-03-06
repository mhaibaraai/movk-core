---
title: Vue
description: 一组用于从 Vue 组件中提取类型信息的辅助类型。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/vue.ts
---

这些类型主要用于在 TypeScript 环境下更精确地推断 Vue 组件的 `props`、`slots`、`emits` 等。

组件提取类型支持三种 vue-tsc 编译签名模式：

- **模式 A**：函数参数可直接解析（`Parameters<T>[0]`）
- **模式 A'**：参数自引用（返回 `any`）→ 从返回值 `__ctx` 成员提取
- **模式 B**：`DefineComponent` 包装 → `InstanceType<T>['$props']`

## `IsComponent`

表示任意合法 Vue 组件类型的联合类型，涵盖字符串、`VNode`、`Component` 及 `DefineComponent`。

```ts [Source]
export type IsComponent = StringOrVNode | Component | DefineComponent | ((...args: any[]) => any)
```

## `ComponentProps<T>`

从组件类型 `T` 中提取其 `props` 类型，支持三种 vue-tsc 编译模式，能正确处理泛型 SFC（如 `UInput`）因参数自引用导致 `Props` 提取返回 `any` 的问题。

```ts [Source]
export type ComponentProps<T>
  = _FnParam<T> extends never
    ? _ReturnCtxMember<T, 'props'> extends never
      ? _InstanceTypeMember<T, '$props'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$props'>>
      : NonNullable<_ReturnCtxMember<T, 'props'>>
    : _FnParam<T>
```

```ts [Example]
import type { ComponentProps } from '@movk/core'
import MyComponent from './MyComponent.vue'

type Props = ComponentProps<typeof MyComponent>
// Props 为 MyComponent 的完整 props 类型，包括泛型 SFC
```

## `ComponentSlots<T>`

从组件类型 `T` 中提取其 `slots` 类型，支持三种 vue-tsc 编译模式。

```ts [Source]
export type ComponentSlots<T>
  = _IsAny<_FnCtxMember<T, 'slots'>> extends true
    ? _ReturnCtxMember<T, 'slots'> extends never
      ? _InstanceTypeMember<T, '$slots'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$slots'>>
      : _ReturnCtxMember<T, 'slots'>
    : [_FnCtxMember<T, 'slots'>] extends [never]
        ? _ReturnCtxMember<T, 'slots'> extends never
          ? _InstanceTypeMember<T, '$slots'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$slots'>>
          : _ReturnCtxMember<T, 'slots'>
        : _FnCtxMember<T, 'slots'>
```

## `ComponentAttrs<T>`

从组件类型 `T` 中提取其 `attrs` 类型，支持三种 vue-tsc 编译模式。

```ts [Source]
export type ComponentAttrs<T>
  = _IsAny<_FnCtxMember<T, 'attrs'>> extends true
    ? _ReturnCtxMember<T, 'attrs'> extends never
      ? _InstanceTypeMember<T, '$attrs'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$attrs'>>
      : _ReturnCtxMember<T, 'attrs'>
    : [_FnCtxMember<T, 'attrs'>] extends [never]
        ? _ReturnCtxMember<T, 'attrs'> extends never
          ? _InstanceTypeMember<T, '$attrs'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$attrs'>>
          : _ReturnCtxMember<T, 'attrs'>
        : _FnCtxMember<T, 'attrs'>
```

## `ComponentEmit<T>`

从组件类型 `T` 中提取其 `emit` 函数的类型，支持三种 vue-tsc 编译模式。

```ts [Source]
export type ComponentEmit<T>
  = _IsAny<_FnCtxMember<T, 'emit'>> extends true
    ? _ReturnCtxMember<T, 'emit'> extends never
      ? _InstanceTypeMember<T, '$emit'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$emit'>>
      : _ReturnCtxMember<T, 'emit'>
    : [_FnCtxMember<T, 'emit'>] extends [never]
        ? _ReturnCtxMember<T, 'emit'> extends never
          ? _InstanceTypeMember<T, '$emit'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$emit'>>
          : _ReturnCtxMember<T, 'emit'>
        : _FnCtxMember<T, 'emit'>
```

## `ComponentExposed<T>`

从组件类型 `T` 中提取其 `expose` 的类型。

```ts [Source]
export type ComponentExposed<T> = T extends new (...args: any) => infer E ? E
  : T extends (props: any, ctx: any, expose: (exposed: infer E) => any, ...args: any) => any ? NonNullable<E>
    : {}
```

## Changelog

:commit-changelog{prefix="types"}
