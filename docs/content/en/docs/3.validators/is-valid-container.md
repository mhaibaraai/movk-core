---
title: isValidContainer
description: Check whether a value is a valid container, an object or array including Proxy instances, before iterating or assigning nested keys.
seo:
  title: isValidContainer
  description: Check whether a value is a valid container, an object or array including Proxy instances, before iterating or assigning nested keys.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isValidContainer.ts
---

## Usage

`isValidContainer` checks whether a value is a valid container type (object or array).

Unlike `isObject`, `isValidContainer` accepts both objects and arrays as valid containers, and supports Vue 3 Proxy objects and Proxy arrays.

```ts
import { isValidContainer } from '@movk/core'

isValidContainer({}) // true
isValidContainer([]) // true
isValidContainer(new Proxy({}, {})) // true
isValidContainer(null) // false
isValidContainer('string') // false
isValidContainer(123) // false
```

## API

### `isValidContainer(value)`{lang="ts-type"}

Check whether a value is a valid container type (object or array).

### Parameters

::field-group
  ::field{name="value" type="any" required}
  The value to check.
  ::
::

### Returns

::field-group
  ::field{name="Returns" type="boolean"}
  Whether the value is a valid container (object or array).
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
