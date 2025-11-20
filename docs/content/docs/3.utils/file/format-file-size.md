---
title: formatFileSize
description: 将字节数格式化为易于阅读的字符串（如 KB, MB, GB）。
---

## `formatFileSize`

将字节数格式化为易于阅读的字符串（如 KB, MB, GB）。

### 用法

```ts
import { formatFileSize } from '@movk/core'

formatFileSize(512)       //=> '512 Bytes'
formatFileSize(1024)      //=> '1 KB'
formatFileSize(1500)      //=> '1.46 KB'
formatFileSize(1048576)   //=> '1 MB'
formatFileSize(0)         //=> '0 Bytes'
```

### API

`formatFileSize(bytes: number): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="bytes" type="number" required}
  文件的字节大小。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回格式化后的文件大小字符串。
  ::
::
