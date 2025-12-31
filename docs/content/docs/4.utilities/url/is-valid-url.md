---
title: isValidUrl
description: 检查字符串是否为有效的 URL
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`isValidUrl` 函数用于检查字符串是否为有效的 URL。

```ts
import { isValidUrl } from '@movk/core'

isValidUrl('https://example.com') // true
isValidUrl('not a url') // false
isValidUrl('ftp://files.example.com') // true
```

## API

### `isValidUrl(url)`{lang="ts-type"}

检查字符串是否为有效的 URL。

### 参数

::field-group
  ::field{name="url" type="string" required}
  要检查的字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  是否为有效 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
