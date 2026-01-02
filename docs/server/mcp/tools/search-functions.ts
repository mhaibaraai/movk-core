import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod/v4'

const DOCS_BASE_URL = 'https://core.mhaibaraai.cn'

export default defineMcpTool({
  description: '按类别或关键词搜索 @movk/core 函数',
  cache: '30m',
  inputSchema: {
    category: z.enum(['validators', 'utilities', 'transformers', 'helpers', 'composables', 'types', 'all'])
      .optional()
      .describe('函数类别'),
    subcategory: z.string().optional().describe('子类别,如 "array"、"string"、"tree" 等'),
    keyword: z.string().optional().describe('搜索关键词,将在标题和描述中搜索')
  },
  async handler({ category = 'all', subcategory, keyword }) {
    const event = useEvent()

    let query = queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/%')
      .where('path', 'NOT LIKE', '%/docs/getting-started/%')
      .where('extension', '=', 'md')

    if (category && category !== 'all') {
      query = query.where('path', 'LIKE', `%/docs/${category}/%`)
    }

    if (subcategory) {
      query = query.where('path', 'LIKE', `%/docs/%/${subcategory}/%`)
    }

    const results = await query
      .select('path', 'title', 'description')
      .all()

    let filtered = results
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase()
      filtered = results.filter(doc =>
        doc.title?.toLowerCase().includes(lowerKeyword)
        || doc.description?.toLowerCase().includes(lowerKeyword)
      )
    }

    const result = {
      query: { category, subcategory, keyword },
      total: filtered.length,
      results: filtered.map(doc => ({
        title: doc.title,
        description: doc.description,
        path: doc.path,
        url: `${DOCS_BASE_URL}${doc.path}`
      }))
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify(result, null, 2)
      }]
    }
  }
})
