---
title: filter
description: 根据 `predicate` 过滤树，只保留满足条件的节点及其所有父节点。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/transform.ts
---

## 用法

`filter` 方法根据 `predicate` 函数过滤树。与数组的 `filter` 不同，它会保留所有满足条件的节点以及这些节点的所有父节点，从而维持树的结构。

```ts
import { Tree } from '@movk/core'

const tree = [
  { id: 1, name: 'Root', children: [
    { id: 2, name: 'Active User' },
    { id: 3, name: 'Inactive User', children: [{ id: 4, name: 'Active Child' }] }
  ] }
]

const activeTree = Tree.filter(tree, ({ node }) => node.name.includes('Active'))

/*
activeTree 将会是:
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

### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::

  :::field{name="predicate" type="(context: VisitorContext<T>) => boolean" required}
  一个谓词函数，对树中的每个节点调用。如果函数返回 `true`，该节点及其所有父节点将被保留在结果中。
  该函数接收一个包含以下属性的 `context` 对象：
  :::collapsible
    ::field-group
      ::field{name="node" type="T"}
      当前正在处理的节点。
      ::

      ::field{name="depth" type="number"}
      节点的深度（根节点为 0）。
      ::

      ::field{name="path" type="T[]"}
      从根节点到当前节点的路径数组（包含当前节点）。
      ::

      ::field{name="index" type="number"}
      当前节点在其同级节点中的索引。
      ::
    ::
  :::
  :::

  :::field{name="config" type="TreeConfig"}
  用于自定义树形结构中 `id`, `pid`, `children` 键名的配置对象。
  :::collapsible
    ::field-group
      ::field{name="id" type="string"}
      可选。指定节点唯一标识符的键名。默认为 "id"。
      ::

      ::field{name="pid" type="string"}
      可选。指定节点父级标识符的键名。默认为 "pid"。
      ::

      ::field{name="children" type="string"}
      可选。指定子节点数组的键名。默认为 "children"。
      ::
    ::
  :::
  :::
::

### 返回值

::field-group
  ::field{name="T[]"}
  返回一个新的、经过过滤的树数组。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="transform"}
