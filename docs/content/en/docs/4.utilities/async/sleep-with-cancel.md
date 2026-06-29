---
title: sleepWithCancel
description: Return a cancellable delay: a promise plus a cancel function so you can abort a pending timeout before it resolves in async flows.
seo:
  title: sleepWithCancel
  description: Return a cancellable delay: a promise plus a cancel function so you can abort a pending timeout before it resolves in async flows.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/sleepWithCancel.ts
---

## Usage

`sleepWithCancel` creates a cancellable delay, returning both a promise and a cancel function.

```ts
import { sleepWithCancel } from '@movk/core'

const { promise, cancel } = sleepWithCancel(5000)

// Cancel the delay from elsewhere
setTimeout(() => {
  cancel() // Abort the delay
}, 2000)

try {
  await promise
  console.log('Executed after 5 seconds')
}
catch (error) {
  console.log('Delay was cancelled')
}
```

## API

### `sleepWithCancel(ms)`{lang="ts-type"}

Return a cancellable delay: a promise and a cancel function.

### Parameters

::field-group
  ::field{name="ms" type="number" required}
  The delay duration in milliseconds.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="{ promise: Promise<void>; cancel: () => void }"}
  An object containing the delay promise and a cancel function.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
