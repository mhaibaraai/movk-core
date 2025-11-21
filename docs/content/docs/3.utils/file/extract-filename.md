---
title: extractFilename
description: 从 fetch 请求的 Headers 对象中提取 content-disposition 头里的文件名。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/file/download.ts
---

## `extractFilename`

从 `fetch` 请求的 `Headers` 对象中提取 `content-disposition` 头里的文件名。它能正确处理 `filename*` 编码格式。

### 用法

```ts
import { extractFilename, triggerDownload } from '@movk/core'

async function downloadFile(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok)
      throw new Error('网络响应失败')

    const blob = await response.blob()
    const filename = extractFilename(response.headers, 'default-filename.zip')

    triggerDownload(blob, filename)
  }
  catch (error) {
    console.error('下载失败:', error)
  }
}

// downloadFile('/api/download/report')
```

### API

`extractFilename(headers?: Headers, fallbackName = 'file'): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="headers" type="Headers"}
  `fetch` 响应的 `Headers` 对象。
  ::
  ::field{name="fallbackName" type="string"}
  当无法从响应头中提取文件名时使用的备用文件名。默认为 `'file'`。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回提取到的文件名或备用文件名。
  ::
::

## Changelog

:commit-changelog{prefix="utils/file"}
