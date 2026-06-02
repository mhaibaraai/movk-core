import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod'

export default defineMcpTool({
  description: 'Search @movk/core functions by category or keyword',
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
      .describe('Function category'),
    subcategory: z.string().optional().describe('Subcategory, such as "array", "string", or "tree"'),
    keyword: z.string().optional().describe('Search keyword, matched against the title and description')
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
