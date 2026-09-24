---
title: isDeepEqual
description: Structurally compare plain data (primitives, arrays, own enumerable keys) so fresh literals with identical values count as equal.
seo:
  title: isDeepEqual
  description: Structurally compare plain data (primitives, arrays, own enumerable keys) so fresh literals with identical values count as equal.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/isDeepEqual.ts
navigation.badge: v1.5.0
---

## Usage

`isDeepEqual` recursively compares primitives, arrays and own enumerable keys, which suits deciding whether plain data such as options has really changed.

```ts
import { isDeepEqual } from '@movk/core'

isDeepEqual({ a: [1, 2] }, { a: [1, 2] }) // true
isDeepEqual({ a: { b: 1 } }, { a: { b: 2 } }) // false
isDeepEqual({ a: 1 }, { a: 1, b: undefined }) // false
isDeepEqual(Number.NaN, Number.NaN) // true
```

::note
Compared with [`equalsBy`](/en/docs/helpers/object/equals-by): `equalsBy` decides whether two values refer to the same item (by id and similar keys), while `isDeepEqual` decides whether two pieces of data have identical content.
::

::warning
Internal state of built-ins such as `Map`, `Set`, `Date` or class instances is not compared, and circular references are not supported. Use it for plain data only.
::

## API

### `isDeepEqual(a, b)`{lang="ts-type"}

Structural deep comparison for plain data.

### Parameters

::field-group
  ::field{name="a" type="unknown" required}
  Value to compare.
  ::

  ::field{name="b" type="unknown" required}
  Value to compare.
  ::
::

### Returns

::field-group
  ::field{name="Returns" type="boolean"}
  `true` when structure and values are identical.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
