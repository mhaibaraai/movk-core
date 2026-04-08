import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod'

export default defineMcpTool({
  description: '按类别或关键词搜索 @movk/core 函数',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  cache: '30m',
  inputSchema: {
    category: z.enum(['validators', 'utilities', 'transformers', 'helpers', 'composables', 'types', 'all'])
      .optional()
      .describe('函数类别'),
    subcategory: z.string().optional().describe('子类别,如 "array"、"string"、"tree" 等'),
    keyword: z.string().optional().describe('搜索关键词,将在标题和描述中搜索')
  },
  inputExamples: [
    { category: 'validators', keyword: 'array' },
    { category: 'utilities', subcategory: 'async', keyword: 'debounce' },
    { category: 'all', keyword: 'tree' }
  ],
  async handler({ category = 'all', subcategory, keyword }) {
    const event = useEvent()
    const siteUrl = getRequestURL(event).origin

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

    return {
      query: { category, subcategory, keyword },
      total: filtered.length,
      results: filtered.map(doc => ({
        title: doc.title,
        description: doc.description,
        path: doc.path,
        url: `${siteUrl}${doc.path}`
      }))
    }
  }
})
