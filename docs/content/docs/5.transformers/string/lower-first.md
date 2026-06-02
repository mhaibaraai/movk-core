---
title: lowerFirst
description: 仅将字符串的第一个字母转换为小写。
seo:
  title: lowerFirst
  description: Lowercase only the first character of a string while preserving the rest, a small helper for identifier and label formatting.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/lowerFirst.ts
---

## 用法

仅将字符串的第一个字母转换为小写，其余部分保持不变。

```ts
import { lowerFirst } from '@movk/core'

lowerFirst('Foo Bar') // => 'foo Bar'
lowerFirst('FOO BAR') // => 'fOO BAR'
```

## API

`lowerFirst(str: string): string`{lang="ts-type"}

### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

### 返回值

::field-group
  ::field{name="string"}
  返回首字母小写的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
