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
    '/docs/composables': { redirect: '/docs/composables/use-app-storage', prerender: false },
    '/docs/utils': { redirect: '/docs/utils/array', prerender: false },
    '/docs/types': { redirect: '/docs/types/api', prerender: false },

    // level 2 redirects
    '/docs/utils/array': { redirect: '/docs/utils/array/chunk', prerender: false },
    '/docs/utils/async': { redirect: '/docs/utils/async/debounce', prerender: false },
    '/docs/utils/file': { redirect: '/docs/utils/file/convert-svg-to-png', prerender: false },
    '/docs/utils/object': { redirect: '/docs/utils/object/convert-to-kebab-case', prerender: false },
    '/docs/utils/path': { redirect: '/docs/utils/path/get-path', prerender: false },
    '/docs/utils/string': { redirect: '/docs/utils/string/camel-case', prerender: false },
    '/docs/utils/tree': { redirect: '/docs/utils/tree/filter', prerender: false },
    '/docs/utils/utilities': { redirect: '/docs/utils/utilities/get-random-uuid', prerender: false },
    '/docs/utils/validator': { redirect: '/docs/utils/validator/is-array', prerender: false },
  },
  compatibilityDate: 'latest',
  llms: {
    domain: 'https://core.mhaibaraai.cn',
    title: '@movk/core',
    description: '一个为现代 Vue.js 应用量身打造的高性能实用工具与组合式函数集合。全面拥抱 TypeScript，轻量、可摇树，为您的项目注入更多活力与效率。',
    full: {
      title: '@movk/core',
      description: '一个为现代 Vue.js 应用量身打造的高性能实用工具与组合式函数集合。全面拥抱 TypeScript，轻量、可摇树，为您的项目注入更多活力与效率。'
    },
    notes: ['Vue.js 工具', '组合式函数', 'TypeScript', '实用库']
  },
  robots: {
    sitemap: 'https://core.mhaibaraai.cn/sitemap.xml'
  },
})
