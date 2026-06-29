---
title: findById
description: Find a single tree node by its id using the configured id field, returning the node or undefined when no match exists.
seo:
  title: findById
  description: Find a single tree node by its id using the configured id field, returning the node or undefined when no match exists.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/query.ts
---

## Usage

The `findById` method quickly finds and returns a node by its `id`. This is an efficient lookup operation.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

const node = Tree.findById(tree, 2)

// node => { id: 2, name: 'B' }
```

## API

`findById<T extends TreeNode>(tree: T[], id: number | string, config?: TreeConfig): T | undefined`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
  ::

  ::field{name="id" type="number | string" required}
  The ID of the node to find.
  ::

  :::field{name="config" type="TreeConfig"}
  Configuration object for customizing the `id`, `pid`, `children` key names in the tree structure.
  :::collapsible
    ::field-group
      ::field{name="id" type="string"}
      Optional. The key name for the node's unique identifier. Defaults to "id".
      ::

      ::field{name="pid" type="string"}
      Optional. The key name for the node's parent identifier. Defaults to "pid".
      ::

      ::field{name="children" type="string"}
      Optional. The key name for the children array. Defaults to "children".
      ::
    ::
  :::
  :::
::

### Returns

::field-group
  ::field{name="T | undefined"}
  Returns the found node, or `undefined` if no match is found.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="query"}
