import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['@movk/nuxt-docs'],
  modules: ['@nuxtjs/mcp-toolkit'],
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
    name: '@movk/core',
    browserRedirect: '/docs/getting-started/ai/mcp'
  },
  llms: {
    domain: 'https://core.mhaibaraai.cn',
    title: '@movk/core',
    description: '为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库。涵盖数组、对象、字符串、异步操作等多个方面，提供完整的类型定义和 Vue 组合式函数。',
    full: {
      title: '@movk/core - 完整文档',
      description: '为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库。包含 80+ 工具函数的完整文档、API 参考、类型定义和使用示例。'
    },
    sections: [
      {
        title: '快速开始',
        contentCollection: 'docs',
        contentFilters: [{ path: '/docs/getting-started/%' }]
      },
      {
        title: 'Vue 组合式函数',
        contentCollection: 'docs',
        contentFilters: [{ path: '/docs/composables/%' }]
      },
      {
        title: '类型验证器',
        contentCollection: 'docs',
        contentFilters: [{ path: '/docs/validators/%' }]
      },
      {
        title: '工具函数',
        contentCollection: 'docs',
        contentFilters: [
          { path: '/docs/utilities/array/%' },
          { path: '/docs/utilities/async/%' },
          { path: '/docs/utilities/url/%' }
        ]
      },
      {
        title: '数据转换器',
        contentCollection: 'docs',
        contentFilters: [
          { path: '/docs/transformers/object/%' },
          { path: '/docs/transformers/string/%' },
          { path: '/docs/transformers/tree/%' }
        ]
      },
      {
        title: '辅助函数',
        contentCollection: 'docs',
        contentFilters: [
          { path: '/docs/helpers/file/%' },
          { path: '/docs/helpers/object/%' },
          { path: '/docs/helpers/path/%' },
          { path: '/docs/helpers/simple-hash' },
          { path: '/docs/helpers/uuid' }
        ]
      },
      {
        title: '类型定义',
        contentCollection: 'docs',
        contentFilters: [{ path: '/docs/types/%' }]
      }
    ],
  },
  robots: {
    sitemap: 'https://core.mhaibaraai.cn/sitemap.xml'
  },
})
