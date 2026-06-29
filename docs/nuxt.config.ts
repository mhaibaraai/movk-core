import { fileURLToPath } from 'node:url'
import pkg from '../package.json'

export default defineNuxtConfig({
  extends: ['@movk/nuxt-docs'],

  modules: ['@nuxtjs/i18n'],

  $development: {
    site: {
      url: 'http://localhost:3000'
    }
  },

  $production: {
    site: {
      url: 'https://core.mhaibaraai.cn'
    }
  },

  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },

  alias: {
    '@movk/core': fileURLToPath(new URL('../src/index.ts', import.meta.url))
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
    '/docs/utilities/css': { redirect: '/docs/utilities/css/length-to-px', prerender: false },
    '/docs/utilities/url': { redirect: '/docs/utilities/url/append-query-param', prerender: false },

    // level 2 redirects - transformers
    '/docs/transformers/markdown': { redirect: '/docs/transformers/markdown/stringify-minimark', prerender: false },
    '/docs/transformers/object': { redirect: '/docs/transformers/object/convert-to-kebab-case', prerender: false },
    '/docs/transformers/string': { redirect: '/docs/transformers/string/camel-case', prerender: false },
    '/docs/transformers/tree': { redirect: '/docs/transformers/tree/filter', prerender: false },

    // level 2 redirects - helpers
    '/docs/helpers/file': { redirect: '/docs/helpers/file/convert-svg-to-png', prerender: false },
    '/docs/helpers/object': { redirect: '/docs/helpers/object/deep-clone', prerender: false },
    '/docs/helpers/path': { redirect: '/docs/helpers/path/get-path', prerender: false },

    // en - redirects - default root pages
    '/en/docs': { redirect: '/en/docs/getting-started', prerender: false },
    '/en/docs/ai': { redirect: '/en/docs/getting-started/ai/mcp', prerender: false },
    '/en/docs/composables': { redirect: '/en/docs/composables/use-app-storage', prerender: false },
    '/en/docs/validators': { redirect: '/en/docs/validators/is-array', prerender: false },
    '/en/docs/utilities': { redirect: '/en/docs/utilities/array', prerender: false },
    '/en/docs/transformers': { redirect: '/en/docs/transformers/object', prerender: false },
    '/en/docs/helpers': { redirect: '/en/docs/helpers/simple-hash', prerender: false },
    '/en/docs/types': { redirect: '/en/docs/types/api', prerender: false },

    // en - level 2 redirects - utilities
    '/en/docs/utilities/array': { redirect: '/en/docs/utilities/array/chunk', prerender: false },
    '/en/docs/utilities/async': { redirect: '/en/docs/utilities/async/debounce', prerender: false },
    '/en/docs/utilities/css': { redirect: '/en/docs/utilities/css/length-to-px', prerender: false },
    '/en/docs/utilities/url': { redirect: '/en/docs/utilities/url/append-query-param', prerender: false },

    // en - level 2 redirects - transformers
    '/en/docs/transformers/markdown': { redirect: '/en/docs/transformers/markdown/stringify-minimark', prerender: false },
    '/en/docs/transformers/object': { redirect: '/en/docs/transformers/object/convert-to-kebab-case', prerender: false },
    '/en/docs/transformers/string': { redirect: '/en/docs/transformers/string/camel-case', prerender: false },
    '/en/docs/transformers/tree': { redirect: '/en/docs/transformers/tree/filter', prerender: false },

    // en - level 2 redirects - helpers
    '/en/docs/helpers/file': { redirect: '/en/docs/helpers/file/convert-svg-to-png', prerender: false },
    '/en/docs/helpers/object': { redirect: '/en/docs/helpers/object/deep-clone', prerender: false },
    '/en/docs/helpers/path': { redirect: '/en/docs/helpers/path/get-path', prerender: false },
  },

  i18n: {
    defaultLocale: 'zh-CN',
    locales: [
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },

  compatibilityDate: 'latest',

  vite: {
    optimizeDeps: {
      include: [
        '@unhead/schema-org/vue',
      ]
    }
  },

  mcp: {
    name: 'movk-core',
    browserRedirect: '/docs/getting-started/ai/mcp'
  },

  aiChat: {
    model: 'alibaba/qwen3.7-plus',
    models: [
      'alibaba/qwen3.7-plus',
      'alibaba/glm-5.1',
      'alibaba/deepseek-v3.2'
    ]
  },

  llms: {
    domain: 'https://core.mhaibaraai.cn',
    title: 'movk-core',
    description: '为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库。涵盖数组、对象、字符串、异步操作等多个方面，提供完整的类型定义和 Vue 组合式函数。',
    full: {
      title: 'movk-core - 完整文档',
      description: '为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库。包含 80+ 工具函数的完整文档、API 参考、类型定义和使用示例。'
    },
  },
})
