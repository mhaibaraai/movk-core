---
title: words
description: 将字符串分解为单词数组。
---

## `words`

`words` 函数是所有大小写转换函数的基础。它接收一个字符串，并将其分解为一个由单词组成的数组。它能处理驼峰式、下划线式、短横线式以及缩写词。

### 用法

```ts
import { words } from '@movk/core'

words('helloWorld')     //=> ['hello', 'World']
words('hello_world')    //=> ['hello', 'world']
words('hello-world')    //=> ['hello', 'world']
words('XMLHttpRequest') //=> ['XML', 'Http', 'Request']
```

### API

`words(str: string): string[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要分解的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string[]"}
  返回一个包含从输入字符串中提取的单词的数组。
  ::
::
