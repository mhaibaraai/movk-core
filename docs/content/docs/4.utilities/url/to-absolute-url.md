---
title: toAbsoluteUrl
description: 将相对 URL 转换为绝对 URL
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`toAbsoluteUrl` 函数用于将相对 URL 转换为绝对 URL。

```ts
import { toAbsoluteUrl } from '@movk/core'

toAbsoluteUrl('/path', 'https://example.com')
// 'https://example.com/path'

toAbsoluteUrl('../other', 'https://example.com/api/users')
// 'https://example.com/api/other'

toAbsoluteUrl('https://other.com', 'https://example.com')
// 'https://other.com' (已是绝对URL,不变)
```

## API

### `toAbsoluteUrl(relativeUrl, baseUrl)`{lang="ts-type"}

将相对 URL 转换为绝对 URL。

### 参数

::field-group
  ::field{name="relativeUrl" type="string" required}
  相对 URL。
  ::

  ::field{name="baseUrl" type="string" required}
  基础 URL。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  绝对 URL,转换失败返回原字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
