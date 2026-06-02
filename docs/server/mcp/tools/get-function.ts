import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod'

const CAMEL_TO_KEBAB_RE = /([a-z])([A-Z])/g

export default defineMcpTool({
  description: 'Get the detailed documentation and usage examples for a specific function',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  cache: '30m',
  inputSchema: {
    functionName: z.string().describe('Function name, such as "chunk", "fromList", or "isArray"')
  },
  inputExamples: [
    { functionName: 'fromList' },
    { functionName: 'sleep' }
  ],
  async handler({ functionName }) {
    const event = useEvent()
    const siteUrl = getRequestURL(event).origin

    const kebabName = functionName
      .replace(CAMEL_TO_KEBAB_RE, '$1-$2')
      .toLowerCase()

    const allDocs = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    const match = allDocs.find((doc) => {
      const pathParts = doc.path.split('/')
      const fileName = pathParts.at(-1)
      return fileName === kebabName || doc.title?.toLowerCase() === functionName.toLowerCase()
    })

    if (!match) {
      throw createError({ statusCode: 404, statusMessage: `Function "${functionName}" not found` })
    }

    const documentation = await $fetch(`/raw${match.path}.md`)

    return {
      name: match.title,
      description: match.description,
      path: match.path,
      url: `${siteUrl}${match.path}`,
      documentation
    }
  }
})
