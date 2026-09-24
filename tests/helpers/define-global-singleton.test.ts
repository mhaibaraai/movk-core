import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineGlobalSingleton } from '../../src/helpers'

const KEY = 'movk-core:test-singleton'

afterEach(() => {
  delete (globalThis as Record<symbol, unknown>)[Symbol.for(KEY)]
})

describe('defineGlobalSingleton', () => {
  it('首次调用执行 factory 并返回其结果', () => {
    const factory = vi.fn(() => ({ count: 0 }))
    const value = defineGlobalSingleton(KEY, factory)
    expect(value).toEqual({ count: 0 })
    expect(factory).toHaveBeenCalledOnce()
  })

  it('同一 key 再次调用复用已有实例，不再执行 factory', () => {
    const first = defineGlobalSingleton(KEY, () => ({}))
    const factory = vi.fn(() => ({}))
    const second = defineGlobalSingleton(KEY, factory)
    expect(second).toBe(first)
    expect(factory).not.toHaveBeenCalled()
  })

  it('以 Symbol.for(key) 挂在 globalThis 上，跨模块副本共享', () => {
    const value = defineGlobalSingleton(KEY, () => ({ id: 1 }))
    expect((globalThis as Record<symbol, unknown>)[Symbol.for(KEY)]).toBe(value)
  })

  it('不同 key 互不影响', () => {
    const a = defineGlobalSingleton(KEY, () => ({ id: 'a' }))
    const b = defineGlobalSingleton(`${KEY}:other`, () => ({ id: 'b' }))
    expect(a).not.toBe(b)
    delete (globalThis as Record<symbol, unknown>)[Symbol.for(`${KEY}:other`)]
  })
})
