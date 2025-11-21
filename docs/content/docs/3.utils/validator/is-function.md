---
title: isFunction
description: 检查一个值是否为函数。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/validator/index.ts
---

## `isFunction`

检查一个值是否为函数。这是一个 TypeScript 类型保护函数。

### 用法

```ts
import { isFunction } from '@movk/core'

isFunction(() => {})    //=> true
isFunction(Math.abs)    //=> true
isFunction({})          //=> false
```

### API

`isFunction(value: any): value is (...args: any[]) => any`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值为函数，则返回 `true`，否则返回 `false`。
  ::
::
