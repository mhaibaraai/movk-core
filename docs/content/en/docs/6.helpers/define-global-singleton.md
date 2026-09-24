---
title: defineGlobalSingleton
description: Define a globalThis singleton keyed by Symbol.for so duplicated bundle copies of a library still share one state.
seo:
  title: defineGlobalSingleton
  description: Define a globalThis singleton keyed by Symbol.for so duplicated bundle copies of a library still share one state.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/defineGlobalSingleton.ts
navigation.badge: v1.5.0
---

## Usage

`defineGlobalSingleton` stores an instance on `globalThis` under `Symbol.for(key)`: the first call runs the factory and later calls return the existing instance. When a library is bundled more than once (for example a Nuxt module and a Vite plugin build), every copy still shares the same state.

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
`key` is visible across the whole page, so prefix it with your package name (such as `'my-lib:config'`) to avoid collisions.
::

## API

### `defineGlobalSingleton(key, factory)`{lang="ts-type"}

Define a cross-copy singleton on `globalThis`.

### Parameters

::field-group
  ::field{name="key" type="string" required}
  Globally unique key, turned into a symbol with `Symbol.for`.
  ::

  ::field{name="factory" type="() => T" required}
  Factory that creates the instance on the first call.
  ::
::

### Returns

::field-group
  ::field{name="Returns" type="T"}
  The singleton instance.
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
