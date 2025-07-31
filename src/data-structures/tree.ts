import { z } from 'zod/v4'

type TreeNode<T = any> = T & {
  children?: TreeNode<T>[]
  [key: string]: any
}

const TreeConfigSchema = z.object({
  id: z.string().default('id'),
  pid: z.string().default('pid'),
  children: z.string().default('children'),
})

type TreeConfigInput = z.input<typeof TreeConfigSchema>

const _TreeStatsSchema = z.object({
  total: z.number().int().nonnegative(),
  leaves: z.number().int().nonnegative(),
  depth: z.number().int().nonnegative(),
  branches: z.number().int().nonnegative(),
})

type TreeStats = z.infer<typeof _TreeStatsSchema>

interface TreeNodeResult<T = any> {
  readonly node: TreeNode<T>
  readonly path: readonly TreeNode<T>[]
  readonly depth: number
  readonly index: number
}

type TreePredicate<T = any> = (
  node: TreeNode<T>,
  depth: number,
  path: readonly TreeNode<T>[]
) => boolean

type TreeTransformer<T = any, R = any> = (
  node: TreeNode<T>,
  depth: number,
  path: readonly TreeNode<T>[]
) => R

type TreeVisitor<T = any> = (
  node: TreeNode<T>,
  depth: number,
  path: readonly TreeNode<T>[]
) => void | boolean

export class Tree {
  private static* dfsGenerator<T = any>(
    nodes: TreeNode<T>[],
    config: TreeConfigInput = {},
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

  private static* bfsGenerator<T = any>(
    nodes: TreeNode<T>[],
    config: TreeConfigInput = {},
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
  static fromList<T = any>(
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
    list.forEach((item: any) => {
      const node = { ...item, [childrenKey]: [] } as TreeNode<T>
      nodeMap.set(item[idKey], node)
    })

    // 构建树结构
    list.forEach((item: any) => {
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
  static toList<T = any>(
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

  /**
   * 估算树形结构的节点数量
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param config 树形配置选项
   * @returns 节点总数量
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
   * const size = Tree.estimateSize(tree)
   * console.log(size) // 3
   * ```
   */
  static estimateSize<T = any>(
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

  /**
   * 查找树中第一个满足条件的节点
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param predicate 查找条件函数
   * @param config 树形配置选项
   * @returns 匹配的节点结果，包含节点、路径、深度和索引信息；未找到时返回undefined
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '部门1',
   *     children: [
   *       { id: '2', name: '部门1-1', children: [] }
   *     ]
   *   }
   * ]
   *
   * const result = Tree.find(tree, (node) => node.name === '部门1-1')
   * console.log(result?.node.id) // '2'
   * console.log(result?.depth) // 1
   * ```
   */
  static find<T = any>(
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

  /**
   * 查找树中所有满足条件的节点
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param predicate 查找条件函数
   * @param config 树形配置选项
   * @returns 所有匹配的节点结果数组，每个结果包含节点、路径、深度和索引信息
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     type: 'folder',
   *     name: '根目录',
   *     children: [
   *       { id: '2', type: 'file', name: '文件1', children: [] },
   *       { id: '3', type: 'file', name: '文件2', children: [] }
   *     ]
   *   }
   * ]
   *
   * const files = Tree.findAll(tree, (node) => node.type === 'file')
   * console.log(files.length) // 2
   * ```
   */
  static findAll<T = any>(
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

  /**
   * 根据ID查找树中的节点
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param id 要查找的节点ID
   * @param config 树形配置选项
   * @returns 匹配的节点结果，包含节点、路径、深度和索引信息；未找到时返回undefined
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '根节点',
   *     children: [
   *       { id: '2', name: '子节点', children: [] }
   *     ]
   *   }
   * ]
   *
   * const result = Tree.findById(tree, '2')
   * console.log(result?.node.name) // '子节点'
   * ```
   */
  static findById<T = any>(
    tree: TreeNode<T> | TreeNode<T>[],
    id: string,
    config: TreeConfigInput = {},
  ): TreeNodeResult<T> | undefined {
    const validConfig = TreeConfigSchema.parse(config)
    const { id: idKey } = validConfig

    return this.find(tree, node => node[idKey] === id, config)
  }

  /**
   * 获取树形结构的统计信息
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param config 树形配置选项
   * @returns 树的统计信息，包含总节点数、叶子节点数、最大深度和分支节点数
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '根节点',
   *     children: [
   *       { id: '2', name: '子节点1', children: [] },
   *       { id: '3', name: '子节点2', children: [
   *         { id: '4', name: '孙节点', children: [] }
   *       ] }
   *     ]
   *   }
   * ]
   *
   * const stats = Tree.getStats(tree)
   * console.log(stats) // { total: 4, leaves: 2, depth: 3, branches: 2 }
   * ```
   */
  static getStats<T = any>(
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

  /**
   * 过滤树形结构，保留满足条件的节点及其祖先和后代
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param predicate 过滤条件函数
   * @param config 树形配置选项
   * @returns 过滤后的树形结构数组
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     type: 'folder',
   *     name: '根目录',
   *     children: [
   *       { id: '2', type: 'file', name: '文档.txt', children: [] },
   *       { id: '3', type: 'folder', name: '子目录', children: [
   *         { id: '4', type: 'file', name: '图片.jpg', children: [] }
   *       ] }
   *     ]
   *   }
   * ]
   *
   * const filtered = Tree.filter(tree, (node) => node.type === 'file')
   * // 返回包含所有文件节点及其父级路径的树结构
   * ```
   */
  static filter<T = any>(
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

  /**
   * 转换树形结构，将每个节点转换为新的结构
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param transformer 节点转换函数
   * @param config 树形配置选项
   * @returns 转换后的树形结构数组
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '部门1',
   *     children: [
   *       { id: '2', name: '部门1-1', children: [] }
   *     ]
   *   }
   * ]
   *
   * const transformed = Tree.transform(tree, (node, depth) => ({
   *   key: node.id,
   *   title: node.name,
   *   level: depth
   * }))
   * // 转换为新的数据结构
   * ```
   */
  static transform<T = any, R = any>(
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

  /**
   * 遍历树形结构的每个节点
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param visitor 访问者函数，返回false可以跳过子节点的遍历
   * @param config 树形配置选项
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '根节点',
   *     children: [
   *       { id: '2', name: '子节点', children: [] }
   *     ]
   *   }
   * ]
   *
   * Tree.forEach(tree, (node, depth) => {
   *   console.log(`${' '.repeat(depth * 2)}${node.name}`)
   *   // 输出缩进的树结构
   * })
   * ```
   */
  static forEach<T = any>(
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

  /**
   * 在指定节点前插入新节点
   *
   * @category Data Structures
   * @param tree 树形结构数组
   * @param targetId 目标节点的ID
   * @param newNode 要插入的新节点数据
   * @param config 树形配置选项
   * @returns 是否成功插入
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '节点1',
   *     children: [
   *       { id: '2', name: '节点2', children: [] }
   *     ]
   *   }
   * ]
   *
   * const success = Tree.insertBefore(tree, '2', { id: '1.5', name: '新节点' })
   * console.log(success) // true
   * ```
   */
  static insertBefore<T = any>(
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

  /**
   * 在指定节点后插入新节点
   *
   * @category Data Structures
   * @param tree 树形结构数组
   * @param targetId 目标节点的ID
   * @param newNode 要插入的新节点数据
   * @param config 树形配置选项
   * @returns 是否成功插入
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '节点1',
   *     children: [
   *       { id: '2', name: '节点2', children: [] }
   *     ]
   *   }
   * ]
   *
   * const success = Tree.insertAfter(tree, '2', { id: '3', name: '新节点' })
   * console.log(success) // true
   * ```
   */
  static insertAfter<T = any>(
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

  /**
   * 从树中删除指定节点
   *
   * @category Data Structures
   * @param tree 树形结构数组
   * @param targetId 要删除的节点ID
   * @param config 树形配置选项
   * @returns 被删除的节点，未找到时返回undefined
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '根节点',
   *     children: [
   *       { id: '2', name: '子节点', children: [] }
   *     ]
   *   }
   * ]
   *
   * const removed = Tree.remove(tree, '2')
   * console.log(removed?.name) // '子节点'
   * ```
   */
  static remove<T = any>(
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

  /**
   * 验证树形结构的有效性
   *
   * @category Data Structures
   * @param tree 树形结构（单个节点或节点数组）
   * @param config 树形配置选项
   * @returns 验证结果，包含是否有效和错误信息数组
   * @example
   * ```ts
   * const tree = [
   *   {
   *     id: '1',
   *     name: '根节点',
   *     children: [
   *       { id: '2', name: '子节点', children: [] }
   *     ]
   *   }
   * ]
   *
   * const result = Tree.validate(tree)
   * console.log(result.isValid) // true
   * console.log(result.errors) // []
   * ```
   */
  static validate<T = any>(
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
