---
title: isObject
description: A TypeScript type guard that checks whether a value is a non-null object, excluding arrays, so property access is narrowed safely.
seo:
  title: isObject
  description: A TypeScript type guard that checks whether a value is a non-null object, excluding arrays, so property access is narrowed safely.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isObject.ts
---

## Usage

Check whether a value is an object (`{}`), excluding `null` and arrays. This is a TypeScript type guard function.

```ts
import { isObject } from '@movk/core'

isObject({}) // => true
isObject([]) // => false
isObject(null) // => false
isObject('hello') // => false
```

## API

`isObject(value: any): value is object`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="value" type="any" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="boolean"}
  Returns `true` if the value is an object (and is not `null` or an array), otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
