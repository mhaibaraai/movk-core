import { describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { createRegistry } from '../../src/helpers'

describe('createRegistry', () => {
  it('应该注册、读取与注销', () => {
    const registry = createRegistry<string>()

    registry.register('a', 'A')
    expect(registry.get('a')).toBe('A')
    expect(registry.has('a')).toBe(true)

    expect(registry.unregister('a')).toBe(true)
    expect(registry.get('a')).toBeUndefined()
    expect(registry.has('a')).toBe(false)
  })

  it('应该在注销不存在的 id 时返回 false', () => {
    const registry = createRegistry<string>()

    expect(registry.unregister('missing')).toBe(false)
  })

  it('应该提供 keys、size 与 clear', () => {
    const registry = createRegistry<number>()

    registry.register('a', 1)
    registry.register('b', 2)
    expect(registry.keys()).toEqual(['a', 'b'])
    expect(registry.size).toBe(2)

    registry.clear()
    expect(registry.keys()).toEqual([])
    expect(registry.size).toBe(0)
  })

  it('应该在重复注册时由后者接管并触发 onDuplicate', () => {
    const onDuplicate = vi.fn()
    const registry = createRegistry<string>({ onDuplicate })

    registry.register('a', 'first')
    expect(onDuplicate).not.toHaveBeenCalled()

    registry.register('a', 'second')
    expect(onDuplicate).toHaveBeenCalledWith('a')
    expect(registry.size).toBe(1)
    expect(registry.get('a')).toBe('second')
  })

  it('dispose 句柄应该按身份校验，不误删后来的注册值', () => {
    const registry = createRegistry<string>()

    const disposeFirst = registry.register('a', 'first')
    registry.register('a', 'second')

    disposeFirst()
    expect(registry.get('a')).toBe('second')
  })

  it('dispose 句柄应该幂等', () => {
    const registry = createRegistry<string>()
    const dispose = registry.register('a', 'A')

    dispose()
    dispose()
    expect(registry.has('a')).toBe(false)
  })

  it('响应式模式下 computed 应该感知注册与注销', () => {
    const registry = createRegistry<string>({ reactive: true })
    const current = computed(() => registry.get('a'))
    const count = computed(() => registry.size)

    expect(current.value).toBeUndefined()
    expect(count.value).toBe(0)

    registry.register('a', 'A')
    expect(current.value).toBe('A')
    expect(count.value).toBe(1)

    registry.unregister('a')
    expect(current.value).toBeUndefined()
    expect(count.value).toBe(0)
  })

  it('默认模式下不建立响应式依赖', () => {
    const registry = createRegistry<string>()
    const current = computed(() => registry.get('a'))

    expect(current.value).toBeUndefined()
    registry.register('a', 'A')
    expect(current.value).toBeUndefined()
  })
})
