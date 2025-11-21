---
title: joinPath
description: 将一个片段数组组合回一个规范化的路径字符串。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/path.ts
---

## `joinPath`

将一个片段数组组合回一个规范化的路径字符串。

### 用法

```ts
import { joinPath } from '@movk/core'

joinPath(['a', 'b', 0, 'c']) //=> "a.b[0].c"
joinPath(['a', 'key with.dot']) //=> "a['key with.dot']"
```

### API

`joinPath(segments: (string | number)[]): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="segments" type="(string | number)[]" required}
  路径片段数组。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回组合后的路径字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utils/path"}
