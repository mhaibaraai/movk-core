---
title: Object
description: 一系列用于在类型级别操作和转换对象的高级工具类型。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/object.ts
---

## `OmitByKey<T, K>`

依据键名从对象类型 `T` 中剔除键 `K`。

```ts [Source]
export type OmitByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
}
```

```ts [Example]
interface User { id: string, name: string, age: number }
// R is { id: string; name: string }
type R = OmitByKey<User, 'age'>
```

## `PickByKey<T, K>`

依据键名从对象类型 `T` 中挑选键 `K`。

```ts [Source]
export type PickByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
}
```

```ts [Example]
interface User { id: string, name: string, age: number }
// R is { id: string; name: string }
type R = PickByKey<User, 'id' | 'name'>
```

## `RenameKeys<T, Mapping>`

基于映射表 `Mapping` 对对象类型 `T` 的键进行重命名。

```ts [Source]
export type RenameKeys<T, Mapping extends { [K in keyof T]?: PropertyKey }> = {
  [K in keyof T as K extends keyof Mapping ? Exclude<Mapping[K], undefined> : K]: T[K];
}
```

```ts [Example]
interface Src { a: number, b: string }
// R is { id: number; b: string }
type R = RenameKeys<Src, { a: 'id' }>
```

## `RequiredByKeys<T, K>`

将对象类型 `T` 中的键 `K` 标记为必填。

```ts [Source]
export type RequiredByKeys<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
}
```

```ts [Example]
interface User { id: string, name?: string }
// R['name'] is required string
type R = RequiredByKeys<User, 'name'>
```

## `PartialByKeys<T, K>`

将对象类型 `T` 中的键 `K` 标记为可选。

```ts [Source]
export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```

```ts [Example]
interface User { id: string, name: string }
// R['name'] is optional
type R = PartialByKeys<User, 'name'>
```

## `ReadonlyByKeys<T, K>`

将对象类型 `T` 中的键 `K` 标记为只读。

```ts [Source]
export type ReadonlyByKeys<T, K extends keyof T> = T & {
  readonly [P in K]: T[P];
}
```

## `MutableByKeys<T, K>`

取消对象类型 `T` 中键 `K` 的只读限制。

```ts [Source]
export type MutableByKeys<T, K extends keyof T> = {
  -readonly [P in K]: T[P];
} & Omit<T, K>
```

## `UnionToIntersection<U>`

将联合类型 `U` 转换为交叉类型。

```ts [Source]
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? { [K in keyof I]: I[K]; } : never
```

## `FirstParam<T, K>`

若对象 `T` 在键 `K` 处的类型为元组，则提取其首个元素类型。

```ts [Source]
export type FirstParam<T, K extends keyof T> = T[K] extends [infer P, ...any[]] ? P : never
```

## `FirstParameter<T>`

从函数类型中提取首个参数类型。

```ts [Source]
export type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : undefined
```

## `DeepPartial<T>`

递归将对象类型 `T` 的所有属性变为可选。

```ts [Source]
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
}
```

```ts [Example]
interface Src { a: { b: number } }
// R is { a?: { b?: number | undefined } | undefined }
type R = DeepPartial<Src>
```

## `GetObjectField<MaybeObject, Key>`

当 `MaybeObject` 为对象时，返回键 `Key` 对应的属性类型。

```ts [Source]
export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any> ? MaybeObject[Key] : never
```

## `StringOrVNode`

一个方便的类型，它代表一个可以是字符串、一个 VNode 对象，或一个返回 VNode 的函数。

```ts [Source]
export type StringOrVNode = string | VNode | (() => VNode)
```

## `Merge<T, U>`

合并两个对象类型，`U` 中的属性会覆盖 `T` 中的属性。

```ts [Source]
export type Merge<T, U> = Omit<T, keyof U> & U
```

## `IsPlainObject<T>`

判断类型 `T` 是否为纯对象类型。

```ts [Source]
export type IsPlainObject<T> = (T extends null | undefined ? never : T) extends Record<string, any> ? (T extends null | undefined ? never : T) extends any[] ? false : (T extends null | undefined ? never : T) extends (...args: any[]) => any ? false : (T extends null | undefined ? never : T) extends Date ? false : true : false
```

## `NestedKeys<T>`

提取对象的嵌套键，支持点语法路径。

```ts [Source]
export type NestedKeys<T, D extends number = 2> = [D] extends [never] ? never : { [K in keyof T & string]: IsPlainObject<T[K]> extends true ? K | `${K}.${NestedKeys<T[K] extends null | undefined ? never : T[K], Depth[D]>}` : K }[keyof T & string]
```

```ts [Example]
interface User {
  name: string
  address: {
    city: string
    country: string
  }
}
// Keys is 'name' | 'address' | 'address.city' | 'address.country'
type Keys = NestedKeys<User>
```

## `ObjectFieldKeys<T>`

提取对象中所有纯对象字段的键（包括嵌套的），支持点语法路径。

```ts [Source]
export type ObjectFieldKeys<T, D extends number = 2> = [D] extends [never] ? never : { [K in keyof T & string]: IsPlainObject<T[K]> extends true ? K | `${K}.${ObjectFieldKeys<T[K] extends null | undefined ? never : T[K], Depth[D]>}` : never }[keyof T & string]
```

## `NonObjectFieldKeys<T>`

提取对象中所有非对象字段的键。

```ts [Source]
export type NonObjectFieldKeys<T> = Exclude<NestedKeys<T>, ObjectFieldKeys<T>>
```

## `ArrayFieldKeys<T>`

提取对象中所有数组字段的键（包括嵌套的），支持点语法路径。

```ts [Source]
export type ArrayFieldKeys<T, D extends number = 2> = [D] extends [never] ? never : { [K in keyof T & string]: (T[K] extends null | undefined ? never : T[K]) extends any[] ? K : IsPlainObject<T[K]> extends true ? `${K}.${ArrayFieldKeys<T[K] extends null | undefined ? never : T[K], Depth[D]>}` : never }[keyof T & string]
```

## `GetFieldValue<T, P>`

根据路径字符串提取对象属性的类型。

```ts [Source]
export type GetFieldValue<T, P extends string> = P extends keyof T ? T[P] : P extends `${infer K}.${infer Rest}` ? K extends keyof T ? T[K] extends undefined ? undefined : GetFieldValue<NonNullable<T[K]>, Rest> : unknown : unknown
```

```ts [Example]
interface User {
  name: string
  tags: string[]
  profile: {
    bio: string
  }
}
// T1 is string[]
type T1 = GetFieldValue<User, 'tags'>
// T2 is string
type T2 = GetFieldValue<User, 'profile.bio'>
```

## Changelog

:commit-changelog{prefix="types"}
