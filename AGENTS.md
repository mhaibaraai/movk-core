# AGENTS.md

This file provides guidance for AI coding agents working on this repository.

## 项目概述

`@movk/core` 是一个 TypeScript 工具函数库，支持 Tree-Shaking，使用 `unbuild` 构建为 ESM 模块。项目采用 pnpm monorepo，`docs/` 子包是基于 Nuxt 4 的文档站点（`movk-core-docs`）。

## 常用命令

```bash
# 库构建（输出到 dist/）
pnpm build

# 开发模式（stub 模式，跳过打包直接使用源码）
pnpm dev

# 运行所有测试
pnpm test

# 运行单个测试文件
pnpm test tests/validators/is-array.test.ts

# 运行测试并开启 UI
pnpm test --ui

# 类型检查（含 docs 子包）
pnpm typecheck

# Lint 检查 / 自动修复
pnpm lint
pnpm lint:fix

# 启动文档开发服务器
pnpm docs

# 构建文档
pnpm docs:build

# 清理构建产物
pnpm clean
```

## 架构概览

### 库主体（`src/`）

入口为 `src/index.ts`，全量重导出 `composables`、`validators`、`utilities`、`transformers`、`helpers`、`types` 六大顶层模块：

| 目录 | 职责 |
|------|------|
| `composables/` | Vue 组合式函数（`useAppStorage`、`useCopyCode`、`useInfiniteScrollBinding`、`useOverflowDetection`），依赖 `@vueuse/core` |
| `validators/` | 类型守卫函数（`isArray`、`isObject`、`isString` 等），无副作用纯函数 |
| `utilities/array` | 数组工具（`chunk`、`flatten`、`unique`） |
| `utilities/async` | 异步控制（`debounce`、`throttle`、`sleep`、`sleepWithCancel`、`onceAsync`） |
| `utilities/css` | CSS 工具（`lengthToPx`） |
| `utilities/function` | 函数组合（`pipe`） |
| `utilities/math` | 数值工具（`clamp`、`mapRange`） |
| `utilities/url` | URL 操作（`parseUrl`、`buildUrl`、查询参数处理等） |
| `transformers/string` | 字符串格式转换（`camelCase`、`kebabCase`、`snakeCase` 等） |
| `transformers/object` | 对象键转换（`convertToKebabCase`） |
| `transformers/tree` | 树形结构操作（`Tree` 静态类：`fromList`、`toList`、`find`、`filter`、`transform` 等） |
| `transformers/markdown` | Markdown 序列化（`stringifyMinimark`） |
| `helpers/object` | 对象辅助（`deepClone`、`deepMerge`、`pick`、`omit`、`separate`、`equalsBy`、`isDeepEqual`） |
| `helpers/path` | 路径访问（`toPath`、`getPath`、`setPath`、`joinPath`） |
| `helpers/file` | 文件处理（`formatFileSize`、`triggerDownload`、`convertSvgToPng` 等） |
| `helpers/`（根） | `simpleHash`、`getRandomUUID`、`createRegistry`（按 id 索引实例的注册表）、`defineGlobalSingleton`（跨副本全局单例） |
| `types/` | 共享类型定义（`general`、`api`、`storage`、`url`、`vue`、`object`） |

构建配置在 `build.config.ts`：单入口 `src/index`，启用 `declaration`（`.d.mts`），Rollup + esbuild minify。

### 测试（`tests/`）

测试目录结构与 `src/` 完全镜像，使用 Vitest（globals 模式，timeout 6s）。测试文件命名为 kebab-case（`is-array.test.ts`），对应源文件的 camelCase 命名（`isArray.ts`）。

### 文档站点（`docs/`）

独立 Nuxt 4 应用，继承自 `@movk/nuxt-docs` v3 layer。关键设计：

- **别名**：`docs/nuxt.config.ts` 中将 `@movk/core` 别名指向 `../src/index.ts`，开发时直接使用源码，无需构建
- **内容**：文档固定位于 `docs/content/docs/`（英文 `docs/content/en/docs/`），路由前缀固定为 `/docs`；目录镜像 `src/`（kebab-case 文件名）；frontmatter 正文用中文，附英文 `seo` 块。`content/index.md`、`content/releases.md` 保留在 `content/` 根目录。`docs/nuxt.config.ts` 的 `routeRules` 配置了目录到首篇的重定向，新增目录时同步补充
- **导航**：页头导航在 `docs/app/app.config.ts` 的 `header.nav` / `header.mobileNav` 中声明，文案按语言写成 `{ 'zh-CN': ..., en: ... }`
- **功能开关**：v3 的可选功能为 optional peer 依赖，启用而未安装时构建报错。本站启用 AI Chat 与国际化（`@nuxtjs/i18n`），已安装对应依赖；`movkNuxtDocs.componentDocs`、`mermaid`、`a11y` 保持默认关闭，开启前需先安装依赖。`i18n.locales` 不要声明 `file`
- **视觉**：使用 v3 默认主色、中性色、字体与代码高亮主题，不在站点内覆盖；中文字体通过 `app.head.link` 引入 Alibaba PuHuiTi 样式表
- **组件覆盖**：`HeaderLogo` 覆盖遵循 layer 的覆盖契约；`useToolCall` 覆盖的 `state` 参数类型为 `string`
- **MCP Server**：`docs/server/mcp/` 暴露 `list-functions`、`get-function`、`search-functions` 三个工具，`all-functions`、`tree-operations` 两个资源与 `find-function-for-usecase` 提示，供 AI 工具查询函数文档；服务实现以英文撰写
- **Agent Skills**：`docs/skills/movk-core/SKILL.md` 由 layer 约定式发布到 `/.well-known/skills/`，配套 `docs/skills/index.json` 清单
- **AI 集成文档**：位于 `docs/content/docs/1.getting-started/3.ai/`（MCP、LLMs.txt、Agent Skills）

### 环境变量（文档站）

| 变量 | 说明 |
|------|------|
| `NUXT_GITHUB_TOKEN` | 生产环境必需，获取 Releases 与提交历史 |
| `AI_API_KEY` | AI Chat 总开关，构建期存在时启用 AI Chat |
| `AI_BASE_URL` | OpenAI 兼容端点；留空走 AI Gateway |

### CI

`.github/workflows/ci.yml` 包含 `build`（lint、typecheck、单测、库构建、pkg-pr-new 预览包）与 `docs`（不注入 `AI_API_KEY` 构建文档站，并拦截预渲染 `[request error]` 死链）两个任务。

### 发布流程

通过 `release-it` + `@release-it/conventional-changelog` 管理版本，要求工作区干净；推送 `v*` tag 后 `release.yml` 校验 tag 与 `package.json` 版本一致，并以 npm Trusted Publishing 发布。`prepack` 钩子自动触发 `pnpm build`，确保发布前完成构建。`bin/clean.mjs` 提供清理脚本（同时可通过 `movk-clean` CLI 命令调用）。
