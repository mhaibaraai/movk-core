---
title: getPath
description: Read a value at a dot or bracket path inside a nested object, returning an optional default when the path does not resolve.
seo:
  title: getPath
  description: Read a value at a dot or bracket path inside a nested object, returning an optional default when the path does not resolve.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/getPath.ts
---

## Usage

`getPath` reads the value at a specified path inside an object.

```ts
import { getPath } from '@movk/core'

const obj = { a: { b: { c: 1, d: undefined }, e: null }, arr: [{ x: 9 }] }
getPath(obj, 'a.b.c') // 1
getPath(obj, 'a.b.d', 42) // 42 (d is undefined, default value is used)
getPath(obj, 'a.e', 100) // null (null does not trigger the default value)
getPath(obj, 'arr[0].x') // 9
getPath(obj, '') // returns obj itself
```

## API

### `getPath(object, path, defaultValue?)`{lang="ts-type"}

Read the value at a specified path inside an object.

### Parameters

::field-group
  ::field{name="object" type="T" required}
  The source object.
  ::

  ::field{name="path" type="PathInput" required}
  A path string or array of segments.
  ::

  ::field{name="defaultValue" type="D"}
  The default value returned when the result is `undefined`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="unknown | D"}
  The resolved value, or the default value if the path does not resolve.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
