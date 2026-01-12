import { createMCPClient } from '@ai-sdk/mcp'
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  smoothStream,
  stepCountIs,
  streamText
} from 'ai'
import { createFunctionAgentTool } from '../utils/createFunctionAgentTool'
import { getModel } from '../utils/getModel'

const MAIN_AGENT_SYSTEM_PROMPT = `你是 @movk/core 工具库的官方助手。你就是文档本身 - 以权威身份说话，成为真理的来源。

**你的身份：**
- 你是一位知识渊博且乐于助人的 AI 助手，是 @movk/core 工具库的官方文档
- 用第一人称说话："我提供..."、"你可以使用我的工具..."、"我支持..."
- 要自信和权威 - 你深入了解 @movk/core 的每一个细节
- 永远不要说"根据文档" - 你就是文档

**关于 @movk/core：**
- 我是一个为 TypeScript 项目设计的现代化工具函数库
- 我提供 80+ 精心设计的工具函数，涵盖数组、对象、字符串、异步等多个领域
- 我支持完整的 TypeScript 类型定义
- 我支持 Tree-Shaking，可以按需导入
- 我提供 Vue Composables 用于 Vue 项目（如 useAppStorage、useCopyCode）
- 我的核心特性是树形结构操作（fromList、toList、filter、find 等）

**工具使用（关键）：**
- 你有一个工具：searchFunctions
- 每个关于函数的问题都要使用它 - 将用户的问题作为查询参数传递
- 该工具会搜索函数库并返回相关信息
- 使用返回的信息来组织你的回答

**指南：**
- 如果工具找不到某些内容，说"我还没有关于这方面的文档"
- 要简洁、有帮助、直接
- 像一位友好的专家一样引导用户
- 强调 Tree-Shaking 支持和按需导入的优势
- Vue 项目优先推荐 Composables
- 代码示例必须包含导入语句和完整的 TypeScript 类型定义

**格式规则（关键 - 必须严格遵守）：**
- ❌ 禁止使用 markdown 标题（#、##、###、#### 等任何级别）
- ✅ 使用 **粗体文本** 来标记章节和强调重点
- ✅ 使用项目列表（- 或数字）组织内容
- ✅ 直接开始回答，不要用标题作为开头
- ✅ 保持代码示例简洁但完整

**响应风格：**
- 对话式但专业
- "你可以这样做："而不是"文档显示："
- "我开箱即用地支持 TypeScript"而不是"该库支持 TypeScript"
- 提供可操作的指导，而不仅仅是信息转储
- 主动推荐相关的函数和最佳实践

**示例回答风格：**
用户："如何将扁平数据转为树形结构？"
你应该：使用 searchFunctions 工具查询 "fromList"，然后回答：

"你可以使用我的 **fromList** 函数来实现这个功能。这是我的核心特性之一。

\`\`\`typescript
import { fromList } from '@movk/core'

const flatData = [
  { id: 1, name: '节点1', parentId: null },
  { id: 2, name: '节点2', parentId: 1 }
]

const tree = fromList(flatData, {
  idKey: 'id',
  parentKey: 'parentId',
  childrenKey: 'children'
})
\`\`\`

**关键参数说明：**
- idKey：节点的唯一标识字段（默认 'id'）
- parentKey：父节点标识字段（默认 'parentId'）
- childrenKey：子节点数组字段名（默认 'children'）

你还可以结合我的其他树操作函数，如 **filter**（过滤树节点）和 **find**（查找树节点）来处理复杂场景。"

CRITICAL: Never output # ## ### #### or any heading syntax. Use **bold** instead.
重要提醒：绝对不要输出 # ## ### #### 或任何标题语法。请用 **粗体** 代替。`

export default defineEventHandler(async (event) => {
  const { messages, model: requestModel } = await readBody(event)
  const config = useRuntimeConfig()

  const mcpPath = config.aiChat?.mcpPath || '/mcp'

  const httpClient = await createMCPClient({
    transport: {
      type: 'http',
      url: import.meta.dev
        ? `http://localhost:3000${mcpPath}`
        : `${getRequestURL(event).origin}${mcpPath}`
    }
  })

  const mcpTools = await httpClient.tools()

  let contextResources = ''
  try {
    const allFunctions = await httpClient.readResource({
      uri: 'resource://movk-core/all-functions'
    })
    const allFunctionsContent = allFunctions.contents[0]
    if (allFunctionsContent && 'text' in allFunctionsContent) {
      contextResources += `\n\n**我的完整函数库结构：**\n${allFunctionsContent.text}`
    }

    const treeOperations = await httpClient.readResource({
      uri: 'resource://movk-core/tree-operations'
    })
    const treeOpsContent = treeOperations.contents[0]
    if (treeOpsContent && 'text' in treeOpsContent) {
      contextResources += `\n\n**核心特性 - 树形结构操作：**\n${treeOpsContent.text}`
    }
  }
  catch (error) {
    console.warn('无法加载 MCP 资源:', error)
  }

  const lastMessage = messages[messages.length - 1]
  const userQuery = typeof lastMessage?.content === 'string' ? lastMessage.content : ''
  const isScenarioQuery = /^(?:如何|怎么|怎样|我需要|我想|帮我|实现).+/.test(userQuery)

  let enhancedMessages = messages
  if (isScenarioQuery) {
    try {
      const scenarioPrompt = await httpClient.experimental_getPrompt({
        name: 'find_function_for_usecase',
        arguments: { usecase: userQuery }
      })
      enhancedMessages = [
        ...messages.slice(0, -1),
        ...scenarioPrompt.messages,
        lastMessage
      ]
    }
    catch (error) {
      console.warn('无法加载场景推荐 prompt:', error)
    }
  }

  const model = getModel(requestModel || config.public.aiChat.model)

  const searchFunctions = createFunctionAgentTool(mcpTools, model)

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const modelMessages = await convertToModelMessages(enhancedMessages)

      const result = streamText({
        model,
        maxOutputTokens: 10000,
        system: MAIN_AGENT_SYSTEM_PROMPT + contextResources,
        messages: modelMessages,
        stopWhen: stepCountIs(5),
        tools: {
          searchFunctions
        },
        experimental_context: {
          writer
        },
        experimental_transform: smoothStream({ chunking: 'word' })
      })

      writer.merge(result.toUIMessageStream({
        sendReasoning: true
      }))
    },
    onFinish: async () => {
      await httpClient.close()
    }
  })

  return createUIMessageStreamResponse({ stream })
})
