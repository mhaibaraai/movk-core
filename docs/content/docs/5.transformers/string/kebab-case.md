---
title: kebabCase
description: 将字符串转换为短横线式 (hello-world)。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/kebabCase.ts
---

## 用法

将字符串转换为短横线命名格式（kebab-case）。

```ts
import { kebabCase } from '@movk/core'

kebabCase('firstName') // => 'first-name'
kebabCase('First Name') // => 'first-name'
kebabCase('first_name') // => 'first-name'
kebabCase('XMLHttpRequest') // => 'xml-http-request'
```

## API

`kebabCase(str: string): string`{lang="ts-type"}

### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

### 返回值

::field-group
  ::field{name="string"}
  返回短横线式格式的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
