---
title: parseQuery
description: 解析 URL 查询字符串为对象。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `parseQuery`

解析 URL 查询字符串为键值对对象，自动处理 URL 编码和重复参数。

### 用法

```ts
import { parseQuery } from '@movk/core'

parseQuery('name=John&age=30')
// => { name: 'John', age: '30' }

parseQuery('?name=John') // 支持带 ? 前缀
// => { name: 'John' }

// 重复参数自动转为数组
parseQuery('tags=a&tags=b&tags=c')
// => { tags: ['a', 'b', 'c'] }

// 自动解码
parseQuery('name=%E4%B8%AD%E6%96%87')
// => { name: '中文' }
```

### API

`parseQuery(search: string): Record<string, string | string[]>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="search" type="string" required}
  查询字符串（可带或不带 `?`）。
  ::
::

#### 返回值

::field-group
  ::field{name="Record<string, string | string[]>"}
  解析后的查询参数对象。
  ::
::

## 相关

- [stringifyQuery](/docs/utils/url/stringify-query) - 序列化查询参数

## Changelog

:commit-changelog{prefix="utils/url"}
