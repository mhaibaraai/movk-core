---
title: stringifyQuery
description: 将对象序列化为查询字符串。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/query.ts
---

## `stringifyQuery`

将对象序列化为 URL 查询字符串，支持多种数组格式和过滤选项。

### 用法

```ts
import { stringifyQuery } from '@movk/core'

stringifyQuery({ name: 'John', age: 30 })
// => 'name=John&age=30'

// 数组格式（默认 repeat）
stringifyQuery({ tags: ['a', 'b', 'c'] })
// => 'tags=a&tags=b&tags=c'

// bracket 格式
stringifyQuery({ tags: ['a', 'b'] }, { arrayFormat: 'bracket' })
// => 'tags[]=a&tags[]=b'

// comma 格式
stringifyQuery({ tags: ['a', 'b'] }, { arrayFormat: 'comma' })
// => 'tags=a,b'

// 跳过空值
stringifyQuery({ a: 'value', b: null }, { skipNull: true })
// => 'a=value'
```

### API

`stringifyQuery(params: QueryParams, options?: Options): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="params" type="QueryParams" required}
  查询参数对象。
  ::
  ::field{name="options.skipNull" type="boolean" default="false"}
  跳过 `null` 和 `undefined` 值。
  ::
  ::field{name="options.skipEmpty" type="boolean" default="false"}
  跳过空字符串。
  ::
  ::field{name="options.arrayFormat" type="'repeat' | 'bracket' | 'index' | 'comma'" default="'repeat'"}
  数组序列化格式。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  查询字符串（不含 `?`）。
  ::
::

## 相关

- [parseQuery](/docs/utils/url/parse-query) - 解析查询字符串

## Changelog

:commit-changelog{prefix="utils/url"}
