---
title: useAppStorage
description: 一个用于管理 localStorage 和 sessionStorage 的组合式函数，内置了 Zod schema 验证。
---

## 用法

`useAppStorage` 是一个强大的组合式函数，它结合了 `@vueuse/core` 的 `useStorage` 和 `Zod` 的验证能力，可以安全、轻松地管理浏览器的 `localStorage` 或 `sessionStorage`。

它会自动处理数据的序列化、反序列化以及基于您提供的 `Zod` schema 的验证。

```vue
<script setup lang="ts">
import { useAppStorage } from '@movk/core'
import { z } from 'zod'

// 1. 定义数据的 Zod schema
const userPrefsSchema = z.object({
  theme: z.enum(['light', 'dark']).default('light'),
  language: z.string().default('en'),
  notifications: z.object({
    email: z.boolean().default(true),
    push: z.boolean().default(false)
  })
})

// 2. 创建一个响应式的、经过验证的存储实例
const { state, setItem, getItem, removeItem } = useAppStorage({
  key: 'user-preferences',
  defaultValue: {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: false
    }
  },
  schema: userPrefsSchema,
  storage: 'localStorage', // or 'sessionStorage'
  prefix: 'my-app'
})

// 3. 在模板或脚本中直接使用响应式状态
console.log(state.value.theme) // 'light'

// 4. 安全地更新数据（会自动进行验证）
function toggleTheme() {
  setItem({
    ...state.value,
    theme: state.value.theme === 'light' ? 'dark' : 'light'
  })
}

// 5. 尝试设置无效数据将被阻止
function setInvalidData() {
  setItem({
    ...state.value,
    theme: 'system' // 'system' is not in the enum, so this update will be ignored.
  })
  console.log(state.value.theme) // 仍然是 'dark' 或 'light'
}
</script>

<template>
  <div>
    <p>当前主题: {{ state.theme }}</p>
    <button @click="toggleTheme">切换主题</button>
    <button @click="setInvalidData">设置无效主题</button>
  </div>
</template>
```

::note
当从存储中读取的数据无法通过 `schema` 验证时，`useAppStorage` 会自动使用 `defaultValue` 并将警告信息打印到控制台。同样，当尝试 `setItem` 一个无效值时，操作将被中止，并打印警告。
::

## API

### `useAppStorage(config)`{lang="ts-type"}

创建并返回一个存储实例。

#### `config` 参数

::field-group
  ::field{name="key" type="string" required}
  存储项的唯一键名。
  ::

  ::field{name="defaultValue" type="T" required}
  当存储中没有有效值时使用的默认值。`T` 的类型应与 `schema` 匹配。
  ::

  ::field{name="schema" type="z.ZodType<T>" required}
  用于验证数据的 Zod schema。
  ::

  ::field{name="storage" type="'localStorage' | 'sessionStorage'"}
  要使用的浏览器存储类型。默认为 `localStorage`。
  ::

  ::field{name="prefix" type="string"}
  添加到 `key` 前面的可选前缀，用于创建命名空间，避免键名冲突。最终的键将是 `prefix:key`。
  ::
::

### 返回值

`useAppStorage` 返回一个包含以下属性的对象：

::field-group
  ::field{name="state" type="Ref<T>"}
  一个响应式的 ref，其值与存储的数据保持同步。您可以直接读取或修改它。
  ::

  ::field{name="getItem" type="() => T"}
  一个函数，用于从存储中读取并返回经过验证的数据。
  ::

  ::field{name="setItem" type="(value: T) => void"}
  一个函数，用于设置新的值。在存入之前，新值会经过 `schema` 验证。
  ::

  ::field{name="removeItem" type="() => void"}
  一个函数，用于从存储中移除该项。
  ::
::
