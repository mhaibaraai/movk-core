---
title: normalizeUrl
description: 规范化 URL 路径(移除多余斜杠、处理 . 和 ..)
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`normalizeUrl` 函数用于规范化 URL 路径(移除多余斜杠、处理 `.` 和 `..`)。

```ts
import { normalizeUrl } from '@movk/core'

normalizeUrl('https://example.com//api///users/')
// 'https://example.com/api/users/'

normalizeUrl('https://example.com/api/../users')
// 'https://example.com/users'

normalizeUrl('/api/./users/../posts')
// '/api/posts'
```

## API

### `normalizeUrl(url)`{lang="ts-type"}

规范化 URL 路径。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  规范化后的 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
