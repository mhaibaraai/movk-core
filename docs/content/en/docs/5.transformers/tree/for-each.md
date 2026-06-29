---
title: forEach
description: Traverse a tree and run a visitor callback on every node, an easy way to collect, log, or mutate nodes across all depths.
seo:
  title: forEach
  description: Traverse a tree and run a visitor callback on every node, an easy way to collect, log, or mutate nodes across all depths.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/traverse.ts
---

## Usage

The `forEach` method traverses every node in the tree in depth-first order and executes the `visitor` function on each node.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

const names: string[] = []
Tree.forEach(tree, ({ node }) => {
  names.push(node.name)
})

// names => ['A', 'B']

// Early termination
Tree.forEach(tree, ({ node }) => {
  if (node.name === 'A') {
    return false // stop traversal
  }
})
```

## API

`forEach<T extends TreeNode>(tree: T[], visitor: (context: VisitorContext<T>) => void | false, config?: TreeConfig): void`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
  ::

  :::field{name="predicate" type="(context: VisitorContext<T>) => boolean" required}
  A predicate function called for each node in the tree. If the function returns `true`, that node and all its ancestor nodes will be retained in the result.
  The function receives a `context` object with the following properties:
  :::collapsible
    ::field-group
      ::field{name="node" type="T"}
      The node currently being processed.
      ::

      ::field{name="depth" type="number"}
      The depth of the node (root node is 0).
      ::

      ::field{name="path" type="T[]"}
      An array of nodes from the root to the current node (inclusive).
      ::

      ::field{name="index" type="number"}
      The index of the current node among its siblings.
      ::
    ::
  :::
  :::

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

## Changelog

:commit-changelog{prefix="transformers/tree" name="traverse"}
