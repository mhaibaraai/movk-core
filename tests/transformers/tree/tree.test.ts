import { describe, expect, it } from 'vitest'
import { Tree } from '../../../src/transformers/tree'

interface TestNode {
  id: string
  name: string
  parentId?: string | null
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

const flatData: TestNode[] = [
  { id: '1', name: '部门1', parentId: null },
  { id: '2', name: '部门1-1', parentId: '1' },
  { id: '3', name: '部门1-2', parentId: '1' },
  { id: '4', name: '部门2', parentId: null },
  { id: '5', name: '部门2-1', parentId: '4' },
]

describe('tree 工具类', () => {
  describe('fromList', () => {
    it('应该从扁平数组创建树形结构', () => {
      const tree = Tree.fromList(flatData, { pid: 'parentId' })
      expect(tree).toHaveLength(2)
      expect(tree[0].id).toBe('1')
      expect(tree[0].children).toHaveLength(2)
      expect(tree[0].children?.[0].id).toBe('2')
    })
  })

  describe('toList', () => {
    it('应该将树形结构转换为扁平数组', () => {
      const list = Tree.toList(sampleTree)
      expect(list).toHaveLength(9)
      const names = list.map(i => i.name)
      expect(names).toContain('root')
      expect(names).toContain('file4.txt')
    })
  })

  describe('estimateSize', () => {
    it('应该估算树的节点总数', () => {
      expect(Tree.estimateSize(sampleTree)).toBe(9)
      expect(Tree.estimateSize([])).toBe(0)
    })
  })

  describe('getStats', () => {
    it('应该获取树的统计信息', () => {
      const stats = Tree.getStats(sampleTree)
      expect(stats).toEqual({
        total: 9,
        leaves: 5,
        depth: 4,
        branches: 4,
      })
    })
  })

  describe('find', () => {
    it('应该找到第一个匹配的节点', () => {
      const result = Tree.find(sampleTree, ({ node }) => node.type === 'file')
      expect(result?.id).toBe('3')
    })
  })

  describe('findAll', () => {
    it('应该找到所有匹配的节点', () => {
      const results = Tree.findAll(sampleTree, ({ node }) => node.type === 'file')
      expect(results).toHaveLength(5)
    })
  })

  describe('findById', () => {
    it('应该通过 ID 找到节点', () => {
      const result = Tree.findById(sampleTree, '8')
      expect(result?.name).toBe('file4.txt')
    })
  })

  describe('filter', () => {
    it('应该过滤树并保留结构', () => {
      const filtered = Tree.filter(sampleTree, ({ node }) => (node.value ?? 0) >= 30)
      expect(filtered).toHaveLength(1)
      expect(Tree.findById(filtered, '6')).toBeDefined()
      expect(Tree.findById(filtered, '8')).toBeDefined()
      expect(Tree.findById(filtered, '9')).toBeDefined()
      expect(Tree.findById(filtered, '3')).toBeUndefined()
    })
  })

  describe('transform', () => {
    it('应该转换树的每个节点', () => {
      const transformed = Tree.transform(sampleTree, ({ node }) => ({
        key: node.id,
        label: node.name,
      }))
      expect(transformed[0]).toHaveProperty('key', '1')
      expect(transformed[0]).toHaveProperty('label', 'root')
      expect(transformed[0].children?.[0]).toHaveProperty('key', '2')
    })
  })

  describe('forEach', () => {
    it('应该遍历树的每个节点', () => {
      const visited: string[] = []
      Tree.forEach(sampleTree, ({ node }) => {
        visited.push(node.id)
      })
      expect(visited).toHaveLength(9)
      expect(visited).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
    })
  })

  describe('insertBefore', () => {
    it('应该在目标节点前插入新节点', () => {
      const treeCopy = JSON.parse(JSON.stringify(sampleTree))
      const newNode = { id: '10', name: 'newFile.txt', type: 'file' }
      const success = Tree.insertBefore(treeCopy, '4', newNode)
      expect(success).toBe(true)
      const parent = Tree.find(treeCopy, ({ node }) => node.id === '2')
      const newIndex = parent?.children?.findIndex((c: TestNode) => c.id === '10')
      const targetIndex = parent?.children?.findIndex((c: TestNode) => c.id === '4')
      expect(newIndex).toBe(targetIndex! - 1)
    })
  })

  describe('insertAfter', () => {
    it('应该在目标节点后插入新节点', () => {
      const treeCopy = JSON.parse(JSON.stringify(sampleTree))
      const newNode = { id: '11', name: 'anotherFile.txt', type: 'file' }
      const success = Tree.insertAfter(treeCopy, '3', newNode)
      expect(success).toBe(true)
      const parent = Tree.find(treeCopy, ({ node }) => node.id === '2')
      const newIndex = parent?.children?.findIndex((c: TestNode) => c.id === '11')
      const targetIndex = parent?.children?.findIndex((c: TestNode) => c.id === '3')
      expect(newIndex).toBe(targetIndex! + 1)
    })
  })

  describe('remove', () => {
    it('应该从树中移除指定节点', () => {
      const treeCopy = JSON.parse(JSON.stringify(sampleTree))
      const removed = Tree.remove(treeCopy, '7')
      expect(removed?.id).toBe('7')
      const found = Tree.findById(treeCopy, '7')
      expect(found).toBeUndefined()
      const parent = Tree.findById(treeCopy, '5')
      expect(parent?.children?.some((c: TestNode) => c.id === '7')).toBe(false)
    })
  })

  describe('validate', () => {
    it('应该验证有效的树', () => {
      const { isValid, errors } = Tree.validate(sampleTree)
      expect(isValid).toBe(true)
      expect(errors).toEqual([])
    })

    it('应该检测重复的 ID', () => {
      const invalidTree = JSON.parse(JSON.stringify(sampleTree))
      invalidTree[0].children[0].children[0].id = '4' // Duplicate id '4'
      const { isValid, errors } = Tree.validate(invalidTree)
      expect(isValid).toBe(false)
      expect(errors[0]).toContain('Duplicate ID found: 4')
    })
  })
})
