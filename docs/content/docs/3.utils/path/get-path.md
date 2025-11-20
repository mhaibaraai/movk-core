---
title: getPath
description: 安全地获取一个对象中深层嵌套的属性值。
---

## `getPath`

`getPath` 函数可以安全地获取一个对象中深层嵌套的属性值。如果路径中的任何部分为 `null` 或 `undefined`，它会停止并返回您提供的默认值，从而避免 "Cannot read properties of undefined" 错误。

### 用法

```ts
import { getPath } from '@movk/core'

const user = {
  name: 'John',
  address: {
    city: 'New York',
    zip: '10001'
  },
  posts: [
    { title: 'Post 1', comments: [ { text: 'Great!' } ] },
    { title: 'Post 2' }
  ]
}

// 读取基本属性
getPath(user, 'address.city') //=> 'New York'

// 读取数组元素
getPath(user, 'posts[0].title') //=> 'Post 1'

// 读取更深层的嵌套属性
getPath(user, 'posts[0].comments[0].text') //=> 'Great!'

// 路径不存在时返回默认值 (默认为 undefined)
getPath(user, 'profile.age') //=> undefined
getPath(user, 'profile.age', 30) //=> 30
```

### API

`getPath<T, D = undefined>(object: T, path: string | (string | number)[], defaultValue?: D): unknown | D`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="object" type="T" required}
  要从中读取值的源对象。
  ::
  ::field{name="path" type="string | (string | number)[]" required}
  属性路径，可以是点和方括号表示法（如 `'a.b[0]'`），也可以是片段数组（如 `['a', 'b', 0]`）。
  ::
  ::field{name="defaultValue" type="D"}
  当路径解析结果为 `undefined` 时返回的默认值。注意，如果路径值为 `null`，将直接返回 `null` 而不是默认值。
  ::
::
