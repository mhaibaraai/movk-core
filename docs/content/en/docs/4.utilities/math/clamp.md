---
title: clamp
description: Restrict a number to a closed interval, automatically swapping the bounds when they are passed in reverse order.
seo:
  title: clamp
  description: Restrict a number to a closed interval, automatically swapping the bounds when they are passed in reverse order.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/math/clamp.ts
---

## Usage

`clamp` restricts a number to the closed interval `[min, max]`, returning the nearest bound when the value falls outside it.

```ts
import { clamp } from '@movk/core'

clamp(5, 0, 10) // 5
clamp(15, 0, 10) // 10
clamp(-5, 0, 10) // 0
```

### Bounds Swap Automatically

When `min` is greater than `max`, the bounds are silently swapped, so callers do not have to normalize the argument order. This is also what allows [`mapRange`](/en/docs/utilities/math/map-range) to accept a reversed output range.

```ts
clamp(15, 10, 0) // 10
clamp(-5, 10, 0) // 0
```

### Edge Cases

```ts
clamp(5, 3, 3) // 3 (interval collapsed to a point)
clamp(1e10, 0, Number.POSITIVE_INFINITY) // 1e10
clamp(Number.NaN, 0, 10) // NaN
```

## API

### `clamp(value, min, max)`{lang="ts-type"}

Restrict a number to a closed interval.

### Parameters

::field-group
  ::field{name="value" type="number" required}
  The number to clamp.
  ::

  ::field{name="min" type="number" required}
  One bound of the interval.
  ::

  ::field{name="max" type="number" required}
  The other bound of the interval.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="number"}
  The value constrained to the interval. Returns `NaN` when `value` is `NaN`.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/math"}
