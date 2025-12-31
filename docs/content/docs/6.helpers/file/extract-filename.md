---
title: extractFilename
description: 从响应头中提取文件名
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/extractFilename.ts
---

## 用法

`extractFilename` 函数用于从响应头中提取文件名。

```ts
import { extractFilename } from '@movk/core'

// 从响应头中提取文件名
const headers = new Headers({
  'content-disposition': 'attachment; filename="report.pdf"'
})
const filename = extractFilename(headers, 'download')
console.log(filename) // 'report.pdf'

// 处理编码的文件名
const encodedHeaders = new Headers({
  'content-disposition': 'attachment; filename*=UTF-8\'\'%E6%8A%A5%E5%91%8A.pdf'
})
const encodedFilename = extractFilename(encodedHeaders)
console.log(encodedFilename) // '报告.pdf'
```

## API

### `extractFilename(headers?, fallbackName?)`{lang="ts-type"}

从响应头中提取文件名。

### 参数

::field-group
  ::field{name="headers" type="Headers"}
  响应头对象。
  ::

  ::field{name="fallbackName" type="string"}
  默认文件名,默认为 `'file'`。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  提取的文件名。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
