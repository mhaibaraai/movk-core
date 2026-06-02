---
title: lengthToPx
description: 将 CSS 长度字符串折算为像素数值，支持 px、rem、em 单位
seo:
  title: lengthToPx
  description: Convert a CSS length string such as px, rem, or em into a pixel number, with a configurable fallback for unrecognized values.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/css/length.ts
---

## 用法

`lengthToPx` 函数将 CSS 长度字符串折算为像素数值。支持 `px`、`rem`、`em` 单位，其中 `rem`/`em` 按 16 折算；无单位时视为 `px`；无法识别时回退到 `fallback`。

```ts
import { lengthToPx } from '@movk/core'

lengthToPx('24px') // 24
lengthToPx('1rem') // 16
lengthToPx('2.5em') // 40
lengthToPx('16') // 16（无单位视为 px）
```

### 自定义回退值

```ts
lengthToPx('auto') // 16（默认 fallback）
lengthToPx('auto', 0) // 0
lengthToPx('', 8) // 8（空字符串回退）
```

## API

### `lengthToPx(value, fallback?)`{lang="ts-type"}

将 CSS 长度字符串折算为像素数值。

### 参数

::field-group
  ::field{name="value" type="string" required}
  CSS 长度字符串，如 `'16px'`、`'1rem'`、`'2.5em'`。
  ::

  ::field{name="fallback" type="number"}
  无法识别时的回退像素值，默认 `16`。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="number"}
  折算后的像素数值。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/css"}
