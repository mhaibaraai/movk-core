---
title: getQueryParam
description: Read a single query parameter value from a URL by key, returning the first match or null when the parameter is not present.
seo:
  title: getQueryParam
  description: Read a single query parameter value from a URL by key, returning the first match or null when the parameter is not present.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`getQueryParam` retrieves the value of a specific query parameter from a URL.

```ts
import { getQueryParam } from '@movk/core'

getQueryParam('https://example.com?name=John&age=30', 'name')
// 'John'

getQueryParam('https://example.com?tags=a&tags=b', 'tags')
// 'a' (returns the first value)

getQueryParam('https://example.com', 'name')
// null
```

## API

### `getQueryParam(url, key)`{lang="ts-type"}

Get the value of a specific query parameter from a URL.

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
  ::field{name="returns" type="string | null"}
  The parameter value, or `null` if not present.
  ::
::

## Note

- If the parameter has multiple values, only the first is returned.
- Use [`getQueryParams`](/docs/utilities/url/get-query-params) to retrieve all values.

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
