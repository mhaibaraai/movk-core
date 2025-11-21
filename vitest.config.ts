import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 1000,
    globals: true,
    silent: true,
  },
})
