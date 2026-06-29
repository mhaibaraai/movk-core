---
title: removeTrailingSlash
description: Remove a trailing slash from a URL and return a new string, normalizing links so identical routes are not duplicated.
seo:
  title: removeTrailingSlash
  description: Remove a trailing slash from a URL and return a new string, normalizing links so identical routes are not duplicated.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`removeTrailingSlash` removes the trailing slash from a URL.

```ts
import { removeTrailingSlash } from '@movk/core'

removeTrailingSlash('https://example.com/') // 'https://example.com'
removeTrailingSlash('https://example.com/path/') // 'https://example.com/path'
removeTrailingSlash('https://example.com') // 'https://example.com'
```

## API

### `removeTrailingSlash(url)`{lang="ts-type"}

Remove the trailing slash from a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The URL with the trailing slash removed.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
