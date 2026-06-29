---
title: separate
description: Split an object into picked and omitted parts by the given keys, returning both in one call, ideal for separating sensitive fields.
seo:
  title: separate
  description: Split an object into picked and omitted parts by the given keys, returning both in one call, ideal for separating sensitive fields.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/separate.ts
---

## Usage

The `separate` function splits an object into two parts by the specified keys.

```ts
import { separate } from '@movk/core'

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret',
  role: 'admin'
}

const { picked, omitted } = separate(user, ['id', 'name'])
console.log(picked) // { id: 1, name: 'John' }
console.log(omitted) // { email: 'john@example.com', password: 'secret', role: 'admin' }

// Separate sensitive information
const { picked: publicData, omitted: privateData } = separate(user, ['id', 'name', 'email'])
```

## API

### `separate(obj, keys)`{lang="ts-type"}

Splits an object into two parts by the specified keys.

### Parameters

::field-group
  ::field{name="obj" type="T" required}
  The source object.
  ::

  ::field{name="keys" type="K[]" required}
  Array of keys to separate.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="{ picked: PickByKey<T, K>, omitted: OmitByKey<T, K> }"}
  An object containing both `picked` and `omitted` sub-objects.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
