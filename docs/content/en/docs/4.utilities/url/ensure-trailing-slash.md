---
title: ensureTrailingSlash
description: Ensure a URL ends with a single trailing slash, adding one when missing so directory-style links resolve consistently.
seo:
  title: ensureTrailingSlash
  description: Ensure a URL ends with a single trailing slash, adding one when missing so directory-style links resolve consistently.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`ensureTrailingSlash` ensures a URL ends with a trailing slash.

```ts
import { ensureTrailingSlash } from '@movk/core'

ensureTrailingSlash('https://example.com') // 'https://example.com/'
ensureTrailingSlash('https://example.com/path') // 'https://example.com/path/'
ensureTrailingSlash('https://example.com/') // 'https://example.com/'
```

## API

### `ensureTrailingSlash(url)`{lang="ts-type"}

Ensure a URL ends with a trailing slash.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The URL with a trailing slash.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
