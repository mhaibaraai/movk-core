---
title: isPlainObject
description: Check whether a value is a plain object created by an object literal or Object, excluding arrays, dates, functions, and class instances.
seo:
  title: isPlainObject
  description: Check whether a value is a plain object created by an object literal or Object, excluding arrays, dates, functions, and class instances.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isPlainObject.ts
---

## Usage

Check whether a value is a "plain" object (created by `{}` or `new Object()`), excluding arrays, `null`, and other non-plain-object types such as `new Date()`. This is a TypeScript type guard function.

```ts
import { isPlainObject } from '@movk/core'

isPlainObject({}) // => true
isPlainObject(new Object()) // => true
isPlainObject(new Date()) // => false
isPlainObject([]) // => false
```

## API

`isPlainObject(value: unknown): value is Record<string, any>`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="value" type="unknown" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="boolean"}
  Returns `true` if the value is a plain object, otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
