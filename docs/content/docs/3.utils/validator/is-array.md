---
title: isArray
description: 检查一个值是否为数组。
---

## `isArray`

检查一个值是否为数组。这是一个 TypeScript 类型保护函数。

### 用法

```ts
import { isArray } from '@movk/core'

isArray([])         //=> true
isArray([1, 2])     //=> true
isArray({})         //=> false
```

### API

`isArray(value: any): value is any[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值为数组，则返回 `true`，否则返回 `false`。
  ::
::
