---
title: Storage
description: Storage type definitions related to the useAppStorage composable.
seo:
  title: Storage Types
  description: Reference for @movk/core storage types used by useAppStorage, including storage kind, configuration input, and the composable return shape.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/types/storage.ts
---

## `StorageType`

A string literal type representing browser storage types.

```ts [Source]
export type StorageType = 'localStorage' | 'sessionStorage'
```

```ts [Example]
const storage: StorageType = 'localStorage'
```

## `StorageConfig<T>`

The full configuration object type for the `useAppStorage` function.

```ts [Source]
export interface StorageConfig<T = unknown> {
  key: string
  defaultValue: T
  prefix: string
  storage: StorageType
}
```

### Properties

- `key`: The unique key name for the storage entry
- `defaultValue`: The default value
- `prefix`: Key name prefix used to create a namespace
- `storage`: Storage type, either `localStorage` or `sessionStorage`

## `StorageConfigInput<T>`

The input configuration object type for the `useAppStorage` function, with `prefix` and `storage` as optional parameters.

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
  storage: 'localStorage', // optional
  prefix: 'app' // optional
}

const storage = useAppStorage(config)
```

## `AppStorageReturn<T>`

The return object interface for the `useAppStorage` function.

```ts [Source]
export interface AppStorageReturn<T> {
  state: Ref<T>
  getItem: () => T
  setItem: (value: T) => void
  removeItem: () => void
}
```

### Properties

- `state`: Reactive ref synchronized with storage data
- `getItem`: Reads data from storage
- `setItem`: Sets a new value to storage
- `removeItem`: Removes the entry from storage

```ts [Example]
import type { AppStorageReturn } from '@movk/core'
import { useAppStorage } from '@movk/core'

const storage: AppStorageReturn<string> = useAppStorage({
  key: 'my-key',
  defaultValue: 'hello'
})

// Use reactive state
console.log(storage.state.value) // 'hello'

// Update value
storage.setItem('world')

// Read value
const value = storage.getItem() // 'world'

// Remove entry
storage.removeItem()
```

## Changelog

:commit-changelog{prefix="types"}
