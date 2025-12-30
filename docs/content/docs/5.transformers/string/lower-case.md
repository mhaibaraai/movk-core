---
title: lowerCase
description: 将字符串转换为全小写，单词间用空格分隔 (hello world)。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/string/case.ts
---

## `lowerCase`

将字符串转换为小写格式，单词之间用空格分隔。

### 用法

```ts
import { lowerCase } from '@movk/core'

lowerCase('firstName') // => 'first name'
lowerCase('First_Name') // => 'first name'
lowerCase('FIRST-NAME') // => 'first name'
lowerCase('XMLHttpRequest') // => 'xml http request'
```

### API

`lowerCase(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回小写格式的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utils/string"}
