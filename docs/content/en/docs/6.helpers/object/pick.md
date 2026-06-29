---
title: pick
description: Return a new object containing only the given keys from the source, a type-safe way to project a subset of an object's fields.
seo:
  title: pick
  description: Return a new object containing only the given keys from the source, a type-safe way to project a subset of an object's fields.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/pick.ts
---

## Usage

The `pick` function returns a new object containing only the specified keys.

```ts
import { pick } from '@movk/core'

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-15'
}

const publicInfo = pick(user, ['id', 'name', 'email'])
console.log(publicInfo) // { id: 1, name: 'John', email: 'john@example.com' }

const basicInfo = pick(user, ['id', 'name'])
console.log(basicInfo) // { id: 1, name: 'John' }
```

## API

### `pick<T, K>(obj, keys)`{lang="ts-type"}

Returns a new object containing only the specified keys.

### Parameters

::field-group
  ::field{name="obj" type="T extends AnyObject" required}
  The source object.
  ::

  ::field{name="keys" type="K[]" required}
  Array of keys to pick.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="PickByKey<T, K>"}
  A new object containing only the specified keys.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
