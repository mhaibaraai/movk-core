---
title: pick
description: 从一个对象中选择一组指定的键，并返回一个只包含这些键值对的新对象。
---

## `pick`

`pick` 函数从一个对象中选择一组指定的键，并返回一个只包含这些键值对的新对象。

### 用法

```ts
import { pick } from '@movk/core'

const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'a-secret-password'
}

const publicUser = pick(user, ['id', 'name', 'email'])
//=> { id: '123', name: 'John Doe', email: 'john@example.com' }
```

### API

`pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::
  ::field{name="keys" type="K[]" required}
  需要选择的键的数组。
  ::
::

#### 返回值

::field-group
  ::field{name="Pick<T, K>"}
  返回一个只包含指定键的新对象。
  ::
::
