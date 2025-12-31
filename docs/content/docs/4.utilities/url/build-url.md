---
title: buildUrl
description: 构建完整 URL
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`buildUrl` 函数用于构建完整 URL。

```ts
import { buildUrl } from '@movk/core'

buildUrl('https://example.com', '/api/users', { page: 1, limit: 10 })
// 'https://example.com/api/users?page=1&limit=10'

buildUrl('https://example.com', '/page', null, 'section')
// 'https://example.com/page#section'

buildUrl('https://example.com', '/api', { ids: [1, 2, 3] })
// 'https://example.com/api?ids=1&ids=2&ids=3'
```

## API

### `buildUrl(base, path?, query?, hash?)`{lang="ts-type"}

构建完整 URL。

### 参数

::field-group
  ::field{name="base" type="string" required}
  基础 URL。
  ::

  ::field{name="path" type="string"}
  路径部分。
  ::

  ::field{name="query" type="QueryParams | null"}
  查询参数。
  ::

  ::field{name="hash" type="string"}
  哈希部分。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  完整 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
