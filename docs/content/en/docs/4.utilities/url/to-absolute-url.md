---
title: toAbsoluteUrl
description: Resolve a relative URL against a base URL and return the absolute form, so links built from fragments point to the right location.
seo:
  title: toAbsoluteUrl
  description: Resolve a relative URL against a base URL and return the absolute form, so links built from fragments point to the right location.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`toAbsoluteUrl` converts a relative URL into an absolute URL.

```ts
import { toAbsoluteUrl } from '@movk/core'

toAbsoluteUrl('/path', 'https://example.com')
// 'https://example.com/path'

toAbsoluteUrl('../other', 'https://example.com/api/users')
// 'https://example.com/api/other'

toAbsoluteUrl('https://other.com', 'https://example.com')
// 'https://other.com' (already absolute, returned as-is)
```

## API

### `toAbsoluteUrl(relativeUrl, baseUrl)`{lang="ts-type"}

Convert a relative URL to an absolute URL.

### Parameters

::field-group
  ::field{name="relativeUrl" type="string" required}
  The relative URL.
  ::

  ::field{name="baseUrl" type="string" required}
  The base URL.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The absolute URL, or the original string if conversion fails.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
