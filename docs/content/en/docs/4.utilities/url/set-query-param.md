---
title: setQueryParam
description: Set or replace a single query parameter in a URL by key and return a new URL string with the updated value applied.
seo:
  title: setQueryParam
  description: Set or replace a single query parameter in a URL by key and return a new URL string with the updated value applied.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`setQueryParam` sets a query parameter on a URL.

```ts
import { setQueryParam } from '@movk/core'

setQueryParam('https://example.com', 'page', 1)
// 'https://example.com?page=1'

setQueryParam('https://example.com?page=1', 'page', 2)
// 'https://example.com?page=2'

setQueryParam('https://example.com?page=1', 'sort', 'name')
// 'https://example.com?page=1&sort=name'
```

## API

### `setQueryParam(url, key, value)`{lang="ts-type"}

Set a query parameter on a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::

  ::field{name="key" type="string" required}
  The parameter key.
  ::

  ::field{name="value" type="QueryParamValue" required}
  The parameter value.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  A new URL string with the updated parameter.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
