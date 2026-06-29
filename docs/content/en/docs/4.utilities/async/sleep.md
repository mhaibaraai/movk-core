---
title: sleep
description: Return a promise that resolves after the given number of milliseconds, letting you pause an async flow with a simple await expression.
seo:
  title: sleep
  description: Return a promise that resolves after the given number of milliseconds, letting you pause an async flow with a simple await expression.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/sleep.ts
---

## Usage

`sleep` returns a promise that resolves after the specified number of milliseconds, pausing execution of an async function.

```ts
import { sleep } from '@movk/core'

// Wait 1 second before continuing
await sleep(1000)
console.log('Executed after 1 second')

// Using inside an async function
async function delayedOperation() {
  console.log('Start')
  await sleep(500)
  console.log('Executed after 500ms')
}
```

## API

### `sleep(ms)`{lang="ts-type"}

Return a promise that resolves after the given number of milliseconds.

### Parameters

::field-group
  ::field{name="ms" type="number" required}
  The delay duration in milliseconds.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="Promise<void>"}
  A promise that resolves after the delay.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
