---
title: omitUndefined
description: 从对象中排除值为 undefined 的键
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/omitUndefined.ts
---

## 用法

`omitUndefined` 函数用于从对象中排除值为 `undefined` 的键。

```ts
import { omitUndefined } from '@movk/core'

const data = {
  name: 'John',
  age: undefined,
  city: 'New York',
  country: undefined
}

const cleaned = omitUndefined(data)
console.log(cleaned) // { name: 'John', city: 'New York' }

// 用于 API 请求前清理数据
const requestData = omitUndefined({
  title: 'Post Title',
  content: 'Post content',
  tags: undefined,
  published: true
})
```

## API

### `omitUndefined(obj)`{lang="ts-type"}

从对象中排除值为 undefined 的键。

### 参数

::field-group
  ::field{name="obj" type="T" required}
  源对象。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="Partial<T>"}
  排除 `undefined` 值后的新对象。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
