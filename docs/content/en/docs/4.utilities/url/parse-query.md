---
title: parseQuery
description: Parse a URL query string into a key-value object, grouping repeated keys into arrays so query data is easy to read and update.
seo:
  title: parseQuery
  description: Parse a URL query string into a key-value object, grouping repeated keys into arrays so query data is easy to read and update.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`parseQuery` parses a URL query string into an object.

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

Parse a URL query string into an object.

### Parameters

::field-group
  ::field{name="search" type="string" required}
  The query string, with or without the leading `?`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="Record<string, string | string[]>"}
  The parsed query parameters object.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
