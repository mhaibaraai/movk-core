---
title: Vue
description: A set of helper types for extracting type information from Vue components.
seo:
  title: Vue Types
  description: Reference for @movk/core Vue helper types that extract a component's props, slots, attrs, emit, and exposed types for stronger typing.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/vue.ts
---

These types are primarily used to more precisely infer a Vue component's `props`, `slots`, `emits`, and more in TypeScript environments.

Component extraction types support three vue-tsc compilation signature modes:

- **Mode A**: Function parameters can be resolved directly (`Parameters<T>[0]`)
- **Mode A'**: Self-referencing parameters (returns `any`) → extracted from the `__ctx` member of the return value
- **Mode B**: `DefineComponent` wrapper → `InstanceType<T>['$props']`

## `IsComponent`

A union type representing any valid Vue component type, covering strings, `VNode`, `Component`, and `DefineComponent`.

```ts [Source]
export type IsComponent = StringOrVNode | Component | DefineComponent | ((...args: any[]) => any)
```

## `ComponentProps<T>`

Extracts the `props` type from component type `T`, supporting all three vue-tsc compilation modes. Correctly handles generic SFCs (e.g. `UInput`) where self-referencing parameters cause `Props` extraction to return `any`.

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
// Props is the full props type of MyComponent, including generic SFCs
```

## `ComponentSlots<T>`

Extracts the `slots` type from component type `T`, supporting all three vue-tsc compilation modes.

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

Extracts the `attrs` type from component type `T`, supporting all three vue-tsc compilation modes.

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

Extracts the `emit` function type from component type `T`, supporting all three vue-tsc compilation modes.

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

Extracts the `expose` type from component type `T`.

```ts [Source]
export type ComponentExposed<T> = T extends new (...args: any) => infer E ? E
  : T extends (props: any, ctx: any, expose: (exposed: infer E) => any, ...args: any) => any ? NonNullable<E>
    : {}
```

## Changelog

:commit-changelog{prefix="types"}
