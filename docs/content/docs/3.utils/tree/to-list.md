---
title: toList
description: 将树形结构转换回扁平数组。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/tree.ts
---

## `toList`

`toList` 方法将树形结构转换回扁平数组。

### 用法

```ts
import { Tree } from '@movk/core'

const tree = [
  {
    id: 1,
    pid: 0,
    name: 'root',
    children: [
      { id: 2, pid: 1, name: 'child 1' },
      { id: 3, pid: 1, name: 'child 2' }
    ]
  }
]

const list = Tree.toList(tree)
/*
list 将会是:
[
  { id: 1, pid: 0, name: 'root' },
  { id: 2, pid: 1, name: 'child 1' },
  { id: 3, pid: 1, name: 'child 2' }
]
*/
```

### API

`toList<T extends TreeNode>(tree: T[], config?: TreeConfig): T[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="tree" type="T[]" required}
  树形结构的节点数组。
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
  ::field{name="T[]"}
  返回一个扁平的节点数组。
  ::
::
