---
title: joinPath
description: 将片段数组序列化为路径字符串
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/path/joinPath.ts
---

## 用法

`joinPath` 函数用于将片段数组序列化为路径字符串。

```ts
import { joinPath } from '@movk/core'

const p = joinPath(['a', 'x.y', 0, 'space key'])
// p: "a['x.y'][0]['space key']"
// 与解析往返:toPath(p) => ['a', 'x.y', 0, 'space key']
```

## API

### `joinPath(segments)`{lang="ts-type"}

将片段数组序列化为路径字符串。

### 参数

::field-group
  ::field{name="segments" type="(string | number)[]" required}
  路径片段数组。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  路径字符串。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/path"}
