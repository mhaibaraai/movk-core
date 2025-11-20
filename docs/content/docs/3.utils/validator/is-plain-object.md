---
title: isPlainObject
description: 检查一个值是否为“纯”对象（由 {} 或 new Object() 创建）。
---

## `isPlainObject`

检查一个值是否为“纯”对象（由 `{}` 或 `new Object()` 创建），排除数组、`null`、以及其他非对象类型（如 `new Date()`）。这是一个 TypeScript 类型保护函数。

### 用法

```ts
import { isPlainObject } from '@movk/core'

isPlainObject({})         //=> true
isPlainObject(new Object()) //=> true
isPlainObject(new Date())   //=> false
isPlainObject([])           //=> false
```

### API

`isPlainObject(value: unknown): value is Record<string, any>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="unknown" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值为纯对象，则返回 `true`，否则返回 `false`。
  ::
::
