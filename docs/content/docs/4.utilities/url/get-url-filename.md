---
title: getUrlFilename
description: 获取 URL 的文件名
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`getUrlFilename` 函数用于获取 URL 的文件名。

```ts
import { getUrlFilename } from '@movk/core'

getUrlFilename('https://example.com/path/file.pdf') // 'file.pdf'
getUrlFilename('https://example.com/path/file.pdf', false) // 'file'
getUrlFilename('https://example.com/path/') // ''
```

## API

### `getUrlFilename(url, includeExtension?)`{lang="ts-type"}

获取 URL 的文件名。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::

  ::field{name="includeExtension" type="boolean"}
  是否包含扩展名,默认 `true`。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  文件名。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
