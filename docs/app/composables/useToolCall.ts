export function useToolCall() {
  const tools: Record<string, string | ((args: any) => string)> = {
    'list-pages': '列出所有文档页面',
    'get-page': (args: any) => `检索 ${args?.path || '页面'}`,
    'list-functions': '列出所有函数',
    'get-function': (args: any) => `检索 ${args?.functionName || '函数'}`,
    'search-functions': (args: any) => `搜索函数，关键词：${args?.keyword || ''}，分类：${args?.category || '无'}`,
  }

  return {
    tools
  }
}
