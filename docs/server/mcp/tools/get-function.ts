import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod'

const DOCS_BASE_URL = 'https://core.mhaibaraai.cn'

export default defineMcpTool({
  description: '获取特定函数的详细文档和使用示例',
  cache: '30m',
  inputSchema: {
    functionName: z.string().describe('函数名称,如 "chunk"、"fromList"、"isArray" 等')
  },
  async handler({ functionName }) {
    const event = useEvent()

    const kebabName = functionName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()

    const allDocs = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    const match = allDocs.find((doc) => {
      const pathParts = doc.path.split('/')
      const fileName = pathParts[pathParts.length - 1]
      return fileName === kebabName || doc.title?.toLowerCase() === functionName.toLowerCase()
    })

    if (!match) {
      const result = {
        error: `找不到函数 "${functionName}"`,
        availableFunctions: allDocs.map(d => ({
          path: d.path,
          title: d.title
        })).slice(0, 20)
      }

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify(result, null, 2)
        }],
        isError: true
      }
    }

    const content = await $fetch(`/raw${match.path}.md`, {
      baseURL: event.node.req.headers.origin || 'http://localhost:3000'
    })

    const result = {
      name: match.title,
      description: match.description,
      path: match.path,
      url: `${DOCS_BASE_URL}${match.path}`,
      documentation: content
    }

    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify(result, null, 2)
      }]
    }
  }
})
