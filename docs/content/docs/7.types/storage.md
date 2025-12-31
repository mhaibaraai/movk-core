---
title: Storage
description: 与 useAppStorage 组合式函数相关的存储类型定义。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/storage.ts
---

## `StorageType`

表示浏览器存储类型的字符串字面量类型。

```ts [Source]
export type StorageType = 'localStorage' | 'sessionStorage'
```

```ts [Example]
const storage: StorageType = 'localStorage'
```

## `StorageConfig<T>`

`useAppStorage` 函数的完整配置对象类型。

```ts [Source]
export interface StorageConfig<T = unknown> {
  key: string
  defaultValue: T
  prefix: string
  storage: StorageType
}
```

### 属性说明

- `key`: 存储项的唯一键名
- `defaultValue`: 默认值
- `prefix`: 键名前缀，用于创建命名空间
- `storage`: 存储类型，`localStorage` 或 `sessionStorage`

## `StorageConfigInput<T>`

`useAppStorage` 函数的输入配置对象类型，`prefix` 和 `storage` 为可选参数。

```ts [Source]
export type StorageConfigInput<T = unknown> = Partial<Omit<StorageConfig<T>, 'key' | 'defaultValue'>> & {
  key: string
  defaultValue: T
}
```

```ts [Example]
import type { StorageConfigInput } from '@movk/core'
import { useAppStorage } from '@movk/core'

const config: StorageConfigInput<{ theme: string }> = {
  key: 'user-preferences',
  defaultValue: { theme: 'light' },
  storage: 'localStorage', // 可选
  prefix: 'app' // 可选
}

const storage = useAppStorage(config)
```

## `AppStorageReturn<T>`

`useAppStorage` 函数的返回对象接口。

```ts [Source]
export interface AppStorageReturn<T> {
  state: Ref<T>
  getItem: () => T
  setItem: (value: T) => void
  removeItem: () => void
}
```

### 属性说明

- `state`: 响应式引用，与存储数据同步
- `getItem`: 从存储中读取数据
- `setItem`: 设置新值到存储
- `removeItem`: 从存储中移除项

```ts [Example]
import type { AppStorageReturn } from '@movk/core'
import { useAppStorage } from '@movk/core'

const storage: AppStorageReturn<string> = useAppStorage({
  key: 'my-key',
  defaultValue: 'hello'
})

// 使用响应式状态
console.log(storage.state.value) // 'hello'

// 更新值
storage.setItem('world')

// 读取值
const value = storage.getItem() // 'world'

// 移除项
storage.removeItem()
```

## Changelog

:commit-changelog{prefix="types"}
