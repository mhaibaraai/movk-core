---
title: convertToKebabCase
description: 将对象的键名转换为 kebab-case 格式
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/object/convertToKebabCase.ts
---

## 用法

`convertToKebabCase` 函数用于将对象的键名转换为 kebab-case 格式。

```ts
import { convertToKebabCase } from '@movk/core'

const obj = {
  firstName: 'John',
  lastName: 'Doe',
  userInfo: {
    birthDate: '1990-01-01',
    phoneNumber: '123-456-7890'
  }
}

const converted = convertToKebabCase(obj)
console.log(converted)
// {
//   'first-name': 'John',
//   'last-name': 'Doe',
//   'user-info': { birthDate: '1990-01-01', phoneNumber: '123-456-7890' }
// }

const deepConverted = convertToKebabCase(obj, true)
console.log(deepConverted)
// {
//   'first-name': 'John',
//   'last-name': 'Doe',
//   'user-info': { 'birth-date': '1990-01-01', 'phone-number': '123-456-7890' }
// }
```

## API

### `convertToKebabCase<T>(obj, deep?)`{lang="ts-type"}

将对象的键名转换为 kebab-case 格式。

### 参数

::field-group
  ::field{name="obj" type="T extends AnyObject" required}
  待转换的对象。
  ::

  ::field{name="deep" type="boolean"}
  是否深度转换嵌套对象，默认为 `false`。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="T"}
  转换后的对象。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/object"}
