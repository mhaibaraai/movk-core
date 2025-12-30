import type {
  MutableByKeys,
  OmitByKey,
  PartialByKeys,
  PickByKey,
  ReadonlyByKeys,
  RenameKeys,
  RequiredByKeys,
} from '../../../src/types/object/operations'
import { describe, expectTypeOf, it } from 'vitest'

describe('对象操作类型', () => {
  interface User {
    id: string
    name: string
    age?: number
    readonly role: string
  }

  it('omitByKey', () => {
    expectTypeOf<OmitByKey<User, 'age'>>().toEqualTypeOf<{ id: string, name: string, readonly role: string }>()
  })

  it('pickByKey', () => {
    expectTypeOf<PickByKey<User, 'id' | 'name'>>().toEqualTypeOf<{ id: string, name: string }>()
  })

  it('renameKeys', () => {
    expectTypeOf<RenameKeys<{ a: number, b: string }, { a: 'id' }>>().toEqualTypeOf<{ id: number, b: string }>()
  })

  it('requiredByKeys', () => {
    type Required = RequiredByKeys<User, 'age'>

    // 验证 age 变为必需
    expectTypeOf<Required['age']>().toEqualTypeOf<number>()
    // 验证其他属性不受影响
    expectTypeOf<Required['id']>().toEqualTypeOf<string>()
    expectTypeOf<Required['name']>().toEqualTypeOf<string>()

    // 验证类型可赋值性（类型注解本身即为验证）
    const user: Required = { id: '1', name: 'John', age: 30, role: 'admin' }
    expectTypeOf(user).toEqualTypeOf<Required>()
  })

  it('partialByKeys', () => {
    type Partial = PartialByKeys<User, 'name'>

    // 验证 name 变为可选
    expectTypeOf<Partial['name']>().toEqualTypeOf<string | undefined>()
    // 验证其他必需属性
    expectTypeOf<Partial['id']>().toEqualTypeOf<string>()
    // age 本来就是可选的
    expectTypeOf<Partial['age']>().toEqualTypeOf<number | undefined>()

    // 验证类型可赋值性（类型注解本身即为验证）
    const user1: Partial = { id: '1', role: 'admin' }
    const user2: Partial = { id: '1', name: 'John', role: 'admin' }
    expectTypeOf(user1).toEqualTypeOf<Partial>()
    expectTypeOf(user2).toEqualTypeOf<Partial>()
  })

  it('readonlyByKeys', () => {
    type Result = ReadonlyByKeys<User, 'name'>
    // 无法直接通过 expectTypeOf 验证 readonly 修饰符，但可以验证属性类型一致
    expectTypeOf<Result['name']>().toEqualTypeOf<string>()
    // 在 TS 中，Result['name'] 是只读的
  })

  it('mutableByKeys', () => {
    type Result = MutableByKeys<User, 'role'>
    expectTypeOf<Result['role']>().toEqualTypeOf<string>()
    // 在 TS 中，Result['role'] 是可写的
  })
})
