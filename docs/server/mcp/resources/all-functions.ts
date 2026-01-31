import { queryCollection } from '@nuxt/content/server'

const DOCS_BASE_URL = 'https://core.mhaibaraai.cn'

export default defineMcpResource({
  uri: 'resource://movk-core/all-functions',
  description: '所有可用函数的完整列表及其元数据',
  cache: '1h',
  async handler(uri: URL) {
    const event = useEvent()

    const functions = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/%')
      .where('path', 'NOT LIKE', '%/docs/getting-started/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    const byModule: Record<string, any> = {}

    for (const fn of functions) {
      const item = {
        name: fn.title,
        description: fn.description,
        path: fn.path,
        url: `${DOCS_BASE_URL}${fn.path}`
      }

      // 从路径提取分类层级: /docs/utilities/array/chunk -> ['utilities', 'array']
      const pathParts = fn.path
        .replace('/docs/', '')
        .split('/')
        .filter(Boolean)
        .slice(0, -1) // 去掉最后的文件名部分

      if (pathParts.length === 0)
        continue

      // 递归创建嵌套结构
      let current = byModule
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i]
        if (!part)
          continue

        const isLastLevel = i === pathParts.length - 1

        if (!current[part]) {
          current[part] = isLastLevel ? [] : {}
        }

        if (isLastLevel) {
          // 最后一级,添加到数组
          if (Array.isArray(current[part])) {
            current[part].push(item)
          }
        }
        else {
          // 继续深入下一层
          current = current[part]
        }
      }
    }

    return {
      contents: [{
        uri: uri.toString(),
        mimeType: 'application/json',
        text: JSON.stringify(byModule, null, 2),
      }]
    }
  }
})
