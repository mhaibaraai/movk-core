---
title: setQueryParam
description: 设置 URL 的查询参数。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `setQueryParam`

设置 URL 的查询参数，会覆盖已有同名参数。

### 用法

```ts
import { setQueryParam } from '@movk/core'

setQueryParam('https://example.com', 'page', 1)
// => 'https://example.com/?page=1'

setQueryParam('https://example.com?page=1', 'page', 2)
// => 'https://example.com/?page=2'

// 删除参数（传入 null）
setQueryParam('https://example.com?page=1', 'page', null)
// => 'https://example.com/'

// 支持相对路径
setQueryParam('/path#section', 'page', 1)
// => '/path?page=1#section'
```

### API

`setQueryParam(url: string, key: string, value: QueryParamValue): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
  ::field{name="key" type="string" required}
  参数名。
  ::
  ::field{name="value" type="QueryParamValue" required}
  参数值，传入 `null` 或 `undefined` 将删除该参数。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  新的 URL 字符串。
  ::
::

## 相关

- [setQueryParams](/docs/utils/url/set-query-params) - 批量设置
- [removeQueryParam](/docs/utils/url/remove-query-param) - 删除参数

## Changelog

:commit-changelog{prefix="utils/url"}
