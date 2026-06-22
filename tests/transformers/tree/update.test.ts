import { describe, expect, it } from 'vitest'
import { Tree } from '../../../src/transformers/tree'

const updateNode = Tree.updateNode

interface Node {
  id: string
  name?: string
  loaded?: boolean
  children?: Node[]
}

function makeTree(): Node[] {
  return [
    { id: '1', name: '根', children: [{ id: '2', name: '子', children: [{ id: '3', name: '孙' }] }] },
    { id: '4', name: '另一根' },
  ]
}

describe('updateNode (按 id 不可变更新节点)', () => {
  it('更新根节点并返回新树', () => {
    const tree = makeTree()
    const out = updateNode(tree, '4', ({ node }) => ({ ...node, name: '改名' }))
    expect(out[1]!.name).toBe('改名')
  })

  it('更新嵌套节点', () => {
    const tree = makeTree()
    const out = updateNode(tree, '3', ({ node }) => ({ ...node, name: '改孙' }))
    expect(out[0]!.children![0]!.children![0]!.name).toBe('改孙')
  })

  it('updater 接收匹配到的节点', () => {
    const tree = makeTree()
    let received: Node | undefined
    updateNode(tree, '2', ({ node }) => {
      received = node
      return node
    })
    expect(received!.id).toBe('2')
  })

  it('可写入 children（懒加载注入场景）', () => {
    const tree = makeTree()
    const out = updateNode(tree, '4', ({ node }) => ({ ...node, loaded: true, children: [{ id: '5' }] }))
    expect(out[1]!.children).toEqual([{ id: '5' }])
    expect(out[1]!.loaded).toBe(true)
  })

  it('不修改原树', () => {
    const tree = makeTree()
    updateNode(tree, '3', ({ node }) => ({ ...node, name: 'x' }))
    expect(tree[0]!.children![0]!.children![0]!.name).toBe('孙')
  })

  it('未命中时原样返回同一引用', () => {
    const tree = makeTree()
    const out = updateNode(tree, 'missing', ({ node }) => ({ ...node, name: 'x' }))
    expect(out).toBe(tree)
  })

  it('未触及的兄弟分支保持引用不变', () => {
    const tree = makeTree()
    const out = updateNode(tree, '3', ({ node }) => ({ ...node, name: 'x' }))
    expect(out[1]).toBe(tree[1])
  })

  it('支持自定义 id 字段', () => {
    const tree = [{ key: 'a', children: [{ key: 'b' }] }]
    const out = updateNode(tree, 'b', ({ node }) => ({ ...node, hit: true }), { id: 'key' })
    expect((out[0]!.children![0] as any).hit).toBe(true)
  })
})
