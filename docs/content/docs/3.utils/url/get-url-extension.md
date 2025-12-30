---
title: getUrlExtension
description: 获取 URL 的文件扩展名。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `getUrlExtension`

获取 URL 路径中的文件扩展名。

### 用法

```ts
import { getUrlExtension } from '@movk/core'

getUrlExtension('https://example.com/file.pdf') // => 'pdf'
getUrlExtension('https://example.com/file.tar.gz') // => 'gz'
getUrlExtension('https://example.com/File.PDF') // => 'pdf'（自动转小写）
getUrlExtension('https://example.com/path/') // => ''
getUrlExtension('https://example.com/file.pdf?v=1') // => 'pdf'（忽略查询参数）
```

### API

`getUrlExtension(url: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  文件扩展名（不含点），无扩展名返回空字符串。
  ::
::

## 相关

- [getUrlFilename](/docs/utils/url/get-url-filename) - 获取文件名

## Changelog

:commit-changelog{prefix="utils/url"}
