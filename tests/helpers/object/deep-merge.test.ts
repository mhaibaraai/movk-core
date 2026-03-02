import { describe, expect, it } from 'vitest'
import { createDeepMerge, deepMerge } from '../../../src/helpers/object'

describe('deepMerge', () => {
  // ---- 基础合并 ----

  it('应该合并两个扁平对象', () => {
    const result = deepMerge([{ a: 1 }, { b: 2 }])
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('应该返回新对象，不修改任何输入', () => {
    const obj1 = { a: 1, nested: { x: 1 } }
    const obj2 = { b: 2, nested: { y: 2 } }
    const result = deepMerge([obj1, obj2])

    expect(result).not.toBe(obj1)
    expect(result).not.toBe(obj2)
    expect(obj1).toEqual({ a: 1, nested: { x: 1 } })
    expect(obj2).toEqual({ b: 2, nested: { y: 2 } })
  })

  it('后面的 source 优先级更高', () => {
    const result = deepMerge([{ a: 1 }, { a: 2 }, { a: 3 }])
    expect(result.a).toBe(3)
  })

  it('sources 为空数组时返回空对象', () => {
    const result = deepMerge([])
    expect(result).toEqual({})
  })

  it('单个 source 时等同于浅拷贝', () => {
    const source = { a: 1, b: { c: 2 } }
    const result = deepMerge([source])
    expect(result).toEqual(source)
    expect(result).not.toBe(source)
  })

  it('非数组参数时返回空对象', () => {
    const result = deepMerge(null as any)
    expect(result).toEqual({})
  })

  it('过滤掉非 plain object 的项', () => {
    const result = deepMerge([{ a: 1 }, null as any, 42 as any, { b: 2 }])
    expect(result).toEqual({ a: 1, b: 2 })
  })

  // ---- 深度合并 ----

  it('应该递归合并嵌套的纯对象', () => {
    const defaults = { theme: 'light', pagination: { page: 1, size: 10 } }
    const userConfig = { pagination: { size: 20 }, debug: true }
    const result = deepMerge([defaults, userConfig])
    expect(result).toEqual({
      theme: 'light',
      pagination: { page: 1, size: 20 },
      debug: true,
    })
  })

  it('应该保留 target 中 source 未涉及的嵌套键', () => {
    const result = deepMerge([
      { a: { b: 1, c: 2, d: { e: 3 } } },
      { a: { b: 10 } },
    ])
    expect(result).toEqual({ a: { b: 10, c: 2, d: { e: 3 } } })
  })

  it('应该正确处理三层及以上嵌套', () => {
    const result = deepMerge([
      { a: { b: { c: { d: 1, e: 2 } } } },
      { a: { b: { c: { d: 10, f: 3 } } } },
    ])
    expect(result).toEqual({ a: { b: { c: { d: 10, e: 2, f: 3 } } } })
  })

  it('source 为纯对象但 target 为非对象时，source 覆盖', () => {
    const result = deepMerge([{ a: 'string' }, { a: { nested: 1 } }])
    expect(result).toEqual({ a: { nested: 1 } })
  })

  // ---- 数组策略 ----

  it('arrayStrategy: \'concat\' 应该拼接数组（默认）', () => {
    const result = deepMerge([{ tags: ['a', 'b'] }, { tags: ['c'] }])
    expect(result.tags).toEqual(['a', 'b', 'c'])
  })

  it('arrayStrategy: \'replace\' 应该替换数组', () => {
    const result = deepMerge(
      [{ tags: ['a', 'b'] }, { tags: ['c'] }],
      { arrayStrategy: 'replace' },
    )
    expect(result.tags).toEqual(['c'])
  })

  it('arrayStrategy: \'unique\' 应该拼接并去重', () => {
    const result = deepMerge(
      [{ tags: ['a', 'b'] }, { tags: ['b', 'c'] }],
      { arrayStrategy: 'unique' },
    )
    expect(result.tags).toEqual(['a', 'b', 'c'])
  })

  it('source 有数组而 target 没有时，应该直接使用 source 数组', () => {
    const result = deepMerge([{ a: 1 }, { tags: ['x'] }])
    expect(result.tags).toEqual(['x'])
  })

  it('source 有数组而 target 该键不是数组时，应该使用 source 数组', () => {
    const result = deepMerge([{ tags: 'not-array' }, { tags: ['x'] }])
    expect(result.tags).toEqual(['x'])
  })

  // ---- null/undefined 处理 ----

  it('nullHandling: \'skip\' 时应该忽略 source 中的 null（默认）', () => {
    const result = deepMerge([{ a: 1 }, { a: null }])
    expect(result.a).toBe(1)
  })

  it('nullHandling: \'skip\' 时应该忽略 source 中的 undefined（默认）', () => {
    const result = deepMerge([{ a: 1 }, { a: undefined }])
    expect(result.a).toBe(1)
  })

  it('nullHandling: \'override\' 时应该允许 null 覆盖', () => {
    const result = deepMerge(
      [{ a: 1 }, { a: null }],
      { nullHandling: 'override' },
    )
    expect(result.a).toBeNull()
  })

  it('nullHandling: \'override\' 时应该允许 undefined 覆盖', () => {
    const result = deepMerge(
      [{ a: 1 }, { a: undefined }],
      { nullHandling: 'override' },
    )
    expect(result.a).toBeUndefined()
  })

  it('nullHandling: \'skip\' 且 target 中无该键时，null 值应被写入', () => {
    const result = deepMerge([{ a: 1 }, { b: null }])
    expect(result.b).toBeNull()
  })

  // ---- Symbol 键 ----

  it('应该合并 Symbol 键的属性', () => {
    const sym = Symbol('test')
    const result = deepMerge([{ [sym]: 'a' }, { [sym]: 'b' }])
    expect(result[sym]).toBe('b')
  })

  it('应该保留不同 Symbol 键', () => {
    const sym1 = Symbol('one')
    const sym2 = Symbol('two')
    const result = deepMerge([{ [sym1]: 1 }, { [sym2]: 2 }])
    expect(result[sym1]).toBe(1)
    expect(result[sym2]).toBe(2)
  })

  // ---- 原型污染防护 ----

  it('应该跳过 __proto__ 键', () => {
    const malicious = JSON.parse('{"__proto__": {"polluted": true}}')
    const result = deepMerge([{}, malicious])
    expect(({} as any).polluted).toBeUndefined()
    expect(result.polluted).toBeUndefined()
  })

  it('应该跳过 constructor 键', () => {
    const source = { constructor: 'evil' } as any
    const result = deepMerge([{}, source])
    expect(result.constructor).toBe(Object)
    expect(Object.hasOwn(result, 'constructor')).toBe(false)
  })

  // ---- 特殊对象类型 ----

  it('date 对象应该被替换，不递归合并', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2025-01-01')
    const result = deepMerge([{ d: date1 }, { d: date2 }])
    expect(result.d).toBe(date2)
  })

  it('regExp 对象应该被替换，不递归合并', () => {
    const result = deepMerge([{ r: /abc/g }, { r: /xyz/i }])
    expect(result.r).toEqual(/xyz/i)
  })

  it('map 对象应该被替换，不递归合并', () => {
    const map1 = new Map([['a', 1]])
    const map2 = new Map([['b', 2]])
    const result = deepMerge([{ m: map1 }, { m: map2 }])
    expect(result.m).toBe(map2)
  })

  it('set 对象应该被替换，不递归合并', () => {
    const set1 = new Set([1])
    const set2 = new Set([2])
    const result = deepMerge([{ s: set1 }, { s: set2 }])
    expect(result.s).toBe(set2)
  })

  // ---- 循环引用 ----

  it('应该处理 source 中的循环引用，不陷入无限递归', () => {
    const obj: any = { a: 1 }
    obj.self = obj
    const result = deepMerge([{ x: 'base' }, obj])
    expect(result.a).toBe(1)
    expect(result.x).toBe('base')
  })

  // ---- 自定义 merger ----

  it('customMerger 返回非 undefined 时应该使用其结果', () => {
    const result = deepMerge(
      [{ count: 10 }, { count: 5 }],
      {
        customMerger: (_key, targetVal, sourceVal) => {
          if (typeof targetVal === 'number' && typeof sourceVal === 'number')
            return targetVal + sourceVal
          return undefined
        },
      },
    )
    expect(result.count).toBe(15)
  })

  it('customMerger 返回 undefined 时应该退回默认逻辑', () => {
    const result = deepMerge(
      [{ a: 1, b: 'x' }, { a: 2, b: 'y' }],
      {
        customMerger: (_key, targetVal, sourceVal) => {
          if (typeof targetVal === 'number' && typeof sourceVal === 'number')
            return targetVal + sourceVal
          return undefined
        },
      },
    )
    expect(result.a).toBe(3)
    expect(result.b).toBe('y')
  })

  it('customMerger 应该接收正确的 path 参数', () => {
    const paths: Array<ReadonlyArray<string | symbol>> = []
    deepMerge(
      [{ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }],
      {
        customMerger: (_key, _targetVal, _sourceVal, path) => {
          paths.push([...path])
          return undefined
        },
      },
    )
    expect(paths).toContainEqual([])
    expect(paths).toContainEqual(['a'])
    expect(paths).toContainEqual(['a', 'b'])
  })

  // ---- createDeepMerge ----

  it('createDeepMerge 应该返回预绑定配置的函数', () => {
    const mergeReplace = createDeepMerge({ arrayStrategy: 'replace' })
    const result = mergeReplace([{ tags: ['a'] }, { tags: ['b'] }])
    expect(result.tags).toEqual(['b'])
  })

  it('createDeepMerge 的多次调用应该互不影响', () => {
    const mergeReplace = createDeepMerge({ arrayStrategy: 'replace' })
    const mergeUnique = createDeepMerge({ arrayStrategy: 'unique' })

    const sources = [{ tags: ['a', 'b'] }, { tags: ['b', 'c'] }] as const

    expect(mergeReplace([...sources]).tags).toEqual(['b', 'c'])
    expect(mergeUnique([...sources]).tags).toEqual(['a', 'b', 'c'])
  })
})
