---
title: getQueryParams
description: Read every value of a repeated query parameter from a URL by key, returning an array so multi-value filters and tags are easy to handle.
seo:
  title: getQueryParams
  description: Read every value of a repeated query parameter from a URL by key, returning an array so multi-value filters and tags are easy to handle.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`getQueryParams` retrieves all values of a repeated query parameter from a URL.

```ts
import { getQueryParams } from '@movk/core'

getQueryParams('https://example.com?tags=a&tags=b&tags=c', 'tags')
// ['a', 'b', 'c']

getQueryParams('https://example.com?name=John', 'name')
// ['John']

getQueryParams('https://example.com', 'name')
// []
```

## API

### `getQueryParams(url, key)`{lang="ts-type"}

Get all values of a specific query parameter from a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::

  ::field{name="key" type="string" required}
  The parameter key.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string[]"}
  An array of parameter values.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
