import type { TreeConfigInput, TreeNode } from './types'
import { parseTreeConfig } from './helpers'

/**
 * 从扁平数组创建树形结构
 *
 * @category Tree
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
 * const tree = fromList(flatData, {
 *   id: 'id',
 *   pid: 'parentId',
 *   children: 'children'
 * })
 *
 * console.log(tree) // 转换为树形结构
 * ```
 */
export function fromList<T = any>(
  list: T[],
  config: TreeConfigInput = {},
): TreeNode<T>[] {
  const { id: idKey, pid: pidKey, children: childrenKey } = parseTreeConfig(config)

  if (!Array.isArray(list) || list.length === 0) {
    return []
  }

  // 创建节点映射
  const nodeMap = new Map<string, TreeNode<T>>()
  const roots: TreeNode<T>[] = []

  // 初始化所有节点
  list.forEach((item: any) => {
    const { [childrenKey]: _, ...nodeData } = item
    const node = { ...nodeData, [childrenKey]: [] } as TreeNode<T>
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
 * @category Tree
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
 * const flatList = toList(tree)
 * console.log(flatList) // [{ id: '1', name: '根节点' }, { id: '2', name: '子节点1' }, ...]
 * ```
 */
export function toList<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  config: TreeConfigInput = {},
): T[] {
  const { children: childrenKey } = parseTreeConfig(config)
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
 * @category Tree
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
 * const size = estimateSize(tree)
 * console.log(size) // 3
 * ```
 */
export function estimateSize<T = any>(
  tree: TreeNode<T> | TreeNode<T>[],
  config: TreeConfigInput = {},
): number {
  const { children: childrenKey } = parseTreeConfig(config)

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
