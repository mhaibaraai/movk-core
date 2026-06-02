---
title: useOverflowDetection
description: 检测元素文本是否被截断的组合式函数，自动追踪尺寸变化与内容变化，并按水平/垂直方向分别报告溢出状态。
seo:
  title: useOverflowDetection
  description: A Vue composable that detects truncated text via ResizeObserver and MutationObserver, supporting single-line ellipsis and multi-line clamping.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useOverflowDetection.ts
---

## 用法

`useOverflowDetection` 用于判断一个元素的文本内容是否被截断（典型场景：表格单元格的 ellipsis、卡片标题的多行截断），并在尺寸或内容变化时自动重新检测。

它根据元素的 `computed style` 自动选择测量策略：

- `display: -webkit-box` + `webkit-line-clamp` → 多行模式，垂直方向探针测高
- `white-space: nowrap` + `text-overflow: ellipsis` → 单行模式，水平方向探针测宽
- 其他情况 → 同时比较 `scroll*` 与 `client*`

调用方只需在元素上正确应用 truncate / line-clamp CSS，无需额外配置。

```vue
<script setup lang="ts">
import { useOverflowDetection } from '@movk/core'
import { useTemplateRef } from 'vue'

const cellRef = useTemplateRef<HTMLDivElement>('cellRef')
const { overflowed, overflowX, overflowY } = useOverflowDetection(cellRef)
</script>

<template>
  <UTooltip :disabled="!overflowed" :text="text">
    <div ref="cellRef" class="truncate">
      {{ text }}
    </div>
  </UTooltip>
</template>
```

::note
在 SSR 环境中调用是安全的：`check()` 会检测 `window` 是否存在并提前返回，响应式状态保持初始 `false`。
::

## API

### `useOverflowDetection(target, options?)`{lang="ts-type"}

### 参数

::field-group
  ::field{name="target" type="MaybeComputedElementRef<HTMLElement | null | undefined>" required}
  目标元素引用，支持 `ref` / 模板 `ref` / getter。
  ::
  ::field{name="options" type="UseOverflowDetectionOptions"}
  可选配置。
  ::
::

#### `UseOverflowDetectionOptions`

::field-group
  ::field{name="observeContent" type="boolean" default="true"}
  是否监听内容变化（`MutationObserver`）。静态内容场景可设为 `false` 节省开销。
  ::
::

### 返回值

::field-group
  ::field{name="overflowed" type="ComputedRef<boolean>"}
  任一方向溢出（= `overflowX || overflowY`）。
  ::
  ::field{name="overflowX" type="Readonly<Ref<boolean>>"}
  水平方向是否被截断。
  ::
  ::field{name="overflowY" type="Readonly<Ref<boolean>>"}
  垂直方向是否被截断。
  ::
  ::field{name="check" type="() => void"}
  手动触发一次重新检测。
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
