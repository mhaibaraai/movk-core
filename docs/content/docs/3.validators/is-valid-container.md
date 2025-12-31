---
title: isValidContainer
description: 检查值是否为有效的容器类型（对象或数组）
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/validators/isValidContainer.ts
---

## 用法

`isValidContainer` 函数用于检查值是否为有效的容器类型（对象或数组）。

与 `isObject` 不同，`isValidContainer` 同时接受对象和数组作为有效容器，并支持 Vue 3 的 Proxy 对象和 Proxy 数组。

```ts
import { isValidContainer } from '@movk/core'

isValidContainer({}) // true
isValidContainer([]) // true
isValidContainer(new Proxy({}, {})) // true
isValidContainer(null) // false
isValidContainer('string') // false
isValidContainer(123) // false
```

## API

### `isValidContainer(value)`{lang="ts-type"}

检查值是否为有效的容器类型（对象或数组）。

### 参数

::field-group
  ::field{name="value" type="any" required}
  待检查的值。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  是否为有效容器（对象或数组）。
  ::
::

## Changelog

:commit-changelog{prefix="validators"}
