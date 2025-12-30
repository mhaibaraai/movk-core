---
title: toAbsoluteUrl
description: 将相对 URL 转换为绝对 URL。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `toAbsoluteUrl`

将相对 URL 转换为绝对 URL。

### 用法

```ts
import { toAbsoluteUrl } from '@movk/core'

toAbsoluteUrl('/path', 'https://example.com')
// => 'https://example.com/path'

toAbsoluteUrl('../other', 'https://example.com/api/users')
// => 'https://example.com/other'

// 已是绝对 URL 则保持不变
toAbsoluteUrl('https://other.com', 'https://example.com')
// => 'https://other.com/'
```

### API

`toAbsoluteUrl(relativeUrl: string, baseUrl: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="relativeUrl" type="string" required}
  相对 URL。
  ::
  ::field{name="baseUrl" type="string" required}
  基础 URL。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  绝对 URL，转换失败返回原字符串。
  ::
::

## 相关

- [getRelativePath](/docs/utils/url/get-relative-path) - 获取相对路径

## Changelog

:commit-changelog{prefix="utils/url"}
