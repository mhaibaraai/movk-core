---
title: removeLeadingSlash
description: 移除 URL 的开头斜杠
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`removeLeadingSlash` 函数用于移除 URL 的开头斜杠。

```ts
import { removeLeadingSlash } from '@movk/core'

removeLeadingSlash('/path/to/page') // 'path/to/page'
removeLeadingSlash('///path') // 'path'
removeLeadingSlash('path') // 'path'
```

## API

### `removeLeadingSlash(url)`{lang="ts-type"}

移除 URL 的开头斜杠。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 或路径字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  移除开头斜杠后的字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
