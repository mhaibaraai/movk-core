---
title: debounce
description: Create a debounced function that delays invoking the callback until the wait time elapses since the last call, ideal for input and resize handlers.
seo:
  title: debounce
  description: Create a debounced function that delays invoking the callback until the wait time elapses since the last call, ideal for input and resize handlers.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/debounce.ts
---

## Usage

`debounce` wraps a function so that it is only invoked after the specified wait time has elapsed since the last call.

```ts
import { debounce } from '@movk/core'

const debouncedSearch = debounce((query: string) => {
  console.log('Search:', query)
}, 300)

// Rapid calls — only the last one executes
debouncedSearch('a')
debouncedSearch('ab')
debouncedSearch('abc') // Only this call runs, after 300ms
```

## API

### `debounce<T>(func, wait)`{lang="ts-type"}

Create a debounced function that delays invocation until the wait time elapses since the last call.

### Parameters

::field-group
  ::field{name="func" type="T extends (...args: any[]) => any" required}
  The function to debounce.
  ::

  ::field{name="wait" type="number" required}
  The debounce delay in milliseconds.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="(...args: Parameters<T>) => void"}
  The debounced function.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
