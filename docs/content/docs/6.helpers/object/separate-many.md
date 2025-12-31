---
title: separateMany
description: 将对象按多分组键集合进行分离
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/separateMany.ts
---

## 用法

`separateMany` 函数用于将对象按多分组键集合进行分离。

```ts
import { separateMany } from '@movk/core'

const options = { id: 1, name: 'John', email: 'a@b.com', role: 'admin' }
const { a, b, others } = separateMany(options, { a: ['id'], b: ['name'] as const })
// a: { id: 1 }
// b: { name: 'John' }
// others: { email: 'a@b.com', role: 'admin' }
```

## API

### `separateMany(obj, groups)`{lang="ts-type"}

将对象按多分组键集合进行分离。

### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::

  ::field{name="groups" type="M" required}
  分组映射,如 `{ a: ['x', 'y'], b: ['z'] }`。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="{ [P in keyof M]: PickByKey<T, M[P][number]> } & { others: OmitByKey<T, M[keyof M][number]> }"}
  包含每个分组的子对象以及 `others`(其余未被分组捕获的键)。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
