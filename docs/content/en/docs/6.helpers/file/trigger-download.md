---
title: triggerDownload
description: Trigger a browser file download from a Blob with a chosen filename, wiring up the temporary anchor and object URL for you.
seo:
  title: triggerDownload
  description: Trigger a browser file download from a Blob with a chosen filename, wiring up the temporary anchor and object URL for you.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/triggerDownload.ts
---

## Usage

`triggerDownload` triggers a browser file download.

::warning
Note
- Only available in browser environments
- Some browsers may block automatic downloads
::

```ts
import { triggerDownload } from '@movk/core'

// Download a text file
const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' })
triggerDownload(textBlob, 'hello.txt')

// Download JSON data
const data = { name: 'John', age: 30 }
const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
triggerDownload(jsonBlob, 'data.json')

// Download an image
const canvas = document.createElement('canvas')
canvas.toBlob((blob) => {
  if (blob) {
    triggerDownload(blob, 'image.png')
  }
})
```

## API

### `triggerDownload(blob, filename)`{lang="ts-type"}

Trigger a browser file download.

### Parameters

::field-group
  ::field{name="blob" type="Blob" required}
  The file data as a Blob.
  ::

  ::field{name="filename" type="string" required}
  The filename for the download.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
