import { describe, expect, it, vi } from 'vitest'
import { reactive } from 'vue'
import { createEqualsBy, equalsBy } from '../../../src/helpers/object'

describe('equalsBy', () => {
  describe('原始值', () => {
    it('相等的原始值返回 true', () => {
      expect(equalsBy(1, 1)).toBe(true)
      expect(equalsBy('a', 'a')).toBe(true)
      expect(equalsBy(true, true)).toBe(true)
    })

    it('不相等的原始值返回 false', () => {
      expect(equalsBy(1, 2)).toBe(false)
      expect(equalsBy('a', 'b')).toBe(false)
    })

    it('naN 与自身比较返回 false（沿用 === 语义）', () => {
      expect(equalsBy(Number.NaN, Number.NaN)).toBe(false)
    })

    it('+0 与 -0 视为相等', () => {
      expect(equalsBy(0, -0)).toBe(true)
    })
  })

  describe('nullish', () => {
    it('null 与 null 相等', () => {
      expect(equalsBy(null, null)).toBe(true)
    })

    it('undefined 与 undefined 相等', () => {
      expect(equalsBy(undefined, undefined)).toBe(true)
    })

    it('null 与 undefined 不相等', () => {
      expect(equalsBy(null, undefined)).toBe(false)
    })

    it('null 与对象不相等', () => {
      expect(equalsBy(null, { id: 1 })).toBe(false)
      expect(equalsBy({ id: 1 }, null)).toBe(false)
    })
  })

  describe('引用相等', () => {
    it('同对象引用返回 true', () => {
      const obj = { id: 1 }
      expect(equalsBy(obj, obj)).toBe(true)
    })

    it('reactive 包装与其 raw 视为相等（toRaw 解包）', () => {
      const raw = { id: 1, name: 'A' }
      const proxy = reactive(raw)
      expect(equalsBy(raw, proxy)).toBe(true)
      expect(equalsBy(proxy, raw)).toBe(true)
    })

    it('两个 reactive 包装相同源时相等', () => {
      const raw = { id: 1 }
      expect(equalsBy(reactive(raw), reactive(raw))).toBe(true)
    })

    it('身份不同的等结构对象（无 options）返回 false', () => {
      expect(equalsBy({ id: 1 }, { id: 1 })).toBe(false)
    })
  })

  describe('options.by 函数', () => {
    it('双方均为对象时被调用并返回结果', () => {
      const by = vi.fn((a: { id: number }, b: { id: number }) => a.id === b.id)
      expect(equalsBy({ id: 1, x: 'a' }, { id: 1, x: 'b' }, { by })).toBe(true)
      expect(by).toHaveBeenCalledTimes(1)
    })

    it('返回 false 时不再下落到 keys', () => {
      const by = vi.fn(() => false)
      const res = equalsBy(
        { id: 1, value: 'v' },
        { id: 2, value: 'v' },
        { by, keys: ['value'] },
      )
      expect(res).toBe(false)
      expect(by).toHaveBeenCalledTimes(1)
    })

    it('任一非对象时直接 false（不调用谓词）', () => {
      const by = vi.fn(() => true)
      expect(equalsBy(1 as any, { id: 1 } as any, { by })).toBe(false)
      expect(by).not.toHaveBeenCalled()
    })
  })

  describe('options.by 字符串路径', () => {
    it('顶层字段相等返回 true', () => {
      expect(equalsBy({ id: 1, x: 'a' }, { id: 1, x: 'b' }, { by: 'id' })).toBe(true)
    })

    it('顶层字段不等返回 false', () => {
      expect(equalsBy({ id: 1 }, { id: 2 }, { by: 'id' })).toBe(false)
    })

    it('嵌套路径', () => {
      expect(
        equalsBy({ meta: { id: 1 } }, { meta: { id: 1 } }, { by: 'meta.id' }),
      ).toBe(true)
      expect(
        equalsBy({ meta: { id: 1 } }, { meta: { id: 2 } }, { by: 'meta.id' }),
      ).toBe(false)
    })

    it('字段缺失时两侧 undefined 命中 === 返回 true', () => {
      expect(equalsBy({ a: 1 }, { a: 2 }, { by: 'missing' })).toBe(true)
    })

    it('独占语义：by 字符串失败不会回退到 keys', () => {
      const res = equalsBy(
        { id: 1, value: 'v' },
        { id: 2, value: 'v' },
        { by: 'id', keys: ['value'] },
      )
      expect(res).toBe(false)
    })
  })

  describe('options.keys 启发式回退', () => {
    it('首个候选键命中标量即返回结果', () => {
      expect(
        equalsBy(
          { label: 'A', value: 'a' },
          { label: 'A', value: 'a' },
          { keys: ['value', 'label'] },
        ),
      ).toBe(true)
    })

    it('首键缺失则跳到下一候选', () => {
      expect(
        equalsBy(
          { label: 'HSL' },
          { label: 'HSL' },
          { keys: ['value', 'label'] },
        ),
      ).toBe(true)
    })

    it('候选键值为对象时跳过', () => {
      expect(
        equalsBy(
          { meta: { v: 1 }, label: 'A' },
          { meta: { v: 1 }, label: 'A' },
          { keys: ['meta', 'label'] },
        ),
      ).toBe(true)
    })

    it('nullish 候选键被跳过', () => {
      expect(
        equalsBy(
          { value: 'a' },
          { value: 'a' },
          { keys: [null, undefined, 'value'] },
        ),
      ).toBe(true)
    })

    it('所有候选键都无可用标量返回 false', () => {
      expect(
        equalsBy(
          { a: { x: 1 } },
          { a: { x: 1 } },
          { keys: ['missing', 'a'] },
        ),
      ).toBe(false)
    })

    it('任一非对象时不启用 keys 回退', () => {
      expect(equalsBy('hsl' as any, { value: 'hsl' } as any, { keys: ['value'] })).toBe(false)
    })
  })

  describe('createEqualsBy', () => {
    it('与直接调用 equalsBy 行为一致', () => {
      const eq = createEqualsBy<{ id: number }>({ by: 'id' })
      expect(eq({ id: 1 }, { id: 1 })).toBe(true)
      expect(eq({ id: 1 }, { id: 2 })).toBe(false)
    })

    it('可用于 Array.some 回调', () => {
      const sameUser = createEqualsBy<{ id: number }>({ by: 'id' })
      const list = [{ id: 1 }, { id: 2 }, { id: 3 }]
      expect(list.some(u => sameUser(u, { id: 2 }))).toBe(true)
      expect(list.some(u => sameUser(u, { id: 99 }))).toBe(false)
    })
  })
})
