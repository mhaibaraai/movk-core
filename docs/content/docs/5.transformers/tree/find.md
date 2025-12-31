---
title: find
description: 查找并返回第一个满足 `predicate` 条件的节点。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/query.ts
---

## 用法

`find` 方法在树中深度优先搜索，并返回第一个满足 `predicate` 函数条件的节点。

```ts
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

const node = Tree.find(tree, ({ node }) => node.name === 'B')

// node => { id: 2, name: 'B' }
```

## API

`find<T extends TreeNode>(tree: T[], predicate: (context: VisitorContext<T>) => boolean, config?: TreeConfig): T | undefined`{lang="ts-type"}

### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::

  :::field{name="predicate" type="(context: VisitorContext<T>) => boolean" required}
  一个谓词函数，对树中的每个节点调用。当函数为第一个节点返回 `true` 时，`find` 将返回该节点并停止遍历。
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
  ::field{name="T | undefined"}
  返回找到的第一个节点，如果未找到则返回 `undefined`。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="query"}
