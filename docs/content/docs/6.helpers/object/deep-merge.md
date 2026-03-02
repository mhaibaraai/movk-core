---
title: deepMerge
description: 递归深度合并多个对象，支持数组策略、null 处理和自定义合并函数
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/deepMerge.ts
---

## 用法

`deepMerge` 函数将多个 source 对象递归合并为一个新对象，不修改任何输入。

后面的 source 优先级更高，双方都是纯对象的属性会递归合并而非覆盖。支持 Symbol 键，防止原型污染。

```ts
import { deepMerge } from '@movk/core'

const defaults = { theme: 'light', pagination: { page: 1, size: 10 } }
const userConfig = { pagination: { size: 20 }, debug: true }

const result = deepMerge([defaults, userConfig])
// => { theme: 'light', pagination: { page: 1, size: 20 }, debug: true }
```

### 数组合并策略

```ts
// concat（默认）：拼接数组
deepMerge([{ tags: ['a'] }, { tags: ['b'] }])
// => { tags: ['a', 'b'] }

// replace：整体替换
deepMerge([{ tags: ['a'] }, { tags: ['b'] }], { arrayStrategy: 'replace' })
// => { tags: ['b'] }

// unique：拼接并去重
deepMerge([{ tags: ['a', 'b'] }, { tags: ['b', 'c'] }], { arrayStrategy: 'unique' })
// => { tags: ['a', 'b', 'c'] }
```

### null/undefined 处理

```ts
// skip（默认）：忽略 source 中的 null/undefined
deepMerge([{ a: 1 }, { a: null }])
// => { a: 1 }

// override：允许 null/undefined 覆盖
deepMerge([{ a: 1 }, { a: null }], { nullHandling: 'override' })
// => { a: null }
```

### 自定义合并函数

```ts
// 数值相加而非覆盖
const result = deepMerge(
  [{ count: 10 }, { count: 5 }],
  {
    customMerger: (key, targetVal, sourceVal) => {
      if (typeof targetVal === 'number' && typeof sourceVal === 'number')
        return targetVal + sourceVal
      return undefined // 交由默认逻辑处理
    },
  },
)
// => { count: 15 }
```

## createDeepMerge

使用 `createDeepMerge` 创建预绑定配置的合并函数，避免每次传递 options。

```ts
import { createDeepMerge } from '@movk/core'

const mergeReplace = createDeepMerge({ arrayStrategy: 'replace' })

mergeReplace([{ tags: ['a'] }, { tags: ['b'] }])
// => { tags: ['b'] }
```

## API

### `deepMerge<T>(sources, options?)`{lang="ts-type"}

递归深度合并多个对象。

### 参数

::field-group
  ::field{name="sources" type="T[]" required}
  要合并的源对象数组，后面的对象优先级更高。
  ::

  ::field{name="options" type="DeepMergeOptions"}
  合并行为配置项。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="T"}
  合并后的新对象，不修改任何输入。
  ::
::

### DeepMergeOptions

::field-group
  ::field{name="arrayStrategy" type="'concat' | 'replace' | 'unique'"}
  数组合并策略，默认 `'concat'`。
  ::

  ::field{name="nullHandling" type="'skip' | 'override'"}
  null/undefined 处理策略，默认 `'skip'`。
  ::

  ::field{name="customMerger" type="CustomMerger"}
  自定义合并函数，返回 `undefined` 则交由默认逻辑处理。
  ::
::

### `createDeepMerge(options)`{lang="ts-type"}

创建预绑定配置的 deepMerge 函数。

### 参数

::field-group
  ::field{name="options" type="DeepMergeOptions" required}
  合并行为配置项。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="<T>(sources: T[]) => T"}
  预配置的 deepMerge 函数。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
