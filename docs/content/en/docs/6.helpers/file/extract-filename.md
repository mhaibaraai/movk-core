---
title: extractFilename
description: Extract a filename from HTTP response headers, parsing Content-Disposition with a fallback name for reliable file downloads.
seo:
  title: extractFilename
  description: Extract a filename from HTTP response headers, parsing Content-Disposition with a fallback name for reliable file downloads.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/extractFilename.ts
---

## Usage

`extractFilename` extracts a filename from HTTP response headers.

```ts
import { extractFilename } from '@movk/core'

// Extract filename from response headers
const headers = new Headers({
  'content-disposition': 'attachment; filename="report.pdf"'
})
const filename = extractFilename(headers, 'download')
console.log(filename) // 'report.pdf'

// Handle encoded filenames
const encodedHeaders = new Headers({
  'content-disposition': 'attachment; filename*=UTF-8\'\'%E6%8A%A5%E5%91%8A.pdf'
})
const encodedFilename = extractFilename(encodedHeaders)
console.log(encodedFilename) // '报告.pdf'
```

## API

### `extractFilename(headers?, fallbackName?)`{lang="ts-type"}

Extract a filename from HTTP response headers.

### Parameters

::field-group
  ::field{name="headers" type="Headers"}
  The response headers object.
  ::

  ::field{name="fallbackName" type="string"}
  The fallback filename, defaults to `'file'`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The extracted filename.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
