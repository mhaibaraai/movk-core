import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['@movk/nuxt-docs'],
  css: ['~/assets/css/main.css'],
  alias: {
    '@movk/core': fileURLToPath(new URL('../src/index.ts', import.meta.url))
  },
  site: {
    name: 'Movk Core',
    url: 'https://core.mhaibaraai.cn',
  },
  routeRules: {
    // redirects - default root pages
    '/docs': { redirect: '/docs/getting-started', prerender: false },
    '/docs/ai': { redirect: '/docs/getting-started/ai/mcp', prerender: false },
    '/docs/composables': { redirect: '/docs/composables/use-app-storage', prerender: false },
    '/docs/validators': { redirect: '/docs/validators/is-array', prerender: false },
    '/docs/utilities': { redirect: '/docs/utilities/array', prerender: false },
    '/docs/transformers': { redirect: '/docs/transformers/object', prerender: false },
    '/docs/helpers': { redirect: '/docs/helpers/simple-hash', prerender: false },
    '/docs/types': { redirect: '/docs/types/api', prerender: false },

    // level 2 redirects - utilities
    '/docs/utilities/array': { redirect: '/docs/utilities/array/chunk', prerender: false },
    '/docs/utilities/async': { redirect: '/docs/utilities/async/debounce', prerender: false },
    '/docs/utilities/url': { redirect: '/docs/utilities/url/append-query-param', prerender: false },

    // level 2 redirects - transformers
    '/docs/transformers/object': { redirect: '/docs/transformers/object/convert-to-kebab-case', prerender: false },
    '/docs/transformers/string': { redirect: '/docs/transformers/string/camel-case', prerender: false },
    '/docs/transformers/tree': { redirect: '/docs/transformers/tree/filter', prerender: false },

    // level 2 redirects - helpers
    '/docs/helpers/file': { redirect: '/docs/helpers/file/convert-svg-to-png', prerender: false },
    '/docs/helpers/object': { redirect: '/docs/helpers/object/deep-clone', prerender: false },
    '/docs/helpers/path': { redirect: '/docs/helpers/path/get-path', prerender: false },
  },
  compatibilityDate: 'latest',
  mcp: {
    name: 'Movk Core',
    browserRedirect: '/docs/getting-started/ai/mcp'
  },
  aiChat: {
    models: [
      'mistral/devstral-2',
      'kwaipilot/kat-coder-pro-v1',
      'openrouter/mistralai/devstral-2512:free',
      'openrouter/xiaomi/mimo-v2-flash:free',
      'openrouter/z-ai/glm-4.5-air:free'
    ]
  },
  llms: {
    domain: 'https://core.mhaibaraai.cn',
    title: '@movk/core',
    description: '为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库。涵盖数组、对象、字符串、异步操作等多个方面，提供完整的类型定义和 Vue 组合式函数。',
    full: {
      title: '@movk/core - 完整文档',
      description: '为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库。包含 80+ 工具函数的完整文档、API 参考、类型定义和使用示例。'
    },
  },
  robots: {
    sitemap: 'https://core.mhaibaraai.cn/sitemap.xml'
  },
})
