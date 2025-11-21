---
title: throttle
description: 创建一个节流函数，在指定时间间隔内最多只执行一次。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/async/throttle.ts
---

## `throttle`

`throttle` (节流) 函数创建一个在指定时间间隔内最多只执行一次的函数。这对于处理高频触发的事件（如滚动、窗口大小调整）非常有用，可以防止函数过于频繁地执行。

### 用法

```ts
import { throttle } from '@movk/core'

// 创建一个每 100ms 最多执行一次的节流函数
const throttledScrollHandler = throttle(() => {
  console.log('窗口正在滚动...')
}, 100)

window.addEventListener('scroll', throttledScrollHandler)
// 即使滚动事件触发了 100 次，控制台也只会在每 100ms 的间隔内输出一次。
```

### API

`throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="func" type="Function" required}
  需要进行节流处理的函数。
  ::
  ::field{name="limit" type="number" required}
  节流的时间间隔（毫秒）。
  ::
::

#### 返回值

::field-group
  ::field{name="Function"}
  返回一个经过节流处理的新函数。
  ::
::
