---
title: isEmpty
description: Check whether a value is empty: null, undefined, an empty string, an empty array, or an object with no own enumerable properties.
seo:
  title: isEmpty
  description: Check whether a value is empty: null, undefined, an empty string, an empty array, or an object with no own enumerable properties.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isEmpty.ts
---

## Usage

Check whether a value is empty. The following values are considered empty:
- `null`
- `undefined`
- empty string (`''`)
- empty array (`[]`)
- empty object (`{}`)

```ts
import { isEmpty } from '@movk/core'

isEmpty(null) // => true
isEmpty('') // => true
isEmpty([]) // => true
isEmpty({}) // => true

isEmpty(0) // => false
isEmpty('hello') // => false
isEmpty([1]) // => false
```

## API

`isEmpty(value: any): boolean`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="value" type="any" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="boolean"}
  Returns `true` if the value is considered empty, otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
