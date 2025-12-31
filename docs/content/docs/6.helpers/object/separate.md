---
title: separate
description: 将对象按指定键分离为两个对象
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/separate.ts
---

## 用法

`separate` 函数用于将对象按指定键分离为两个对象。

```ts
import { separate } from '@movk/core'

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  role: 'admin'
}

const { picked, omitted } = separate(user, ['id', 'name'])
console.log(picked) // { id: 1, name: 'John' }
console.log(omitted) // { email: 'john@example.com', password: 'secret', role: 'admin' }

// 用于分离敏感信息
const { picked: publicData, omitted: privateData } = separate(user, ['id', 'name', 'email'])
```

## API

### `separate(obj, keys)`{lang="ts-type"}

将对象按指定键分离为两个对象。

### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::

  ::field{name="keys" type="K[]" required}
  要分离的键数组。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="{ picked: PickByKey<T, K>, omitted: OmitByKey<T, K> }"}
  包含 `picked` 和 `omitted` 两个对象的结果。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
