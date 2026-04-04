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

入口为 `src/index.ts`，全量重导出以下 6 个模块：

| 目录 | 职责 |
|------|------|
| `composables/` | Vue 组合式函数（`useAppStorage`、`useCopyCode`），依赖 `@vueuse/core` |
| `validators/` | 类型守卫函数（`isArray`、`isObject`、`isString` 等），无副作用纯函数 |
| `utilities/array` | 数组工具（`chunk`、`unique` 等） |
| `utilities/async` | 异步控制（`debounce`、`throttle`、`sleep`） |
| `utilities/url` | URL 操作（`appendQueryParam` 等） |
| `transformers/string` | 字符串格式转换（`camelCase`、`kebabCase`、`snakeCase`） |
| `transformers/object` | 对象操作（`pick`、`omit`、`deepClone`、路径访问） |
| `transformers/tree` | 树形结构操作（`fromList`、`toList`、`find`、`filter`、`transform`） |
| `helpers/` | 辅助函数（`simpleHash`、`uuid`、文件处理、路径工具） |
| `types/` | 共享类型定义 |

构建配置在 `build.config.ts`：单入口 `src/index`，启用 `declaration`（`.d.mts`），Rollup + esbuild minify。

### 测试（`tests/`）

测试目录结构与 `src/` 完全镜像，使用 Vitest（globals 模式，timeout 6s）。测试文件命名为 kebab-case（`is-array.test.ts`），对应源文件的 camelCase 命名（`isArray.ts`）。

### 文档站点（`docs/`）

独立 Nuxt 4 应用，继承自 `@movk/nuxt-docs` layer。关键设计：

- **别名**：`docs/nuxt.config.ts` 中将 `@movk/core` 别名指向 `../src/index.ts`，开发时直接使用源码，无需构建
- **MCP Server**：`docs/server/mcp/` 暴露 `get-function`、`list-functions`、`search-functions` 三个 MCP 工具，供 AI 工具直接查询函数文档
- **内容**：文档以 Markdown 编写，通过 `@nuxt/content` 管理，路由规则配置了多层重定向

### 发布流程

通过 `release-it` + `@release-it/conventional-changelog` 管理版本。`prepack` 钩子自动触发 `pnpm build`，确保发布前完成构建。`bin/clean.mjs` 提供清理脚本（同时可通过 `movk-clean` CLI 命令调用）。
