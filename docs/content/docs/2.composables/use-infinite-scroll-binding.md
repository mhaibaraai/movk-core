---
title: useInfiniteScrollBinding
description: 对 vueuse useInfiniteScroll 的薄包装，允许 canLoadMore 以 ref/getter 形式传入，并透传 direction / interval 等原生选项。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useInfiniteScrollBinding.ts
---

## 用法

`useInfiniteScrollBinding` 在 vueuse 的 [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/) 之上做了两点优化：

1. `canLoadMore` 接受 `MaybeRefOrGetter<boolean>`，调用方可以直接传 ref 或 getter，无需手写 `() => ...` 闭包。
2. 返回值原样透传 `UseInfiniteScrollReturn`（`isLoading` / `reset`），并显式暴露 `direction` / `interval` 选项。

```vue
<script setup lang="ts">
import { useInfiniteScrollBinding } from '@movk/core'
import { ref, useTemplateRef } from 'vue'

const listRef = useTemplateRef<HTMLElement>('listRef')
const hasMore = ref(true)

async function fetchNextPage() {
  // 加载下一页
}

const { isLoading, reset } = useInfiniteScrollBinding(
  () => listRef.value,
  {
    distance: 100,
    canLoadMore: hasMore,
    onLoadMore: fetchNextPage,
  },
)
</script>

<template>
  <div ref="listRef" class="overflow-auto">
    <!-- list items -->
  </div>
</template>
```

::warning
`distance` 在 vueuse 内部仅在初始化阶段读取一次，运行时变化不会生效。因此即便参数类型为 `MaybeRefOrGetter<number>`，也只是为了方便调用方写法，不代表真正的响应式行为。
::

## API

### `useInfiniteScrollBinding(getEl, options)`{lang="ts-type"}

### 参数

::field-group
  ::field{name="getEl" type="() => HTMLElement | null | undefined" required}
  返回滚动容器元素的 getter。
  ::
  ::field{name="options" type="UseInfiniteScrollBindingOptions" required}
  配置项。
  ::
::

#### `UseInfiniteScrollBindingOptions`

::field-group
  ::field{name="distance" type="MaybeRefOrGetter<number>" required}
  触发加载的距离阈值（px）。
  ::
  ::field{name="onLoadMore" type="() => void | Promise<void>" required}
  到达阈值时触发的回调，支持异步。
  ::
  ::field{name="canLoadMore" type="MaybeRefOrGetter<boolean>" default="() => true"}
  是否允许继续加载。
  ::
  ::field{name="direction" type="'top' | 'bottom' | 'left' | 'right'" default="'bottom'"}
  触发方向。
  ::
  ::field{name="interval" type="number" default="100"}
  两次触发之间的最小间隔（ms）。
  ::
::

### 返回值

::field-group
  ::field{name="isLoading" type="ComputedRef<boolean>"}
  vueuse 内部的加载状态。
  ::
  ::field{name="reset" type="() => void"}
  重置内部状态，便于在数据源切换时重新启用无限滚动。
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
