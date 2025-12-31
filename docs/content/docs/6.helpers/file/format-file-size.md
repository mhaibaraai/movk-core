---
title: formatFileSize
description: 格式化文件大小,将字节数转换为可读的文件大小字符串
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/file/formatFileSize.ts
---

## 用法

`formatFileSize` 函数用于格式化文件大小,将字节数转换为可读的文件大小字符串。

```ts
import { formatFileSize } from '@movk/core'

console.log(formatFileSize(1024)) // '1 KB'
console.log(formatFileSize(1536)) // '1.5 KB'
console.log(formatFileSize(1048576)) // '1 MB'
console.log(formatFileSize(1073741824)) // '1 GB'

// 处理边界情况
console.log(formatFileSize(0)) // '0 Bytes'
console.log(formatFileSize(-100)) // '0 Bytes'
```

## API

### `formatFileSize(bytes)`{lang="ts-type"}

格式化文件大小。

### 参数

::field-group
  ::field{name="bytes" type="number" required}
  文件大小(字节)。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  格式化后的文件大小字符串。
  ::
::

## Changelog

:commit-changelog{prefix="helpers/file"}
