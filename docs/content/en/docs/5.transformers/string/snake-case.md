---
title: snakeCase
description: Convert a string to snake_case, lowercasing words and joining them with underscores, ideal for database columns and config keys.
seo:
  title: snakeCase
  description: Convert a string to snake_case, lowercasing words and joining them with underscores, ideal for database columns and config keys.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/snakeCase.ts
---

## Usage

Converts a string to snake_case format.

```ts
import { snakeCase } from '@movk/core'

snakeCase('firstName') // => 'first_name'
snakeCase('First Name') // => 'first_name'
snakeCase('first-name') // => 'first_name'
snakeCase('XMLHttpRequest') // => 'xml_http_request'
```

## API

`snakeCase(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string in snake_case format.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
