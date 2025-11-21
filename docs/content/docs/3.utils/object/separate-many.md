---
title: separateMany
description: 根据多个分组规则将对象分离成多个部分。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/separate.ts
---

## `separateMany`

`separateMany` 是一个更强大的分离函数，它可以根据多个分组规则将对象分离成多个部分，以及一个包含所有未分组属性的 `others` 对象。

### 用法

```ts
import { separateMany } from '@movk/core'

const options = {
  id: 1,
  name: 'Product',
  price: 99.9,
  inStock: true,
  style: 'modern',
  color: 'blue'
}

const { meta, data, others } = separateMany(options, {
  meta: ['id', 'inStock'],
  data: ['name', 'price']
})

// meta => { id: 1, inStock: true }
// data => { name: 'Product', price: 99.9 }
// others => { style: 'modern', color: 'blue' }
```

### API

`separateMany<T extends object, M extends Record<string, readonly (keyof T)[]>>(obj: T, groups: M): { [P in keyof M]: Pick<T, M[P][number]> } & { others: Omit<T, M[keyof M][number]> }`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::
  ::field{name="groups" type="M" required}
  一个分组映射对象，其中键是分组名，值是要包含在该组中的属性键数组。
  ::
::

#### 返回值

::field-group
  ::field{name="object"}
  返回一个包含所有分组对象以及一个 `others` 对象的聚合对象。
  ::
::
