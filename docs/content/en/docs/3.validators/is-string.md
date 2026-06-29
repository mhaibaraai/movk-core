---
title: isString
description: A TypeScript type guard that checks whether a value is a string, narrowing the type so string methods can be used safely in your code.
seo:
  title: isString
  description: A TypeScript type guard that checks whether a value is a string, narrowing the type so string methods can be used safely in your code.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isString.ts
---

## Usage

Check whether a value is a string. This is a TypeScript type guard function.

```ts
import { isString } from '@movk/core'

isString('hello') // => true
isString('') // => true
isString(123) // => false
```

## API

`isString(value: any): value is string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="value" type="any" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="boolean"}
  Returns `true` if the value is a string, otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
