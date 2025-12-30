---
title: normalizeUrl
description: 规范化 URL 路径。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `normalizeUrl`

规范化 URL 路径，移除多余斜杠，处理 `.` 和 `..` 路径。

### 用法

```ts
import { normalizeUrl } from '@movk/core'

normalizeUrl('https://example.com//api///users/')
// => 'https://example.com/api/users/'

normalizeUrl('https://example.com/api/../users')
// => 'https://example.com/users'

normalizeUrl('/api/./users/../posts')
// => '/api/posts'

// 保留查询字符串和哈希
normalizeUrl('https://example.com//api?query=1#hash')
// => 'https://example.com/api?query=1#hash'
```

### API

`normalizeUrl(url: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  规范化后的 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utils/url"}
