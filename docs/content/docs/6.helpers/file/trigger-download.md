---
title: triggerDownload
description: 触发浏览器下载文件
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/triggerDownload.ts
---

## 用法

`triggerDownload` 函数用于触发浏览器下载文件。

::warning
注意
- 仅在浏览器环境中可用
- 某些浏览器可能会拦截自动下载
::

```ts
import { triggerDownload } from '@movk/core'

// 下载文本文件
const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' })
triggerDownload(textBlob, 'hello.txt')

// 下载 JSON 数据
const data = { name: 'John', age: 30 }
const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
triggerDownload(jsonBlob, 'data.json')

// 下载图片
const canvas = document.createElement('canvas')
canvas.toBlob((blob) => {
  if (blob) {
    triggerDownload(blob, 'image.png')
  }
})
```

## API

### `triggerDownload(blob, filename)`{lang="ts-type"}

触发浏览器下载文件。

### 参数

::field-group
  ::field{name="blob" type="Blob" required}
  文件数据。
  ::

  ::field{name="filename" type="string" required}
  文件名。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
