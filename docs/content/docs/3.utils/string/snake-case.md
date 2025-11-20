---
title: snakeCase
description: 将字符串转换为下划线式 (hello_world)。
---

## `snakeCase`

将字符串转换为下划线命名格式（snake_case）。

### 用法

```ts
import { snakeCase } from '@movk/core'

snakeCase('firstName')      //=> 'first_name'
snakeCase('First Name')     //=> 'first_name'
snakeCase('first-name')     //=> 'first_name'
snakeCase('XMLHttpRequest') //=> 'xml_http_request'
```

### API

`snakeCase(str: string): string`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="str" type="string" required}
  要转换的字符串。
  ::
::

#### 返回值

::field-group
  ::field{name="string"}
  返回下划线式格式的字符串。
  ::
::
