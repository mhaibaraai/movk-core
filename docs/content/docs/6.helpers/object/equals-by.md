---
title: equalsBy
description: 按键路径、谓词函数或候选键启发式判定两个值是否等价于同一项
seo:
  title: equalsBy
  description: Determine whether two values reference the same item using a key path, a predicate function, or a heuristic list of candidate keys.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/equalsBy.ts
---

## 用法

`equalsBy` 函数判定两个值是否「等价于同一项」。它先走引用相等与 `null`/`undefined` 快速路径，对象会先 `toRaw` 解包以兼容 Vue reactive 包装，再按 `by` 或 `keys` 配置比较。

```ts
import { equalsBy } from '@movk/core'

// 引用相等或原始值快速路径
equalsBy(1, 1) // true
equalsBy('a', 'b') // false
```

### by 字符串路径

双方均为对象时，按路径取值比对；设置即独占，命中或失败都不会下落到 `keys`。

```ts
equalsBy({ id: 1, name: 'A' }, { id: 1, name: 'B' }, { by: 'id' }) // true
equalsBy({ meta: { id: 1 } }, { meta: { id: 2 } }, { by: 'meta.id' }) // false
```

### by 谓词函数

```ts
equalsBy(
  { tenant: 't1', user: 'u1' },
  { tenant: 't1', user: 'u1' },
  { by: (a, b) => a.tenant === b.tenant && a.user === b.user },
) // true
```

### keys 启发式回退

仅在未设置 `by` 且双方均为对象时启用。按顺序遍历候选键，首个「双方均能取到非空非对象标量」的键即作为比较依据。

```ts
equalsBy(
  { label: 'HSL', value: 'hsl' },
  { label: 'HSL', value: 'hsl' },
  { keys: ['value', 'label'] },
) // true（首个候选 value 即命中）
```

## createEqualsBy

使用 `createEqualsBy` 创建预绑定配置的等值函数，方便在 `.filter` / `.some` / 去重等回调中复用同一份比较规则。

```ts
import { createEqualsBy } from '@movk/core'

const sameUser = createEqualsBy<{ id: number }>({ by: 'id' })

users.some(u => sameUser(u, target))
```

## API

### `equalsBy<T>(a, b, options?)`{lang="ts-type"}

判定两个值是否等价于同一项。

### 参数

::field-group
  ::field{name="a" type="T" required}
  比较左侧。
  ::

  ::field{name="b" type="T" required}
  比较右侧。
  ::

  ::field{name="options" type="EqualsByOptions<T>"}
  比较行为配置项。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="boolean"}
  是否视为同一项。
  ::
::

### EqualsByOptions

::field-group
  ::field{name="by" type="string | ((a: T, b: T) => boolean)"}
  显式等值规则，函数或键路径字符串。设置即独占，不会下落到 `keys`。
  ::

  ::field{name="keys" type="ReadonlyArray<string | null | undefined>"}
  启发式回退候选键，仅在未设置 `by` 且双方均为对象时启用。
  ::
::

### `createEqualsBy<T>(options)`{lang="ts-type"}

创建预绑定配置的 `equalsBy` 函数。

### 参数

::field-group
  ::field{name="options" type="EqualsByOptions<T>" required}
  比较行为配置项。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="(a: T, b: T) => boolean"}
  预配置的二元等值函数。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
