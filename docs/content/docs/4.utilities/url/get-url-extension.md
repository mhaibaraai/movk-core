---
title: getUrlExtension
description: 获取 URL 的文件扩展名
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/url/parse.ts
---

## 用法

`getUrlExtension` 函数用于获取 URL 的文件扩展名。

```ts
import { getUrlExtension } from '@movk/core'

getUrlExtension('https://example.com/file.pdf') // 'pdf'
getUrlExtension('https://example.com/file.tar.gz') // 'gz'
getUrlExtension('https://example.com/path/') // ''
```

## API

### `getUrlExtension(url)`{lang="ts-type"}

获取 URL 的文件扩展名。

### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  文件扩展名(不含点),无扩展名返回空字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utilities/url" name="parse"}
