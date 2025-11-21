---
title: Storage
description: 与 useAppStorage 组合式函数相关的类型和 Zod schema。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/storage.ts
---

## `StorageType`

一个表示存储类型的字符串字面量类型。

```ts [Source]
export type StorageType = 'localStorage' | 'sessionStorage'
```

```ts [Example]
let storage: StorageType = 'localStorage'
```

## `StorageConfig<T>`

`useAppStorage` 函数的完整配置对象的推断类型。

```ts [Source]
export type StorageConfig<T = unknown> = z.infer<ReturnType<typeof createStorageConfigSchema<T>>>
```

## `StorageConfigInput<T>`

`useAppStorage` 函数的输入配置对象的类型。

```ts [Source]
export type StorageConfigInput<T = unknown> = z.input<ReturnType<typeof createStorageConfigSchema<T>>>
```

## `AppStorageReturn<T>`

`useAppStorage` 函数的返回对象的接口。

```ts [Source]
export interface AppStorageReturn<T> {
  state: Ref<T>
  getItem: () => T
  setItem: (value: T) => void
  removeItem: () => void
}
```

```ts [Example]
import { useAppStorage } from '@movk/core'
import { z } from 'zod'

const { state, getItem, setItem, removeItem }: AppStorageReturn<string> = useAppStorage({
  key: 'my-key',
  schema: z.string(),
  defaultValue: 'hello'
})
```

## `createStorageConfigSchema`

一个创建用于验证 `useAppStorage` 配置的 Zod schema 的工厂函数。

```ts [Source]
export function createStorageConfigSchema<T = unknown>(schema: z.ZodType<T>) {
  return z.object({
    key: z.string().min(1, { message: 'Key cannot be empty' }),
    schema: z.custom<z.ZodType<T>>(
      val => val instanceof z.ZodType,
      { message: 'Schema must be a valid Zod schema' },
    ),
    defaultValue: z.custom<T>(
      val => schema.safeParse(val).success,
      { message: 'Default value must match the provided schema' },
    ),
    prefix: z.string().default('movk'),
    storage: StorageTypeSchema.default('localStorage'),
  })
}
```
