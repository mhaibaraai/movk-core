---
title: isRelativeUrl
description: 检查 URL 是否为相对路径。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `isRelativeUrl`

检查 URL 是否为相对路径。

### 用法

```ts
import { isRelativeUrl } from '@movk/core'

isRelativeUrl('/path/to/page') // => true
isRelativeUrl('./page') // => true
isRelativeUrl('../page') // => true
isRelativeUrl('page.html') // => true
isRelativeUrl('https://example.com') // => false
```

### API

`isRelativeUrl(url: string): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  要检查的 URL。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  是否为相对路径。
  ::
::

## 相关

- [isAbsoluteUrl](/docs/utils/url/is-absolute-url) - 检查是否为绝对路径

## Changelog

:commit-changelog{prefix="utils/url"}
