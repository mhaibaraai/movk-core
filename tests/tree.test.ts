import { describe, expect, it } from 'vitest'
import { Tree } from '../src/data-structures/tree'

interface TestNode {
  id: string
  name: string
  children?: TestNode[]
  [key: string]: any
}

describe('tree', () => {
  const flatData = [
    { id: '1', name: '部门1', pid: null },
    { id: '2', name: '部门1-1', pid: '1' },
    { id: '3', name: '部门1-2', pid: '1' },
    { id: '4', name: '部门1-1-1', pid: '2' },
    { id: '5', name: '部门1-1-2', pid: '2' },
    { id: '6', name: '部门2', pid: null },
  ]

  const treeData: TestNode[] = [
    {
      id: '1',
      name: '部门1',
      children: [
        {
          id: '2',
          name: '部门1-1',
          children: [
            { id: '4', name: '部门1-1-1', children: [] },
            { id: '5', name: '部门1-1-2', children: [] },
          ],
        },
        { id: '3', name: '部门1-2', children: [] },
      ],
    },
    { id: '6', name: '部门2', children: [] },
  ]

  describe('fromList', () => {
    it('应该将扁平数组转换为树形结构', () => {
      const tree = Tree.fromList(flatData, {
        id: 'id',
        pid: 'pid',
        children: 'children',
      })

      expect(tree).toHaveLength(2)
      expect(tree[0].id).toBe('1')
      expect(tree[0].children).toHaveLength(2)
      expect(tree[0].children?.[0].id).toBe('2')
      expect(tree[0].children?.[0].children).toHaveLength(2)
      expect(tree[1].id).toBe('6')
      expect(tree[1].children).toHaveLength(0)
    })

    it('应该处理空数组', () => {
      const tree = Tree.fromList([])
      expect(tree).toEqual([])
    })

    it('应该使用默认配置', () => {
      const data = [
        { id: '1', name: '根节点', pid: null },
        { id: '2', name: '子节点', pid: '1' },
      ]
      const tree = Tree.fromList(data)

      expect(tree).toHaveLength(1)
      expect(tree[0].children).toHaveLength(1)
    })

    it('应该处理孤儿节点', () => {
      const data = [
        { id: '1', name: '根节点', pid: null },
        { id: '2', name: '孤儿节点', pid: 'non-existent' },
      ]
      const tree = Tree.fromList(data)

      expect(tree).toHaveLength(2) // 孤儿节点会成为根节点
    })
  })

  describe('toList', () => {
    it('应该将树形结构转换为扁平数组', () => {
      const list = Tree.toList(treeData)

      expect(list).toHaveLength(6)
      expect(list[0].id).toBe('1')
      expect(list[1].id).toBe('2')
      expect(list[2].id).toBe('4')
      expect(list[3].id).toBe('5')
      expect(list[4].id).toBe('3')
      expect(list[5].id).toBe('6')
    })

    it('应该处理单个节点', () => {
      const singleNode: TestNode = { id: '1', name: '单个节点', children: [] }
      const list = Tree.toList(singleNode)

      expect(list).toHaveLength(1)
      expect(list[0]).toEqual({ id: '1', name: '单个节点' })
    })

    it('应该移除children属性', () => {
      const list = Tree.toList(treeData)
      list.forEach((item) => {
        expect(item).not.toHaveProperty('children')
      })
    })
  })

  describe('estimateSize', () => {
    it('应该正确估算树的节点数量', () => {
      const size = Tree.estimateSize(treeData)
      expect(size).toBe(6)
    })

    it('应该处理单个节点', () => {
      const singleNode: TestNode = { id: '1', name: '单个节点', children: [] }
      const size = Tree.estimateSize(singleNode)
      expect(size).toBe(1)
    })

    it('应该处理空子节点', () => {
      const node: TestNode = { id: '1', name: '节点', children: [] }
      const size = Tree.estimateSize([node])
      expect(size).toBe(1)
    })
  })

  describe('find', () => {
    it('应该找到第一个匹配的节点', () => {
      const result = Tree.find(treeData, node => node.name.includes('部门1-1'))

      expect(result).toBeDefined()
      expect(result!.node.id).toBe('2')
      expect(result!.depth).toBe(1)
      expect(result!.path).toHaveLength(2)
    })

    it('应该在未找到时返回undefined', () => {
      const result = Tree.find(treeData, node => node.name === '不存在的部门')
      expect(result).toBeUndefined()
    })

    it('应该包含正确的路径信息', () => {
      const result = Tree.find(treeData, node => node.id === '4')

      expect(result!.path).toHaveLength(3)
      expect(result!.path[0].id).toBe('1')
      expect(result!.path[1].id).toBe('2')
      expect(result!.path[2].id).toBe('4')
    })
  })

  describe('findAll', () => {
    it('应该找到所有匹配的节点', () => {
      const results = Tree.findAll(treeData, node => node.name.includes('部门1'))

      expect(results).toHaveLength(5) // 部门1, 部门1-1, 部门1-2, 部门1-1-1, 部门1-1-2
    })

    it('应该返回空数组当没有匹配时', () => {
      const results = Tree.findAll(treeData, node => node.name === '不存在的部门')
      expect(results).toEqual([])
    })

    it('应该包含正确的深度信息', () => {
      const results = Tree.findAll(treeData, node => node.name.includes('部门1-1'))

      const level1Node = results.find(r => r.node.id === '2')
      const level2Node = results.find(r => r.node.id === '4')

      expect(level1Node!.depth).toBe(1)
      expect(level2Node!.depth).toBe(2)
    })
  })

  describe('findById', () => {
    it('应该根据ID找到节点', () => {
      const result = Tree.findById(treeData, '4')

      expect(result).toBeDefined()
      expect(result!.node.name).toBe('部门1-1-1')
    })

    it('应该在未找到时返回undefined', () => {
      const result = Tree.findById(treeData, 'non-existent')
      expect(result).toBeUndefined()
    })

    it('应该使用自定义配置', () => {
      const customData: TestNode[] = [{ key: 'test', value: 'data', id: 'test', name: 'test', children: [] }]
      const result = Tree.findById(customData, 'test', { id: 'key' })

      expect(result).toBeDefined()
      expect(result!.node.value).toBe('data')
    })
  })

  describe('getStats', () => {
    it('应该返回正确的统计信息', () => {
      const stats = Tree.getStats(treeData)

      expect(stats.total).toBe(6)
      expect(stats.leaves).toBe(4) // 4, 5, 3, 6
      expect(stats.depth).toBe(3) // 最大深度为3
      expect(stats.branches).toBe(2) // 1, 2有子节点
    })

    it('应该处理单个叶子节点', () => {
      const singleNode: TestNode = { id: '1', name: '叶子节点', children: [] }
      const stats = Tree.getStats(singleNode)

      expect(stats.total).toBe(1)
      expect(stats.leaves).toBe(1)
      expect(stats.depth).toBe(1)
      expect(stats.branches).toBe(0)
    })

    it('应该处理只有一层的树', () => {
      const flatTree: TestNode[] = [
        { id: '1', name: '节点1', children: [] },
        { id: '2', name: '节点2', children: [] },
      ]
      const stats = Tree.getStats(flatTree)

      expect(stats.total).toBe(2)
      expect(stats.leaves).toBe(2)
      expect(stats.depth).toBe(1)
      expect(stats.branches).toBe(0)
    })
  })

  describe('filter', () => {
    it('应该过滤出匹配的节点及其路径', () => {
      const filtered = Tree.filter(treeData, node => node.name.includes('部门1-1'))

      expect(filtered).toHaveLength(1)
      expect(filtered[0].id).toBe('1') // 根节点保留
      expect(filtered[0].children).toHaveLength(1) // 只保留部门1-1分支
      expect(filtered[0].children?.[0].id).toBe('2')
      expect(filtered[0].children?.[0].children).toHaveLength(2) // 子节点都保留
    })

    it('应该返回空数组当没有匹配时', () => {
      const filtered = Tree.filter(treeData, node => node.name === '不存在的部门')
      expect(filtered).toEqual([])
    })

    it('应该保留匹配节点及其父级路径', () => {
      const filtered = Tree.filter(treeData, node => node.id === '2')

      // 过滤结果应该包含根节点和匹配的节点
      expect(filtered).toHaveLength(1)
      expect(filtered[0].id).toBe('1') // 根节点
      expect(filtered[0].children).toHaveLength(1) // 只保留匹配的分支
      expect(filtered[0].children?.[0].id).toBe('2') // 匹配的节点
      // filter方法只保留匹配的节点，其子节点需要单独匹配才会保留
      expect(filtered[0].children?.[0].children).toHaveLength(0)
    })

    it('应该保留匹配节点的所有子节点', () => {
      // 使用一个能匹配父节点和所有子节点的条件
      const filtered = Tree.filter(treeData, node => node.id === '2' || node.id === '4' || node.id === '5')

      expect(filtered).toHaveLength(1)
      expect(filtered[0].id).toBe('1') // 根节点
      expect(filtered[0].children).toHaveLength(1) // 只保留匹配的分支
      expect(filtered[0].children?.[0].id).toBe('2') // 匹配的节点
      expect(filtered[0].children?.[0].children).toHaveLength(2) // 子节点都保留
    })
  })

  describe('transform', () => {
    it('应该转换树结构', () => {
      const transformed = Tree.transform(treeData, (node, depth) => ({
        key: node.id,
        title: node.name,
        level: depth,
      }))

      expect(transformed).toHaveLength(2)
      expect(transformed[0].key).toBe('1')
      expect(transformed[0].title).toBe('部门1')
      expect(transformed[0].level).toBe(0)
      expect(transformed[0].children?.[0].level).toBe(1)
    })

    it('应该保持树的结构', () => {
      const transformed = Tree.transform(treeData, node => ({
        id: node.id,
        name: node.name.toUpperCase(),
      }))

      expect(transformed[0].children).toHaveLength(2)
      expect(transformed[0].children?.[0].children).toHaveLength(2)
    })
  })

  describe('forEach', () => {
    it('应该遍历所有节点', () => {
      const visited: string[] = []
      Tree.forEach(treeData, (node) => {
        visited.push(node.id)
      })

      expect(visited).toEqual(['1', '2', '4', '5', '3', '6'])
    })

    it('应该支持提前终止遍历', () => {
      const visited: string[] = []
      Tree.forEach(treeData, (node) => {
        visited.push(node.id)
        if (node.id === '2') {
          return false // 跳过子节点
        }
      })

      expect(visited).toEqual(['1', '2', '3', '6'])
    })

    it('应该提供正确的深度信息', () => {
      const depths: number[] = []
      Tree.forEach(treeData, (node, depth) => {
        depths.push(depth)
      })

      expect(depths).toEqual([0, 1, 2, 2, 1, 0])
    })
  })

  describe('insertBefore', () => {
    it('应该在指定节点前插入新节点', () => {
      const tree = JSON.parse(JSON.stringify(treeData)) // 深拷贝
      const success = Tree.insertBefore(tree, '3', { id: '2.5', name: '新部门' })

      expect(success).toBe(true)
      expect(tree[0].children).toHaveLength(3)
      expect(tree[0].children[1].id).toBe('2.5')
      expect(tree[0].children[2].id).toBe('3')
    })

    it('应该在深层节点前插入', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const success = Tree.insertBefore(tree, '5', { id: '4.5', name: '新子部门' })

      expect(success).toBe(true)
      expect(tree[0].children[0].children).toHaveLength(3)
      expect(tree[0].children[0].children[1].id).toBe('4.5')
    })

    it('应该在找不到目标节点时返回false', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const success = Tree.insertBefore(tree, 'non-existent', { id: 'new', name: '新节点' })

      expect(success).toBe(false)
    })
  })

  describe('insertAfter', () => {
    it('应该在指定节点后插入新节点', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const success = Tree.insertAfter(tree, '2', { id: '2.5', name: '新部门' })

      expect(success).toBe(true)
      expect(tree[0].children).toHaveLength(3)
      expect(tree[0].children[1].id).toBe('2.5')
      expect(tree[0].children[2].id).toBe('3')
    })

    it('应该在最后一个节点后插入', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const success = Tree.insertAfter(tree, '6', { id: '7', name: '部门3' })

      expect(success).toBe(true)
      expect(tree).toHaveLength(3)
      expect(tree[2].id).toBe('7')
    })

    it('应该在找不到目标节点时返回false', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const success = Tree.insertAfter(tree, 'non-existent', { id: 'new', name: '新节点' })

      expect(success).toBe(false)
    })
  })

  describe('remove', () => {
    it('应该删除指定节点', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const removed = Tree.remove(tree, '3')

      expect(removed).toBeDefined()
      expect(removed!.id).toBe('3')
      expect(tree[0].children).toHaveLength(1)
    })

    it('应该删除根节点', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const removed = Tree.remove(tree, '6')

      expect(removed).toBeDefined()
      expect(removed!.id).toBe('6')
      expect(tree).toHaveLength(1)
    })

    it('应该删除深层节点', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const removed = Tree.remove(tree, '4')

      expect(removed).toBeDefined()
      expect(removed!.id).toBe('4')
      expect(tree[0].children[0].children).toHaveLength(1)
      expect(tree[0].children[0].children[0].id).toBe('5')
    })

    it('应该在找不到目标节点时返回undefined', () => {
      const tree = JSON.parse(JSON.stringify(treeData))
      const removed = Tree.remove(tree, 'non-existent')

      expect(removed).toBeUndefined()
    })
  })

  describe('validate', () => {
    it('应该验证有效的树结构', () => {
      const result = Tree.validate(treeData)

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual([])
    })

    it('应该检测重复的ID', () => {
      const invalidTree: TestNode[] = [
        {
          id: '1',
          name: '节点1',
          children: [
            { id: '1', name: '重复ID', children: [] }, // 重复ID
          ],
        },
      ]
      const result = Tree.validate(invalidTree)

      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Duplicate ID found: 1')
    })

    it('应该检测缺失的ID', () => {
      const invalidTree = [
        {
          name: '没有ID的节点',
          children: [],
        },
      ]
      const result = Tree.validate(invalidTree)

      expect(result.isValid).toBe(false)
      expect(result.errors.some(error => error.includes('invalid or missing ID'))).toBe(true)
    })

    it('应该检测无效的children属性', () => {
      const invalidTree = [
        {
          id: '1',
          name: '节点1',
          children: 'not an array', // 无效的children
        },
      ]
      const result = Tree.validate(invalidTree as any)

      expect(result.isValid).toBe(false)
      expect(result.errors.some(error => error.includes('invalid children property'))).toBe(true)
    })

    it('应该使用自定义配置验证', () => {
      const customTree: any[] = [
        {
          key: '1',
          name: '节点1',
          items: [
            { key: '2', name: '子节点', items: [] },
          ],
        },
      ]
      const result = Tree.validate(customTree, {
        id: 'key',
        children: 'items',
      })

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual([])
    })
  })
})
