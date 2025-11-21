import type { Component, DefineComponent } from 'vue'
import type { StringOrVNode } from './object'

/**
 * vue-component-type-helpers
 * Copy from https://github.com/vuejs/language-tools/tree/master/packages/component-type-helpers
 */

export type IsComponent = StringOrVNode | Component | DefineComponent | ((...args: any[]) => any)

export type ComponentType<T> = T extends new (...args: any) => {} ? 1
  : T extends (...args: any) => any ? 2
    : 0

export type ComponentProps<T> = T extends new (...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
    : {}

export type ComponentSlots<T> = T extends new (...args: any) => { $slots: infer S } ? NonNullable<S>
  : T extends (props: any, ctx: { slots: infer S, attrs: any, emit: any }, ...args: any) => any ? NonNullable<S>
    : {}

export type ComponentAttrs<T> = T extends new (...args: any) => { $attrs: infer A } ? NonNullable<A>
  : T extends (props: any, ctx: { slots: any, attrs: infer A, emit: any }, ...args: any) => any ? NonNullable<A>
    : {}

export type ComponentEmit<T> = T extends new (...args: any) => { $emit: infer E } ? NonNullable<E>
  : T extends (props: any, ctx: { slots: any, attrs: any, emit: infer E }, ...args: any) => any ? NonNullable<E>
    : {}

export type ComponentExposed<T> = T extends new (...args: any) => infer E ? E
  : T extends (props: any, ctx: any, expose: (exposed: infer E) => any, ...args: any) => any ? NonNullable<E>
    : {}
