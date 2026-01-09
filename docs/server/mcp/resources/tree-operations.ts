import { queryCollection } from '@nuxt/content/server'

const DOCS_BASE_URL = 'https://core.mhaibaraai.cn'

export default defineMcpResource({
  uri: 'resource://movk-core/tree-operations',
  description: '树形结构操作函数的完整文档（@movk/core 核心特性）',
  cache: '1h',
  async handler(uri: URL) {
    const event = useEvent()

    const treeFunctions = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/transformers/tree/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    const data = {
      description: '树形结构操作是 @movk/core 的核心特性之一',
      features: [
        '扁平与树形互转 (fromList, toList)',
        '节点查找与过滤 (find, filter, findAll)',
        '节点转换 (transform, forEach)',
        '节点修改 (insertBefore, insertAfter, remove)',
        '树遍历和统计 (getStats)',
        '树结构验证 (validate)'
      ],
      keyFeatures: {
        customFields: '支持自定义字段名 (idField, parentIdField, childrenField)',
        defaultFields: '默认字段: id, parentId, children',
        typeSupport: '完整的 TypeScript 类型定义和泛型支持'
      },
      functions: treeFunctions.map(fn => ({
        name: fn.title,
        description: fn.description,
        path: fn.path,
        url: `${DOCS_BASE_URL}${fn.path}`
      })),
      total: treeFunctions.length
    }

    return {
      contents: [{
        uri: uri.toString(),
        mimeType: 'application/json',
        text: JSON.stringify(data, null, 2),
      }]
    }
  }
})
