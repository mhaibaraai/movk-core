---
title: useAppStorage
description: A Vue composable that manages reactive localStorage or sessionStorage state with type-safe defaults, serialization, and cross-tab sync.
seo:
  title: useAppStorage
  description: A Vue composable that manages reactive localStorage or sessionStorage state with type-safe defaults, serialization, and cross-tab sync.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useAppStorage.ts
---

## Usage

`useAppStorage` is a powerful composable built on top of `@vueuse/core`'s `useStorage`, enabling safe and easy management of the browser's `localStorage` or `sessionStorage`.

It automatically handles data serialization and deserialization, and provides reactive state management.

```vue
<script setup lang="ts">
import { useAppStorage } from '@movk/core'

// Define the type for user preferences
interface UserPreferences {
  theme: 'light' | 'dark'
  language: string
  notifications: {
    email: boolean
    push: boolean
  }
}

// Create a reactive storage instance
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

// Use the reactive state directly in the template or script
console.log(state.value.theme) // 'light'

// Update data
function toggleTheme() {
  setItem({
    ...state.value,
    theme: state.value.theme === 'light' ? 'dark' : 'light'
  })
}

// Update partial data
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
    <p>Current theme: {{ state.theme }}</p>
    <button @click="toggleTheme">
      Toggle theme
    </button>
    <p>Push notifications: {{ state.notifications.push ? 'Enabled' : 'Disabled' }}</p>
    <button @click="enablePushNotifications">
      Enable push notifications
    </button>
  </div>
</template>
```

::note
When data read from storage cannot be parsed correctly, `useAppStorage` automatically falls back to `defaultValue` and prints a warning to the console.
::

## API

### `useAppStorage(config)`{lang="ts-type"}

Creates and returns a storage instance.

#### `config` Parameters

::field-group
  ::field{name="key" type="string" required}
  The unique key name for the storage item.
  ::

  ::field{name="defaultValue" type="T" required}
  The default value to use when no valid value exists in storage.
  ::

  ::field{name="storage" type="'localStorage' | 'sessionStorage'"}
  The browser storage type to use. Defaults to `localStorage`.
  ::

  ::field{name="prefix" type="string"}
  An optional prefix prepended to the `key` to create a namespace and avoid key conflicts. The final key will be `prefix:key`. Defaults to `movk`.
  ::
::

### Returns

`useAppStorage` returns an object with the following properties:

::field-group
  ::field{name="state" type="Ref<T>"}
  A reactive ref whose value stays in sync with the stored data. You can read or modify it directly.
  ::

  ::field{name="getItem" type="() => T"}
  A function that reads and returns data from storage. Returns `defaultValue` if the data cannot be parsed.
  ::

  ::field{name="setItem" type="(value: T) => void"}
  A function that sets a new value. The new value is serialized before being stored.
  ::

  ::field{name="removeItem" type="() => void"}
  A function that removes the item from storage.
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
