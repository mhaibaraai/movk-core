---
title: getRandomUUID
description: 生成随机 UUID 字符串
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/uuid.ts
---

## 用法

`getRandomUUID` 函数用于生成符合 UUID v4 格式的随机字符串。

```ts
import { getRandomUUID } from '@movk/core'

const id1 = getRandomUUID()
console.log(id1) // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

const id2 = getRandomUUID()
console.log(id2) // 'f47ac10b-58cc-4372-a567-0e02b2c3d480'

// 用于生成唯一标识符
const componentId = `component-${getRandomUUID()}`
```

## API

### `getRandomUUID()`{lang="ts-type"}

生成随机 UUID 字符串。

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  符合 UUID v4 格式的随机字符串。
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
