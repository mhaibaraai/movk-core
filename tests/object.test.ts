import { describe, expect, it } from 'vitest'
import { convertToKebabCase } from '../src/utils/object/convert'
import { deepClone } from '../src/utils/object/deepClone'
import { omit, omitUndefined } from '../src/utils/object/omit'
import { getPath, isValidContainer, joinPath, setPath, toPath } from '../src/utils/object/path'
import { pick } from '../src/utils/object/pick'
import { separate, separateMany } from '../src/utils/object/separate'

describe('对象工具', () => {
  describe('convertToKebabCase', () => {
    it('应该将对象键转换为 kebab-case 格式', () => {
      const obj = { firstName: 'John', lastName: 'Doe' }
      const expected = { 'first-name': 'John', 'last-name': 'Doe' }
      expect(convertToKebabCase(obj)).toEqual(expected)
    })

    it('应该处理深层转换', () => {
      const obj = {
        firstName: 'John',
        userInfo: { birthDate: '1990-01-01', phoneNumber: '123' },
      }
      const expected = {
        'first-name': 'John',
        'user-info': { 'birth-date': '1990-01-01', 'phone-number': '123' },
      }
      expect(convertToKebabCase(obj, true)).toEqual(expected)
    })

    it('如果 deep 为 false，则不进行深层转换', () => {
      const obj = {
        firstName: 'John',
        userInfo: { birthDate: '1990-01-01' },
      }
      const expected = {
        'first-name': 'John',
        'user-info': { birthDate: '1990-01-01' },
      }
      expect(convertToKebabCase(obj, false)).toEqual(expected)
    })

    it('应该处理非对象输入', () => {
      expect(convertToKebabCase(null as any)).toBeNull()
      expect(convertToKebabCase(undefined as any)).toBeUndefined()
      expect(convertToKebabCase(123 as any)).toBe(123)
      expect(convertToKebabCase('string' as any)).toBe('string')
      expect(convertToKebabCase([1, 2] as any)).toEqual([1, 2])
    })
  })

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

  describe('omit', () => {
    const user = { id: 1, name: 'John', password: 'secret', email: 'john@example.com' }

    it('应该从对象中忽略指定的键', () => {
      const publicUser = omit(user, ['password'])
      expect(publicUser).toEqual({ id: 1, name: 'John', email: 'john@example.com' })
      expect(publicUser).not.toHaveProperty('password')
    })

    it('应该返回一个新对象', () => {
      const result = omit(user, ['password'])
      expect(result).not.toBe(user)
    })

    it('应该处理空键数组', () => {
      expect(omit(user, [])).toEqual(user)
    })
  })

  describe('omitUndefined', () => {
    it('应该忽略值为 undefined 的键', () => {
      const data = { name: 'John', age: undefined, city: 'New York', country: undefined }
      const cleaned = omitUndefined(data)
      expect(cleaned).toEqual({ name: 'John', city: 'New York' })
    })

    it('不应该忽略 null 或其他假值', () => {
      const data = { a: undefined, b: null, c: 0, d: '', e: false }
      const cleaned = omitUndefined(data)
      expect(cleaned).toEqual({ b: null, c: 0, d: '', e: false })
    })
  })

  describe('path (路径)', () => {
    const obj = { a: { b: { c: 1, d: undefined }, e: null }, arr: [{ x: 9 }] }

    describe('getPath (获取路径值)', () => {
      it('应该使用点表示法获取值', () => {
        expect(getPath(obj, 'a.b.c')).toBe(1)
      })

      it('应该使用方括号表示法获取值', () => {
        expect(getPath(obj, 'arr[0].x')).toBe(9)
      })

      it('对于 undefined 属性，应该返回默认值', () => {
        expect(getPath(obj, 'a.b.d', 42)).toBe(42)
      })

      it('对于 null 属性，应该返回 null，而不是默认值', () => {
        expect(getPath(obj, 'a.e', 100)).toBeNull()
      })

      it('对于不存在的路径，应该返回默认值', () => {
        expect(getPath(obj, 'a.f.g', 'default')).toBe('default')
      })

      it('对于空路径，应该返回对象本身', () => {
        expect(getPath(obj, '')).toBe(obj)
      })
    })

    describe('setPath (设置路径值)', () => {
      it('应该在现有路径上设置值', () => {
        const newObj = deepClone(obj)
        setPath(newObj, 'a.b.c', 2)
        expect(newObj.a.b.c).toBe(2)
      })

      it('应该为新路径创建嵌套对象', () => {
        const newObj: any = {}
        setPath(newObj, 'a.b.c', 1)
        expect(newObj).toEqual({ a: { b: { c: 1 } } })
      })

      it('应该为方括号中的数字索引创建嵌套数组', () => {
        const newObj: any = {}
        setPath(newObj, 'a.b[0].c', 7)
        expect(newObj).toEqual({ a: { b: [{ c: 7 }] } })
      })

      it('应该扩展现有数组', () => {
        const newObj: any = { a: { b: [{ c: 1 }] } }
        setPath(newObj, 'a.b[1].d', 8)
        expect(newObj.a.b[1]).toEqual({ d: 8 })
      })
    })

    describe('toPath (转换为路径片段)', () => {
      it('应该将字符串路径转换为片段数组', () => {
        expect(toPath('a.b[0].c')).toEqual(['a', 'b', 0, 'c'])
        expect(toPath('a[\'x.y\']')).toEqual(['a', 'x.y'])
        expect(toPath('a[0][1]')).toEqual(['a', 0, 1])
      })
    })

    describe('joinPath (连接路径片段)', () => {
      it('应该将片段数组转换为字符串路径', () => {
        expect(joinPath(['a', 'b', 0, 'c'])).toBe('a.b[0].c')
        expect(joinPath(['a', 'x.y', 0])).toBe('a[\'x.y\'][0]')
      })
    })

    describe('isValidContainer (是否为有效容器)', () => {
      it('应该正确验证容器', () => {
        expect(isValidContainer({})).toBe(true)
        expect(isValidContainer([])).toBe(true)
        expect(isValidContainer(null)).toBe(false)
        expect(isValidContainer('a')).toBe(false)
        expect(isValidContainer(1)).toBe(false)
      })
    })
  })

  describe('pick', () => {
    const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

    it('应该从对象中选择指定的键', () => {
      const publicInfo = pick(user, ['id', 'name', 'email'])
      expect(publicInfo).toEqual({ id: 1, name: 'John', email: 'john@example.com' })
    })

    it('应该返回一个新对象', () => {
      const result = pick(user, ['id'])
      expect(result).not.toBe(user)
    })

    it('应该处理不存在的键', () => {
      const result = pick(user, ['id', 'nonexistent' as any])
      expect(result).toEqual({ id: 1 })
    })
  })

  describe('separate', () => {
    const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

    it('应该将对象分离为选中和忽略的部分', () => {
      const { picked, omitted } = separate(user, ['id', 'name'])
      expect(picked).toEqual({ id: 1, name: 'John' })
      expect(omitted).toEqual({ email: 'john@example.com', password: 'secret' })
    })
  })

  describe('separateMany', () => {
    const options = { id: 1, name: 'John', email: 'a@b.com', role: 'admin' }

    it('应该将对象分离为多个组和其他部分', () => {
      const { a, b, others } = separateMany(options, { a: ['id'], b: ['name'] })
      expect(a).toEqual({ id: 1 })
      expect(b).toEqual({ name: 'John' })
      expect(others).toEqual({ email: 'a@b.com', role: 'admin' })
    })
  })
})
