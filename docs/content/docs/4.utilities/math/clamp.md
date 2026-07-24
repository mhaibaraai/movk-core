---
title: clamp
description: 将数值钳制到闭区间内，两端顺序颠倒时自动交换
seo:
  title: clamp
  description: Restrict a number to a closed interval, automatically swapping the bounds when they are passed in reverse order.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/math/clamp.ts
---

## 用法

`clamp` 函数把数值限制在 `[min, max]` 闭区间内，越界时返回最近的边界值。

```ts
import { clamp } from '@movk/core'

clamp(5, 0, 10) // 5
clamp(15, 0, 10) // 10
clamp(-5, 0, 10) // 0
```

### 两端自动交换

`min` 大于 `max` 时静默交换，调用方无需保证入参顺序。这也是 [`mapRange`](/docs/utilities/math/map-range) 能支持倒序输出区间的前提。

```ts
clamp(15, 10, 0) // 10
clamp(-5, 10, 0) // 0
```

### 边界情况

```ts
clamp(5, 3, 3) // 3（区间退化为单点）
clamp(1e10, 0, Number.POSITIVE_INFINITY) // 1e10
clamp(Number.NaN, 0, 10) // NaN
```

## API

### `clamp(value, min, max)`{lang="ts-type"}

将数值钳制到闭区间内。

### 参数

::field-group
  ::field{name="value" type="number" required}
  待钳制的数值。
  ::

  ::field{name="min" type="number" required}
  区间一端。
  ::

  ::field{name="max" type="number" required}
  区间另一端。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="number"}
  落入区间内的数值。`value` 为 `NaN` 时返回 `NaN`。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/math"}
