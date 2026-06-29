---
title: filter
description: Filter a tree by a predicate, keeping matching nodes along with their ancestors so the surviving branches remain navigable.
seo:
  title: filter
  description: Filter a tree by a predicate, keeping matching nodes along with their ancestors so the surviving branches remain navigable.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/transform.ts
---

## Usage

The `filter` method filters a tree based on a `predicate` function. Unlike array's `filter`, it retains all nodes that satisfy the condition as well as their ancestor nodes, thereby maintaining the tree structure.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [
  { id: 1, name: 'Root', children: [
    { id: 2, name: 'Active User' },
    { id: 3, name: 'Inactive User', children: [{ id: 4, name: 'Active Child' }] }
  ] }
]

const activeTree = Tree.filter(tree, ({ node }) => node.name.includes('Active'))

/*
activeTree will be:
[
  { id: 1, name: 'Root', children: [
    { id: 2, name: 'Active User', children: [] },
    { id: 3, name: 'Inactive User', children: [{ id: 4, name: 'Active Child', children: [] }] }
  ]}
]
*/
```

## API

`filter<T extends TreeNode>(tree: T[], predicate: (context: VisitorContext<T>) => boolean, config?: TreeConfig): T[]`{lang="ts-type"}

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

### Returns

::field-group
  ::field{name="T[]"}
  Returns a new, filtered tree array.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="transform"}
