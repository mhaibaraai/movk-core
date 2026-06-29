---
title: throttle
description: Create a throttled function that runs at most once per interval, limiting how often expensive handlers fire during rapid events.
seo:
  title: throttle
  description: Create a throttled function that runs at most once per interval, limiting how often expensive handlers fire during rapid events.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/throttle.ts
---

## Usage

`throttle` wraps a function so that it executes at most once within the specified time interval.

```ts
import { throttle } from '@movk/core'

const throttledScroll = throttle((event: Event) => {
  console.log('Scroll event handled')
}, 100)

// Listen to scroll events, executing at most once every 100ms
window.addEventListener('scroll', throttledScroll)
```

## API

### `throttle<T>(func, limit)`{lang="ts-type"}

Create a throttled function that runs at most once per interval.

### Parameters

::field-group
  ::field{name="func" type="T extends (...args: any[]) => any" required}
  The function to throttle.
  ::

  ::field{name="limit" type="number" required}
  The throttle interval in milliseconds.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="(...args: Parameters<T>) => void"}
  The throttled function.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
