---
title: sleep
description: 延迟执行函数，返回一个在指定时间后 resolve 的 Promise
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/sleep.ts
---

## 用法

`sleep` 函数用于延迟执行，返回一个在指定时间后 resolve 的 Promise。

```ts
import { sleep } from '@movk/core'

// 延迟1秒后继续执行
await sleep(1000)
console.log('1秒后执行')

// 在异步函数中使用
async function delayedOperation() {
  console.log('开始')
  await sleep(500)
  console.log('500ms后执行')
}
```

## API

### `sleep(ms)`{lang="ts-type"}

延迟执行函数，返回一个在指定时间后 resolve 的 Promise。

### 参数

::field-group
  ::field{name="ms" type="number" required}
  延迟时间（毫秒）。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="Promise<void>"}
  延迟 Promise。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
