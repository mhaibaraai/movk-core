import { estimateSize, fromList, toList } from './convert'
import { insertAfter, insertBefore, remove } from './mutate'
import { find, findAll, findById } from './query'
import { filter, transform } from './transform'
import { forEach } from './traverse'
import { getStats, validate } from './validate'

export type {
  TreeConfig,
  TreeConfigInput,
  TreeNode,
  TreePredicate,
  TreeStats,
  TreeTransformer,
  TreeVisitor,
} from './types'

/**
 * 树形数据结构操作工具类
 *
 * 提供了一系列操作树形数据的静态方法，包括：
 * - 查找：find, findAll, findById
 * - 转换：fromList, toList, transform
 * - 过滤：filter
 * - 遍历：forEach
 * - 统计：estimateSize, getStats
 * - 修改：insertBefore, insertAfter, remove
 * - 验证：validate
 *
 * 所有使用谓词函数或访问函数的方法都采用对象解构参数格式：
 * `({ node, depth, path, index }) => boolean`
 *
 * @example
 * ```ts
 * // 1. 从扁平数组创建树形结构
 * const departments = [
 *   { id: '1', name: '技术部', parentId: null },
 *   { id: '2', name: '前端组', parentId: '1' },
 *   { id: '3', name: '后端组', parentId: '1' },
 *   { id: '4', name: 'UI 组', parentId: '2' },
 *   { id: '5', name: '测试组', parentId: '2' }
 * ]
 *
 * const tree = Tree.fromList(departments, {
 *   id: 'id',
 *   pid: 'parentId',
 *   children: 'children'
 * })
 *
 * // 2. 查找节点
 * const frontend = Tree.find(tree, ({ node }) => node.name === '前端组')
 * console.log(frontend) // { id: '2', name: '前端组', children: [...] }
 *
 * const uiNode = Tree.findById(tree, '4')
 * console.log(uiNode) // { id: '4', name: 'UI 组', ... }
 *
 * // 3. 查找所有叶子节点
 * const leaves = Tree.findAll(tree, ({ node }) => {
 *   return !node.children || node.children.length === 0
 * })
 * console.log(leaves) // [{ id: '4', ... }, { id: '5', ... }, { id: '3', ... }]
 *
 * // 4. 过滤节点（保留匹配节点及其祖先）
 * const filtered = Tree.filter(tree, ({ node }) => node.name.includes('组'))
 * // 返回包含所有 "组" 节点及其父级路径的树结构
 *
 * // 5. 转换节点结构
 * const menuTree = Tree.transform(tree, ({ node, depth }) => ({
 *   key: node.id,
 *   label: node.name,
 *   level: depth,
 *   indent: depth * 20
 * }))
 *
 * // 6. 遍历所有节点
 * Tree.forEach(tree, ({ node, depth, path }) => {
 *   const indent = '  '.repeat(depth)
 *   const breadcrumb = path.map(n => n.name).join(' > ')
 *   console.log(`${indent}${node.name} (路径: ${breadcrumb})`)
 * })
 *
 * // 7. 修改树结构
 * Tree.insertBefore(tree, '3', { id: '6', name: '运维组' })
 * Tree.insertAfter(tree, '2', { id: '7', name: '移动组' })
 * const removed = Tree.remove(tree, '5')
 *
 * // 8. 获取统计信息
 * const stats = Tree.getStats(tree)
 * console.log(stats)
 * // { total: 5, leaves: 3, depth: 3, branches: 2 }
 *
 * // 9. 验证树结构
 * const validation = Tree.validate(tree)
 * if (!validation.isValid) {
 *   console.error('树结构错误:', validation.errors)
 * }
 *
 * // 10. 转换回扁平数组
 * const flatList = Tree.toList(tree)
 * console.log(flatList) // [{ id: '1', name: '技术部' }, ...]
 * ```
 */
export class Tree {
  // 转换方法
  static fromList = fromList
  static toList = toList
  static estimateSize = estimateSize

  // 查询方法
  static find = find
  static findAll = findAll
  static findById = findById

  // 修改方法
  static insertBefore = insertBefore
  static insertAfter = insertAfter
  static remove = remove

  // 转换方法
  static filter = filter
  static transform = transform

  // 遍历方法
  static forEach = forEach

  // 验证方法
  static getStats = getStats
  static validate = validate
}
