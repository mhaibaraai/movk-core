import type { ToolState } from '#ai-chat/types'

export function useToolCall(state: ToolState, toolName: string, input: Record<string, string | undefined>) {
  const searchVerb = state === 'output-available' ? '已检索' : '检索中'
  const readVerb = state === 'output-available' ? '已读取' : '读取中'

  const toolMessage: Record<string, string> = {
    'list-functions': `${searchVerb} 函数列表`,
    'get-function': `${readVerb} ${input.functionName || ''} 函数信息`,
    'search-functions': `${searchVerb} 函数，关键词：${input.keyword || '无'}，分类：${input.category || '无'}`,
  }

  const toolIcon: Record<string, string> = {
    'list-functions': 'i-lucide-package',
    'get-function': 'i-lucide-package-open',
    'search-functions': 'i-lucide-package-search',
  }

  return {
    toolMessage,
    toolIcon
  }
}
