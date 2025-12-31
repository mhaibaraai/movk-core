import type { TreeNode } from '../../../src/transformers/tree/types'
import { describe, expect, it } from 'vitest'
import { bfsGenerator, dfsGenerator, parseTreeConfig, selectStrategy } from '../../../src/transformers/tree/helpers'

describe('tree/helpers', () => {
  describe('parseTreeConfig', () => {
    it('应返回默认配置', () => {
      const config = parseTreeConfig()
      expect(config).toEqual({
        id: 'id',
        pid: 'pid',
        children: 'children',
      })
    })

    it('应合并自定义配置与默认值', () => {
      const config = parseTreeConfig({ id: 'customId' })
      expect(config).toEqual({
        id: 'customId',
        pid: 'pid',
        children: 'children',
      })
    })

    it('应覆盖所有默认值', () => {
      const config = parseTreeConfig({
        id: 'nodeId',
        pid: 'parentId',
        children: 'items',
      })
      expect(config).toEqual({
        id: 'nodeId',
        pid: 'parentId',
        children: 'items',
      })
    })

    it('应处理部分配置', () => {
      const config = parseTreeConfig({ children: 'subNodes' })
      expect(config).toEqual({
        id: 'id',
        pid: 'pid',
        children: 'subNodes',
      })
    })
  })

  describe('dfsGenerator', () => {
    it('应以深度优先顺序遍历树', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            { id: 2, children: [] },
            { id: 3, children: [] },
          ],
        },
        {
          id: 4,
          children: [
            { id: 5, children: [] },
          ],
        },
      ]

      const results = Array.from(dfsGenerator(tree))
      const ids = results.map(r => r.node.id)

      // DFS: 根 -> 左子树 -> 右子树
      expect(ids).toEqual([1, 2, 3, 4, 5])
    })

    it('应正确记录节点深度', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 3, children: [] },
              ],
            },
          ],
        },
      ]

      const results = Array.from(dfsGenerator(tree))
      const depths = results.map(r => ({ id: r.node.id, depth: r.depth }))

      expect(depths).toEqual([
        { id: 1, depth: 0 },
        { id: 2, depth: 1 },
        { id: 3, depth: 2 },
      ])
    })

    it('应正确记录节点路径', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 3, children: [] },
              ],
            },
          ],
        },
      ]

      const results = Array.from(dfsGenerator(tree))
      const lastResult = results[results.length - 1]

      expect(lastResult.path.map(n => n.id)).toEqual([1, 2, 3])
    })

    it('应正确记录节点索引', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            { id: 2, children: [] },
            { id: 3, children: [] },
          ],
        },
      ]

      const results = Array.from(dfsGenerator(tree))
      const indices = results.map(r => ({ id: r.node.id, index: r.index }))

      // DFS 的索引在每个层级独立计数
      expect(indices).toEqual([
        { id: 1, index: 0 },
        { id: 2, index: 0 }, // 子节点从 0 开始
        { id: 3, index: 1 },
      ])
    })

    it('应处理空树', () => {
      const results = Array.from(dfsGenerator([]))
      expect(results).toEqual([])
    })

    it('应支持自定义 children 键', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          items: [
            { id: 2, items: [] },
          ],
        },
      ]

      const results = Array.from(dfsGenerator(tree, { children: 'items' }))
      const ids = results.map(r => r.node.id)

      expect(ids).toEqual([1, 2])
    })

    it('应处理没有 children 的节点', () => {
      const tree: TreeNode[] = [
        { id: 1 },
        { id: 2 },
      ]

      const results = Array.from(dfsGenerator(tree))
      const ids = results.map(r => r.node.id)

      expect(ids).toEqual([1, 2])
    })
  })

  describe('bfsGenerator', () => {
    it('应以广度优先顺序遍历树', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            { id: 2, children: [] },
            { id: 3, children: [] },
          ],
        },
        {
          id: 4,
          children: [
            { id: 5, children: [] },
          ],
        },
      ]

      const results = Array.from(bfsGenerator(tree))
      const ids = results.map(r => r.node.id)

      // BFS: 逐层遍历
      expect(ids).toEqual([1, 4, 2, 3, 5])
    })

    it('应正确记录节点深度', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 3, children: [] },
              ],
            },
            { id: 4, children: [] },
          ],
        },
      ]

      const results = Array.from(bfsGenerator(tree))
      const depths = results.map(r => ({ id: r.node.id, depth: r.depth }))

      expect(depths).toEqual([
        { id: 1, depth: 0 },
        { id: 2, depth: 1 },
        { id: 4, depth: 1 },
        { id: 3, depth: 2 },
      ])
    })

    it('应正确记录节点路径', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 3, children: [] },
              ],
            },
          ],
        },
      ]

      const results = Array.from(bfsGenerator(tree))
      const lastResult = results[results.length - 1]

      expect(lastResult.path.map(n => n.id)).toEqual([1, 2, 3])
    })

    it('应正确记录节点索引', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            { id: 2, children: [] },
            { id: 3, children: [] },
          ],
        },
      ]

      const results = Array.from(bfsGenerator(tree))
      const indices = results.map(r => ({ id: r.node.id, index: r.index }))

      expect(indices).toEqual([
        { id: 1, index: 0 },
        { id: 2, index: 1 },
        { id: 3, index: 2 },
      ])
    })

    it('应处理空树', () => {
      const results = Array.from(bfsGenerator([]))
      expect(results).toEqual([])
    })

    it('应支持自定义 children 键', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          items: [
            { id: 2, items: [] },
          ],
        },
      ]

      const results = Array.from(bfsGenerator(tree, { children: 'items' }))
      const ids = results.map(r => r.node.id)

      expect(ids).toEqual([1, 2])
    })

    it('应处理多层级树结构', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                { id: 5, children: [] },
                { id: 6, children: [] },
              ],
            },
            {
              id: 3,
              children: [
                { id: 7, children: [] },
              ],
            },
            { id: 4, children: [] },
          ],
        },
      ]

      const results = Array.from(bfsGenerator(tree))
      const ids = results.map(r => r.node.id)

      // 第0层: 1
      // 第1层: 2, 3, 4
      // 第2层: 5, 6, 7
      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe('selectStrategy', () => {
    it('对于 find 操作应返回 dfs', () => {
      expect(selectStrategy('find')).toBe('dfs')
    })

    it('对于 findAll 操作应返回 dfs', () => {
      expect(selectStrategy('findAll')).toBe('dfs')
    })

    it('对于 filter 操作应返回 dfs', () => {
      expect(selectStrategy('filter')).toBe('dfs')
    })

    it('对于 transform 操作应返回 dfs', () => {
      expect(selectStrategy('transform')).toBe('dfs')
    })

    it('对于 forEach 操作应返回 dfs', () => {
      expect(selectStrategy('forEach')).toBe('dfs')
    })

    it('对于 stats 操作应返回 dfs', () => {
      expect(selectStrategy('stats')).toBe('dfs')
    })

    it('对于 validate 操作应返回 dfs', () => {
      expect(selectStrategy('validate')).toBe('dfs')
    })
  })

  describe('生成器对比测试', () => {
    it('dFS 和 BFS 应产生不同的遍历顺序', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            { id: 2, children: [{ id: 4, children: [] }] },
            { id: 3, children: [] },
          ],
        },
      ]

      const dfsIds = Array.from(dfsGenerator(tree)).map(r => r.node.id)
      const bfsIds = Array.from(bfsGenerator(tree)).map(r => r.node.id)

      expect(dfsIds).toEqual([1, 2, 4, 3])
      expect(bfsIds).toEqual([1, 2, 3, 4])
    })

    it('dFS 和 BFS 应访问相同数量的节点', () => {
      const tree: TreeNode[] = [
        {
          id: 1,
          children: [
            { id: 2, children: [{ id: 4, children: [] }] },
            { id: 3, children: [{ id: 5, children: [] }] },
          ],
        },
      ]

      const dfsCount = Array.from(dfsGenerator(tree)).length
      const bfsCount = Array.from(bfsGenerator(tree)).length

      expect(dfsCount).toBe(5)
      expect(bfsCount).toBe(5)
    })
  })
})
