---
title: convertSvgToPng
description: 将 SVG 字符串转换为 PNG 格式的 Blob 对象
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/convertSvgToPng.ts
---

## 用法

`convertSvgToPng` 函数用于将 SVG 字符串转换为 PNG 格式的 Blob 对象。

::warning
注意
- 仅在浏览器环境中可用
- 使用 Canvas API 进行转换
- 转换失败时会抛出错误
::

```ts
import { convertSvgToPng } from '@movk/core'

const svgString = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>'

try {
  const pngBlob = await convertSvgToPng(svgString)
  const url = URL.createObjectURL(pngBlob)

  // 用于下载或显示
  const img = document.createElement('img')
  img.src = url
  document.body.appendChild(img)
}
catch (error) {
  console.error('SVG 转换失败:', error)
}
```

## API

### `convertSvgToPng(svg)`{lang="ts-type"}

将 SVG 字符串转换为 PNG 格式的 Blob 对象。

### 参数

::field-group
  ::field{name="svg" type="string" required}
  SVG 字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="Promise<Blob>"}
  PNG 格式的 Blob 对象。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
