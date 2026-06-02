import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod'

const CATEGORY_LABELS: Record<string, string> = {
  '/docs/validators/': 'Validators',
  '/docs/utilities/array/': 'Array utilities',
  '/docs/utilities/async/': 'Async control',
  '/docs/utilities/css/': 'CSS utilities',
  '/docs/utilities/url/': 'URL handling',
  '/docs/transformers/string/': 'String transformers',
  '/docs/transformers/object/': 'Object transformers',
  '/docs/transformers/tree/': 'Tree structure',
  '/docs/transformers/markdown/': 'Markdown transformers',
  '/docs/helpers/file/': 'File helpers',
  '/docs/helpers/object/': 'Object helpers',
  '/docs/helpers/path/': 'Path helpers',
  '/docs/composables/': 'Vue composables',
  '/docs/types/': 'Type definitions'
}

function getCategoryLabel(path: string): string {
  const entry = Object.entries(CATEGORY_LABELS).find(([prefix]) => path.startsWith(prefix))
  return entry ? entry[1] : 'Other'
}

export default defineMcpPrompt({
  description: 'Find the most suitable @movk/core function for a given use case',
  inputSchema: {
    usecase: z.string().describe('Use case description, such as "deduplicate an array" or "flatten tree data"')
  },
  async handler({ usecase }) {
    const event = useEvent()
    const siteUrl = getRequestURL(event).origin

    const allFunctions = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/%')
      .where('path', 'NOT LIKE', '%/docs/getting-started/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    const functionList = allFunctions.map(fn => ({
      name: fn.title,
      category: getCategoryLabel(fn.path),
      description: fn.description || '',
      url: `${siteUrl}${fn.path}`
    }))

    return {
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: `User use case: ${usecase}

Here are all available functions in @movk/core (${functionList.length} total):

${JSON.stringify(functionList, null, 2)}

Based on the user's use case, recommend the most suitable function(s). If several functions can be combined, explain how to combine them. If there is no exact match, recommend the closest alternative.`
        }
      }]
    }
  }
})
