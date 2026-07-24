import { describe, expect, expectTypeOf, it } from 'vitest'
import { pipe } from '../../../src/utilities/function'

describe('pipe', () => {
  it('应该按声明顺序依次执行', () => {
    const order: string[] = []
    const increment = (value: number) => {
      order.push('increment')
      return value + 1
    }
    const double = (value: number) => {
      order.push('double')
      return value * 2
    }

    expect(pipe(increment, double)(1)).toBe(4)
    expect(order).toEqual(['increment', 'double'])
  })

  it('应该串联异构类型', () => {
    const run = pipe(
      (value: string) => value.trim(),
      (value: string) => Number(value),
      (value: number) => Math.round(value),
    )

    expect(run('  4.6 ')).toBe(5)
    expectTypeOf(run).toEqualTypeOf<(value: string) => number>()
  })

  it('应该允许首个函数接收多个参数', () => {
    const run = pipe(
      (a: number, b: number) => a + b,
      (value: number) => value * 10,
    )

    expect(run(2, 3)).toBe(50)
    expectTypeOf(run).toBeCallableWith(2, 3)
    expectTypeOf(run).returns.toBeNumber()
  })

  it('应该在只传一个函数时等价于该函数', () => {
    const run = pipe((value: number) => value * 3)

    expect(run(4)).toBe(12)
    expectTypeOf(run).toEqualTypeOf<(value: number) => number>()
  })

  it('应该在未传函数时回传首个入参', () => {
    expect(pipe()(42)).toBe(42)
    expect(pipe()('movk')).toBe('movk')
  })

  it('应该支持超过重载档位的函数数量', () => {
    const add = (value: number) => value + 1
    const run = pipe(add, add, add, add, add, add, add, add, add, add)

    expect(run(0)).toBe(10)
  })

  it('应该支持同签名的 reducer 链合成', () => {
    interface NodeAttrs { size: number, hidden?: boolean }

    const enlarge = (attrs: NodeAttrs): NodeAttrs => ({ ...attrs, size: attrs.size * 2 })
    const hide = (attrs: NodeAttrs): NodeAttrs => ({ ...attrs, hidden: true })
    const chained = pipe(enlarge, hide)

    const source: NodeAttrs = { size: 4 }
    expect(chained(source)).toEqual({ size: 8, hidden: true })
    expect(source).toEqual({ size: 4 })
  })
})
