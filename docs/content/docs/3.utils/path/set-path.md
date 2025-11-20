---
title: setPath
description: 根据路径在一个对象中设置深层嵌套的属性值。
---

## `setPath`

`setPath` 函数可以在一个对象中根据路径设置深层嵌套的属性值。如果路径中的任何部分不存在，它会自动创建必要的对象或数组。

### 用法

```ts
import { setPath } from '@movk/core'

const user = {}

// 设置一个深层属性
setPath(user, 'profile.details.age', 30)
// user is now: { profile: { details: { age: 30 } } }

// 在数组中设置值
setPath(user, 'posts[0].title', 'My First Post')
// user is now: { profile: ..., posts: [ { title: 'My First Post' } ] }

// 自动扩展数组
setPath(user, 'posts[2].title', 'My Third Post')
// user.posts is now: [ { title: '...' }, <1 empty item>, { title: '...' } ]
```

### API

`setPath<T extends object>(object: T, path: string | (string | number)[], value: unknown): T`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="object" type="T" required}
  要修改的目标对象。此函数会**原地修改**该对象。
  ::
  ::field{name="path" type="string | (string | number)[]" required}
  要设置值的属性路径。
  ::
  ::field{name="value" type="unknown" required}
  要设置的值。
  ::
::
