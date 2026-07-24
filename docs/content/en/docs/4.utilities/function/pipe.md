---
title: pipe
description: Compose functions from left to right so each return value feeds the next, with overloads that carry types through every step.
seo:
  title: pipe
  description: Compose functions from left to right so each return value feeds the next, with overloads that carry types through every step.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utilities/function/pipe.ts
navigation.badge: v1.4.0
---

## Usage

`pipe` composes several functions into one. At call time they run from left to right, each receiving the previous return value.

```ts
import { pipe } from '@movk/core'

const parse = pipe(
  (v: string) => v.trim(),
  (v: string) => Number(v),
  (v: number) => Math.round(v),
)

parse('  4.6 ') // 5
```

Types evolve step by step, so `parse` is inferred as `(v: string) => number`.

### The First Function May Take Multiple Arguments

Every function after it is chained with a single argument.

```ts
const total = pipe(
  (a: number, b: number) => a + b,
  (v: number) => v * 10,
)

total(2, 3) // 50
```

### Composing Same-Signature Chains

When several unrelated handlers share one signature, `pipe` is the primitive underneath that chain.

```ts
interface NodeAttrs { size: number, hidden?: boolean }

const enlarge = (attrs: NodeAttrs): NodeAttrs => ({ ...attrs, size: attrs.size * 2 })
const hide = (attrs: NodeAttrs): NodeAttrs => ({ ...attrs, hidden: true })

const chained = pipe(enlarge, hide)
chained({ size: 4 }) // { size: 8, hidden: true }
```

### Edge Cases

Overloads cover up to eight functions; beyond that the signature falls back to the same-signature variadic form while runtime behavior stays the same. With no functions at all, the result is the identity function.

```ts
pipe()(42) // 42
```

## API

### `pipe(...fns)`{lang="ts-type"}

Compose functions from left to right.

### Parameters

::field-group
  ::field{name="fns" type="Array<(...args: any[]) => any>" required}
  The functions to compose. The first one may take multiple arguments; each later one receives the previous return value.
  ::
::

### Returns

::field-group
  ::field{name="returns" type="(...args: any[]) => any"}
  The composed function, taking the parameters of the first function and returning the result type of the last.
  ::
::

## Changelog

:commit-changelog{prefix="utilities/function"}
