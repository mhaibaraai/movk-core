---
title: setQueryParams
description: 批量设置 URL 的查询参数
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`setQueryParams` 函数用于批量设置 URL 的查询参数。

```ts
import { setQueryParams } from '@movk/core'

setQueryParams('https://example.com', { page: 1, limit: 10 })
// 'https://example.com?page=1&limit=10'

setQueryParams('https://example.com?page=1', { page: 2, sort: 'name' })
// 'https://example.com?page=2&sort=name'
```

## API

### `setQueryParams(url, params)`{lang="ts-type"}

批量设置 URL 的查询参数。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::

  ::field{name="params" type="QueryParams" required}
  要设置的参数对象。
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
