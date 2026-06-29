---
title: getUrlFilename
description: Extract the filename from a URL pathname, optionally including the extension, so downloads and asset labels are simple to derive.
seo:
  title: getUrlFilename
  description: Extract the filename from a URL pathname, optionally including the extension, so downloads and asset labels are simple to derive.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## Usage

`getUrlFilename` extracts the filename from a URL.

```ts
import { getUrlFilename } from '@movk/core'

getUrlFilename('https://example.com/path/file.pdf') // 'file.pdf'
getUrlFilename('https://example.com/path/file.pdf', false) // 'file'
getUrlFilename('https://example.com/path/') // ''
```

## API

### `getUrlFilename(url, includeExtension?)`{lang="ts-type"}

Get the filename from a URL.

### Parameters

::field-group
  ::field{name="url" type="string" required}
  The URL string.
  ::

  ::field{name="includeExtension" type="boolean"}
  Whether to include the file extension. Defaults to `true`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The filename.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
