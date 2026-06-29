---
title: safeDecodeURIComponent
description: Decode a URI component safely, returning the original string instead of throwing when the input contains malformed escape sequences.
seo:
  title: safeDecodeURIComponent
  description: Decode a URI component safely, returning the original string instead of throwing when the input contains malformed escape sequences.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## Usage

`safeDecodeURIComponent` decodes a URI component safely — returning the original string on failure instead of throwing.

```ts
import { safeDecodeURIComponent } from '@movk/core'

safeDecodeURIComponent('%E4%B8%AD%E6%96%87') // '中文'
safeDecodeURIComponent('hello%20world') // 'hello world'
safeDecodeURIComponent('%invalid%') // '%invalid%'
```

## API

### `safeDecodeURIComponent(str)`{lang="ts-type"}

Decode a URI component (safe version).

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to decode.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The decoded string.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
