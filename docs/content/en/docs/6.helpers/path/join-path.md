---
title: joinPath
description: Serialize an array of path segments into a single path string, the inverse of toPath for building dot and bracket accessors.
seo:
  title: joinPath
  description: Serialize an array of path segments into a single path string, the inverse of toPath for building dot and bracket accessors.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/joinPath.ts
---

## Usage

`joinPath` serializes an array of path segments into a path string.

```ts
import { joinPath } from '@movk/core'

const p = joinPath(['a', 'x.y', 0, 'space key'])
// p: "a['x.y'][0]['space key']"
// Round-trips with toPath: toPath(p) => ['a', 'x.y', 0, 'space key']
```

## API

### `joinPath(segments)`{lang="ts-type"}

Serialize an array of path segments into a path string.

### Parameters

::field-group
  ::field{name="segments" type="[string | number]()" required}
  An array of path segments.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The serialized path string.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
