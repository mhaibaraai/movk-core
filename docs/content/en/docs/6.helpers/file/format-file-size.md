---
title: formatFileSize
description: Format a byte count into a human-readable size string such as KB, MB, or GB, ideal for upload and download user interfaces.
seo:
  title: formatFileSize
  description: Format a byte count into a human-readable size string such as KB, MB, or GB, ideal for upload and download user interfaces.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/formatFileSize.ts
---

## Usage

`formatFileSize` formats a byte count into a human-readable file size string.

```ts
import { formatFileSize } from '@movk/core'

console.log(formatFileSize(1024)) // '1 KB'
console.log(formatFileSize(1536)) // '1.5 KB'
console.log(formatFileSize(1048576)) // '1 MB'
console.log(formatFileSize(1073741824)) // '1 GB'

// Edge cases
console.log(formatFileSize(0)) // '0 Bytes'
console.log(formatFileSize(-100)) // '0 Bytes'
```

## API

### `formatFileSize(bytes)`{lang="ts-type"}

Format a file size.

### Parameters

::field-group
  ::field{name="bytes" type="number" required}
  The file size in bytes.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The formatted file size string.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
