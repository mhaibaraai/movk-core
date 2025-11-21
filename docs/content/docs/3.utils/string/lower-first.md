---
title: lowerFirst
description: 仅将字符串的第一个字母转换为小写。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/string/case.ts
---

## `lowerFirst`

仅将字符串的第一个字母转换为小写，其余部分保持不变。

### 用法

```ts
import { lowerFirst } from '@movk/core'

lowerFirst('Foo Bar') // => 'foo Bar'
lowerFirst('FOO BAR') // => 'fOO BAR'
```

### API

`lowerFirst(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回首字母小写的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utils/string"}
