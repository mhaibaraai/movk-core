---
title: convertSvgToPng
description: Convert an SVG string into a PNG Blob using a canvas, returning a promise so you can download or upload rasterized image output.
seo:
  title: convertSvgToPng
  description: Convert an SVG string into a PNG Blob using a canvas, returning a promise so you can download or upload rasterized image output.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/convertSvgToPng.ts
---

## Usage

`convertSvgToPng` converts an SVG string into a PNG Blob.

::warning
Note
- Only available in browser environments
- Uses the Canvas API for conversion
- Throws an error if the conversion fails
::

```ts
import { convertSvgToPng } from '@movk/core'

const svgString = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'

try {
  const pngBlob = await convertSvgToPng(svgString)
  const url = URL.createObjectURL(pngBlob)

  // Use for download or display
  const img = document.createElement('img')
  img.src = url
  document.body.appendChild(img)
}
catch (error) {
  console.error('SVG conversion failed:', error)
}
```

## API

### `convertSvgToPng(svg)`{lang="ts-type"}

Convert an SVG string into a PNG Blob.

### Parameters

::field-group
  ::field{name="svg" type="string" required}
  The SVG string to convert.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="Promise<Blob>"}
  A Blob containing the PNG image data.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
