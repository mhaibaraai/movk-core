---
title: getQueryParam
description: 从 URL 获取指定查询参数的值。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `getQueryParam`

从 URL 中获取指定查询参数的值。

### 用法

```ts
import { getQueryParam } from '@movk/core'

getQueryParam('https://example.com?name=John&age=30', 'name')
// => 'John'

getQueryParam('https://example.com?tags=a&tags=b', 'tags')
// => 'a'（多值参数返回第一个）

getQueryParam('https://example.com', 'name')
// => null（不存在）
```

### API

`getQueryParam(url: string, key: string): string | null`{lang="ts-type"}

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
  ::field{name="string | null"}
  参数值，不存在返回 `null`。
  ::
::

## 相关

- [getQueryParams](/docs/utils/url/get-query-params) - 获取多值参数
- [setQueryParam](/docs/utils/url/set-query-param) - 设置参数

## Changelog

:commit-changelog{prefix="utils/url"}
