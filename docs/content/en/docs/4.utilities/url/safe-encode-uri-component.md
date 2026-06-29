---
title: safeEncodeURIComponent
description: Encode a URI component safely, returning a percent-encoded string and avoiding exceptions on edge-case input during URL building.
seo:
  title: safeEncodeURIComponent
  description: Encode a URI component safely, returning a percent-encoded string and avoiding exceptions on edge-case input during URL building.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`safeEncodeURIComponent` encodes a URI component safely.

```ts
import { safeEncodeURIComponent } from '@movk/core'

safeEncodeURIComponent('中文') // '%E4%B8%AD%E6%96%87'
safeEncodeURIComponent('hello world') // 'hello%20world'
```

## API

### `safeEncodeURIComponent(str)`{lang="ts-type"}

Encode a URI component (safe version).

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to encode.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The encoded string.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
