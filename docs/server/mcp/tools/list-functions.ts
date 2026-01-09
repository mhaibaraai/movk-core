import { queryCollection } from '@nuxt/content/server'

const DOCS_BASE_URL = 'https://core.mhaibaraai.cn'

const CATEGORY_CONFIG = {
  validators: { prefix: '/docs/validators', hasSubcategory: false },
  utilities: { prefix: '/docs/utilities', hasSubcategory: true },
  transformers: { prefix: '/docs/transformers', hasSubcategory: true },
  helpers: { prefix: '/docs/helpers', hasSubcategory: true },
  composables: { prefix: '/docs/composables', hasSubcategory: false },
  types: { prefix: '/docs/types', hasSubcategory: true }
} as const

type CategoryKey = keyof typeof CATEGORY_CONFIG

export default defineMcpTool({
  description: '列出所有可用的 @movk/core 工具函数及其分类和基本信息',
  cache: '1h',
  async handler() {
    const event = useEvent()

    const functions = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/%')
      .where('path', 'NOT LIKE', '%/docs/getting-started/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    const categorized: Record<CategoryKey, Array<{
      path: string
      title: string
      description: string
      subcategory: string
      url: string
    }>> = {
      validators: [],
      utilities: [],
      transformers: [],
      helpers: [],
      composables: [],
      types: []
    }

    for (const fn of functions) {
      const { path, title, description } = fn

      let matchedCategory: CategoryKey = 'utilities'
      for (const [category, config] of Object.entries(CATEGORY_CONFIG) as [CategoryKey, typeof CATEGORY_CONFIG[CategoryKey]][]) {
        if (path.startsWith(config.prefix)) {
          matchedCategory = category
          break
        }
      }

      const parts = path.split('/')
      const subcategory = CATEGORY_CONFIG[matchedCategory].hasSubcategory && parts.length > 3
        ? parts[3]
        : ''

      categorized[matchedCategory].push({
        path,
        title,
        description,
        subcategory,
        url: `${DOCS_BASE_URL}${path}`
      })
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({
          total: functions.length,
          categories: categorized
        }, null, 2)
      }]
    }
  }
})
