---
title: removeQueryParam
description: 从 URL 中删除指定查询参数，返回不含该参数的新 URL 字符串，不修改原 URL。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`removeQueryParam` 函数用于删除 URL 的指定查询参数。

```ts
import { removeQueryParam } from '@movk/core'

removeQueryParam('https://example.com?page=1&sort=name', 'page')
// 'https://example.com?sort=name'

removeQueryParam('https://example.com?page=1', 'page')
// 'https://example.com'
```

## API

### `removeQueryParam(url, key)`{lang="ts-type"}

删除 URL 的指定查询参数。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::

  ::field{name="key" type="string" required}
  要删除的参数名。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  新的 URL 字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
