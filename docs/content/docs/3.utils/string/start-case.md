---
title: startCase
description: 将字符串转换为标题式 (Hello World)。
---

## `startCase`

将字符串转换为Start Case格式（每个单词首字母大写，用空格分隔）。

### 用法

```ts
import { startCase } from '@movk/core'

startCase('firstName')      //=> 'First Name'
startCase('first_name')     //=> 'First Name'
startCase('first-name')     //=> 'First Name'
startCase('XMLHttpRequest') //=> 'XML Http Request'
```

### API

`startCase(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回标题式格式的字符串。
  ::
::
