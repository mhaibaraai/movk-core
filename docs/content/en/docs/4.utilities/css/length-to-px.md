---
title: lengthToPx
description: Convert a CSS length string such as px, rem, or em into a pixel number, with a configurable fallback for unrecognized values.
seo:
  title: lengthToPx
  description: Convert a CSS length string such as px, rem, or em into a pixel number, with a configurable fallback for unrecognized values.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/css/length.ts
---

## Usage

`lengthToPx` converts a CSS length string into a pixel value. It supports `px`, `rem`, and `em` units, where `rem`/`em` are resolved at a base of 16; a unitless value is treated as `px`; unrecognized values fall back to `fallback`.

```ts
import { lengthToPx } from '@movk/core'

lengthToPx('24px') // 24
lengthToPx('1rem') // 16
lengthToPx('2.5em') // 40
lengthToPx('16') // 16 (unitless treated as px)
```

### Custom Fallback

```ts
lengthToPx('auto') // 16 (default fallback)
lengthToPx('auto', 0) // 0
lengthToPx('', 8) // 8 (empty string fallback)
```

## API

### `lengthToPx(value, fallback?)`{lang="ts-type"}

Convert a CSS length string into a pixel value.

### Parameters

::field-group
  ::field{name="value" type="string" required}
  A CSS length string such as `'16px'`, `'1rem'`, or `'2.5em'`.
  ::

  ::field{name="fallback" type="number"}
  Fallback pixel value when the input cannot be recognized. Defaults to `16`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="number"}
  The resolved pixel value.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/css"}
