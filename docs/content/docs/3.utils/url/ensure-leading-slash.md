---
title: ensureLeadingSlash
description: 确保路径以斜杠开头。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/transform.ts
---

## `ensureLeadingSlash`

确保路径以斜杠开头。

### 用法

```ts
import { ensureLeadingSlash } from '@movk/core'

ensureLeadingSlash('path/to/page') // => '/path/to/page'
ensureLeadingSlash('/path') // => '/path'
ensureLeadingSlash('') // => '/'
```

### API

`ensureLeadingSlash(path: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="path" type="string" required}
  路径字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  带开头斜杠的路径。
  ::
::

## 相关

- [removeLeadingSlash](/docs/utils/url/remove-leading-slash) - 移除开头斜杠

## Changelog

:commit-changelog{prefix="utils/url"}
