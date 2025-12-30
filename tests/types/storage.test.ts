import type { AppStorageReturn, StorageConfigInput } from '../../src/types/storage'
import { describe, expectTypeOf, it } from 'vitest'

describe('storage 类型', () => {
  it('storageConfigInput', () => {
    // key 是必须的，storage 和 prefix 是可选的
    type Input = StorageConfigInput<string>

    // 验证包含必需的 key 属性
    type Expected = { key: string }
    expectTypeOf<Input>().toExtend<Expected>()

    // 验证 prefix 是可选的
    expectTypeOf<Input['prefix']>().toEqualTypeOf<string | undefined>()

    // 验证 defaultValue 是必须的
    expectTypeOf<Input['defaultValue']>().toEqualTypeOf<string>()
  })

  it('appStorageReturn', () => {
    type Ret = AppStorageReturn<number>
    expectTypeOf<Ret['state']['value']>().toEqualTypeOf<number>()
    expectTypeOf<Ret['getItem']>().returns.toEqualTypeOf<number>()
  })
})
