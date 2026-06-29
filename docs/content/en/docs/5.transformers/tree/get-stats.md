---
title: getStats
description: Compute statistics for a tree, including total nodes, leaves, branches, and maximum depth, to summarize its size and shape.
seo:
  title: getStats
  description: Compute statistics for a tree, including total nodes, leaves, branches, and maximum depth, to summarize its size and shape.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/validate.ts
---

## Usage

The `getStats` method traverses the entire tree and returns an object containing its statistics.

```ts [example.ts]
import { Tree } from '@movk/core'

const tree = [
  { id: 1, children: [
    { id: 2 },
    { id: 3, children: [{ id: 4 }] }
  ] }
]

const stats = Tree.getStats(tree)

/*
stats will be:
{
  total: 4,     // total number of nodes
  leafCount: 2, // number of leaf nodes
  maxDepth: 2,  // maximum depth
  minDepth: 1   // minimum depth (among leaf nodes)
}
*/
```

## API

`getStats<T extends TreeNode>(tree: T[], config?: TreeConfig): { total: number; leafCount: number; maxDepth: number; minDepth: number }`{lang="ts-type"}

### Parameters

::field-group
  ::field{name="tree" type="T[]" required}
  The source tree array.
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
  ::field{name="object"}
  Returns a statistics object containing `total`, `leafCount`, `maxDepth`, and `minDepth` properties.
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="validate"}
