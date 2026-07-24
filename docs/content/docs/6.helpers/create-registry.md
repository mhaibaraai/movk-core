---
title: createRegistry
description: 创建按 id 索引实例的注册表，支持响应式存储与身份校验的注销句柄
seo:
  title: createRegistry
  description: Create an id-keyed instance registry with optional reactive storage and identity-checked disposal handles.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/createRegistry.ts
---

## 用法

`createRegistry` 函数创建按 id 索引实例的注册表，适用于跨组件树、跨路由访问实例的场景。

```ts
import { createRegistry } from '@movk/core'

const registry = createRegistry<MapInstance>()

registry.register('main', map)
registry.get('main') // MapInstance
registry.has('main') // true
registry.unregister('main') // true
```

### 注销句柄

`register` 返回的句柄按身份校验：只有当前值仍是本次注册的值时才删除。新旧实例交替期间（新实例先注册、旧实例后卸载），旧句柄不会误删新注册。

```ts
const disposeFirst = registry.register('main', first)
registry.register('main', second)

disposeFirst()
registry.get('main') // second，未被旧句柄误删
```

组件内直接把句柄交给作用域清理：

```ts
import { onScopeDispose } from 'vue'

const dispose = registry.register(id, instance)
onScopeDispose(dispose)
```

### 响应式模式

开启 `reactive` 后内部改用 `shallowReactive` 存储，`computed` 与 `watch` 能感知注册与注销。

```ts
const registry = createRegistry<DrawContext>({
  reactive: true,
  onDuplicate: id => console.warn(`"${id}" 已注册，后者接管`),
})

const draw = computed(() => registry.get(mapId))
const count = computed(() => registry.size)
```

`onDuplicate` 只用于告警，不改变「后者接管」的行为。

## API

### `createRegistry<T>(options?)`{lang="ts-type"}

创建按 id 索引实例的注册表。

### 参数

::field-group
  ::field{name="options" type="RegistryOptions"}
  注册表行为配置项。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="Registry<T>"}
  注册表实例。
  ::
::

### RegistryOptions

::field-group
  ::field{name="reactive" type="boolean"}
  是否使用 `shallowReactive` 存储，使 `computed`/`watch` 能感知注册与注销，默认 `false`。
  ::

  ::field{name="onDuplicate" type="(id: string) => void"}
  同一 id 重复注册时触发，用于告警。
  ::
::

### Registry

::field-group
  ::field{name="register" type="(id: string, value: T) => () => void"}
  注册实例，返回按身份校验的注销句柄。
  ::

  ::field{name="unregister" type="(id: string) => boolean"}
  按 id 注销，返回是否确实删除了条目。
  ::

  ::field{name="get" type="(id: string) => T | undefined"}
  按 id 读取实例。
  ::

  ::field{name="has" type="(id: string) => boolean"}
  判断 id 是否已注册。
  ::

  ::field{name="keys" type="() => string[]"}
  已注册的 id 列表，按注册先后排列。
  ::

  ::field{name="clear" type="() => void"}
  清空注册表。
  ::

  ::field{name="size" type="number"}
  已注册条目数。
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
