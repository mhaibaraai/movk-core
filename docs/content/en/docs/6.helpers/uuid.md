---
title: getRandomUUID
description: Generate a random RFC 4122 version 4 UUID string, using the platform crypto API for collision-resistant unique identifiers.
seo:
  title: getRandomUUID
  description: Generate a random RFC 4122 version 4 UUID string, using the platform crypto API for collision-resistant unique identifiers.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/uuid.ts
---

## Usage

`getRandomUUID` generates a random string in UUID v4 format.

```ts
import { getRandomUUID } from '@movk/core'

const id1 = getRandomUUID()
console.log(id1) // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'

const id2 = getRandomUUID()
console.log(id2) // 'f47ac10b-58cc-4372-a567-0e02b2c3d480'

// Use to generate unique identifiers
const componentId = `component-${getRandomUUID()}`
```

## API

### `getRandomUUID()`{lang="ts-type"}

Generate a random UUID string.

### Returns

::field-group
  ::field{name="returns" type="string"}
  A random string in UUID v4 format.
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
