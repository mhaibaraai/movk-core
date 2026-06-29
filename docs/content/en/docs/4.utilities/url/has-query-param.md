---
title: hasQueryParam
description: Check whether a URL contains a query parameter with the given key, returning a boolean so you can branch on the presence of a flag.
seo:
  title: hasQueryParam
  description: Check whether a URL contains a query parameter with the given key, returning a boolean so you can branch on the presence of a flag.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`hasQueryParam` checks whether a URL contains a specific query parameter.

```ts
import { hasQueryParam } from '@movk/core'

hasQueryParam('https://example.com?page=1', 'page') // true
hasQueryParam('https://example.com?page=1', 'sort') // false
hasQueryParam('https://example.com?flag', 'flag') // true (valueless parameter)
```

## API

### `hasQueryParam(url, key)`{lang="ts-type"}

Check whether a URL contains a specific query parameter.

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
  ::field{name="returns" type="boolean"}
  Whether the parameter is present.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
