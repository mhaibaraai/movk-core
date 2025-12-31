---
title: setQueryParam
description: 设置 URL 的查询参数
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`setQueryParam` 函数用于设置 URL 的查询参数。

```ts
import { setQueryParam } from '@movk/core'

setQueryParam('https://example.com', 'page', 1)
// 'https://example.com?page=1'

setQueryParam('https://example.com?page=1', 'page', 2)
// 'https://example.com?page=2'

setQueryParam('https://example.com?page=1', 'sort', 'name')
// 'https://example.com?page=1&sort=name'
```

## API

### `setQueryParam(url, key, value)`{lang="ts-type"}

设置 URL 的查询参数。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::

  ::field{name="key" type="string" required}
  参数名。
  ::

  ::field{name="value" type="QueryParamValue" required}
  参数值。
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
