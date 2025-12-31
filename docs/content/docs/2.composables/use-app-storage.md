---
title: useAppStorage
description: 一个用于管理 localStorage 和 sessionStorage 的组合式函数，提供类型安全的存储操作。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useAppStorage.ts
---

## 用法

`useAppStorage` 是一个强大的组合式函数，它基于 `@vueuse/core` 的 `useStorage`，可以安全、轻松地管理浏览器的 `localStorage` 或 `sessionStorage`。

它会自动处理数据的序列化和反序列化，并提供响应式的状态管理。

```vue
<script setup lang="ts">
import { useAppStorage } from '@movk/core'

// 定义用户偏好设置的类型
interface UserPreferences {
  theme: 'light' | 'dark'
  language: string
  notifications: {
    email: boolean
    push: boolean
  }
}

// 创建一个响应式的存储实例
const { state, setItem, getItem, removeItem } = useAppStorage<UserPreferences>({
  key: 'user-preferences',
  defaultValue: {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: false
    }
  },
  storage: 'localStorage', // or 'sessionStorage'
  prefix: 'my-app'
})

// 在模板或脚本中直接使用响应式状态
console.log(state.value.theme) // 'light'

// 更新数据
function toggleTheme() {
  setItem({
    ...state.value,
    theme: state.value.theme === 'light' ? 'dark' : 'light'
  })
}

// 更新部分数据
function enablePushNotifications() {
  setItem({
    ...state.value,
    notifications: {
      ...state.value.notifications,
      push: true
    }
  })
}
</script>

<template>
  <div>
    <p>当前主题: {{ state.theme }}</p>
    <button @click="toggleTheme">
      切换主题
    </button>
    <p>推送通知: {{ state.notifications.push ? '已启用' : '已禁用' }}</p>
    <button @click="enablePushNotifications">
      启用推送通知
    </button>
  </div>
</template>
```

::note
当从存储中读取的数据无法被正确解析时，`useAppStorage` 会自动使用 `defaultValue` 并将警告信息打印到控制台。
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
  当存储中没有有效值时使用的默认值。
  ::

  ::field{name="storage" type="'localStorage' | 'sessionStorage'"}
  要使用的浏览器存储类型。默认为 `localStorage`。
  ::

  ::field{name="prefix" type="string"}
  添加到 `key` 前面的可选前缀，用于创建命名空间，避免键名冲突。最终的键将是 `prefix:key`。默认为 `movk`。
  ::
::

### 返回值

`useAppStorage` 返回一个包含以下属性的对象:

::field-group
  ::field{name="state" type="Ref<T>"}
  一个响应式的 ref，其值与存储的数据保持同步。您可以直接读取或修改它。
  ::

  ::field{name="getItem" type="() => T"}
  一个函数，用于从存储中读取并返回数据。如果数据无法解析，将返回 `defaultValue`。
  ::

  ::field{name="setItem" type="(value: T) => void"}
  一个函数，用于设置新的值。新值会被序列化后存储。
  ::

  ::field{name="removeItem" type="() => void"}
  一个函数，用于从存储中移除该项。
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
