import { describe, expect, it } from 'vitest'
import { convertToKebabCase } from '../../../src/transformers/object/convert-to-kebab-case'

describe('convertToKebabCase', () => {
  describe('基础转换', () => {
    it('应将 camelCase 键转换为 kebab-case', () => {
      const input = {
        firstName: 'John',
        lastName: 'Doe',
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        'first-name': 'John',
        'last-name': 'Doe',
      })
    })

    it('应将 PascalCase 键转换为 kebab-case', () => {
      const input = {
        FirstName: 'John',
        LastName: 'Doe',
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        'first-name': 'John',
        'last-name': 'Doe',
      })
    })

    it('应保持已经是 kebab-case 的键不变', () => {
      const input = {
        'first-name': 'John',
        'last-name': 'Doe',
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        'first-name': 'John',
        'last-name': 'Doe',
      })
    })

    it('应保持小写单词键不变', () => {
      const input = {
        name: 'John',
        age: 30,
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        name: 'John',
        age: 30,
      })
    })
  })

  describe('边界情况', () => {
    it('应处理空对象', () => {
      const result = convertToKebabCase({})
      expect(result).toEqual({})
    })

    it('应处理 null', () => {
      const result = convertToKebabCase(null as any)
      expect(result).toBeNull()
    })

    it('应处理 undefined', () => {
      const result = convertToKebabCase(undefined as any)
      expect(result).toBeUndefined()
    })

    it('应处理数组（返回原数组）', () => {
      const input = [1, 2, 3]
      const result = convertToKebabCase(input as any)
      expect(result).toBe(input)
    })

    it('应处理非对象类型', () => {
      expect(convertToKebabCase('string' as any)).toBe('string')
      expect(convertToKebabCase(123 as any)).toBe(123)
      expect(convertToKebabCase(true as any)).toBe(true)
    })
  })

  describe('值类型保持', () => {
    it('应保持字符串值不变', () => {
      const input = { userName: 'JohnDoe' }
      const result = convertToKebabCase(input) as any
      expect(result['user-name']).toBe('JohnDoe')
    })

    it('应保持数字值不变', () => {
      const input = { userId: 123 }
      const result = convertToKebabCase(input) as any
      expect(result['user-id']).toBe(123)
    })

    it('应保持布尔值不变', () => {
      const input = { isActive: true }
      const result = convertToKebabCase(input) as any
      expect(result['is-active']).toBe(true)
    })

    it('应保持 null 值不变', () => {
      const input = { middleName: null }
      const result = convertToKebabCase(input) as any
      expect(result['middle-name']).toBeNull()
    })

    it('应保持 undefined 值不变', () => {
      const input = { optionalField: undefined }
      const result = convertToKebabCase(input) as any
      expect(result['optional-field']).toBeUndefined()
    })

    it('应保持数组值不变', () => {
      const input = { userTags: ['tag1', 'tag2'] }
      const result = convertToKebabCase(input) as any
      expect(result['user-tags']).toEqual(['tag1', 'tag2'])
    })
  })

  describe('浅层转换（deep = false）', () => {
    it('默认不应转换嵌套对象的键', () => {
      const input = {
        firstName: 'John',
        userInfo: {
          birthDate: '1990-01-01',
          phoneNumber: '123-456-7890',
        },
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        'first-name': 'John',
        'user-info': {
          birthDate: '1990-01-01',
          phoneNumber: '123-456-7890',
        },
      })
    })

    it('应保持嵌套对象的引用', () => {
      const nested = { birthDate: '1990-01-01' }
      const input = { userInfo: nested }

      const result = convertToKebabCase(input) as any

      // 浅转换时，嵌套对象应保持原样
      expect(result['user-info']).toBe(nested)
    })
  })

  describe('深层转换（deep = true）', () => {
    it('应递归转换嵌套对象的键', () => {
      const input = {
        firstName: 'John',
        userInfo: {
          birthDate: '1990-01-01',
          phoneNumber: '123-456-7890',
        },
      }

      const result = convertToKebabCase(input, true)

      expect(result).toEqual({
        'first-name': 'John',
        'user-info': {
          'birth-date': '1990-01-01',
          'phone-number': '123-456-7890',
        },
      })
    })

    it('应递归转换多层嵌套对象', () => {
      const input = {
        userProfile: {
          basicInfo: {
            firstName: 'John',
            lastName: 'Doe',
          },
          contactInfo: {
            emailAddress: 'john@example.com',
            phoneNumber: '123-456-7890',
          },
        },
      }

      const result = convertToKebabCase(input, true)

      expect(result).toEqual({
        'user-profile': {
          'basic-info': {
            'first-name': 'John',
            'last-name': 'Doe',
          },
          'contact-info': {
            'email-address': 'john@example.com',
            'phone-number': '123-456-7890',
          },
        },
      })
    })

    it('应在深层转换时保持数组值不变', () => {
      const input = {
        userTags: ['tag1', 'tag2'],
        userInfo: {
          skillSet: ['JavaScript', 'TypeScript'],
        },
      }

      const result = convertToKebabCase(input, true)

      expect(result).toEqual({
        'user-tags': ['tag1', 'tag2'],
        'user-info': {
          'skill-set': ['JavaScript', 'TypeScript'],
        },
      })
    })

    it('应处理嵌套对象中的 null 值', () => {
      const input = {
        userInfo: {
          middleName: null,
          suffix: undefined,
        },
      }

      const result = convertToKebabCase(input, true)

      expect(result).toEqual({
        'user-info': {
          'middle-name': null,
          suffix: undefined,
        },
      })
    })
  })

  describe('特殊键名格式', () => {
    it('应处理连续大写字母', () => {
      const input = {
        XMLHttpRequest: 'value',
        HTMLElement: 'element',
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        'xmlhttp-request': 'value',
        'htmlelement': 'element',
      })
    })

    it('应处理带数字的键名', () => {
      const input = {
        user1Name: 'John',
        address2Line: 'Street',
        version3Beta: 'test',
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        'user1-name': 'John',
        'address2-line': 'Street',
        'version3-beta': 'test',
      })
    })

    it('应处理单个大写字母', () => {
      const input = {
        x: 1,
        Y: 2,
        aB: 3,
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        x: 1,
        y: 2,
        'a-b': 3,
      })
    })

    it('应处理已包含连字符的键名', () => {
      const input = {
        'user-name': 'John',
        'user-email': 'john@example.com',
      }

      const result = convertToKebabCase(input)

      expect(result).toEqual({
        'user-name': 'John',
        'user-email': 'john@example.com',
      })
    })
  })

  describe('实际使用场景', () => {
    it('应转换 API 响应对象', () => {
      const apiResponse = {
        userId: 123,
        userName: 'john_doe',
        emailAddress: 'john@example.com',
        isActive: true,
        createdAt: '2024-01-01',
        userProfile: {
          firstName: 'John',
          lastName: 'Doe',
          birthDate: '1990-01-01',
        },
      }

      const result = convertToKebabCase(apiResponse, true)

      expect(result).toEqual({
        'user-id': 123,
        'user-name': 'john_doe',
        'email-address': 'john@example.com',
        'is-active': true,
        'created-at': '2024-01-01',
        'user-profile': {
          'first-name': 'John',
          'last-name': 'Doe',
          'birth-date': '1990-01-01',
        },
      })
    })

    it('应转换配置对象', () => {
      const config = {
        serverPort: 3000,
        databaseUrl: 'localhost',
        cacheSettings: {
          maxSize: 1000,
          ttlSeconds: 3600,
        },
      }

      const result = convertToKebabCase(config, true)

      expect(result).toEqual({
        'server-port': 3000,
        'database-url': 'localhost',
        'cache-settings': {
          'max-size': 1000,
          'ttl-seconds': 3600,
        },
      })
    })
  })
})
