import type { VNode } from 'vue'

export type AnyObject = Record<string, any>

export type OmitByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
}

export type PickByKey<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
}

export type RenameKeys<T, Mapping extends { [K in keyof T]?: PropertyKey }> = {
  [K in keyof T as K extends keyof Mapping ? Exclude<Mapping[K], undefined> : K]: T[K];
}

export type RequiredByKeys<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
}

export type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ReadonlyByKeys<T, K extends keyof T> = T & {
  readonly [P in K]: T[P];
}

export type MutableByKeys<T, K extends keyof T> = {
  -readonly [P in K]: T[P];
} & Omit<T, K>

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? {
  [K in keyof I]: I[K];
} : never

export type FirstParam<T, K extends keyof T> = T[K] extends [infer P, ...any[]] ? P : never

export type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : undefined

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
}

export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any> ? MaybeObject[Key] : never

export type StringOrVNode = string | VNode | (() => VNode)
