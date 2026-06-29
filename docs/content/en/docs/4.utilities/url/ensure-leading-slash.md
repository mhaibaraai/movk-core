---
title: ensureLeadingSlash
description: Ensure a path starts with a single leading slash, adding one when missing so route and URL joins stay consistent across your app.
seo:
  title: ensureLeadingSlash
  description: Ensure a path starts with a single leading slash, adding one when missing so route and URL joins stay consistent across your app.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`ensureLeadingSlash` ensures a path starts with a slash.

```ts
import { ensureLeadingSlash } from '@movk/core'

ensureLeadingSlash('path/to/page') // '/path/to/page'
ensureLeadingSlash('/path') // '/path'
```

## API

### `ensureLeadingSlash(path)`{lang="ts-type"}

Ensure a path starts with a leading slash.

### Parameters

::field-group
  ::field{name="path" type="string" required}
  The path string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The path with a leading slash.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
