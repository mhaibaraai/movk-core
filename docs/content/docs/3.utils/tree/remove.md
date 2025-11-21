---
title: remove
description: 根据 `id` 从树中移除一个节点及其所有子节点。 (此方法会**原地修改**传入的树数组)
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/tree.ts
---

## `remove`

`remove` 方法根据节点 `id` 从树中移除一个节点及其所有子节点。此方法会 **原地修改** 传入的树数组。

### 用法

```ts
import { Tree } from '@movk/core'

const tree = [{ id: 1, name: 'A', children: [{ id: 2, name: 'B' }] }]

Tree.remove(tree, 2)

/*
tree 将会是:
[{ id: 1, name: 'A', children: [] }]
*/
```

### API

`remove<T extends TreeNode>(tree: T[], id: number | string, config?: TreeConfig): boolean`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  源树形结构数组。
  ::
  ::field{name="id" type="number | string" required}
  需要移除的节点的 ID。
  ::
  ::field{name="config" type="TreeConfig"}
  用于自定义树形结构中 `id`, `pid`, `children` 键名的配置对象。

  ::collapsible
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
  ::
  ::
::

#### 返回值

::field-group
  ::field{name="boolean"}
  如果成功找到并移除了节点，则返回 `true`，否则返回 `false`。
  ::
::
