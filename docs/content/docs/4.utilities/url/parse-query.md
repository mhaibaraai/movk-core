---
title: parseQuery
description: 解析 URL 查询字符串为对象
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`parseQuery` 函数用于解析 URL 查询字符串为对象。

```ts
import { parseQuery } from '@movk/core'

parseQuery('?name=John&age=30')
// { name: 'John', age: '30' }

parseQuery('tags=a&tags=b&tags=c')
// { tags: ['a', 'b', 'c'] }

parseQuery('encoded=%E4%B8%AD%E6%96%87')
// { encoded: '中文' }
```

## API

### `parseQuery(search)`{lang="ts-type"}

解析 URL 查询字符串为对象。

### 参数

::field-group
  ::field{name="search" type="string" required}
  查询字符串(可带或不带 `?`)。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="Record<string, string | string[]>"}
  解析后的查询参数对象。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
