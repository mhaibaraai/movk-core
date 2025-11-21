---
title: convertToKebabCase
description: 将一个对象的所有键名（或仅第一层键名）从驼峰式（camelCase）转换为短横线式（kebab-case）。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/convert.ts
---

## `convertToKebabCase`

`convertToKebabCase` 函数将一个对象的所有键名（或仅第一层键名）从驼峰式（camelCase）转换为短横线式（kebab-case）。

### 用法

```ts
import { convertToKebabCase } from '@movk/core'

const obj = {
  userName: 'john',
  userDetails: {
    emailAddress: 'john@example.com'
  }
}

// 浅层转换
const kebab = convertToKebabCase(obj)
//=> { 'user-name': 'john', 'user-details': { emailAddress: 'john@example.com' } }

// 深层转换
const deepKebab = convertToKebabCase(obj, true)
//=> { 'user-name': 'john', 'user-details': { 'email-address': 'john@example.com' } }
```

### API

`convertToKebabCase<T extends object>(obj: T, deep?: boolean): T`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="obj" type="T" required}
  需要转换键名的对象。
  ::
  ::field{name="deep" type="boolean"}
  是否进行深度转换。默认为 `false`。
  ::
::

## Changelog

:commit-changelog{prefix="utils/object"}
