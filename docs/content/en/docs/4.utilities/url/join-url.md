---
title: joinUrl
description: Join URL path segments into a single path, collapsing duplicate slashes so concatenated routes and endpoints stay well formed.
seo:
  title: joinUrl
  description: Join URL path segments into a single path, collapsing duplicate slashes so concatenated routes and endpoints stay well formed.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`joinUrl` joins URL path segments together.

```ts
import { joinUrl } from '@movk/core'

joinUrl('https://example.com', 'api', 'users')
// 'https://example.com/api/users'

joinUrl('https://example.com/', '/api/', '/users/')
// 'https://example.com/api/users/'

joinUrl('/api', 'users', '123')
// '/api/users/123'
```

## API

### `joinUrl(...parts)`{lang="ts-type"}

Join URL path segments.

### Parameters

::field-group
  ::field{name="parts" type="string[]" required}
  The URL segments to join.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The joined URL.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
