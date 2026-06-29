---
title: useOverflowDetection
description: A Vue composable that detects truncated text via ResizeObserver and MutationObserver, supporting single-line ellipsis and multi-line clamping.
seo:
  title: useOverflowDetection
  description: A Vue composable that detects truncated text via ResizeObserver and MutationObserver, supporting single-line ellipsis and multi-line clamping.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useOverflowDetection.ts
---

## Usage

`useOverflowDetection` detects whether an element's text content is truncated (typical cases: table cell ellipsis, card title multi-line clamping) and automatically re-checks when the size or content changes.

It automatically selects the measurement strategy based on the element's `computed style`:

- `display: -webkit-box` + `webkit-line-clamp` → multi-line mode, measures height with a vertical probe
- `white-space: nowrap` + `text-overflow: ellipsis` → single-line mode, measures width with a horizontal probe
- Other cases → compares both `scroll*` and `client*`

Callers only need to apply the correct truncate / line-clamp CSS to the element; no additional configuration is required.

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
Calling this in an SSR environment is safe: `check()` detects whether `window` exists and returns early if not, keeping the reactive state at its initial `false` value.
::

## API

### `useOverflowDetection(target, options?)`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="target" type="MaybeComputedElementRef<HTMLElement | null | undefined>" required}
  The target element reference, supports `ref` / template `ref` / getter.
  ::
  ::field{name="options" type="UseOverflowDetectionOptions"}
  Optional configuration.
  ::
::

#### `UseOverflowDetectionOptions`

::field-group
  ::field{name="observeContent" type="boolean" default="true"}
  Whether to observe content changes (`MutationObserver`). Can be set to `false` for static content to reduce overhead.
  ::
::

### Returns

::field-group
  ::field{name="overflowed" type="ComputedRef<boolean>"}
  Whether overflow occurs in any direction (= `overflowX || overflowY`).
  ::
  ::field{name="overflowX" type="Readonly<Ref<boolean>>"}
  Whether the content is truncated horizontally.
  ::
  ::field{name="overflowY" type="Readonly<Ref<boolean>>"}
  Whether the content is truncated vertically.
  ::
  ::field{name="check" type="() => void"}
  Manually triggers a re-detection.
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
