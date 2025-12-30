---
title: setQueryParams
description: 批量设置 URL 的查询参数。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `setQueryParams`

批量设置 URL 的多个查询参数。

### 用法

```ts
import { setQueryParams } from '@movk/core'

setQueryParams('https://example.com', { page: 1, limit: 10 })
// => 'https://example.com/?page=1&limit=10'

setQueryParams('https://example.com?page=1', { page: 2, sort: 'name' })
// => 'https://example.com/?page=2&sort=name'

// 支持数组参数
setQueryParams('https://example.com', { tags: ['a', 'b'] })
// => 'https://example.com/?tags=a&tags=b'
```

### API

`setQueryParams(url: string, params: QueryParams): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
  ::field{name="params" type="QueryParams" required}
  要设置的参数对象。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  新的 URL 字符串。
  ::
::

## 相关

- [setQueryParam](/docs/utils/url/set-query-param) - 设置单个参数

## Changelog

:commit-changelog{prefix="utils/url"}
