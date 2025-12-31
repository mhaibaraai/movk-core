import type { Ref } from 'vue'

export type StorageType = 'localStorage' | 'sessionStorage'

export interface StorageConfig<T = unknown> {
  key: string
  defaultValue: T
  prefix: string
  storage: StorageType
}

export type StorageConfigInput<T = unknown> = Partial<Omit<StorageConfig<T>, 'key' | 'defaultValue'>> & {
  key: string
  defaultValue: T
}

export interface AppStorageReturn<T> {
  state: Ref<T>
  getItem: () => T
  setItem: (value: T) => void
  removeItem: () => void
}
