---
title: removeLeadingSlash
description: Remove leading slashes from a path, returning a clean relative segment that is safe to join with other URL or route parts.
seo:
  title: removeLeadingSlash
  description: Remove leading slashes from a path, returning a clean relative segment that is safe to join with other URL or route parts.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`removeLeadingSlash` removes leading slashes from a URL or path.

```ts
import { removeLeadingSlash } from '@movk/core'

removeLeadingSlash('/path/to/page') // 'path/to/page'
removeLeadingSlash('///path') // 'path'
removeLeadingSlash('path') // 'path'
```

## API

### `removeLeadingSlash(url)`{lang="ts-type"}

Remove leading slashes from a URL or path.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL or path string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The string with leading slashes removed.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
