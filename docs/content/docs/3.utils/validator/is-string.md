---
title: isString
description: 检查一个值是否为字符串。
---

## `isString`

检查一个值是否为字符串。这是一个 TypeScript 类型保护函数。

### 用法

```ts
import { isString } from '@movk/core'

isString('hello')   //=> true
isString('')        //=> true
isString(123)       //=> false
```

### API

`isString(value: any): value is string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值为字符串，则返回 `true`，否则返回 `false`。
  ::
::
