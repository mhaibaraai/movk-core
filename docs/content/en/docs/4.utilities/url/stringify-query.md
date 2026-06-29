---
title: stringifyQuery
description: Serialize a query parameters object into a query string, with options for how repeated array values are formatted in the output.
seo:
  title: stringifyQuery
  description: Serialize a query parameters object into a query string, with options for how repeated array values are formatted in the output.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`stringifyQuery` serializes an object into a query string.

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

Serialize an object into a query string.

### Parameters

::field-group
  ::field{name="params" type="QueryParams" required}
  The query parameters object.
  ::

  ::field{name="options" type="object"}
  Serialization options.
  ::

  ::field{name="options.skipNull" type="boolean"}
  Skip `null` and `undefined` values.
  ::

  ::field{name="options.skipEmpty" type="boolean"}
  Skip empty strings.
  ::

  ::field{name="options.arrayFormat" type="'repeat' | 'bracket' | 'index' | 'comma'"}
  Array format: `repeat` (default), `bracket`, `index`, or `comma`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The query string (without the leading `?`).
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
