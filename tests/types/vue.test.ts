import type { ComponentProps, ComponentType } from '../../src/types/vue'
import { describe, expectTypeOf, it } from 'vitest'
import { defineComponent, h } from 'vue'

describe('vue 类型工具', () => {
  it('componentType', () => {
    // Class Component
    class _MyClassComp {}
    const classType = {} as ComponentType<typeof _MyClassComp>
    expectTypeOf(classType).toEqualTypeOf<1>()

    // Functional / Object Component
    const _MyFuncComp = () => h('div')
    const funcType = {} as ComponentType<typeof _MyFuncComp>
    expectTypeOf(funcType).toEqualTypeOf<2>()
  })

  it('componentProps', () => {
    const _Comp = defineComponent({
      props: {
        msg: { type: String, required: true },
        count: { type: Number, default: 0 }
      },
      setup() { return () => h('div') }
    })

    type Props = ComponentProps<typeof _Comp>
    // Vue 的 defineComponent 推断出的 props 类型包含 readonly
    expectTypeOf<Props['msg']>().toEqualTypeOf<string>()
    // count 有 default，Vue 推断为 number | undefined（可选）
    type CountType = Props['count']
    // 验证 count 类型包含 number
    const count: CountType = 0
    expectTypeOf(count).toExtend<number>()
  })
})
