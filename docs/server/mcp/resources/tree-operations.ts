import { queryCollection } from '@nuxt/content/server'

export default defineMcpResource({
  uri: 'resource://movk-core/tree-operations',
  description: 'Complete documentation for the tree-structure operations (a core @movk/core feature)',
  cache: '1h',
  async handler(uri: URL) {
    const event = useEvent()
    const siteUrl = getRequestURL(event).origin

    const treeFunctions = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/docs/transformers/tree/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    const data = {
      description: 'Tree-structure operations are one of the core features of @movk/core',
      features: [
        'Convert between flat lists and trees (fromList, toList)',
        'Find and filter nodes (find, filter, findAll)',
        'Transform nodes (transform, forEach)',
        'Modify nodes (insertBefore, insertAfter, remove)',
        'Traverse and summarize trees (getStats)',
        'Validate tree structure (validate)'
      ],
      keyFeatures: {
        customFields: 'Supports custom field names (idField, parentIdField, childrenField)',
        defaultFields: 'Default fields: id, parentId, children',
        typeSupport: 'Full TypeScript type definitions and generic support'
      },
      functions: treeFunctions.map(fn => ({
        name: fn.title,
        description: fn.description,
        path: fn.path,
        url: `${siteUrl}${fn.path}`
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
