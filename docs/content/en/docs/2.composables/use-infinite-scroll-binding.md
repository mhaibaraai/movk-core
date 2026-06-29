---
title: useInfiniteScrollBinding
description: A Vue composable wrapping VueUse useInfiniteScroll, adding a reactive canLoadMore guard so you control exactly when more items are fetched.
seo:
  title: useInfiniteScrollBinding
  description: A Vue composable wrapping VueUse useInfiniteScroll, adding a reactive canLoadMore guard so you control exactly when more items are fetched.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/composables/useInfiniteScrollBinding.ts
---

## Usage

`useInfiniteScrollBinding` builds on top of VueUse's [`useInfiniteScroll`](https://vueuse.org/core/useInfiniteScroll/) with two improvements:

1. `canLoadMore` accepts `MaybeRefOrGetter<boolean>`, so callers can pass a ref or getter directly without writing a `() => ...` closure.
2. The return value passes through `UseInfiniteScrollReturn` (`isLoading` / `reset`) as-is, and explicitly exposes the `direction` / `interval` options.

```vue
<script setup lang="ts">
import { useInfiniteScrollBinding } from '@movk/core'
import { ref, useTemplateRef } from 'vue'

const listRef = useTemplateRef<HTMLElement>('listRef')
const hasMore = ref(true)

async function fetchNextPage() {
  // Load the next page
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
`distance` is only read once internally by VueUse during initialization; runtime changes have no effect. Therefore, even though the parameter type is `MaybeRefOrGetter<number>`, this is only for caller convenience and does not represent true reactive behavior.
::

## API

### `useInfiniteScrollBinding(getEl, options)`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="getEl" type="() => HTMLElement | null | undefined" required}
  A getter that returns the scroll container element.
  ::
  ::field{name="options" type="UseInfiniteScrollBindingOptions" required}
  Configuration options.
  ::
::

#### `UseInfiniteScrollBindingOptions`

::field-group
  ::field{name="distance" type="MaybeRefOrGetter<number>" required}
  The distance threshold (in px) that triggers loading.
  ::
  ::field{name="onLoadMore" type="() => void | Promise<void>" required}
  The callback triggered when the threshold is reached. Supports async.
  ::
  ::field{name="canLoadMore" type="MaybeRefOrGetter<boolean>" default="() => true"}
  Whether loading more is allowed.
  ::
  ::field{name="direction" type="'top' | 'bottom' | 'left' | 'right'" default="'bottom'"}
  The scroll direction that triggers loading.
  ::
  ::field{name="interval" type="number" default="100"}
  The minimum interval between two triggers (in ms).
  ::
::

### Returns

::field-group
  ::field{name="isLoading" type="ComputedRef<boolean>"}
  The loading state managed internally by VueUse.
  ::
  ::field{name="reset" type="() => void"}
  Resets the internal state, useful for re-enabling infinite scroll when the data source changes.
  ::
::

## Changelog

:commit-changelog{prefix="composables"}
