---
title: throttle
description: 节流函数，在指定时间内多次触发只执行第一次
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/throttle.ts
---

## 用法

`throttle` 函数用于节流处理，在指定时间内多次触发只执行第一次。

```ts
import { throttle } from '@movk/core'

const throttledScroll = throttle((event: Event) => {
  console.log('滚动事件处理')
}, 100)

// 监听滚动事件，每100ms最多执行一次
window.addEventListener('scroll', throttledScroll)
```

## API

### `throttle<T>(func, limit)`{lang="ts-type"}

节流函数，在指定时间内多次触发只执行第一次。

### 参数

::field-group
  ::field{name="func" type="T extends (...args: any[]) => any" required}
  需要节流的函数。
  ::

  ::field{name="limit" type="number" required}
  节流时间间隔（毫秒）。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="(...args: Parameters<T>) => void"}
  节流处理后的函数。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
