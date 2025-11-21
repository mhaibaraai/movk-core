---
title: omit
description: 从一个对象中排除一组指定的键，并返回一个不包含这些键值对的新对象。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/omit.ts
---

## `omit`

`omit` 函数从一个对象中排除一组指定的键，并返回一个不包含这些键值对的新对象。

### 用法

```ts
import { omit } from '@movk/core'

const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'a-secret-password'
}

const userWithoutPassword = omit(user, ['password'])
// => { id: '123', name: 'John Doe', email: 'john@example.com' }
```

### API

`omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::
  ::field{name="keys" type="K[]" required}
  需要排除的键的数组。
  ::
::

#### 返回值

::field-group
  ::field{name="Omit<T, K>"}
  返回一个不包含指定键的新对象。
  ::
::

## Changelog

:commit-changelog{prefix="utils/object"}
