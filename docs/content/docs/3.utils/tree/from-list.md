---
title: fromList
description: 将一个扁平的、包含父子关系（通过 `pid`）的数组转换为树形结构。
links:
  - label: GitHub
    icon: i-lucide-github
    to: https://github.com/mhaibaraai/movk-core/blob/main/src/utils/tree.ts
---

## `fromList`

`fromList` 方法将一个扁平的、包含父子关系（通过 `pid`）的数组转换为树形结构。

### 用法

```ts
import { Tree } from '@movk/core'

const list = [
  { id: 1, pid: 0, name: 'root' },
  { id: 2, pid: 1, name: 'child 1' },
  { id: 3, pid: 1, name: 'child 2' },
  { id: 4, pid: 2, name: 'grandchild' }
]

const tree = Tree.fromList(list)

/*
tree 将会是:
[
  {
    id: 1,
    pid: 0,
    name: 'root',
    children: [
      {
        id: 2,
        pid: 1,
        name: 'child 1',
        children: [
          { id: 4, pid: 2, name: 'grandchild', children: [] }
        ]
      },
      { id: 3, pid: 1, name: 'child 2', children: [] }
    ]
  }
]
*/
```

### API

`fromList<T extends TreeNode>(list: T[], config?: TreeConfig): T[]`{lang="ts-type"}

#### 参数

::field-group
  ::field{name="list" type="T[]" required}
  包含父子关系的扁平数组。
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

#### 返回值

::field-group
  ::field{name="T[]"}
  返回一个树形结构的节点数组。
  ::
::

## Changelog

:commit-changelog{prefix="utils/tree"}
