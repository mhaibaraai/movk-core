---
title: convertToKebabCase
description: Convert an object's camelCase keys to kebab-case, optionally deeply, returning a new object useful for CSS or HTML attribute mapping.
seo:
  title: convertToKebabCase
  description: Convert an object's camelCase keys to kebab-case, optionally deeply, returning a new object useful for CSS or HTML attribute mapping.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/object/convertToKebabCase.ts
---

## Usage

`convertToKebabCase` converts an object's keys to kebab-case format.

```ts
import { convertToKebabCase } from '@movk/core'

const obj = {
  firstName: 'John',
  lastName: 'Doe',
  userInfo: {
    birthDate: '1990-01-01',
    phoneNumber: '123-456-7890'
  }
}

const converted = convertToKebabCase(obj)
console.log(converted)
// {
//   'first-name': 'John',
//   'last-name': 'Doe',
//   'user-info': { birthDate: '1990-01-01', phoneNumber: '123-456-7890' }
// }

const deepConverted = convertToKebabCase(obj, true)
console.log(deepConverted)
// {
//   'first-name': 'John',
//   'last-name': 'Doe',
//   'user-info': { 'birth-date': '1990-01-01', 'phone-number': '123-456-7890' }
// }
```

## API

### `convertToKebabCase<T>(obj, deep?)`{lang="ts-type"}

Converts an object's keys to kebab-case format.

### Parameters

::field-group
  ::field{name="obj" type="T extends AnyObject" required}
  The object to convert.
  ::

  ::field{name="deep" type="boolean"}
  Whether to deeply convert nested objects. Defaults to `false`.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="T"}
  The converted object.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/object"}
