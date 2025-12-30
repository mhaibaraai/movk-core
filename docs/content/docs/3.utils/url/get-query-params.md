---
title: getQueryParams
description: 从 URL 获取所有同名查询参数的值。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `getQueryParams`

从 URL 中获取所有同名查询参数的值（用于多值参数）。

### 用法

```ts
import { getQueryParams } from '@movk/core'

getQueryParams('https://example.com?tags=a&tags=b&tags=c', 'tags')
// => ['a', 'b', 'c']

getQueryParams('https://example.com?name=John', 'name')
// => ['John']

getQueryParams('https://example.com', 'name')
// => []
```

### API

`getQueryParams(url: string, key: string): string[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
  ::field{name="key" type="string" required}
  参数名。
  ::
::

#### 返回值

::field-group
  ::field{name="string[]"}
  参数值数组。
  ::
::

## 相关

- [getQueryParam](/docs/utils/url/get-query-param) - 获取单个值

## Changelog

:commit-changelog{prefix="utils/url"}
