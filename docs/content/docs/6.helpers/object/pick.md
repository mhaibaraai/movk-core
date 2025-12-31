---
title: pick
description: 从对象中选择指定的键，返回新对象
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/pick.ts
---

## 用法

`pick` 函数用于从对象中选择指定的键，返回新对象。

```ts
import { pick } from '@movk/core'

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-15'
}

const publicInfo = pick(user, ['id', 'name', 'email'])
console.log(publicInfo) // { id: 1, name: 'John', email: 'john@example.com' }

const basicInfo = pick(user, ['id', 'name'])
console.log(basicInfo) // { id: 1, name: 'John' }
```

## API

### `pick<T, K>(obj, keys)`{lang="ts-type"}

从对象中选择指定的键，返回新对象。

### 参数

::field-group
  ::field{name="obj" type="T extends AnyObject" required}
  源对象。
  ::

  ::field{name="keys" type="K[]" required}
  要选择的键数组。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="PickByKey<T, K>"}
  只包含指定键的新对象。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
