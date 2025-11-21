---
title: camelCase
description: 将字符串转换为驼峰式 (helloWorld)。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/string/case.ts
---

## `camelCase`

将字符串转换为驼峰命名格式（第一个单词小写，后续单词首字母大写）。

### 用法

```ts
import { camelCase } from '@movk/core'

camelCase('First Name')     //=> 'firstName'
camelCase('first_name')     //=> 'firstName'
camelCase('first-name')     //=> 'firstName'
camelCase('XMLHttpRequest') //=> 'xmlHttpRequest'
```

### API

`camelCase(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回驼峰式格式的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utils/string"}
