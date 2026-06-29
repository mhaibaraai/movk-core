---
title: isArray
description: A TypeScript type guard that checks whether a value is an array, narrowing the type so you can safely access array methods in your code.
seo:
  title: isArray
  description: A TypeScript type guard that checks whether a value is an array, narrowing the type so you can safely access array methods in your code.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isArray.ts
---

## Usage

Check whether a value is an array. This is a TypeScript type guard function.

```ts
import { isArray } from '@movk/core'

isArray([]) // => true
isArray([1, 2]) // => true
isArray({}) // => false
```

## API

`isArray(value: any): value is any[]`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="value" type="any" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="boolean"}
  Returns `true` if the value is an array, otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
