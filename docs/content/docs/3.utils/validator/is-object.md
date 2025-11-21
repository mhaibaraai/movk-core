---
title: isObject
description: 检查一个值是否为对象，并排除 null 和数组。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/validator/index.ts
---

## `isObject`

检查一个值是否为对象（`{}`），并排除 `null` 和数组。这是一个 TypeScript 类型保护函数。

### 用法

```ts
import { isObject } from '@movk/core'

isObject({}) // => true
isObject([]) // => false
isObject(null) // => false
isObject('hello') // => false
```

### API

`isObject(value: any): value is object`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值为对象（且非 `null`、非数组），则返回 `true`，否则返回 `false`。
  ::
::

## Changelog

:commit-changelog{prefix="utils/validator"}
