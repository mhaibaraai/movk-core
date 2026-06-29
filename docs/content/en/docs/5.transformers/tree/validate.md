---
title: validate
description: Validate the integrity of a tree structure, returning whether it is valid along with a list of errors describing any problems.
seo:
  title: validate
  description: Validate the integrity of a tree structure, returning whether it is valid along with a list of errors describing any problems.
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/validate.ts
---

## Usage

The `validate` method checks whether a tree structure is valid. It primarily checks for two issues:
1. Whether there are duplicate node `id`s.
2. Whether there are circular references (i.e., a node is an ancestor of itself).

```ts [example.ts]
import { Tree } from '@movk/core'

// Valid tree
const validTree = [{ id: 1, children: [{ id: 2 }] }]
Tree.validate(validTree) // no error thrown

// Invalid tree (duplicate IDs)
const invalidTree1 = [{ id: 1 }, { id: 1 }]
try {
  Tree.validate(invalidTree1)
}
catch (e) {
  console.error(e.message) // "Duplicate ID found: 1"
}

// Invalid tree (circular reference)
const node1 = { id: 1 }
const node2 = { id: 2, children: [node1] }
node1.children = [node2]
const invalidTree2 = [node1]
try {
  Tree.validate(invalidTree2)
}
catch (e) {
  console.error(e.message) // "Circular reference detected in node ID: 2"
}
```

## API

`validate<T extends TreeNode>(tree: T[], config?: TreeConfig): void`{lang="ts-type"}

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

If the tree structure is invalid, this method throws an `Error`.

## Changelog

:commit-changelog{prefix="transformers/tree" name="validate"}
