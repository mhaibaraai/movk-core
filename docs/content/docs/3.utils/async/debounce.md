---
title: debounce
description: 创建一个防抖函数，在特定延迟后执行。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/async/debounce.ts
---

## `debounce`

`debounce` (防抖) 函数创建一个在特定延迟后执行的函数。如果在延迟期间再次调用，将重置计时器，确保函数只在连续调用的最后一次之后执行。这对于处理输入、搜索建议等场景非常有用。

### 用法

```ts
import { debounce } from '@movk/core'

// 创建一个延迟 300ms 的防抖函数
const debouncedSearch = debounce((query: string) => {
  console.log(`正在搜索: ${query}`)
}, 300)

// 模拟用户快速输入
debouncedSearch('n')
debouncedSearch('nu')
debouncedSearch('nux')
debouncedSearch('nuxt') // 只会输出 "正在搜索: nuxt"
```

### API

`debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="func" type="Function" required}
  需要进行防抖处理的函数。
  ::
  ::field{name="wait" type="number" required}
  防抖的延迟时间（毫秒）。
  ::
::

#### 返回值

::field-group
  ::field{name="Function"}
  返回一个经过防抖处理的新函数。
  ::
::

## Changelog

:commit-changelog{prefix="utils/async"}
