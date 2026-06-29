---
title: pascalCase
description: Convert a string to PascalCase, capitalizing each word and removing separators, ideal for type, class, and component names.
seo:
  title: pascalCase
  description: Convert a string to PascalCase, capitalizing each word and removing separators, ideal for type, class, and component names.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/string/pascalCase.ts
---

## Usage

Converts a string to PascalCase format (each word capitalized with no separators).

```ts
import { pascalCase } from '@movk/core'

pascalCase('firstName') // => 'FirstName'
pascalCase('first_name') // => 'FirstName'
pascalCase('first-name') // => 'FirstName'
pascalCase('XMLHttpRequest')// => 'XmlHttpRequest'
```

## API

`pascalCase(str: string): string`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to convert.
  ::
::

### Returns

::field-group
  ::field{name="string"}
  Returns the string in PascalCase format.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/string"}
