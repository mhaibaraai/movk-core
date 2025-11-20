---
title: omitUndefined
description: 创建一个新对象，其中排除了所有值为 undefined 的属性。
---

## `omitUndefined`

`omitUndefined` 函数创建一个新对象，其中排除了所有值为 `undefined` 的属性。这在准备 API 请求体时特别有用。

### 用法

```ts
import { omitUndefined } from '@movk/core'

const data = {
  name: 'Project A',
  description: 'A cool project',
  owner: undefined,
  tags: null
}

const cleanedData = omitUndefined(data)
//=> { name: 'Project A', description: 'A cool project', tags: null }
```

### API

`omitUndefined<T extends object>(obj: T): Partial<T>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::
::

#### 返回值

::field-group
  ::field{name="Partial<T>"}
  返回一个不包含 `undefined` 值属性的新对象。
  ::
::
