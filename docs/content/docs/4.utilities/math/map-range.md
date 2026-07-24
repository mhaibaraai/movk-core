---
title: mapRange
description: 把数值从一个区间线性映射到另一个区间，可选钳制到输出区间
seo:
  title: mapRange
  description: Linearly map a number from one range to another, with optional clamping to the output range.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/math/mapRange.ts
---

## 用法

`mapRange` 函数按线性比例把数值从输入区间映射到输出区间。

```ts
import { mapRange } from '@movk/core'

mapRange(5, [0, 10], [0, 100]) // 50
mapRange(0, [0, 10], [4, 20]) // 4
mapRange(10, [0, 10], [4, 20]) // 20
mapRange(0, [-10, 10], [0, 100]) // 50
```

### 越界外推与钳制

默认对越界输入线性外推；传 `{ clamp: true }` 则把结果限制在输出区间内。

```ts
mapRange(20, [0, 10], [0, 100]) // 200
mapRange(-5, [0, 10], [0, 100]) // -50

mapRange(20, [0, 10], [0, 100], { clamp: true }) // 100
mapRange(-5, [0, 10], [0, 100], { clamp: true }) // 0
```

### 倒序输出区间

输出区间允许倒序书写，用于「值越大结果越小」的映射，钳制同样成立。

```ts
mapRange(0, [0, 10], [20, 4]) // 20
mapRange(5, [0, 10], [20, 4]) // 12
mapRange(10, [0, 10], [20, 4]) // 4
```

### 输入区间退化

`inRange` 两端相等时比例无从确定，返回输出区间的首端，而不是除零得到的 `Infinity` 或 `NaN`。

```ts
mapRange(5, [3, 3], [10, 20]) // 10
```

### 典型场景

按度数映射节点尺寸时，超出统计区间的极值不应撑破视觉上限：

```ts
const size = mapRange(degree, [minDegree, maxDegree], [4, 20], { clamp: true })
```

## API

### `mapRange(value, inRange, outRange, options?)`{lang="ts-type"}

把数值从一个区间线性映射到另一个区间。

### 参数

::field-group
  ::field{name="value" type="number" required}
  待映射的数值。
  ::

  ::field{name="inRange" type="readonly [number, number]" required}
  输入区间 `[min, max]`，允许倒序。
  ::

  ::field{name="outRange" type="readonly [number, number]" required}
  输出区间 `[min, max]`，允许倒序。
  ::

  ::field{name="options" type="MapRangeOptions"}
  映射行为配置项。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="number"}
  映射后的数值。
  ::
::

### MapRangeOptions

::field-group
  ::field{name="clamp" type="boolean"}
  是否把结果钳制到 `outRange` 区间内，默认 `false`。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/math"}
