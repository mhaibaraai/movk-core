---
title: removeTrailingSlash
description: 移除 URL 的尾部斜杠。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `removeTrailingSlash`

移除 URL 路径的尾部斜杠。

### 用法

```ts
import { removeTrailingSlash } from '@movk/core'

removeTrailingSlash('https://example.com/') // => 'https://example.com'
removeTrailingSlash('/path/') // => '/path'
removeTrailingSlash('/') // => '/'（根路径保持不变）

// 保留查询字符串和哈希
removeTrailingSlash('/path/?query=1#hash')
// => '/path?query=1#hash'
```

### API

`removeTrailingSlash(url: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  移除尾部斜杠后的 URL。
  ::
::

## 相关

- [ensureTrailingSlash](/docs/utils/url/ensure-trailing-slash) - 添加尾部斜杠

## Changelog

:commit-changelog{prefix="utils/url"}
