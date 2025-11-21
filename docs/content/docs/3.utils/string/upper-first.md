---
title: upperFirst
description: 仅将字符串的第一个字母转换为大写。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/string/case.ts
---

## `upperFirst`

仅将字符串的第一个字母转换为大写，其余部分保持不变。

### 用法

```ts
import { upperFirst } from '@movk/core'

upperFirst('foo bar') //=> 'Foo bar'
upperFirst('FOO BAR') //=> 'FOO BAR'
```

### API

`upperFirst(str: string): string`{lang="ts-type"}

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
