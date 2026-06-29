---
title: normalizeUrl
description: Normalize a URL path by removing redundant slashes and resolving dot and double-dot segments, producing a clean canonical form.
seo:
  title: normalizeUrl
  description: Normalize a URL path by removing redundant slashes and resolving dot and double-dot segments, producing a clean canonical form.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`normalizeUrl` normalizes a URL path by removing redundant slashes and resolving `.` and `..` segments.

```ts
import { normalizeUrl } from '@movk/core'

normalizeUrl('https://example.com//api///users/')
// 'https://example.com/api/users/'

normalizeUrl('https://example.com/api/../users')
// 'https://example.com/users'

normalizeUrl('/api/./users/../posts')
// '/api/posts'
```

## API

### `normalizeUrl(url)`{lang="ts-type"}

Normalize a URL path.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The normalized URL.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
