---
title: joinUrl
description: 连接 URL 路径片段
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`joinUrl` 函数用于连接 URL 路径片段。

```ts
import { joinUrl } from '@movk/core'

joinUrl('https://example.com', 'api', 'users')
// 'https://example.com/api/users'

joinUrl('https://example.com/', '/api/', '/users/')
// 'https://example.com/api/users/'

joinUrl('/api', 'users', '123')
// '/api/users/123'
```

## API

### `joinUrl(...parts)`{lang="ts-type"}

连接 URL 路径片段。

### 参数

::field-group
  ::field{name="parts" type="string[]" required}
  URL 片段。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  连接后的 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
