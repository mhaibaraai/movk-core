---
title: upperCase
description: 将字符串转换为全大写，单词间用空格分隔 (HELLO WORLD)。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/string/case.ts
---

## `upperCase`

将字符串转换为大写格式，单词之间用空格分隔。

### 用法

```ts
import { upperCase } from '@movk/core'

upperCase('firstName')      //=> 'FIRST NAME'
upperCase('first_name')     //=> 'FIRST NAME'
upperCase('first-name')     //=> 'FIRST NAME'
upperCase('XMLHttpRequest') //=> 'XML HTTP REQUEST'
```

### API

`upperCase(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回大写格式的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utils/string"}
