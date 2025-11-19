import { describe, expect, it } from 'vitest'
import {
  isArray,
  isEmpty,
  isFunction,
  isNumber,
  isObject,
  isPlainObject,
  isString,
} from '../src/utils/validator'

describe('验证器工具', () => {
  describe('isObject (是否为对象)', () => {
    it('对于对象应该返回 true', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
    })

    it('对于非对象应该返回 false', () => {
      expect(isObject([])).toBe(false)
      expect(isObject(null)).toBe(false)
      expect(isObject('string')).toBe(false)
      expect(isObject(123)).toBe(false)
      expect(isObject(() => {})).toBe(false)
    })
  })

  describe('isArray (是否为数组)', () => {
    it('对于数组应该返回 true', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2])).toBe(true)
    })

    it('对于非数组应该返回 false', () => {
      expect(isArray({})).toBe(false)
      expect(isArray(null)).toBe(false)
    })
  })

  describe('isString (是否为字符串)', () => {
    it('对于字符串应该返回 true', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
    })

    it('对于非字符串应该返回 false', () => {
      expect(isString(123)).toBe(false)
      expect(isString(null)).toBe(false)
    })
  })

  describe('isNumber (是否为数字)', () => {
    it('对于数字应该返回 true', () => {
      expect(isNumber(0)).toBe(true)
      expect(isNumber(123)).toBe(true)
      expect(isNumber(-123.45)).toBe(true)
    })

    it('对于非数字或 NaN 应该返回 false', () => {
      expect(isNumber(Number.NaN)).toBe(false)
      expect(isNumber('123')).toBe(false)
      expect(isNumber(null)).toBe(false)
    })
  })

  describe('isFunction (是否为函数)', () => {
    it('对于函数应该返回 true', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(Math.max)).toBe(true)
    })

    it('对于非函数应该返回 false', () => {
      expect(isFunction({})).toBe(false)
      expect(isFunction(null)).toBe(false)
    })
  })

  describe('isEmpty (是否为空)', () => {
    it('对于空值应该返回 true', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
    })

    it('对于非空值应该返回 false', () => {
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })
  })

  describe('isPlainObject (是否为纯对象)', () => {
    it('对于纯对象应该返回 true', () => {
      expect(isPlainObject({})).toBe(true)
      expect(isPlainObject({ a: 1 })).toBe(true)
    })

    it('对于非纯对象应该返回 false', () => {
      expect(isPlainObject([])).toBe(false)
      expect(isPlainObject(null)).toBe(false)
      expect(isPlainObject(new Date())).toBe(false)
      expect(isPlainObject(() => {})).toBe(false)
    })
  })
})
