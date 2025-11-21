---
title: isEmpty
description: 检查一个值是否为空（null、undefined、空字符串、空数组、空对象）。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/validator/index.ts
---

## `isEmpty`

检查一个值是否为空。被视为空的值包括：
- `null`
- `undefined`
- 空字符串 (`''`)
- 空数组 (`[]`)
- 空对象 (`{}`)

### 用法

```ts
import { isEmpty } from '@movk/core'

isEmpty(null)       //=> true
isEmpty('')         //=> true
isEmpty([])         //=> true
isEmpty({})         //=> true

isEmpty(0)          //=> false
isEmpty('hello')    //=> false
isEmpty([1])        //=> false
```

### API

`isEmpty(value: any): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值被视为空，则返回 `true`，否则返回 `false`。
  ::
::

## Changelog

:commit-changelog{prefix="utils/validator"}
