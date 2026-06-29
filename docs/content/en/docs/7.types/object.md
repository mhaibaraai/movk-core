---
title: Object
description: A collection of advanced utility types for manipulating and transforming objects at the type level.
seo:
  title: Object Types
  description: Reference for @movk/core object utility types covering keys, fields, nested paths, pick and omit, deep partial, and deep merge transformations.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/object
---

## `OmitByKey<T, K>`

Omits key `K` from object type `T` by key name.

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

Picks key `K` from object type `T` by key name.

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

Renames keys of object type `T` based on the mapping table `Mapping`.

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

Marks key `K` of object type `T` as required.

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

Marks key `K` of object type `T` as optional.

```ts [Source]
export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```

```ts [Example]
interface User { id: string, name: string }
// R['name'] is optional
type R = PartialByKeys<User, 'name'>
```

## `ReadonlyByKeys<T, K>`

Marks key `K` of object type `T` as readonly.

```ts [Source]
export type ReadonlyByKeys<T, K extends keyof T> = T & {
  readonly [P in K]: T[P];
}
```

## `MutableByKeys<T, K>`

Removes the readonly constraint from key `K` of object type `T`.

```ts [Source]
export type MutableByKeys<T, K extends keyof T> = {
  -readonly [P in K]: T[P];
} & Omit<T, K>
```

## `UnionToIntersection<U>`

Converts a union type `U` to an intersection type.

```ts [Source]
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? { [K in keyof I]: I[K]; } : never
```

## `FirstParam<T, K>`

If the type at key `K` of object `T` is a tuple, extracts the type of its first element.

```ts [Source]
export type FirstParam<T, K extends keyof T> = T[K] extends [infer P, ...any[]] ? P : never
```

## `FirstParameter<T>`

Extracts the type of the first parameter from a function type.

```ts [Source]
export type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : undefined
```

## `DeepPartial<T>`

Recursively makes all properties of object type `T` optional.

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

When `MaybeObject` is an object, returns the property type at key `Key`.

```ts [Source]
export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any> ? MaybeObject[Key] : never
```

## `StringOrVNode`

A convenience type representing a value that can be a string, a VNode object, or a function returning a VNode.

```ts [Source]
export type StringOrVNode = string | VNode | (() => VNode)
```

## `Merge<T, U>`

Merges two object types, with properties from `U` overriding those in `T`.

```ts [Source]
export type Merge<T, U> = Omit<T, keyof U> & U
```

## `IsPlainObject<T>`

Determines whether type `T` is a plain object type.

```ts [Source]
export type IsPlainObject<T> = (T extends null | undefined ? never : T) extends Record<string, any> ? (T extends null | undefined ? never : T) extends any[] ? false : (T extends null | undefined ? never : T) extends (...args: any[]) => any ? false : (T extends null | undefined ? never : T) extends Date ? false : true : false
```

## `NestedKeys<T>`

Extracts nested keys from an object, supporting dot-notation paths.

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

Extracts the keys of all plain object fields from an object (including nested ones), supporting dot-notation paths.

```ts [Source]
export type ObjectFieldKeys<T, D extends number = 2> = [D] extends [never] ? never : { [K in keyof T & string]: IsPlainObject<T[K]> extends true ? K | `${K}.${ObjectFieldKeys<T[K] extends null | undefined ? never : T[K], Depth[D]>}` : never }[keyof T & string]
```

## `NonObjectFieldKeys<T>`

Extracts the keys of all non-object fields from an object.

```ts [Source]
export type NonObjectFieldKeys<T> = Exclude<NestedKeys<T>, ObjectFieldKeys<T>>
```

## `ArrayFieldKeys<T>`

Extracts the keys of all array fields from an object (including nested ones), supporting dot-notation paths.

```ts [Source]
export type ArrayFieldKeys<T, D extends number = 2> = [D] extends [never] ? never : { [K in keyof T & string]: (T[K] extends null | undefined ? never : T[K]) extends any[] ? K : IsPlainObject<T[K]> extends true ? `${K}.${ArrayFieldKeys<T[K] extends null | undefined ? never : T[K], Depth[D]>}` : never }[keyof T & string]
```

## `GetFieldValue<T, P>`

Extracts the property type of an object by path string.

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

## `Prettify<T>`

Forces TypeScript to flatten type aliases so that IntelliSense can enumerate all properties of an object in full.

Commonly used to eliminate the "collapsed" display of intersection types (`A & B`), making the IDE hover show the merged property list directly.

```ts [Source]
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
```

```ts [Example]
import type { Prettify } from '@movk/core'

type A = { a: number } & { b: string }
// IDE hover shows "{ a: number } & { b: string }"

type B = Prettify<A>
// IDE hover shows "{ a: number; b: string }"
```

## `KnownKeys<T>`

Extracts all literal keys from an object type, filtering out index signatures (`string`, `number`, `symbol`).

Applies to concrete object types. Commonly used in generic factory methods to precisely enumerate registered key names, preventing `string` index pollution of IntelliSense completions.

::note
When TypeScript's `keyof T` is itself `string` (e.g. a pure index-signature type `{ [key: string]: ... }`), `KnownKeys<T>` returns `never`. This type is only effective for concrete object types with literal key names.
::

```ts [Source]
export type KnownKeys<T> = {
  [K in keyof T]-?: string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K
}[keyof T]
```

```ts [Example]
import type { KnownKeys } from '@movk/core'

// Concrete object type: returns all literal keys
interface Controls { text: string, select: number }
type K = KnownKeys<Controls> // 'text' | 'select'

// Pure index-signature type: returns never
interface Indexed { [key: string]: string }
type L = KnownKeys<Indexed> // never
```

## Changelog

:commit-changelog{prefix="types/object"}
