---
title: buildUrl
description: 构建完整 URL。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `buildUrl`

从基础 URL、路径、查询参数和哈希构建完整 URL。

### 用法

```ts
import { buildUrl } from '@movk/core'

buildUrl('https://example.com', '/api/users', { page: 1, limit: 10 })
// => 'https://example.com/api/users?page=1&limit=10'

buildUrl('https://example.com', '/page', null, 'section')
// => 'https://example.com/page#section'

// 支持数组查询参数
buildUrl('https://example.com', '/api', { ids: [1, 2, 3] })
// => 'https://example.com/api?ids=1&ids=2&ids=3'
```

### API

`buildUrl(base: string, path?: string, query?: QueryParams | null, hash?: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="base" type="string" required}
  基础 URL。
  ::
  ::field{name="path" type="string"}
  路径部分。
  ::
  ::field{name="query" type="QueryParams | null"}
  查询参数对象。
  ::
  ::field{name="hash" type="string"}
  哈希部分（可带或不带 `#`）。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  完整 URL。
  ::
::

## 相关

- [joinUrl](/docs/utils/url/join-url) - 连接路径片段

## Changelog

:commit-changelog{prefix="utils/url"}
