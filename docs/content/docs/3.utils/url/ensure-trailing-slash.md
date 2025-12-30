---
title: ensureTrailingSlash
description: 确保 URL 以斜杠结尾。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `ensureTrailingSlash`

确保 URL 路径以斜杠结尾。

### 用法

```ts
import { ensureTrailingSlash } from '@movk/core'

ensureTrailingSlash('https://example.com') // => 'https://example.com/'
ensureTrailingSlash('/path') // => '/path/'
ensureTrailingSlash('https://example.com/') // => 'https://example.com/'

// 保留查询字符串和哈希
ensureTrailingSlash('/path?query=1#hash')
// => '/path/?query=1#hash'
```

### API

`ensureTrailingSlash(url: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  带尾部斜杠的 URL。
  ::
::

## 相关

- [removeTrailingSlash](/docs/utils/url/remove-trailing-slash) - 移除尾部斜杠

## Changelog

:commit-changelog{prefix="utils/url"}
