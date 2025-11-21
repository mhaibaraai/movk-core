---
title: getRandomUUID
description: 生成一个符合 RFC 4122 v4 规范的通用唯一标识符 (UUID)。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/utilities/uuid.ts
---

## `getRandomUUID`

`getRandomUUID` 函数生成一个符合 RFC 4122 v4 规范的通用唯一标识符 (UUID)。UUID 是一个 128 位的数字，通常表示为 32 个十六进制数字，以连字符分隔。

它在需要为组件、事务或任何需要唯一标识符的实体生成 ID 时非常有用。

### 用法

```ts
import { getRandomUUID } from '@movk/core'

const userId = getRandomUUID()
//=> "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" (示例)

const transactionId = `txn_${getRandomUUID()}`
//=> "txn_f1e2d3c4-b5a6-4f7e-8d9c-0a1b2c3d4e5f" (示例)
```

### API

`getRandomUUID(): string`{lang="ts-type"}

#### 返回值

::field-group
  ::field{name="string"}
  返回一个符合 UUID v4 格式的随机字符串。
  ::
::
