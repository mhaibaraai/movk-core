import { generateText, stepCountIs, tool } from 'ai'
import { z } from 'zod/v4'

const SUB_AGENT_SYSTEM_PROMPT = `你是 @movk/core 函数检索代理。你的工作是从函数库中查找并检索相关信息。

**可用工具：**
- list-pages：列出所有文档页面
- get-page：阅读相关页面
- list_functions：列出所有可用函数及其分类
- get_function：获取特定函数的详细文档和使用示例
- search_functions：按类别或关键词搜索函数

**你的任务：**
1. 根据用户问题选择合适的工具
2. 如果询问特定函数（如 "chunk"、"fromList"），直接使用 get_function
3. 如果询问某类功能（如 "数组工具"、"树操作"），使用 search_functions
4. 如果需要浏览所有函数，使用 list_functions
5. 可以调用多次工具来收集完整信息

**关键规则：**
- 优先使用树形结构操作（fromList、toList、filter、find）相关的函数
- 返回原始文档内容，包括代码示例、类型定义和使用说明
- 如果找不到信息，明确说明

**输出格式：**
返回找到的函数文档内容，包括：
- 函数名称和描述
- 参数说明和类型定义
- 完整的代码示例（含导入语句）
- 使用场景和最佳实践`

/**
 * 创建函数文档检索工具（双代理架构）
 * @param mcpTools - MCP 工具集合
 * @param model - AI 模型实例
 * @returns 函数检索工具
 */
export function createFunctionAgentTool(mcpTools: Record<string, any>, model: any) {
  return tool({
    description: '从 @movk/core 函数库中搜索并检索函数信息。使用此工具回答有关函数的任何问题。将用户的问题作为查询参数传递。',
    inputSchema: z.object({
      query: z.string().describe('要在函数库中搜索的问题')
    }),
    execute: async ({ query }, executionOptions) => {
      const writer = (executionOptions as any)?.experimental_context?.writer

      const result = await generateText({
        model,
        tools: mcpTools,
        system: SUB_AGENT_SYSTEM_PROMPT,
        stopWhen: stepCountIs(5),
        onStepFinish: ({ toolCalls }) => {
          if (toolCalls && toolCalls.length > 0 && toolCalls[0]) {
            writer?.write({
              id: toolCalls[0].toolCallId,
              type: 'data-tool-calls',
              data: {
                tools: toolCalls.map(toolCall => ({
                  toolName: toolCall.toolName,
                  toolCallId: toolCall.toolCallId,
                  input: toolCall.input
                }))
              }
            })
          }
        },
        prompt: query
      })

      return result.text
    }
  })
}
