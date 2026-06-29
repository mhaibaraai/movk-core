---
title: omitUndefined
description: Return a new object with undefined-valued properties removed, a clean way to drop optional fields before serializing or merging.
seo:
  title: omitUndefined
  description: Return a new object with undefined-valued properties removed, a clean way to drop optional fields before serializing or merging.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/omitUndefined.ts
---

## Usage

The `omitUndefined` function removes properties whose value is `undefined` from an object.

```ts
import { omitUndefined } from '@movk/core'

const data = {
  name: 'John',
  age: undefined,
  city: 'New York',
  country: undefined
}

const cleaned = omitUndefined(data)
console.log(cleaned) // { name: 'John', city: 'New York' }

// Clean data before an API request
const requestData = omitUndefined({
  title: 'Post Title',
  content: 'Post content',
  tags: undefined,
  published: true
})
```

## API

### `omitUndefined(obj)`{lang="ts-type"}

Removes properties whose value is `undefined` from an object.

### Parameters

::field-group
  ::field{name="obj" type="T" required}
  The source object.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="Partial<T>"}
  A new object with `undefined`-valued properties removed.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
