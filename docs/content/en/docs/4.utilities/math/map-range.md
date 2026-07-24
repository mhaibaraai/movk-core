---
title: mapRange
description: Linearly map a number from one range to another, with optional clamping to the output range.
seo:
  title: mapRange
  description: Linearly map a number from one range to another, with optional clamping to the output range.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/math/mapRange.ts
---

## Usage

`mapRange` maps a number from an input range to an output range, keeping the ratio linear.

```ts
import { mapRange } from '@movk/core'

mapRange(5, [0, 10], [0, 100]) // 50
mapRange(0, [0, 10], [4, 20]) // 4
mapRange(10, [0, 10], [4, 20]) // 20
mapRange(0, [-10, 10], [0, 100]) // 50
```

### Extrapolation and Clamping

Out-of-range inputs are extrapolated linearly by default. Pass `{ clamp: true }` to constrain the result to the output range.

```ts
mapRange(20, [0, 10], [0, 100]) // 200
mapRange(-5, [0, 10], [0, 100]) // -50

mapRange(20, [0, 10], [0, 100], { clamp: true }) // 100
mapRange(-5, [0, 10], [0, 100], { clamp: true }) // 0
```

### Reversed Output Range

The output range may be written in reverse for "larger input, smaller result" mappings. Clamping still applies.

```ts
mapRange(0, [0, 10], [20, 4]) // 20
mapRange(5, [0, 10], [20, 4]) // 12
mapRange(10, [0, 10], [20, 4]) // 4
```

### Collapsed Input Range

When both ends of `inRange` are equal the ratio is undefined, so the first end of the output range is returned instead of an `Infinity` or `NaN` produced by dividing by zero.

```ts
mapRange(5, [3, 3], [10, 20]) // 10
```

### Typical Use Case

When mapping node degree to node size, extreme values outside the measured range should not break the visual upper bound:

```ts
const size = mapRange(degree, [minDegree, maxDegree], [4, 20], { clamp: true })
```

## API

### `mapRange(value, inRange, outRange, options?)`{lang="ts-type"}

Linearly map a number from one range to another.

### Parameters

::field-group
  ::field{name="value" type="number" required}
  The number to map.
  ::

  ::field{name="inRange" type="readonly [number, number]" required}
  Input range `[min, max]`; may be reversed.
  ::

  ::field{name="outRange" type="readonly [number, number]" required}
  Output range `[min, max]`; may be reversed.
  ::

  ::field{name="options" type="MapRangeOptions"}
  Mapping behavior options.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="number"}
  The mapped number.
  ::
::

### MapRangeOptions

::field-group
  ::field{name="clamp" type="boolean"}
  Whether to constrain the result to `outRange`. Defaults to `false`.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/math"}
