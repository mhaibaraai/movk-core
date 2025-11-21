---
title: isNumber
description: 检查一个值是否为数字，并排除 NaN。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/validator/index.ts
---

## `isNumber`

检查一个值是否为数字，并排除 `NaN`。这是一个 TypeScript 类型保护函数。

### 用法

```ts
import { isNumber } from '@movk/core'

isNumber(123) // => true
isNumber(0) // => true
isNumber(Number.NaN) // => false
isNumber('123') // => false
```

### API

`isNumber(value: any): value is number`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="value" type="any" required}
  需要检查的值。
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果值为有效的数字（非 `NaN`），则返回 `true`，否则返回 `false`。
  ::
::

## Changelog

:commit-changelog{prefix="utils/validator"}
