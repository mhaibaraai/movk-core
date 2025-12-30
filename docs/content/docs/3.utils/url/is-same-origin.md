---
title: isSameOrigin
description: 检查两个 URL 是否同源。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `isSameOrigin`

检查两个 URL 是否具有相同的源（协议 + 域名 + 端口）。

### 用法

```ts
import { isSameOrigin } from '@movk/core'

isSameOrigin('https://example.com/a', 'https://example.com/b')
// => true

isSameOrigin('https://example.com', 'https://sub.example.com')
// => false（不同子域名）

isSameOrigin('https://example.com', 'http://example.com')
// => false（不同协议）

isSameOrigin('https://example.com', 'https://example.com:8080')
// => false（不同端口）
```

### API

`isSameOrigin(url1: string, url2: string): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url1" type="string" required}
  第一个 URL。
  ::
  ::field{name="url2" type="string" required}
  第二个 URL。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  是否同源。
  ::
::

## Changelog

:commit-changelog{prefix="utils/url"}
