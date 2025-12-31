---
title: omit
description: 从对象中排除指定的键，返回新对象
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/omit.ts
---

## 用法

`omit` 函数用于从对象中排除指定的键，返回新对象。

```ts
import { omit } from '@movk/core'

const user = {
  id: 1,
  name: 'John',
  password: 'secret',
  email: 'john@example.com'
}

const publicUser = omit(user, ['password'])
console.log(publicUser) // { id: 1, name: 'John', email: 'john@example.com' }

const basicInfo = omit(user, ['password', 'email'])
console.log(basicInfo) // { id: 1, name: 'John' }
```

## API

### `omit<T, K>(obj, keys)`{lang="ts-type"}

从对象中排除指定的键，返回新对象。

### 参数

::field-group
  ::field{name="obj" type="T extends AnyObject" required}
  源对象。
  ::

  ::field{name="keys" type="K[]" required}
  要排除的键数组。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="OmitByKey<T, K>"}
  排除指定键后的新对象。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
