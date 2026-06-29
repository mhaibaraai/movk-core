---
title: getUrlExtension
description: Extract the file extension from a URL pathname, returning the part after the last dot so you can branch on asset or document types.
seo:
  title: getUrlExtension
  description: Extract the file extension from a URL pathname, returning the part after the last dot so you can branch on asset or document types.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`getUrlExtension` extracts the file extension from a URL.

```ts
import { getUrlExtension } from '@movk/core'

getUrlExtension('https://example.com/file.pdf') // 'pdf'
getUrlExtension('https://example.com/file.tar.gz') // 'gz'
getUrlExtension('https://example.com/path/') // ''
```

## API

### `getUrlExtension(url)`{lang="ts-type"}

Get the file extension from a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The file extension without the leading dot, or an empty string if none found.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
