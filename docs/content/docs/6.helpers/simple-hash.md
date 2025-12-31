---
title: simpleHash
description: 生成字符串的简单哈希值
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/simpleHash.ts
---

## 用法

`simpleHash` 函数用于生成字符串的简单哈希值。

```ts
import { simpleHash } from '@movk/core'

const hash1 = simpleHash('hello world')
console.log(hash1) // 'nf5xd4'

const hash2 = simpleHash('hello world')
console.log(hash1 === hash2) // true，相同字符串产生相同哈希

const hash3 = simpleHash('hello world!')
console.log(hash1 === hash3) // false，不同字符串产生不同哈希
```

## API

### `simpleHash(str)`{lang="ts-type"}

生成字符串的简单哈希值。

### 参数

::field-group
  ::field{name="str" type="string" required}
  待哈希的字符串。
  ::
::

### 返回值

::field-group
  ::field{name="返回值" type="string"}
  32 位哈希值转换为 36 进制字符串。
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
