---
title: isValidUrl
description: 检查字符串是否为有效的 URL。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `isValidUrl`

检查给定的字符串是否为有效的 URL 格式。

### 用法

```ts
import { isValidUrl } from '@movk/core'

isValidUrl('https://example.com') // => true
isValidUrl('http://localhost:3000') // => true
isValidUrl('ftp://files.example.com') // => true
isValidUrl('not a url') // => false
isValidUrl('/path/to/page') // => false（相对路径不是有效 URL）
```

### API

`isValidUrl(url: string): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  要检查的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  是否为有效 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utils/url"}
