---
title: toPath
description: Parse a path string into an array of segments, supporting dot and bracket notation, the basis for safe nested property access.
seo:
  title: toPath
  description: Parse a path string into an array of segments, supporting dot and bracket notation, the basis for safe nested property access.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/toPath.ts
---

## Usage

`toPath` parses a path string into an array of segments.

```ts
import { toPath } from '@movk/core'

toPath('a.b[0].c') // ['a', 'b', 0, 'c']
toPath('a[\'x.y\']') // ['a', 'x.y']
```

## API

### `toPath(path)`{lang="ts-type"}

Parse a path string into an array of segments.

### Parameters

::field-group
  ::field{name="path" type="PathInput" required}
  A path string or array of segments.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="PathSegments"}
  The parsed array of path segments.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
