---
title: isValidContainer
description: 检查一个值是否为有效的容器（对象或数组）。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/path.ts
---

## `isValidContainer`

检查一个值是否为有效的容器类型（对象或数组）。它会正确处理 `null`（返回 `false`）以及 Vue 3 的 `Proxy` 对象。

### 用法

```ts
import { isValidContainer } from '@movk/core'

isValidContainer({})              // true
isValidContainer([])              // true
isValidContainer(new Proxy({}, {})) // true
isValidContainer(null)            // false
isValidContainer('string')        // false
isValidContainer(123)             // false
```

### API

`isValidContainer(value: any): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值为对象或数组，则返回 `true`，否则返回 `false`。
  ::
::

## Changelog

:commit-changelog{prefix="utils/path"}
