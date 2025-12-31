---
title: stringifyQuery
description: 将对象序列化为查询字符串
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## 用法

`stringifyQuery` 函数用于将对象序列化为查询字符串。

```ts
import { stringifyQuery } from '@movk/core'

stringifyQuery({ name: 'John', age: 30 })
// 'name=John&age=30'

stringifyQuery({ tags: ['a', 'b', 'c'] })
// 'tags=a&tags=b&tags=c'

stringifyQuery({ name: '中文' })
// 'name=%E4%B8%AD%E6%96%87'

stringifyQuery({ a: null, b: undefined, c: '' }, { skipNull: true, skipEmpty: true })
// ''
```

## API

### `stringifyQuery(params, options?)`{lang="ts-type"}

将对象序列化为查询字符串。

### 参数

::field-group
  ::field{name="params" type="QueryParams" required}
  查询参数对象。
  ::

  ::field{name="options" type="object"}
  序列化选项。
  ::

  ::field{name="options.skipNull" type="boolean"}
  跳过 `null` 和 `undefined` 值。
  ::

  ::field{name="options.skipEmpty" type="boolean"}
  跳过空字符串。
  ::

  ::field{name="options.arrayFormat" type="'repeat' | 'bracket' | 'index' | 'comma'"}
  数组格式:`repeat`(默认)、`bracket`、`index`、`comma`。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  查询字符串(不含 `?`)。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
