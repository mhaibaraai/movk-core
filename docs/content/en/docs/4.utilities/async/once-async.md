---
title: onceAsync
description: Wrap an async function so it runs once, concurrent callers share one promise, and a rejection clears the cache for retry.
seo:
  title: onceAsync
  description: Wrap an async function so it runs once, concurrent callers share one promise, and a rejection clears the cache for retry.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/onceAsync.ts
navigation.badge: v1.5.0
---

## Usage

`onceAsync` returns a new function: the first call runs the original function, concurrent calls reuse the same promise, and a successful result is cached. A rejection clears the cache so the next call runs again.

```ts
import { onceAsync } from '@movk/core'

// Load an optional dependency only once
const loadPmtiles = onceAsync(() => import('pmtiles'))

const [a, b] = await Promise.all([loadPmtiles(), loadPmtiles()])
a === b // true

// One-time registration
const register = onceAsync(async () => {
  const { Protocol } = await loadPmtiles()
  addProtocol('pmtiles', new Protocol().tile)
})
```

## API

### `onceAsync(fn)`{lang="ts-type"}

Wrap an async function so it runs once and shares its result.

### Parameters

::field-group
  ::field{name="fn" type="() => Promise<T>" required}
  Async function to wrap; errors thrown synchronously are returned as a rejection too.
  ::
::

### Returns

::field-group
  ::field{name="Returns" type="() => Promise<T>"}
  A function that returns the shared promise.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
