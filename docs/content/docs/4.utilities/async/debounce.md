---
title: debounce
description: 防抖函数，在指定时间内多次触发只执行最后一次
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/async/debounce.ts
---

## 用法

`debounce` 函数用于防抖处理，在指定时间内多次触发只执行最后一次。

```ts
import { debounce } from '@movk/core'

const debouncedSearch = debounce((query: string) => {
  console.log('搜索:', query)
}, 300)

// 连续调用，只有最后一次会执行
debouncedSearch('a')
debouncedSearch('ab')
debouncedSearch('abc') // 只有这次会在300ms后执行
```

## API

### `debounce<T>(func, wait)`{lang="ts-type"}

防抖函数，在指定时间内多次触发只执行最后一次。

### 参数

::field-group
  ::field{name="func" type="T extends (...args: any[]) => any" required}
  需要防抖的函数。
  ::

  ::field{name="wait" type="number" required}
  防抖延迟时间（毫秒）。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="(...args: Parameters<T>) => void"}
  防抖处理后的函数。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/async"}
