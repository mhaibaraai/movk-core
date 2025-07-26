import type { AppStorageReturn, StorageConfigInput } from '../types'
import { useStorage } from '@vueuse/core'
import { createStorageConfigSchema } from '../types'

/**
 * 应用存储管理的组合式函数，支持localStorage和sessionStorage
 *
 * @category Composables
 * @param config 存储配置对象
 * @returns 存储管理对象，包含响应式状态和操作方法
 * @example
 * ```ts
 * import { z } from 'zod/v4'
 *
 * // 定义用户偏好设置的schema
 * const userPrefsSchema = z.object({
 *   theme: z.enum(['light', 'dark']),
 *   language: z.string(),
 *   fontSize: z.number().min(12).max(24)
 * })
 *
 * // 创建存储管理实例
 * const { state, setItem, getItem, removeItem } = useAppStorage({
 *   key: 'user-preferences',
 *   defaultValue: {
 *     theme: 'light',
 *     language: 'zh-CN',
 *     fontSize: 16
 *   },
 *   schema: userPrefsSchema,
 *   storage: 'localStorage',
 *   prefix: 'app'
 * })
 *
 * // 使用响应式状态
 * console.log(state.value.theme) // 'light'
 *
 * // 更新设置
 * setItem({
 *   theme: 'dark',
 *   language: 'en-US',
 *   fontSize: 18
 * })
 * ```
 */
export function useAppStorage<T = unknown>(config: StorageConfigInput<T>): AppStorageReturn<T> {
  const configSchema = createStorageConfigSchema<T>(config.schema)
  const parsedConfig = configSchema.parse(config)

  const {
    key,
    defaultValue,
    schema,
    storage,
    prefix,
  } = parsedConfig

  const fullKey = `${prefix}:${key}`

  const getStorageDriver = () => {
    if (typeof window === 'undefined') {
      return undefined
    }
    return storage === 'localStorage' ? localStorage : sessionStorage
  }

  const storageDriver = getStorageDriver()

  function readValue(value: string | null): T {
    if (value === null)
      return defaultValue

    try {
      const parsedValue = JSON.parse(value)
      const validation = schema.safeParse(parsedValue)

      if (!validation.success) {
        console.warn(
          `[AppStorage] Validation failed for key "${fullKey}". Using default value.`,
          validation.error.issues,
        )
        return defaultValue
      }

      return validation.data
    }
    catch (error) {
      console.warn(
        `[AppStorage] Failed to parse value for key "${fullKey}". Using default value.`,
        error,
      )
      return defaultValue
    }
  }

  const state = useStorage(
    fullKey,
    defaultValue,
    storageDriver,
    {
      mergeDefaults: true,
      serializer: {
        read: readValue,
        write: (value: T) => {
          return JSON.stringify(value)
        },
      },
    },
  )

  function getItem(): T {
    if (!storageDriver)
      return defaultValue
    const rawValue = storageDriver.getItem(fullKey)
    return readValue(rawValue)
  }

  function setItem(value: T): void {
    const validation = schema.safeParse(value)
    if (!validation.success) {
      console.warn(
        `[AppStorage] Invalid value for key "${fullKey}". Aborting setItem.`,
        validation.error.issues,
      )
      return
    }
    state.value = validation.data
  }

  function removeItem(): void {
    if (!storageDriver)
      return
    // @vueuse/core 的 useStorage 会通过将 ref 设置为 null 来移除项
    state.value = null as any
  }

  return {
    state,
    getItem,
    setItem,
    removeItem,
  }
}
