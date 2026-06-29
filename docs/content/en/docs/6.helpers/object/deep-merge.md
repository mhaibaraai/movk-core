---
title: deepMerge
description: Recursively merge multiple objects into a new one, with configurable array strategies, null handling, and custom per-key mergers.
seo:
  title: deepMerge
  description: Recursively merge multiple objects into a new one, with configurable array strategies, null handling, and custom per-key mergers.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/helpers/object/deepMerge.ts
---

## Usage

The `deepMerge` function recursively merges multiple source objects into a new object without modifying any input.

Later sources take priority. Properties that are plain objects on both sides are merged recursively instead of overwritten. Symbol keys are supported and prototype pollution is prevented.

```ts
import { deepMerge } from '@movk/core'

const defaults = { theme: 'light', pagination: { page: 1, size: 10 } }
const userConfig = { pagination: { size: 20 }, debug: true }

const result = deepMerge([defaults, userConfig])
// => { theme: 'light', pagination: { page: 1, size: 20 }, debug: true }
```

### Array merge strategy

```ts
// concat (default): concatenate arrays
deepMerge([{ tags: ['a'] }, { tags: ['b'] }])
// => { tags: ['a', 'b'] }

// replace: replace entirely
deepMerge([{ tags: ['a'] }, { tags: ['b'] }], { arrayStrategy: 'replace' })
// => { tags: ['b'] }

// unique: concatenate and deduplicate
deepMerge([{ tags: ['a', 'b'] }, { tags: ['b', 'c'] }], { arrayStrategy: 'unique' })
// => { tags: ['a', 'b', 'c'] }
```

### null/undefined handling

```ts
// skip (default): ignore null/undefined from source
deepMerge([{ a: 1 }, { a: null }])
// => { a: 1 }

// override: allow null/undefined to overwrite
deepMerge([{ a: 1 }, { a: null }], { nullHandling: 'override' })
// => { a: null }
```

### Custom merger

```ts
// add numbers instead of overwriting
const result = deepMerge(
  [{ count: 10 }, { count: 5 }],
  {
    customMerger: (key, targetVal, sourceVal) => {
      if (typeof targetVal === 'number' && typeof sourceVal === 'number')
        return targetVal + sourceVal
      return undefined // fall through to default logic
    },
  },
)
// => { count: 15 }
```

## createDeepMerge

Use `createDeepMerge` to create a merge function with pre-bound options, avoiding the need to pass options on every call.

```ts
import { createDeepMerge } from '@movk/core'

const mergeReplace = createDeepMerge({ arrayStrategy: 'replace' })

mergeReplace([{ tags: ['a'] }, { tags: ['b'] }])
// => { tags: ['b'] }
```

## API

### `deepMerge<T>(sources, options?)`{lang="ts-type"}

Recursively deep-merges multiple objects.

### Parameters

::field-group
  ::field{name="sources" type="T[]" required}
  Array of source objects to merge. Later objects take priority.
  ::

  ::field{name="options" type="DeepMergeOptions"}
  Options to control merge behavior.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="T"}
  A new merged object; no input is modified.
  ::
::

### DeepMergeOptions

::field-group
  ::field{name="arrayStrategy" type="'concat' | 'replace' | 'unique'"}
  Array merge strategy. Defaults to `'concat'`.
  ::

  ::field{name="nullHandling" type="'skip' | 'override'"}
  How to handle null/undefined from source. Defaults to `'skip'`.
  ::

  ::field{name="customMerger" type="CustomMerger"}
  Custom merge function. Return `undefined` to fall through to default logic.
  ::
::

### `createDeepMerge(options)`{lang="ts-type"}

Creates a `deepMerge` function with pre-bound options.

### Parameters

::field-group
  ::field{name="options" type="DeepMergeOptions" required}
  Options to control merge behavior.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="<T>(sources: T[]) => T"}
  A pre-configured deepMerge function.
  ::
::

## Changelog

:commit-changelog{prefix="helpers/object"}
