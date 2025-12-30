---
title: getRelativePath
description: 获取两个 URL 之间的相对路径。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `getRelativePath`

计算从一个 URL 到另一个 URL 的相对路径。

### 用法

```ts
import { getRelativePath } from '@movk/core'

getRelativePath('https://example.com/a/b', 'https://example.com/a/c')
// => '../c'

getRelativePath('https://example.com/a', 'https://example.com/a/b/c')
// => 'b/c'

getRelativePath('https://example.com/a/b/c', 'https://example.com/a')
// => '../..'

// 不同源返回目标 URL
getRelativePath('https://example.com/a', 'https://other.com/b')
// => 'https://other.com/b'
```

### API

`getRelativePath(from: string, to: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="from" type="string" required}
  起始 URL。
  ::
  ::field{name="to" type="string" required}
  目标 URL。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  相对路径。
  ::
::

## 相关

- [toAbsoluteUrl](/docs/utils/url/to-absolute-url) - 转换为绝对 URL

## Changelog

:commit-changelog{prefix="utils/url"}
