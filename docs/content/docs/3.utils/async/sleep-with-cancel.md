---
title: sleepWithCancel
description: 创建一个可取消的延迟。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/async/sleep.ts
---

## `sleepWithCancel`

`sleepWithCancel` 是 `sleep` 的可取消版本。它返回一个包含 `promise` 和 `cancel` 函数的对象，允许您在延迟结束前中止它。

### 用法

```ts
import { sleepWithCancel } from '@movk/core'

const { promise, cancel } = sleepWithCancel(5000)

// 在 2 秒后取消延迟
setTimeout(() => {
  console.log('延迟被取消了！')
  cancel()
}, 2000)

try {
  await promise
  console.log('此消息不会被打印，因为延迟已被取消。')
} catch (error) {
  console.error(error.message) // "Sleep was cancelled"
}
```

### API

`sleepWithCancel(ms: number): { promise: Promise<void>, cancel: () => void }`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="ms" type="number" required}
  需要延迟的毫秒数。
  ::
::

#### 返回值

返回一个对象，包含：
::field-group
  ::field{name="promise" type="Promise<void>"}
  一个 `Promise`，如果延迟正常完成则 `resolve`，如果被取消则 `reject`。
  ::
  ::field{name="cancel" type="() => void"}
  一个无参数函数，调用它会立即 `reject` 对应的 `promise`。
  ::
::
