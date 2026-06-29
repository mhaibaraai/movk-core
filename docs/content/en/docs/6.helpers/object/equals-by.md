---
title: equalsBy
description: Determine whether two values reference the same item using a key path, a predicate function, or a heuristic list of candidate keys.
seo:
  title: equalsBy
  description: Determine whether two values reference the same item using a key path, a predicate function, or a heuristic list of candidate keys.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/equalsBy.ts
---

## Usage

The `equalsBy` function determines whether two values represent "the same item". It first takes fast paths for referential equality and `null`/`undefined`, unwraps Vue reactive wrappers via `toRaw`, then compares using `by` or `keys` configuration.

```ts
import { equalsBy } from '@movk/core'

// referential equality or primitive fast path
equalsBy(1, 1) // true
equalsBy('a', 'b') // false
```

### by string path

When both values are objects, the path is used to extract and compare values. Setting `by` is exclusive — a hit or miss does not fall through to `keys`.

```ts
equalsBy({ id: 1, name: 'A' }, { id: 1, name: 'B' }, { by: 'id' }) // true
equalsBy({ meta: { id: 1 } }, { meta: { id: 2 } }, { by: 'meta.id' }) // false
```

### by predicate function

```ts
equalsBy(
  { tenant: 't1', user: 'u1' },
  { tenant: 't1', user: 'u1' },
  { by: (a, b) => a.tenant === b.tenant && a.user === b.user },
) // true
```

### keys heuristic fallback

Only used when `by` is not set and both values are objects. Candidate keys are iterated in order; the first key where both sides yield a non-null, non-object scalar is used as the comparison basis.

```ts
equalsBy(
  { label: 'HSL', value: 'hsl' },
  { label: 'HSL', value: 'hsl' },
  { keys: ['value', 'label'] },
) // true (first candidate 'value' matches)
```

## createEqualsBy

Use `createEqualsBy` to create an equality function with pre-bound options, convenient for reuse in `.filter` / `.some` / deduplication callbacks.

```ts
import { createEqualsBy } from '@movk/core'

const sameUser = createEqualsBy<{ id: number }>({ by: 'id' })

users.some(u => sameUser(u, target))
```

## API

### `equalsBy<T>(a, b, options?)`{lang="ts-type"}

Determines whether two values represent the same item.

### Parameters

::field-group
  ::field{name="a" type="T" required}
  Left-hand side.
  ::

  ::field{name="b" type="T" required}
  Right-hand side.
  ::

  ::field{name="options" type="EqualsByOptions<T>"}
  Options to control comparison behavior.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="boolean"}
  Whether the two values are considered the same item.
  ::
::

### EqualsByOptions

::field-group
  ::field{name="by" type="string | ((a: T, b: T) => boolean)"}
  Explicit equality rule — a function or a key path string. Setting this is exclusive; it does not fall through to `keys`.
  ::

  ::field{name="keys" type="ReadonlyArray<string | null | undefined>"}
  Heuristic fallback candidate keys. Only used when `by` is not set and both values are objects.
  ::
::

### `createEqualsBy<T>(options)`{lang="ts-type"}

Creates a pre-bound `equalsBy` function.

### Parameters

::field-group
  ::field{name="options" type="EqualsByOptions<T>" required}
  Options to control comparison behavior.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="(a: T, b: T) => boolean"}
  A pre-configured binary equality function.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
