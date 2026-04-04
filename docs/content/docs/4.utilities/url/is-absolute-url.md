---
title: isAbsoluteUrl
description: 检查字符串是否为绝对 URL（含协议前缀），可用于区分相对路径和完整 URL。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`isAbsoluteUrl` 函数用于检查 URL 是否为绝对路径。

```ts
import { isAbsoluteUrl } from '@movk/core'

isAbsoluteUrl('https://example.com') // true
isAbsoluteUrl('/path/to/page') // false
isAbsoluteUrl('//example.com/path') // true (协议相对)
```

## API

### `isAbsoluteUrl(url)`{lang="ts-type"}

检查 URL 是否为绝对路径。

### 参数

::field-group
  ::field{name="url" type="string" required}
  要检查的 URL。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  是否为绝对路径。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
