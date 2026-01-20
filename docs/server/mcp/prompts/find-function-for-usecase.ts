import { queryCollection } from '@nuxt/content/server'
import { z } from 'zod/v4'

const DOCS_BASE_URL = 'https://core.mhaibaraai.cn'

const CATEGORY_LABELS: Record<string, string> = {
  '/docs/validators/': '类型验证',
  '/docs/utilities/array/': '数组工具',
  '/docs/utilities/async/': '异步控制',
  '/docs/utilities/url/': 'URL 处理',
  '/docs/transformers/string/': '字符串转换',
  '/docs/transformers/object/': '对象转换',
  '/docs/transformers/tree/': '树形结构',
  '/docs/helpers/file/': '文件处理',
  '/docs/helpers/object/': '对象辅助',
  '/docs/helpers/path/': '路径处理',
  '/docs/composables/': 'Vue Composables',
  '/docs/types/': '类型定义'
}

function getCategoryLabel(path: string): string {
  const entry = Object.entries(CATEGORY_LABELS).find(([prefix]) => path.startsWith(prefix))
  return entry ? entry[1] : '其他'
}

export default defineMcpPrompt({
  description: '根据使用场景找到最适合的 @movk/core 函数',
  inputSchema: {
    usecase: z.string().describe('使用场景描述,例如 "数组去重"、"树形数据转扁平" 等')
  },
  async handler({ usecase }) {
    const event = useEvent()

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
      url: `${DOCS_BASE_URL}${fn.path}`
    }))

    return {
      messages: [{
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: `用户需求场景： ${usecase}

以下是 @movk/core 中所有可用的函数(共 ${functionList.length} 个)：

${JSON.stringify(functionList, null, 2)}

请根据用户的需求场景，推荐最适合的函数。如果有多个函数可以组合使用，请说明如何组合。如果没有完全匹配的函数，请推荐最接近的方案。`
        }
      }]
    }
  }
})
