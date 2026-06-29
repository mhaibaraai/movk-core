---
title: buildUrl
description: Build a complete URL from a base, optional path, query parameters, and hash, handling slashes and encoding to produce a valid result.
seo:
  title: buildUrl
  description: Build a complete URL from a base, optional path, query parameters, and hash, handling slashes and encoding to produce a valid result.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`buildUrl` builds a complete URL from its parts.

```ts
import { buildUrl } from '@movk/core'

buildUrl('https://example.com', '/api/users', { page: 1, limit: 10 })
// 'https://example.com/api/users?page=1&limit=10'

buildUrl('https://example.com', '/page', null, 'section')
// 'https://example.com/page#section'

buildUrl('https://example.com', '/api', { ids: [1, 2, 3] })
// 'https://example.com/api?ids=1&ids=2&ids=3'
```

## API

### `buildUrl(base, path?, query?, hash?)`{lang="ts-type"}

Build a complete URL.

### Parameters

::field-group
  ::field{name="base" type="string" required}
  The base URL.
  ::

  ::field{name="path" type="string"}
  The path segment.
  ::

  ::field{name="query" type="QueryParams | null"}
  Query parameters.
  ::

  ::field{name="hash" type="string"}
  The hash fragment.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The complete URL string.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
