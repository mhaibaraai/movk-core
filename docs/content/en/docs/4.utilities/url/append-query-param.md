---
title: appendQueryParam
description: Append a query parameter to a URL without replacing existing values of the same name, returning a new URL string with the value added.
seo:
  title: appendQueryParam
  description: Append a query parameter to a URL without replacing existing values of the same name, returning a new URL string with the value added.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/query.ts
---

## Usage

`appendQueryParam` appends a query parameter to a URL without overwriting existing values of the same key.

```ts
import { appendQueryParam } from '@movk/core'

appendQueryParam('https://example.com?tag=a', 'tag', 'b')
// 'https://example.com?tag=a&tag=b'
```

## API

### `appendQueryParam(url, key, value)`{lang="ts-type"}

Append a query parameter without replacing existing values of the same name.

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
  A new URL string with the parameter appended.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="query"}
