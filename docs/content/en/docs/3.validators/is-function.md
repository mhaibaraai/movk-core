---
title: isFunction
description: A TypeScript type guard that checks whether a value is callable, narrowing it to a function type so you can safely invoke it in your code.
seo:
  title: isFunction
  description: A TypeScript type guard that checks whether a value is callable, narrowing it to a function type so you can safely invoke it in your code.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isFunction.ts
---

## Usage

Check whether a value is a function. This is a TypeScript type guard function.

```ts
import { isFunction } from '@movk/core'

isFunction(() => {}) // => true
isFunction(Math.abs) // => true
isFunction({}) // => false
```

## API

`isFunction(value: any): value is (...args: any[]) => any`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="value" type="any" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="boolean"}
  Returns `true` if the value is a function, otherwise `false`.
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
