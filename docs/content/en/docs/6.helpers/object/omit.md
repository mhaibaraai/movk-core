---
title: omit
description: Return a new object that excludes the given keys, leaving the source untouched, useful for stripping fields before output.
seo:
  title: omit
  description: Return a new object that excludes the given keys, leaving the source untouched, useful for stripping fields before output.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/omit.ts
---

## Usage

The `omit` function returns a new object with the specified keys excluded.

```ts
import { omit } from '@movk/core'

const user = {
  id: 1,
  name: 'John',
  password: 'secret',
  email: 'john@example.com'
}

const publicUser = omit(user, ['password'])
console.log(publicUser) // { id: 1, name: 'John', email: 'john@example.com' }

const basicInfo = omit(user, ['password', 'email'])
console.log(basicInfo) // { id: 1, name: 'John' }
```

## API

### `omit<T, K>(obj, keys)`{lang="ts-type"}

Returns a new object with the specified keys excluded.

### Parameters

::field-group
  ::field{name="obj" type="T extends AnyObject" required}
  The source object.
  ::

  ::field{name="keys" type="K[]" required}
  Array of keys to exclude.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="OmitByKey<T, K>"}
  A new object with the specified keys removed.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
