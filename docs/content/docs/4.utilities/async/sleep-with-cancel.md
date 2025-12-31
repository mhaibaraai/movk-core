---
title: sleepWithCancel
description: 可取消的延迟函数，返回 Promise 和取消函数
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/sleepWithCancel.ts
---

## 用法

`sleepWithCancel` 函数用于创建可取消的延迟，返回 Promise 和取消函数。

```ts
import { sleepWithCancel } from '@movk/core'

const { promise, cancel } = sleepWithCancel(5000)

// 在另一个地方取消延迟
setTimeout(() => {
  cancel() // 取消延迟
}, 2000)

try {
  await promise
  console.log('5秒后执行')
}
catch (error) {
  console.log('延迟被取消')
}
```

## API

### `sleepWithCancel(ms)`{lang="ts-type"}

可取消的延迟函数，返回 Promise 和取消函数。

### 参数

::field-group
  ::field{name="ms" type="number" required}
  延迟时间（毫秒）。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="{ promise: Promise<void>; cancel: () => void }"}
  包含 Promise 和取消函数的对象。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
