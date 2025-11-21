---
title: separate
description: 根据一组键将一个对象分离成两个对象。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/separate.ts
---

## `separate`

`separate` 函数根据一组键将一个对象分离成两个对象：一个包含指定的键（`picked`），另一个包含剩余的键（`omitted`）。

### 用法

```ts
import { separate } from '@movk/core'

const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'a-secret-password'
}

const { picked, omitted } = separate(user, ['id', 'name'])

// picked => { id: '123', name: 'John Doe' }
// omitted => { email: 'john@example.com', password: 'a-secret-password' }
```

### API

`separate<T extends object, K extends keyof T>(obj: T, keys: K[]): { picked: Pick<T, K>, omitted: Omit<T, K> }`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::
  ::field{name="keys" type="K[]" required}
  用于分离的键的数组。
  ::
::

#### 返回值

::field-group
  ::field{name="object"}
  返回一个包含 `picked` 和 `omitted` 两个属性的对象。
  ::
::

## Changelog

:commit-changelog{prefix="utils/object"}
