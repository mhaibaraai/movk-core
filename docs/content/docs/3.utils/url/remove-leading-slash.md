---
title: removeLeadingSlash
description: 移除路径的开头斜杠。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `removeLeadingSlash`

移除路径开头的斜杠。

### 用法

```ts
import { removeLeadingSlash } from '@movk/core'

removeLeadingSlash('/path/to/page') // => 'path/to/page'
removeLeadingSlash('///path') // => 'path'
removeLeadingSlash('path') // => 'path'
```

### API

`removeLeadingSlash(url: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 或路径字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  移除开头斜杠后的字符串。
  ::
::

## 相关

- [ensureLeadingSlash](/docs/utils/url/ensure-leading-slash) - 添加开头斜杠

## Changelog

:commit-changelog{prefix="utils/url"}
