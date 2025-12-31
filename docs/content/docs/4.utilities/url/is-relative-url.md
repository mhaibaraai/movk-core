---
title: isRelativeUrl
description: 检查 URL 是否为相对路径
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`isRelativeUrl` 函数用于检查 URL 是否为相对路径。

```ts
import { isRelativeUrl } from '@movk/core'

isRelativeUrl('/path/to/page') // true
isRelativeUrl('./page') // true
isRelativeUrl('../page') // true
isRelativeUrl('https://example.com') // false
```

## API

### `isRelativeUrl(url)`{lang="ts-type"}

检查 URL 是否为相对路径。

### 参数

::field-group
  ::field{name="url" type="string" required}
  要检查的 URL。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  是否为相对路径。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
