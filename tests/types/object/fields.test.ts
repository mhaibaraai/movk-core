import type {
  ArrayFieldKeys,
  GetFieldValue,
  GetObjectField,
  NestedKeys,
  NonObjectFieldKeys,
  ObjectFieldKeys,
} from '../../../src/types/object/fields'
import { describe, expectTypeOf, it } from 'vitest'

describe('字段工具类型', () => {
  interface User {
    name: string
    age: number
    tags: string[]
    address: {
      city: string
      zip: number
      location: {
        lat: number
        lng: number
      }
    }
    posts: { title: string }[]
  }

  it('getObjectField', () => {
    expectTypeOf<GetObjectField<User, 'name'>>().toEqualTypeOf<string>()
    expectTypeOf<GetObjectField<string, 'length'>>().toBeNever()
  })

  it('nestedKeys', () => {
    type Keys = NestedKeys<User>
    expectTypeOf<Keys>().toExtend<
      | 'name'
      | 'age'
      | 'tags'
      | 'address'
      | 'address.city'
      | 'address.zip'
      | 'address.location'
      | 'address.location.lat'
      | 'address.location.lng'
      | 'posts'
    >()
  })

  it('objectFieldKeys', () => {
    type Keys = ObjectFieldKeys<User>
    expectTypeOf<Keys>().toExtend<
      | 'address'
      | 'address.location'
    >()
    // 应该不包含非对象字段
    expectTypeOf<Keys>().not.toExtend<'name'>()
    expectTypeOf<Keys>().not.toExtend<'tags'>()
  })

  it('nonObjectFieldKeys', () => {
    type Keys = NonObjectFieldKeys<User>
    expectTypeOf<Keys>().toExtend<
      | 'name'
      | 'age'
      | 'tags'
      | 'address.city'
      | 'address.zip'
      | 'address.location.lat'
      | 'address.location.lng'
      | 'posts'
    >()
    // 应该不包含纯对象字段
    expectTypeOf<Keys>().not.toExtend<'address'>()
  })

  it('arrayFieldKeys', () => {
    type Keys = ArrayFieldKeys<User>
    expectTypeOf<Keys>().toExtend<'tags' | 'posts'>()
  })

  it('getFieldValue', () => {
    expectTypeOf<GetFieldValue<User, 'name'>>().toEqualTypeOf<string>()
    expectTypeOf<GetFieldValue<User, 'address.city'>>().toEqualTypeOf<string>()
    expectTypeOf<GetFieldValue<User, 'address.location'>>().toEqualTypeOf<{ lat: number, lng: number }>()
    expectTypeOf<GetFieldValue<User, 'tags'>>().toEqualTypeOf<string[]>()
    // 不存在的路径
    expectTypeOf<GetFieldValue<User, 'invalid'>>().toBeUnknown()
    expectTypeOf<GetFieldValue<User, 'address.invalid'>>().toBeUnknown()
  })
})
