---
title: pascalCase
description: 将字符串转换为帕斯卡式 (HelloWorld)。
---

## `pascalCase`

将字符串转换为帕斯卡命名格式（PascalCase，每个单词首字母大写）。

### 用法

```ts
import { pascalCase } from '@movk/core'

pascalCase('firstName')     //=> 'FirstName'
pascalCase('first_name')    //=> 'FirstName'
pascalCase('first-name')    //=> 'FirstName'
pascalCase('XMLHttpRequest')//=> 'XmlHttpRequest'
```

### API

`pascalCase(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回帕斯卡式格式的字符串。
  ::
::
