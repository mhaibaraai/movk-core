import { describe, expect, it } from 'vitest'
import { deepClone } from '../../../src/helpers/object'

describe('deepClone', () => {
  it('应该克隆基本类型', () => {
    expect(deepClone(1)).toBe(1)
    expect(deepClone('abc')).toBe('abc')
    expect(deepClone(null)).toBeNull()
    expect(deepClone(undefined)).toBeUndefined()
  })

  it('应该克隆简单对象', () => {
    const obj = { a: 1, b: 'test' }
    const cloned = deepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
  })

  it('应该克隆嵌套对象', () => {
    const obj = { a: { b: { c: 1 } } }
    const cloned = deepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned.a.b).not.toBe(obj.a.b)
  })

  it('应该克隆数组', () => {
    const arr = [1, { a: 2 }, [3]]
    const cloned = deepClone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned[1]).not.toBe(arr[1])
    expect(cloned[2]).not.toBe(arr[2])
  })

  it('应该处理循环引用', () => {
    const obj: any = { a: 1 }
    obj.b = obj
    const cloned = deepClone(obj)
    expect(cloned.a).toBe(1)
    expect(cloned.b).toBe(cloned)
  })

  it('应该克隆 Date 和 RegExp 对象', () => {
    const date = new Date()
    const regexp = /test/gi
    const obj = { d: date, r: regexp }
    const cloned = deepClone(obj)
    expect(cloned.d).toEqual(date)
    expect(cloned.d).not.toBe(date)
    expect(cloned.r).toEqual(regexp)
    expect(cloned.r).not.toBe(regexp)
  })
})
