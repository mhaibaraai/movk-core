---
title: replaceCurrentColor
description: 替换 SVG 文件中的 currentColor 为指定颜色
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/replaceCurrentColor.ts
---

## 用法

`replaceCurrentColor` 函数用于替换 SVG 文件中的 `currentColor` 为指定颜色。

::warning
注意
- 需要在浏览器环境中运行(使用 `DOMParser` 和 `XMLSerializer`)
- 使用 `fetch` 获取 SVG 文件
::

```ts
import { replaceCurrentColor } from '@movk/core'

// 获取并替换 SVG 中的 currentColor
try {
  const svgContent = await replaceCurrentColor('/icons/star.svg', '#ff0000')
  // 创建 Blob 并显示
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)

  const img = document.createElement('img')
  img.src = url
  document.body.appendChild(img)
}
catch (error) {
  console.error('SVG 处理失败:', error)
}

// 只获取 SVG 内容,不替换颜色
const originalSvg = await replaceCurrentColor('/icons/star.svg')
```

## API

### `replaceCurrentColor(path, color?)`{lang="ts-type"}

替换 SVG 文件中的 currentColor。

### 参数

::field-group
  ::field{name="path" type="string" required}
  SVG 文件路径。
  ::

  ::field{name="color" type="string"}
  替换的颜色值,不提供则返回原始 SVG。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="Promise<string>"}
  处理后的 SVG 字符串。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
