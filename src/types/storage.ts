import type { Ref } from 'vue'
import { z } from 'zod/v4'

export const StorageTypeSchema = z.enum(['localStorage', 'sessionStorage'])
export type StorageType = z.infer<typeof StorageTypeSchema>

export function createStorageConfigSchema<T = unknown>(schema: z.ZodType<T>) {
  return z.object({
    key: z.string().min(1, { message: 'Key cannot be empty' }),
    schema: z.custom<z.ZodType<T>>(
      val => val instanceof z.ZodType,
      { message: 'Schema must be a valid Zod schema' },
    ),
    defaultValue: z.custom<T>(
      val => schema.safeParse(val).success,
      { message: 'Default value must match the provided schema' },
    ),
    prefix: z.string().default('movk'),
    storage: StorageTypeSchema.default('localStorage'),
  })
}

export type StorageConfig<T = unknown> = z.infer<ReturnType<typeof createStorageConfigSchema<T>>>
export type StorageConfigInput<T = unknown> = z.input<ReturnType<typeof createStorageConfigSchema<T>>>

export interface AppStorageReturn<T> {
  state: Ref<T>
  getItem: () => T
  setItem: (value: T) => void
  removeItem: () => void
}
