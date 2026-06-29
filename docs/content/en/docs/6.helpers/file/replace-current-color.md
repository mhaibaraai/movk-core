---
title: replaceCurrentColor
description: Fetch an SVG and replace its currentColor references with a given color, returning the recolored markup as a string.
seo:
  title: replaceCurrentColor
  description: Fetch an SVG and replace its currentColor references with a given color, returning the recolored markup as a string.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/replaceCurrentColor.ts
---

## Usage

`replaceCurrentColor` fetches an SVG file and replaces all `currentColor` references with a specified color.

::warning
Note
- Requires a browser environment (`DOMParser` and `XMLSerializer`)
- Uses `fetch` to retrieve the SVG file
::

```ts
import { replaceCurrentColor } from '@movk/core'

// Fetch and replace currentColor in an SVG
try {
  const svgContent = await replaceCurrentColor('/icons/star.svg', '#ff0000')
  // Create a Blob and display
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const img = document.createElement('img')
  img.src = url
  document.body.appendChild(img)
}
catch (error) {
  console.error('SVG processing failed:', error)
}

// Fetch SVG content without replacing colors
const originalSvg = await replaceCurrentColor('/icons/star.svg')
```

## API

### `replaceCurrentColor(path, color?)`{lang="ts-type"}

Replace `currentColor` references in an SVG file.

### Parameters

::field-group
  ::field{name="path" type="string" required}
  The path to the SVG file.
  ::

  ::field{name="color" type="string"}
  The replacement color value. If omitted, the original SVG is returned unchanged.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="Promise<string>"}
  The processed SVG markup as a string.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
