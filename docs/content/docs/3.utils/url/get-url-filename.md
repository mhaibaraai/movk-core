---
title: getUrlFilename
description: 获取 URL 的文件名。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/url/parse.ts
---

## `getUrlFilename`

获取 URL 路径中的文件名。

### 用法

```ts
import { getUrlFilename } from '@movk/core'

getUrlFilename('https://example.com/path/file.pdf') // => 'file.pdf'
getUrlFilename('https://example.com/path/file.pdf', false) // => 'file'
getUrlFilename('https://example.com/path/') // => ''
getUrlFilename('https://example.com/README') // => 'README'
```

### API

`getUrlFilename(url: string, includeExtension?: boolean): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="url" type="string" required}
  URL 字符串。
  ::
  ::field{name="includeExtension" type="boolean" default="true"}
  是否包含扩展名。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  文件名。
  ::
::

## 相关

- [getUrlExtension](/docs/utils/url/get-url-extension) - 获取扩展名

## Changelog

:commit-changelog{prefix="utils/url"}
