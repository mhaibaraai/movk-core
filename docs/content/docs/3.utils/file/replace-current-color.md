---
title: replaceCurrentColor
description: 获取一个 SVG 文件，并将其中的 currentColor 属性替换为指定的颜色。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/file/replaceCurrentColor.ts
---

## `replaceCurrentColor`

此函数用于获取一个 SVG 文件，并将其中的 `currentColor` 属性替换为指定的颜色。这对于动态改变图标颜色非常有用。

::warning
此函数仅在浏览器环境中可用。
::

### 用法

假设 `/icons/star.svg` 的内容是：
`<svg fill="currentColor">...</svg>`

```ts
import { replaceCurrentColor } from '@movk/core'

async function getColoredIcon() {
  try {
    // 获取 SVG 并将 currentColor 替换为红色
    const redIconSvg = await replaceCurrentColor('/icons/star.svg', '#FF0000')
    document.getElementById('icon-container').innerHTML = redIconSvg
  } catch (error) {
    console.error('处理 SVG 失败:', error)
  }
}
```

### API

`replaceCurrentColor(path: string, color?: string): Promise<string>`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="path" type="string" required}
  要获取的 SVG 文件的路径。
  ::
  ::field{name="color" type="string"}
  用于替换 `currentColor` 的颜色值。如果未提供，则函数仅获取并返回原始 SVG 内容。
  ::
::

#### 返回值

::field-group
  ::field{name="Promise<string>"}
  返回一个解析为处理后（或原始）SVG 字符串的 Promise。
  ::
::

## Changelog

:commit-changelog{prefix="utils/file"}
