---
title: toPath
description: 将一个路径字符串解析为一个由字符串键和数字索引组成的片段数组。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/object/path.ts
---

## `toPath`

将一个路径字符串解析为一个由字符串键和数字索引组成的片段数组。

### 用法

```ts
import { toPath } from '@movk/core'

toPath('a.b[0].c')         //=> ['a', 'b', 0, 'c']
toPath("a['key with.dot']") //=> ['a', 'key with.dot']
```

### API

`toPath(path: string | (string | number)[]): (string | number)[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="path" type="string | (string | number)[]" required}
  路径字符串或片段数组。如果传入数组，将返回其副本。
  ::
::

#### 返回值

::field-group
  ::field{name="(string | number)[]"}
  返回解析后的片段数组。
  ::
::
