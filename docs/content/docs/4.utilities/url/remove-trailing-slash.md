---
title: removeTrailingSlash
description: 移除 URL 的尾部斜杠
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`removeTrailingSlash` 函数用于移除 URL 的尾部斜杠。

```ts
import { removeTrailingSlash } from '@movk/core'

removeTrailingSlash('https://example.com/') // 'https://example.com'
removeTrailingSlash('https://example.com/path/') // 'https://example.com/path'
removeTrailingSlash('https://example.com') // 'https://example.com'
```

## API

### `removeTrailingSlash(url)`{lang="ts-type"}

移除 URL 的尾部斜杠。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  移除尾部斜杠后的 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
