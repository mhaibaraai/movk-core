import { queryCollection } from '@nuxt/content/server'

export default defineMcpResource({
  uri: 'resource://movk-core/all-functions',
  description: 'A complete list of all available functions with their metadata',
  cache: '1h',
  async handler(uri: URL) {
    const event = useEvent()
    const siteUrl = getRequestURL(event).origin

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
        url: `${siteUrl}${fn.path}`
      }

      // Extract the category hierarchy from the path: /docs/utilities/array/chunk -> ['utilities', 'array']
      const pathParts = fn.path
        .replace('/docs/', '')
        .split('/')
        .filter(Boolean)
        .slice(0, -1) // drop the trailing file name

      if (pathParts.length === 0)
        continue

      // Build the nested structure recursively
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
          // Leaf level: push into the array
          if (Array.isArray(current[part])) {
            current[part].push(item)
          }
        }
        else {
          // Descend into the next level
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
