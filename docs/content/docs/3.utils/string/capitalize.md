---
title: capitalize
description: 将字符串的第一个字母转换为大写，其余字母转换为小写。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/string/case.ts
---

## `capitalize`

将字符串的第一个字母转换为大写，其余字母转换为小写。

### 用法

```ts
import { capitalize } from '@movk/core'

capitalize('foo bar') // => 'Foo bar'
capitalize('FOO BAR') // => 'Foo bar'
```

### API

`capitalize(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回首字母大写的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utils/string"}
