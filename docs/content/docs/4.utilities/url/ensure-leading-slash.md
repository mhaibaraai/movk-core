---
title: ensureLeadingSlash
description: 确保路径以斜杠开头
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/transform.ts
---

## 用法

`ensureLeadingSlash` 函数用于确保路径以斜杠开头。

```ts
import { ensureLeadingSlash } from '@movk/core'

ensureLeadingSlash('path/to/page') // '/path/to/page'
ensureLeadingSlash('/path') // '/path'
```

## API

### `ensureLeadingSlash(path)`{lang="ts-type"}

确保路径以斜杠开头。

### 参数

::field-group
  ::field{name="path" type="string" required}
  路径字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  带开头斜杠的路径。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="transform"}
