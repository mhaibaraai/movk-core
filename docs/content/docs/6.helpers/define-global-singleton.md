---
title: defineGlobalSingleton
description: 定义挂在 globalThis 上的跨副本单例，多份打包产物共享同一状态
seo:
  title: defineGlobalSingleton
  description: Define a globalThis singleton keyed by Symbol.for so duplicated bundle copies of a library still share one state.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/defineGlobalSingleton.ts
navigation.badge: v1.5.0
---

## 用法

`defineGlobalSingleton` 以 `Symbol.for(key)` 为键在 `globalThis` 上存取实例：首次调用执行工厂，之后直接返回已有实例。同一个库被多个构建产物各自打包（如 Nuxt 模块与 Vite 插件双构建）时，各副本仍共享同一份状态。

```ts
import { defineGlobalSingleton } from '@movk/core'

interface Config {
  token?: string
}

const config = defineGlobalSingleton<Config>('my-lib:config', () => ({}))

export function setToken(token: string) {
  config.token = token
}
```

::tip
`key` 在整个页面内全局可见，建议带上包名前缀（如 `'my-lib:config'`）避免冲突。
::

## API

### `defineGlobalSingleton(key, factory)`{lang="ts-type"}

定义挂在 `globalThis` 上的跨副本单例。

### 参数

::field-group
  ::field{name="key" type="string" required}
  全局唯一键，经 `Symbol.for` 转为 symbol。
  ::

  ::field{name="factory" type="() => T" required}
  首次调用时创建实例的工厂。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="T"}
  单例实例。
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
