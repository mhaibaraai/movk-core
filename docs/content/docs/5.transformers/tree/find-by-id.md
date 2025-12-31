---
title: findById
description: 通过节点 `id` 快速查找节点。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/transformers/tree/query.ts
---

## 用法

`findById` 方法通过节点的 `id` 快速查找并返回对应的节点。这是一个高效率的查找操作。

```ts
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

const node = Tree.findById(tree, 2)

// node => { id: 2, name: 'B' }
```

## API

`findById<T extends TreeNode>(tree: T[], id: number | string, config?: TreeConfig): T | undefined`{lang="ts-type"}

### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::

  ::field{name="id" type="number | string" required}
  需要查找的节点的 ID。
  ::

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
  返回找到的节点，如果未找到则返回 `undefined`。
  ::
::

## Changelog

:commit-changelog{prefix="transformers/tree" name="query"}
