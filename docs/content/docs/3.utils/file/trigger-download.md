---
title: triggerDownload
description: 触发浏览器下载给定的 Blob 对象。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/file/download.ts
---

## `triggerDownload`

触发浏览器下载给定的 `Blob` 对象。它会创建一个隐藏的 `<a>` 标签并模拟点击。

::warning
此函数仅在浏览器环境中可用。
::

### 用法

```ts
import { triggerDownload } from '@movk/core'

const textBlob = new Blob(['Hello, this is a text file.'], { type: 'text/plain' })

triggerDownload(textBlob, 'greeting.txt')
```

### API

`triggerDownload(blob: Blob, filename: string): void`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="blob" type="Blob" required}
  需要下载的文件内容的 `Blob` 对象。
  ::
  ::field{name="filename" type="string" required}
  下载时建议使用的文件名。
  ::
::

## Changelog

:commit-changelog{prefix="utils/file"}
