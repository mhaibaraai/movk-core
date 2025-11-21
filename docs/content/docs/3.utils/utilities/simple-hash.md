---
title: simpleHash
description: 生成一个字符串的简短、稳定的哈希值。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/utilities/simple-hash.ts
---

## `simpleHash`

`simpleHash` 函数接收一个字符串，并为其生成一个简短、稳定的哈希值。这对于需要根据输入字符串生成唯一但可预测的标识符（例如，用作 DOM ID 或 class 名称）的场景非常有用。

::warning
这是一个非加密哈希函数，不应用于任何安全相关的场景（如密码存储）。它的主要目的是快速生成一个简短的、冲突率可接受的标识符。
::

### 用法

```ts
import { simpleHash } from '@movk/core'

// 相同的输入总是产生相同的输出
const hash1 = simpleHash('hello world')
const hash2 = simpleHash('hello world')
// hash1 === hash2
// => true

// 不同的输入产生不同的输出
const hash3 = simpleHash('hello there')
// hash1 !== hash3
// => true

console.log(hash1) // => "nf5xd4"
```

### API

`simpleHash(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  需要进行哈希计算的源字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回一个由 32 位哈希值转换而来的 36 进制字符串。
  ::
::

## Changelog

:commit-changelog{prefix="utils/utilities"}
