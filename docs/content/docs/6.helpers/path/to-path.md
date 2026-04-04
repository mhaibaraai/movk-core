---
title: toPath
description: 将 a.b[0].c 格式的路径字符串解析为路径片段数组，用于对象路径访问操作。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/toPath.ts
---

## 用法

`toPath` 函数用于将路径字符串解析为片段数组。

```ts
import { toPath } from '@movk/core'

toPath('a.b[0].c') // ['a', 'b', 0, 'c']
toPath('a[\'x.y\']') // ['a', 'x.y']
```

## API

### `toPath(path)`{lang="ts-type"}

将路径字符串解析为片段数组。

### 参数

::field-group
  ::field{name="path" type="PathInput" required}
  路径字符串或片段数组。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="PathSegments"}
  解析后的片段数组。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
