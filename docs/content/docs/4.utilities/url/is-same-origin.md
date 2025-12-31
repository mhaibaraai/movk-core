---
title: isSameOrigin
description: 检查两个 URL 是否同源
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`isSameOrigin` 函数用于检查两个 URL 是否同源。

```ts
import { isSameOrigin } from '@movk/core'

isSameOrigin('https://example.com/a', 'https://example.com/b') // true
isSameOrigin('https://example.com', 'https://sub.example.com') // false
isSameOrigin('https://example.com', 'http://example.com') // false
```

## API

### `isSameOrigin(url1, url2)`{lang="ts-type"}

检查两个 URL 是否同源。

### 参数

::field-group
  ::field{name="url1" type="string" required}
  第一个 URL。
  ::

  ::field{name="url2" type="string" required}
  第二个 URL。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  是否同源。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
