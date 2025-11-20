---
title: sleep
description: 返回一个在指定时间后解析的 Promise，用于创建延迟。
---

## `sleep`

`sleep` 函数返回一个在指定时间后解析的 `Promise`，可以方便地在 `async` 函数中创建延迟。

### 用法

```ts
import { sleep } from '@movk/core'

async function showMessageWithDelay() {
  console.log('你好！')
  await sleep(2000) // 等待 2 秒
  console.log('2秒后，我再次出现。')
}

showMessageWithDelay()
```

### API

`sleep(ms: number): Promise<void>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="ms" type="number" required}
  需要延迟的毫秒数。
  ::
::

#### 返回值

::field-group
  ::field{name="Promise<void>"}
  返回一个在指定时间后完成的 Promise。
  ::
::
