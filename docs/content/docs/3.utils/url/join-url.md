---
title: joinUrl
description: 连接 URL 路径片段。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `joinUrl`

连接多个 URL 路径片段，自动处理斜杠。

### 用法

```ts
import { joinUrl } from '@movk/core'

joinUrl('https://example.com', 'api', 'users')
// => 'https://example.com/api/users'

joinUrl('https://example.com/', '/api/', '/users/')
// => 'https://example.com/api/users/'

joinUrl('/api', 'users', '123')
// => '/api/users/123'
```

### API

`joinUrl(...parts: string[]): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="parts" type="string[]" required}
  URL 片段。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  连接后的 URL。
  ::
::

## 相关

- [buildUrl](/docs/utils/url/build-url) - 构建完整 URL

## Changelog

:commit-changelog{prefix="utils/url"}
