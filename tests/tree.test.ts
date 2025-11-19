import { describe, expect, it } from 'vitest'
import { Tree } from '../src/data-structures/tree'

interface TestNode {
  id: string
  name: string
  type?: 'file' | 'folder'
  value?: number
  children?: TestNode[]
}

const sampleTree: TestNode[] = [
  {
    id: '1',
    name: 'root',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'folder1',
        type: 'folder',
        children: [
          { id: '3', name: 'file1.txt', type: 'file', value: 10, children: [] },
          { id: '4', name: 'file2.txt', type: 'file', value: 20, children: [] },
        ],
      },
      {
        id: '5',
        name: 'folder2',
        type: 'folder',
        children: [
          { id: '6', name: 'file3.txt', type: 'file', value: 30, children: [] },
          {
            id: '7',
            name: 'subfolder',
            type: 'folder',
            children: [
              { id: '8', name: 'file4.txt', type: 'file', value: 40, children: [] },
            ],
          },
        ],
      },
      { id: '9', name: 'file5.txt', type: 'file', value: 50, children: [] },
    ],
  },
]

describe('tree', () => {
  describe('find', () => {
    it('should find the first node matching the predicate', () => {
      const result = Tree.find(sampleTree, ({ node }) => node.type === 'file')
      expect(result).toBeDefined()
      expect(result?.id).toBe('3')
      expect(result?.name).toBe('file1.txt')
    })

    it('should return undefined when no node matches', () => {
      const result = Tree.find(sampleTree, ({ node }) => node.name === 'nonexistent')
      expect(result).toBeUndefined()
    })

    it('should access depth and path in predicate', () => {
      const result = Tree.find(sampleTree, ({ node, depth, path }) => {
        return node.type === 'file' && depth === 3 && path.length === 4
      })
      expect(result).toBeDefined()
      expect(result?.id).toBe('8')
    })

    it('should access index in predicate', () => {
      const result = Tree.find(sampleTree, ({ node, index }) => {
        return node.type === 'file' && index === 1
      })
      expect(result).toBeDefined()
      expect(result?.id).toBe('4')
    })
  })

  describe('findAll', () => {
    it('should find all nodes matching the predicate', () => {
      const results = Tree.findAll(sampleTree, ({ node }) => node.type === 'file')
      expect(results).toHaveLength(5)
      expect(results.map(node => node.id)).toEqual(['3', '4', '6', '8', '9'])
    })

    it('should return empty array when no nodes match', () => {
      const results = Tree.findAll(sampleTree, ({ node }) => node.name === 'nonexistent')
      expect(results).toEqual([])
    })

    it('should find nodes with specific value range', () => {
      const results = Tree.findAll(sampleTree, ({ node }) => {
        return node.type === 'file' && (node.value || 0) >= 30
      })
      expect(results).toHaveLength(3)
      expect(results.map(node => node.value)).toEqual([30, 40, 50])
    })

    it('should find folders at specific depth', () => {
      const results = Tree.findAll(sampleTree, ({ node, depth }) => {
        return node.type === 'folder' && depth === 2
      })
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('7')
    })
  })

  describe('findById', () => {
    it('should find node by id', () => {
      const result = Tree.findById(sampleTree, '5')
      expect(result).toBeDefined()
      expect(result?.name).toBe('folder2')
    })

    it('should return undefined for non-existent id', () => {
      const result = Tree.findById(sampleTree, 'nonexistent')
      expect(result).toBeUndefined()
    })

    it('should find deeply nested node', () => {
      const result = Tree.findById(sampleTree, '8')
      expect(result).toBeDefined()
      expect(result?.name).toBe('file4.txt')
    })
  })

  describe('filter', () => {
    it('should filter nodes and preserve tree structure', () => {
      const filtered = Tree.filter(sampleTree, ({ node }) => node.type === 'file')
      expect(filtered).toHaveLength(1)
      expect(filtered[0].id).toBe('1')
      expect(filtered[0].children).toHaveLength(3)
    })

    it('should include parent nodes of matching children', () => {
      const filtered = Tree.filter(sampleTree, ({ node }) => node.id === '8')
      expect(filtered[0].children).toHaveLength(1)
      const folder2 = filtered[0].children?.find(c => c.id === '5')
      expect(folder2).toBeDefined()
      expect(folder2?.children).toHaveLength(1)
    })

    it('should return empty array when no nodes match', () => {
      const filtered = Tree.filter(sampleTree, ({ node }) => node.name === 'nonexistent')
      expect(filtered).toEqual([])
    })
  })

  describe('transform', () => {
    it('should transform all nodes in the tree', () => {
      const transformed = Tree.transform(sampleTree, ({ node, depth }) => ({
        key: node.id,
        title: node.name,
        level: depth,
        isFile: node.type === 'file',
      }))

      expect(transformed).toHaveLength(1)
      expect(transformed[0].key).toBe('1')
      expect(transformed[0].title).toBe('root')
      expect(transformed[0].level).toBe(0)
      expect(transformed[0].isFile).toBe(false)
    })

    it('should preserve tree structure during transformation', () => {
      const transformed = Tree.transform(sampleTree, ({ node }) => ({
        id: `transformed_${node.id}`,
        originalName: node.name,
      }))

      const rootChildren = transformed[0].children
      expect(rootChildren).toHaveLength(3)
      expect(rootChildren?.[0].id).toBe('transformed_2')
      expect(rootChildren?.[0].originalName).toBe('folder1')
    })

    it('should access path and index in transformer', () => {
      const pathLengths: number[] = []
      const indices: number[] = []

      Tree.transform(sampleTree, ({ path, index }) => {
        pathLengths.push(path.length)
        indices.push(index)
        return { transformed: true }
      })

      expect(pathLengths).toContain(1)
      expect(pathLengths).toContain(2)
      expect(pathLengths).toContain(3)
      expect(pathLengths).toContain(4)
      expect(indices).toContain(0)
      expect(indices).toContain(1)
    })
  })

  describe('forEach', () => {
    it('should visit all nodes in the tree', () => {
      const visitedIds: string[] = []

      Tree.forEach(sampleTree, ({ node }) => {
        visitedIds.push(node.id)
      })

      expect(visitedIds).toHaveLength(9)
      expect(visitedIds).toContain('1')
      expect(visitedIds).toContain('8')
    })

    it('should provide correct depth and path information', () => {
      const nodeInfo: Array<{ id: string, depth: number, pathLength: number }> = []

      Tree.forEach(sampleTree, ({ node, depth, path }) => {
        nodeInfo.push({ id: node.id, depth, pathLength: path.length })
      })

      const rootInfo = nodeInfo.find(n => n.id === '1')
      expect(rootInfo?.depth).toBe(0)
      expect(rootInfo?.pathLength).toBe(1)

      const deepFileInfo = nodeInfo.find(n => n.id === '8')
      expect(deepFileInfo?.depth).toBe(3)
      expect(deepFileInfo?.pathLength).toBe(4)
    })

    it('should allow early termination by returning false', () => {
      const visitedIds: string[] = []

      Tree.forEach(sampleTree, ({ node }) => {
        visitedIds.push(node.id)
        if (node.id === '2') {
          return false
        }
      })

      expect(visitedIds).toContain('1')
      expect(visitedIds).toContain('2')
      expect(visitedIds).not.toContain('3')
      expect(visitedIds).not.toContain('4')
    })

    it('should provide index information', () => {
      const indexInfo: Array<{ id: string, index: number }> = []

      Tree.forEach(sampleTree, ({ node, index }) => {
        indexInfo.push({ id: node.id, index })
      })

      const rootInfo = indexInfo.find(n => n.id === '1')
      expect(rootInfo?.index).toBe(0)

      const folder1Info = indexInfo.find(n => n.id === '2')
      expect(folder1Info?.index).toBe(0)

      const folder2Info = indexInfo.find(n => n.id === '5')
      expect(folder2Info?.index).toBe(1)
    })
  })

  describe('integration tests', () => {
    it('should work with custom config', () => {
      const customTree = [
        {
          key: 'a',
          title: 'Node A',
          items: [
            { key: 'b', title: 'Node B', items: [] },
            { key: 'c', title: 'Node C', items: [] },
          ],
        },
      ]

      const config = { id: 'key', children: 'items' }

      const result = Tree.find(customTree, ({ node }) => node.title === 'Node B', config)
      expect(result).toBeDefined()
      expect(result?.key).toBe('b')

      const allNodes = Tree.findAll(customTree, ({ node }) => node.title.startsWith('Node'), config)
      expect(allNodes).toHaveLength(3)
    })

    it('should handle edge cases', () => {
      const emptyTree: TestNode[] = []
      const singleNodeTree: TestNode[] = [{ id: '1', name: 'single', children: [] }]

      expect(Tree.find(emptyTree, () => true)).toBeUndefined()
      expect(Tree.findAll(emptyTree, () => true)).toEqual([])
      expect(Tree.filter(emptyTree, () => true)).toEqual([])

      expect(Tree.find(singleNodeTree, ({ node }) => node.id === '1')?.id).toBe('1')
      expect(Tree.findAll(singleNodeTree, ({ node }) => node.id === '1')).toHaveLength(1)
    })

    it('should work with complex predicates combining multiple parameters', () => {
      const complexResult = Tree.findAll(sampleTree, ({ node, depth, path, index }) => {
        return (
          node.type === 'file'
          && depth >= 2
          && path.some(p => p.name === 'folder2')
          && index === 0
        )
      })

      expect(complexResult).toHaveLength(2)
      expect(complexResult.map(n => n.id)).toEqual(['6', '8'])
    })
  })
})
