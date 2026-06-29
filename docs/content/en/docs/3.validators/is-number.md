---
title: isNumber
description: A TypeScript type guard that checks whether a value is a finite number, excluding NaN, so numeric logic stays safe and predictable.
seo:
  title: isNumber
  description: A TypeScript type guard that checks whether a value is a finite number, excluding NaN, so numeric logic stays safe and predictable.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isNumber.ts
---

## Usage

Check whether a value is a number, excluding `NaN`. This is a TypeScript type guard function.

```ts
import { isNumber } from '@movk/core'

isNumber(123) // => true
isNumber(0) // => true
isNumber(Number.NaN) // => false
isNumber('123') // => false
```

## API

`isNumber(value: any): value is number`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="value" type="any" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="boolean"}
  Returns `true` if the value is a valid number (not `NaN`), otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
