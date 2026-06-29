---
title: setQueryParams
description: Set or replace multiple query parameters in a URL from an object in one call, returning a new URL string with every value applied.
seo:
  title: setQueryParams
  description: Set or replace multiple query parameters in a URL from an object in one call, returning a new URL string with every value applied.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`setQueryParams` sets multiple query parameters on a URL in one call.

```ts
import { setQueryParams } from '@movk/core'

setQueryParams('https://example.com', { page: 1, limit: 10 })
// 'https://example.com?page=1&limit=10'

setQueryParams('https://example.com?page=1', { page: 2, sort: 'name' })
// 'https://example.com?page=2&sort=name'
```

## API

### `setQueryParams(url, params)`{lang="ts-type"}

Set multiple query parameters on a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::

  ::field{name="params" type="QueryParams" required}
  The parameters object to set.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  A new URL string with the updated parameters.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
