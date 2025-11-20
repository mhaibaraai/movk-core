---
title: convertSvgToPng
description: 将 SVG 字符串转换为 PNG 格式的 Blob 对象。
---

## `convertSvgToPng`

`convertSvgToPng` 函数接收一个 SVG 字符串，并将其转换为 PNG 格式的 `Blob` 对象。这在需要将 SVG 用于不支持原生 SVG 的地方（如某些旧版 API 或图片编辑器）时非常有用。

::warning
此函数仅在浏览器环境中可用。
::

### 用法

```ts
import { convertSvgToPng } from '@movk/core'

const svg = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>'

async function downloadAsPng() {
  try {
    const pngBlob = await convertSvgToPng(svg)
    const url = URL.createObjectURL(pngBlob)
    
    // 你可以将其用于下载或显示
    const link = document.createElement('a')
    link.href = url
    link.download = 'circle.png'
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('SVG 转换失败:', error)
  }
}
```

### API

`convertSvgToPng(svg: string): Promise<Blob>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="svg" type="string" required}
  需要转换的 SVG 图像的完整字符串表示。
  ::
::

#### 返回值

::field-group
  ::field{name="Promise<Blob>"}
  返回一个解析为 PNG 格式 `Blob` 对象的 Promise。如果转换失败，Promise 将会 `reject`。
  ::
::
