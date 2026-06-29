---
title: simpleHash
description: Generate a fast non-cryptographic hash of a string as a base-36 encoded value, handy for cache keys and lightweight fingerprints.
seo:
  title: simpleHash
  description: Generate a fast non-cryptographic hash of a string as a base-36 encoded value, handy for cache keys and lightweight fingerprints.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/simpleHash.ts
---

## Usage

`simpleHash` generates a simple hash value for a string.

```ts
import { simpleHash } from '@movk/core'

const hash1 = simpleHash('hello world')
console.log(hash1) // 'nf5xd4'

const hash2 = simpleHash('hello world')
console.log(hash1 === hash2) // true — same string produces the same hash

const hash3 = simpleHash('hello world!')
console.log(hash1 === hash3) // false — different strings produce different hashes
```

## API

### `simpleHash(str)`{lang="ts-type"}

Generate a simple hash value for a string.

### Parameters

::field-group
  ::field{name="str" type="string" required}
  The string to hash.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="string"}
  The 32-bit hash value encoded as a base-36 string.
  ::
::

## Changelog

:commit-changelog{prefix="helpers"}
