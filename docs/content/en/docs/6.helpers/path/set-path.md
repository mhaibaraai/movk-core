---
title: setPath
description: Set a value at a dot or bracket path inside an object, creating intermediate objects as needed and returning the updated object.
seo:
  title: setPath
  description: Set a value at a dot or bracket path inside an object, creating intermediate objects as needed and returning the updated object.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/setPath.ts
---

## Usage

`setPath` writes a value at a specified path inside an object.

```ts
import { setPath } from '@movk/core'

const obj: any = {}
setPath(obj, 'a.b[0].c', 7)
// obj => { a: { b: [{ c: 7 }] } }

setPath(obj, 'a.b[2].d', 8)
// Array is automatically extended to length 3
// obj.a.b[2] => { d: 8 }

setPath(obj, 'a.0.b', 1) // Numeric keys in dot notation remain as string keys
// obj => { a: { 0: { b: 1 } } }
setPath(obj, 'a[0].b', 2) // Use bracket notation for array indices
// obj.a[0].b => 2
```

## API

### `setPath(object, path, value)`{lang="ts-type"}

Write a value at a specified path inside an object.

### Parameters

::field-group
  ::field{name="object" type="T" required}
  The target object (mutated in place and returned as the same reference).
  ::

  ::field{name="path" type="PathInput" required}
  A path string or array of segments.
  ::

  ::field{name="value" type="unknown" required}
  The value to write.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="T"}
  The original object (mutated).
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
