---
title: removeQueryParam
description: Remove a query parameter from a URL by key and return a new URL string, leaving the rest of the query string intact.
seo:
  title: removeQueryParam
  description: Remove a query parameter from a URL by key and return a new URL string, leaving the rest of the query string intact.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`removeQueryParam` removes a specific query parameter from a URL.

```ts
import { removeQueryParam } from '@movk/core'

removeQueryParam('https://example.com?page=1&sort=name', 'page')
// 'https://example.com?sort=name'

removeQueryParam('https://example.com?page=1', 'page')
// 'https://example.com'
```

## API

### `removeQueryParam(url, key)`{lang="ts-type"}

Remove a specific query parameter from a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::

  ::field{name="key" type="string" required}
  The parameter key to remove.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  A new URL string without the removed parameter.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
