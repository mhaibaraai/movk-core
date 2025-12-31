---
title: ensureTrailingSlash
description: 确保 URL 以斜杠结尾
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`ensureTrailingSlash` 函数用于确保 URL 以斜杠结尾。

```ts
import { ensureTrailingSlash } from '@movk/core'

ensureTrailingSlash('https://example.com') // 'https://example.com/'
ensureTrailingSlash('https://example.com/path') // 'https://example.com/path/'
ensureTrailingSlash('https://example.com/') // 'https://example.com/'
```

## API

### `ensureTrailingSlash(url)`{lang="ts-type"}

确保 URL 以斜杠结尾。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  带尾部斜杠的 URL。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
