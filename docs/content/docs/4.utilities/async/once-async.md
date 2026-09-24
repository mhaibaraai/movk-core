---
title: onceAsync
description: 包装异步函数使其只执行一次，并发共享结果，失败后允许重试
seo:
  title: onceAsync
  description: Wrap an async function so it runs once, concurrent callers share one promise, and a rejection clears the cache for retry.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/onceAsync.ts
navigation.badge: v1.5.0
---

## 用法

`onceAsync` 返回一个新函数：首次调用执行原函数，并发调用复用同一个 Promise，成功后缓存结果；失败时清除缓存，下次调用重新执行。

```ts
import { onceAsync } from '@movk/core'

// 可选依赖只加载一次
const loadPmtiles = onceAsync(() => import('pmtiles'))

const [a, b] = await Promise.all([loadPmtiles(), loadPmtiles()])
a === b // true

// 一次性注册
const register = onceAsync(async () => {
  const { Protocol } = await loadPmtiles()
  addProtocol('pmtiles', new Protocol().tile)
})
```

## API

### `onceAsync(fn)`{lang="ts-type"}

包装异步函数，使其只执行一次并共享结果。

### 参数

::field-group
  ::field{name="fn" type="() => Promise<T>" required}
  待包装的异步函数，同步抛出的错误同样以 reject 返回。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="() => Promise<T>"}
  返回共享 Promise 的函数。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
