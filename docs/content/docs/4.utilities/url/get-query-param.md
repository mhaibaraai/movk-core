---
title: getQueryParam
description: 从 URL 获取指定查询参数的值
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`getQueryParam` 函数用于从 URL 获取指定查询参数的值。

```ts
import { getQueryParam } from '@movk/core'

getQueryParam('https://example.com?name=John&age=30', 'name')
// 'John'

getQueryParam('https://example.com?tags=a&tags=b', 'tags')
// 'a' (返回第一个值)

getQueryParam('https://example.com', 'name')
// null
```

## API

### `getQueryParam(url, key)`{lang="ts-type"}

从 URL 获取指定查询参数的值。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::

  ::field{name="key" type="string" required}
  参数名。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string | null"}
  参数值,不存在返回 `null`。
  ::
::

## 注意

- 如果参数有多个值,只返回第一个值
- 需要获取所有值请使用 [`getQueryParams`](/docs/utilities/url/get-query-params)

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
