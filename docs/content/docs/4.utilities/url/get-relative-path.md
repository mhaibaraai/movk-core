---
title: getRelativePath
description: 获取两个 URL 之间的相对路径
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`getRelativePath` 函数用于获取两个 URL 之间的相对路径。

```ts
import { getRelativePath } from '@movk/core'

getRelativePath('https://example.com/a/b', 'https://example.com/a/c')
// '../c'

getRelativePath('https://example.com/a', 'https://example.com/a/b/c')
// 'b/c'
```

## API

### `getRelativePath(from, to)`{lang="ts-type"}

获取两个 URL 之间的相对路径。

### 参数

::field-group
  ::field{name="from" type="string" required}
  起始 URL。
  ::

  ::field{name="to" type="string" required}
  目标 URL。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  相对路径。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
