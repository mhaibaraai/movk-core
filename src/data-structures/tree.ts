import type {
  TreeConfigInput,
  TreeNode,
  TreeNodeBase,
  TreeNodeResult,
  TreePredicate,
  TreeStats,
  TreeTransformer,
  TreeVisitor,
} from '../types'
import { TreeConfigSchema } from '../types'

/**
 * 树形数据结构操作类，提供树形数据的各种操作方法
 *
 * @category Data Structures
 * @example
 * ```ts
 * // 从扁平数组创建树形结构
 * const flatList = [
 *   { id: '1', name: '根节点', pid: null },
 *   { id: '2', name: '子节点1', pid: '1' },
 *   { id: '3', name: '子节点2', pid: '1' },
 *   { id: '4', name: '孙节点', pid: '2' }
 * ]
 *
 * const tree = Tree.fromList(flatList)
 * console.log(tree) // 树形结构
 *
 * // 查找节点
 * const found = Tree.find(tree, (node) => node.name === '子节点1')
 *
 * // 过滤节点
 * const filtered = Tree.filter(tree, (node) => node.name.includes('子'))
 *
 * // 转换树形结构
 * const transformed = Tree.transform(tree, (node) => ({
 *   ...node,
 *   displayName: `[${node.name}]`
 * }))
 * ```
 */
export class Tree {
  private static* dfsGenerator<T extends TreeNodeBase>(
    nodes: TreeNode<T>[],
    config: TreeConfigInput,
    path: TreeNode<T>[] = [],
  ): Generator<TreeNodeResult<T>> {
    const { children: childrenKey } = TreeConfigSchema.parse(config)
    let index = 0

    for (const node of nodes) {
      const currentPath = [...path, node]
      yield { node, path: currentPath, depth: path.length, index: index++ }

      const children = node[childrenKey]
      if (children && children.length > 0) {
        yield* Tree.dfsGenerator(children, config, currentPath)
      }
    }
  }

  private static* bfsGenerator<T extends TreeNodeBase>(
    nodes: TreeNode<T>[],
    config: TreeConfigInput,
  ): Generator<TreeNodeResult<T>> {
    const { children: childrenKey } = TreeConfigSchema.parse(config)
    const queue: TreeNodeResult<T>[] = nodes.map((node, index) => ({
      node,
      path: [node],
      depth: 0,
      index,
    }))

    let index = nodes.length

    while (queue.length > 0) {
      const current = queue.shift()!
      yield current

      const children = current.node[childrenKey]
      if (children && children.length > 0) {
        children.forEach((child: TreeNode<T>) => {
          const childPath = [...current.path, child]
          queue.push({
            node: child,
            path: childPath,
            depth: current.depth + 1,
            index: index++,
          })
        })
      }
    }
  }

  private static selectStrategy(
    operation: 'find' | 'findAll' | 'filter' | 'transform' | 'forEach' | 'stats' | 'validate',
  ): 'dfs' | 'bfs' {
    // 大多数操作使用DFS，因为它内存效率更高，适合树结构操作
    switch (operation) {
      case 'find':
      case 'findAll':
      case 'filter':
      case 'transform':
      case 'forEach':
      case 'stats':
      case 'validate':
        return 'dfs'
      default:
        return 'dfs'
    }
  }

  /**
   * 从扁平数组创建树形结构
   *
   * @category Data Structures
   * @param list 扁平数组数据
   * @param config 树形配置选项
   * @returns 树形结构数组
   * @example
   * ```ts
   * const flatData = [
   *   { id: '1', name: '部门1', parentId: null },
   *   { id: '2', name: '部门1-1', parentId: '1' },
   *   { id: '3', name: '部门1-2', parentId: '1' },
   *   { id: '4', name: '部门1-1-1', parentId: '2' }
   * ]
   *
   * const tree = Tree.fromList(flatData, {
   *   id: 'id',
   *   pid: 'parentId',
   *   children: 'children'
   * })
   *
   * console.log(tree) // 转换为树形结构
   * ```
   */
  static fromList<T extends TreeNodeBase>(
    list: T[],
    config: TreeConfigInput = {},
  ): TreeNode<T>[] {
    const validConfig = TreeConfigSchema.parse(config)
    const { id: idKey, pid: pidKey, children: childrenKey } = validConfig

    if (!Array.isArray(list) || list.length === 0) {
      return []
    }

    // 创建节点映射
    const nodeMap = new Map<string, TreeNode<T>>()
    const roots: TreeNode<T>[] = []

    // 初始化所有节点
    list.forEach((item) => {
      const node = { ...item, [childrenKey]: [] } as TreeNode<T>
      nodeMap.set(item[idKey], node)
    })

    // 构建树结构
    list.forEach((item) => {
      const node = nodeMap.get(item[idKey])!
      const parentId = item[pidKey]

      if (parentId && nodeMap.has(parentId)) {
        const parent = nodeMap.get(parentId)!
        parent[childrenKey].push(node)
      }
      else {
        roots.push(node)
      }
    })

    return roots
  }

  /**
   * 将树形结构转换为扁平数组
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param config 树形配置选项
   * @returns 扁平数组
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '根节点',
   *     children: [
   *       { id: '2', name: '子节点1', children: [] },
   *       { id: '3', name: '子节点2', children: [] }
   *     ]
   *   }
   * ]
   *
   * const flatList = Tree.toList(tree)
   * console.log(flatList) // [{ id: '1', name: '根节点' }, { id: '2', name: '子节点1' }, ...]
   * ```
   */
  static toList<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    config: TreeConfigInput = {},
  ): T[] {
    const validConfig = TreeConfigSchema.parse(config)
    const { children: childrenKey } = validConfig
    const result: T[] = []

    const nodes = Array.isArray(tree) ? tree : [tree]

    const traverse = (node: TreeNode<T>) => {
      const { [childrenKey]: children, ...rest } = node
      result.push(rest as T)

      if (children && children.length > 0) {
        children.forEach(traverse)
      }
    }

    nodes.forEach(traverse)
    return result
  }

  static estimateSize<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    config: TreeConfigInput = {},
  ): number {
    const validConfig = TreeConfigSchema.parse(config)
    const { children: childrenKey } = validConfig

    const nodes = Array.isArray(tree) ? tree : [tree]
    let count = 0

    const traverse = (node: TreeNode<T>) => {
      count++
      const children = node[childrenKey]
      if (children && children.length > 0) {
        children.forEach(traverse)
      }
    }

    nodes.forEach(traverse)
    return count
  }

  static find<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    predicate: TreePredicate<T>,
    config: TreeConfigInput = {},
  ): TreeNodeResult<T> | undefined {
    const nodes = Array.isArray(tree) ? tree : [tree]
    const strategy = Tree.selectStrategy('find')

    const generator = strategy === 'dfs'
      ? Tree.dfsGenerator(nodes, config)
      : Tree.bfsGenerator(nodes, config)

    for (const result of generator) {
      if (predicate(result.node, result.depth, result.path)) {
        return result
      }
    }
    return undefined
  }

  static findAll<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    predicate: TreePredicate<T>,
    config: TreeConfigInput = {},
  ): TreeNodeResult<T>[] {
    const nodes = Array.isArray(tree) ? tree : [tree]
    const strategy = Tree.selectStrategy('findAll')
    const results: TreeNodeResult<T>[] = []

    const generator = strategy === 'dfs'
      ? Tree.dfsGenerator(nodes, config)
      : Tree.bfsGenerator(nodes, config)

    for (const result of generator) {
      if (predicate(result.node, result.depth, result.path)) {
        results.push(result)
      }
    }

    return results
  }

  static findById<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    id: string,
    config: TreeConfigInput = {},
  ): TreeNodeResult<T> | undefined {
    const validConfig = TreeConfigSchema.parse(config)
    const { id: idKey } = validConfig

    return this.find(tree, node => node[idKey] === id, config)
  }

  static getStats<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    config: TreeConfigInput = {},
  ): TreeStats {
    const validConfig = TreeConfigSchema.parse(config)
    const { children: childrenKey } = validConfig

    const nodes = Array.isArray(tree) ? tree : [tree]
    let total = 0
    let leaves = 0
    let maxDepth = 0
    let branches = 0

    const traverse = (node: TreeNode<T>, depth: number) => {
      total++
      maxDepth = Math.max(maxDepth, depth)

      const children = node[childrenKey]
      if (children && children.length > 0) {
        branches++
        children.forEach((child: TreeNode<T>) => traverse(child, depth + 1))
      }
      else {
        leaves++
      }
    }

    nodes.forEach(node => traverse(node, 1))

    return {
      total,
      leaves,
      depth: maxDepth,
      branches,
    }
  }

  static filter<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    predicate: TreePredicate<T>,
    config: TreeConfigInput = {},
  ): TreeNode<T>[] {
    const validConfig = TreeConfigSchema.parse(config)
    const { children: childrenKey } = validConfig

    const nodes = Array.isArray(tree) ? tree : [tree]
    const results: TreeNode<T>[] = []

    const traverse = (
      node: TreeNode<T>,
      depth: number,
      path: readonly TreeNode<T>[],
    ): TreeNode<T> | null => {
      const children = node[childrenKey]
      const filteredChildren: TreeNode<T>[] = []

      if (children && children.length > 0) {
        const newPath = [...path, node]
        children.forEach((child: TreeNode<T>) => {
          const filteredChild = traverse(child, depth + 1, newPath)
          if (filteredChild) {
            filteredChildren.push(filteredChild)
          }
        })
      }

      if (predicate(node, depth, path) || filteredChildren.length > 0) {
        return {
          ...node,
          [childrenKey]: filteredChildren,
        } as TreeNode<T>
      }

      return null
    }

    nodes.forEach((node) => {
      const filtered = traverse(node, 0, [])
      if (filtered) {
        results.push(filtered)
      }
    })

    return results
  }

  static transform<T extends TreeNodeBase, R extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    transformer: TreeTransformer<T, R>,
    config: TreeConfigInput = {},
  ): TreeNode<R>[] {
    const validConfig = TreeConfigSchema.parse(config)
    const { children: childrenKey } = validConfig

    const nodes = Array.isArray(tree) ? tree : [tree]
    const results: TreeNode<R>[] = []

    const traverse = (
      node: TreeNode<T>,
      depth: number,
      path: readonly TreeNode<T>[],
    ): TreeNode<R> => {
      const children = node[childrenKey]
      const transformedChildren: TreeNode<R>[] = []

      if (children && children.length > 0) {
        const newPath = [...path, node]
        children.forEach((child: TreeNode<T>) => {
          transformedChildren.push(traverse(child, depth + 1, newPath))
        })
      }

      const transformed = transformer(node, depth, path)
      return {
        ...transformed,
        [childrenKey]: transformedChildren,
      } as TreeNode<R>
    }

    nodes.forEach((node) => {
      results.push(traverse(node, 0, []))
    })

    return results
  }

  static forEach<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    visitor: TreeVisitor<T>,
    config: TreeConfigInput = {},
  ): void {
    const validConfig = TreeConfigSchema.parse(config)
    const { children: childrenKey } = validConfig

    const nodes = Array.isArray(tree) ? tree : [tree]

    const traverse = (
      node: TreeNode<T>,
      depth: number,
      path: readonly TreeNode<T>[],
    ) => {
      const shouldContinue = visitor(node, depth, path)

      if (shouldContinue !== false) {
        const children = node[childrenKey]
        if (children && children.length > 0) {
          const newPath = [...path, node]
          children.forEach((child: TreeNode<T>) => {
            traverse(child, depth + 1, newPath)
          })
        }
      }
    }

    nodes.forEach(node => traverse(node, 0, []))
  }

  static insertBefore<T extends TreeNodeBase>(
    tree: TreeNode<T>[],
    targetId: string,
    newNode: T,
    config: TreeConfigInput = {},
  ): boolean {
    const validConfig = TreeConfigSchema.parse(config)
    const { id: idKey, children: childrenKey } = validConfig

    const newTreeNode = { ...newNode, [childrenKey]: [] } as TreeNode<T>

    const traverse = (nodes: TreeNode<T>[], parentPath: readonly TreeNode<T>[]): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        if (node[idKey] === targetId) {
          nodes.splice(i, 0, newTreeNode)
          return true
        }

        const children = node[childrenKey]
        if (children && children.length > 0) {
          const newPath = [...parentPath, node]
          if (traverse(children, newPath)) {
            return true
          }
        }
      }
      return false
    }

    return traverse(tree, [])
  }

  static insertAfter<T extends TreeNodeBase>(
    tree: TreeNode<T>[],
    targetId: string,
    newNode: T,
    config: TreeConfigInput = {},
  ): boolean {
    const validConfig = TreeConfigSchema.parse(config)
    const { id: idKey, children: childrenKey } = validConfig

    const newTreeNode = { ...newNode, [childrenKey]: [] } as TreeNode<T>

    const traverse = (nodes: TreeNode<T>[], parentPath: readonly TreeNode<T>[]): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        if (node[idKey] === targetId) {
          nodes.splice(i + 1, 0, newTreeNode)
          return true
        }

        const children = node[childrenKey]
        if (children && children.length > 0) {
          const newPath = [...parentPath, node]
          if (traverse(children, newPath)) {
            return true
          }
        }
      }
      return false
    }

    return traverse(tree, [])
  }

  static remove<T extends TreeNodeBase>(
    tree: TreeNode<T>[],
    targetId: string,
    config: TreeConfigInput = {},
  ): TreeNode<T> | undefined {
    const validConfig = TreeConfigSchema.parse(config)
    const { id: idKey, children: childrenKey } = validConfig

    const traverse = (nodes: TreeNode<T>[]): TreeNode<T> | undefined => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        if (node[idKey] === targetId) {
          return nodes.splice(i, 1)[0]
        }

        const children = node[childrenKey]
        if (children && children.length > 0) {
          const result = traverse(children)
          if (result)
            return result
        }
      }
      return undefined
    }

    return traverse(tree)
  }

  static validate<T extends TreeNodeBase>(
    tree: TreeNode<T> | TreeNode<T>[],
    config: TreeConfigInput = {},
  ): { isValid: boolean, errors: string[] } {
    const validConfig = TreeConfigSchema.parse(config)
    const { id: idKey, children: childrenKey } = validConfig

    const nodes = Array.isArray(tree) ? tree : [tree]
    const errors: string[] = []
    const visitedIds = new Set<string>()

    const traverse = (
      node: TreeNode<T>,
      depth: number,
      path: readonly TreeNode<T>[],
    ) => {
      // 检查节点是否有有效的ID
      const nodeId = node[idKey]
      if (!nodeId || typeof nodeId !== 'string') {
        errors.push(`Node at depth ${depth} has invalid or missing ID`)
        return
      }

      // 检查ID是否重复
      if (visitedIds.has(nodeId)) {
        errors.push(`Duplicate ID found: ${nodeId}`)
        return
      }
      visitedIds.add(nodeId)

      // 检查循环引用
      if (path.some(parent => parent[idKey] === nodeId)) {
        errors.push(`Circular reference detected for ID: ${nodeId}`)
        return
      }

      // 检查children属性
      const children = node[childrenKey]
      if (children !== undefined && !Array.isArray(children)) {
        errors.push(`Node ${nodeId} has invalid children property (not an array)`)
        return
      }

      // 递归验证子节点
      if (children && children.length > 0) {
        const newPath = [...path, node]
        children.forEach((child: TreeNode<T>) => {
          traverse(child, depth + 1, newPath)
        })
      }
    }

    nodes.forEach(node => traverse(node, 0, []))

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}
