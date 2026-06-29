---
title: transform
description: Transform every node of a tree with a mapper function, returning a new tree whose nodes carry reshaped data and the same structure.
seo:
  title: transform
  description: Transform every node of a tree with a mapper function, returning a new tree whose nodes carry reshaped data and the same structure.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/transform.ts
---

## Usage

The `transform` method traverses every node in the tree and uses a `transformer` function to convert each node into a new shape, building a tree with a new structure.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'Admin', children: [{ id: 2, name: 'Guest' }] }]

const transformedTree = Tree.transform(tree, ({ node }) => ({
  key: node.id,
  title: node.name,
  children: [] // transformer handles child nodes
}))

/*
transformedTree will be:
[
  {
    key: 1,
    title: 'Admin',
    children: [
      { key: 2, title: 'Guest', children: [] }
    ]
  }
]
*/
```

## API

`transform<T extends TreeNode, R extends TreeNode>(tree: T[], transformer: (context: VisitorContext<T>) => R, config?: TreeConfig): R[]`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
  ::

  :::field{name="transformer" type="(context: VisitorContext<T>) => R" required}
  A transformer function called for each node in the tree. Returns a new node object with the transformed structure.
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
  ::field{name="R[]"}
  Returns the transformed new tree array.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="transform"}
