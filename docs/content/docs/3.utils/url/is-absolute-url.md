---
title: isAbsoluteUrl
description: 检查 URL 是否为绝对路径。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `isAbsoluteUrl`

检查 URL 是否为绝对路径（包含协议或协议相对 URL）。

### 用法

```ts
import { isAbsoluteUrl } from '@movk/core'

isAbsoluteUrl('https://example.com') // => true
isAbsoluteUrl('//example.com/path') // => true（协议相对 URL）
isAbsoluteUrl('/path/to/page') // => false
isAbsoluteUrl('./page') // => false
isAbsoluteUrl('../page') // => false
```

### API

`isAbsoluteUrl(url: string): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  要检查的 URL。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  是否为绝对路径。
  ::
::

## 相关

- [isRelativeUrl](/docs/utils/url/is-relative-url) - 检查是否为相对路径

## Changelog

:commit-changelog{prefix="utils/url"}
