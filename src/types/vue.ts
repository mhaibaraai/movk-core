import type { Component, DefineComponent } from 'vue'
import type { StringOrVNode } from './object'

/**
 * 增强版组件类型提取，支持泛型 SFC 的三种 vue-tsc 编译签名模式：
 * - 模式 A：函数参数可直接解析 → Parameters<T>[0]
 * - 模式 A'：参数自引用（返回 any）→ 返回值 __ctx 成员
 * - 模式 B：DefineComponent 包装 → InstanceType<T>['$props']
 */

export type IsComponent = StringOrVNode | Component | DefineComponent | ((...args: any[]) => any)

export type ComponentType<T> = T extends new (...args: any) => {} ? 1
  : T extends (...args: any) => any ? 2
    : 0

/** 检测 any 类型 */
type _IsAny<T> = 0 extends (1 & T) ? true : false

/** 从构造器组件提取 InstanceType 成员，映射展平避免 TS 延迟求值 */
type _InstanceTypeMember<T, K extends string>
  = T extends abstract new (...args: any) => infer I
    ? K extends keyof I
      ? { [P in keyof I[K]]: I[K][P] }
      : never
    : never

/** 从可调用组件提取第一个参数（props），排除 any/never */
type _FnParam<T>
  = T extends (...args: any) => any
    ? [Parameters<T>[0]] extends [never] ? never
        : _IsAny<Parameters<T>[0]> extends true ? never
          : Parameters<T>[0]
    : never

/** 从可调用组件的 ctx 参数提取指定成员（slots/attrs/emit） */
type _FnCtxMember<T, K extends string>
  = T extends (props: any, ctx: infer Ctx, ...args: any) => any
    ? Ctx extends Record<K, infer M> ? NonNullable<M> : never
    : never

/** 从返回值 __ctx 提取指定字段（模式 A'：参数自引用时 __ctx 仍可解析） */
type _ReturnCtxMember<T, K extends string>
  = T extends (...args: any) => infer R
    ? R extends { __ctx?: infer Ctx }
      ? Ctx extends Record<K, infer M>
        ? _IsAny<M> extends true ? never : { [P in keyof M]: M[P] }
        : never
      : never
    : never

/**
 * 组件 Props 提取
 * - 模式 A  → Parameters[0]
 * - 模式 A' → __ctx.props
 * - 模式 B  → $props
 * - 回退    → {}
 */
export type ComponentProps<T>
  = _FnParam<T> extends never
    ? _ReturnCtxMember<T, 'props'> extends never
      ? _InstanceTypeMember<T, '$props'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$props'>>
      : NonNullable<_ReturnCtxMember<T, 'props'>>
    : _FnParam<T>

/**
 * 组件 Slots 提取
 * - 模式 A  → ctx.slots
 * - 模式 A' → __ctx.slots
 * - 模式 B  → $slots
 * - 回退    → {}
 */
export type ComponentSlots<T>
  = _IsAny<_FnCtxMember<T, 'slots'>> extends true
    ? _ReturnCtxMember<T, 'slots'> extends never
      ? _InstanceTypeMember<T, '$slots'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$slots'>>
      : _ReturnCtxMember<T, 'slots'>
    : [_FnCtxMember<T, 'slots'>] extends [never]
        ? _ReturnCtxMember<T, 'slots'> extends never
          ? _InstanceTypeMember<T, '$slots'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$slots'>>
          : _ReturnCtxMember<T, 'slots'>
        : _FnCtxMember<T, 'slots'>

/**
 * 组件 Attrs 提取
 * - 模式 A  → ctx.attrs
 * - 模式 A' → __ctx.attrs
 * - 模式 B  → $attrs
 * - 回退    → {}
 */
export type ComponentAttrs<T>
  = _IsAny<_FnCtxMember<T, 'attrs'>> extends true
    ? _ReturnCtxMember<T, 'attrs'> extends never
      ? _InstanceTypeMember<T, '$attrs'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$attrs'>>
      : _ReturnCtxMember<T, 'attrs'>
    : [_FnCtxMember<T, 'attrs'>] extends [never]
        ? _ReturnCtxMember<T, 'attrs'> extends never
          ? _InstanceTypeMember<T, '$attrs'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$attrs'>>
          : _ReturnCtxMember<T, 'attrs'>
        : _FnCtxMember<T, 'attrs'>

/**
 * 组件 Emit 提取
 * - 模式 A  → ctx.emit
 * - 模式 A' → __ctx.emit
 * - 模式 B  → $emit
 * - 回退    → {}
 */
export type ComponentEmit<T>
  = _IsAny<_FnCtxMember<T, 'emit'>> extends true
    ? _ReturnCtxMember<T, 'emit'> extends never
      ? _InstanceTypeMember<T, '$emit'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$emit'>>
      : _ReturnCtxMember<T, 'emit'>
    : [_FnCtxMember<T, 'emit'>] extends [never]
        ? _ReturnCtxMember<T, 'emit'> extends never
          ? _InstanceTypeMember<T, '$emit'> extends never ? {} : NonNullable<_InstanceTypeMember<T, '$emit'>>
          : _ReturnCtxMember<T, 'emit'>
        : _FnCtxMember<T, 'emit'>

/**
 * 组件 Exposed 提取
 * - 构造器  → InstanceType<T>
 * - 可调用  → expose 参数
 * - 回退    → {}
 */
export type ComponentExposed<T> = T extends new (...args: any) => infer E ? E
  : T extends (props: any, ctx: any, expose: (exposed: infer E) => any, ...args: any) => any ? NonNullable<E>
    : {}
