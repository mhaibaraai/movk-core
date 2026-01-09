# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## 项目概述

`@movk/core` 是一个为 TypeScript 项目设计的现代化、支持 Tree-Shaking 的工具函数库,提供 80+ 实用工具函数,涵盖数组、对象、字符串、异步操作、URL 处理、树形结构等多个领域。

- **在线文档**: https://core.mhaibaraai.cn
- **包管理器**: pnpm (版本 10.26.2+)
- **构建工具**: Unbuild
- **测试框架**: Vitest
- **代码风格**: @antfu/eslint-config

## 核心命令

### 开发与构建
```bash
pnpm dev              # Stub 模式开发 (快速重载)
pnpm build            # 构建生产包 (输出到 dist/)
pnpm typecheck        # 类型检查 (包含文档项目)
pnpm clean            # 清理 dist 和 node_modules/.cache
```

### 质量控制

```bash
pnpm lint             # ESLint 检查
pnpm lint:fix         # 自动修复 ESLint 问题
pnpm test             # 运行所有测试 (watch 模式)
pnpm test run         # 单次运行测试
```

### 文档开发

```bash
pnpm docs             # 启动文档开发服务器
pnpm docs:build       # 构建文档站点
```

### 发布流程

```bash
pnpm release          # 自动化发布流程 (release-it)
                      # 发布前会自动执行: lint + typecheck + test
```

## 代码架构

项目采用**分层模块化架构**,所有导出通过 `src/index.ts` 统一管理:

### 1. Validators (类型验证层)

- **位置**: `src/validators/`
- **用途**: 提供运行时类型检查函数
- **示例**: `isObject()`, `isArray()`, `isString()`, `isEmpty()`

### 2. Utilities (基础工具层)

- **位置**: `src/utilities/`
- **子模块**:
  - `array/`: 数组操作 (chunk, unique, flatten)
  - `async/`: 异步控制 (throttle, debounce, sleep, retry)
  - `url/`: URL 解析与构建工具
- **特点**: 纯函数,无副作用

### 3. Transformers (数据转换层)

- **位置**: `src/transformers/`
- **子模块**:
  - `string/`: 字符串格式转换 (camelCase, kebabCase, snakeCase 等)
  - `object/`: 对象操作 (deepClone, pick, omit)
  - `tree/`: 树形结构操作 (核心模块,见下文)

### 4. Helpers (辅助函数层)

- **位置**: `src/helpers/`
- **子模块**:
  - `file/`: 文件处理 (formatFileSize, triggerDownload)
  - `object/`: 高级对象操作 (deepMerge, pathAccess)
  - `path/`: 路径处理工具
  - `uuid.ts`: UUID 生成
  - `simpleHash.ts`: 简单哈希函数

### 5. Composables (Vue 组合式函数层)

- **位置**: `src/composables/`
- **内容**:
  - `useAppStorage`: 应用级存储管理 (基于 localStorage)
  - `useCopyCode`: 剪贴板复制功能
- **依赖**: 需要 Vue 3.5.25+ 作为 peer dependency

### 6. Types (类型定义层)

- **位置**: `src/types/`
- **结构**: 按模块组织类型定义,支持高级类型推断

## 树形结构操作模块 (重要)

树形结构工具是本库的核心特性之一,位于 `src/transformers/tree/`:

```
tree/
├── index.ts          # 统一导出入口
├── types.ts          # TreeNode, TreeOptions 等核心类型
├── convert.ts        # fromList, toList (扁平与树形互转)
├── query.ts          # find, filter (节点查找与过滤)
├── transform.ts      # transform, map (节点转换)
├── mutate.ts         # insert, update, remove (节点修改)
├── traverse.ts       # preOrder, postOrder (树遍历)
├── validate.ts       # 树结构验证工具
└── helpers.ts        # 内部辅助函数
```

**关键概念**:
- 所有树操作支持自定义字段名 (`idField`, `parentIdField`, `childrenField`)
- 默认配置: `id` / `parentId` / `children`
- 操作分为**查询型**(不修改原树)和**修改型**(生成新树)

## 开发规范

### 新增工具函数

1. **位置选择**:
   - 类型检查 → `validators/`
   - 纯函数工具 → `utilities/`
   - 数据转换 → `transformers/`
   - 复杂辅助 → `helpers/`
   - Vue 相关 → `composables/`

2. **必须包含**:
   - 完整的 TypeScript 类型定义
   - JSDoc 注释 (包含 `@param`, `@returns`, `@example`)
   - 对应的测试文件在 `tests/` 下

3. **导出路径**:
   - 在子模块的 `index.ts` 中导出
   - 确保 `src/index.ts` 能递归导出

### 测试要求

- 测试文件命名: `tests/<模块>/<函数名>.test.ts`
- 使用 Vitest globals API (`describe`, `it`, `expect`)
- 测试超时: 6000ms (已配置)
- 运行单个测试: `pnpm test <文件名>`

### 类型定义原则

- 所有公共 API 必须有显式类型标注
- 优先使用泛型提供类型推断
- 复杂类型定义在 `src/types/` 中统一管理
- 避免使用 `any`,使用 `unknown` 或联合类型

## 构建与发布

### 构建配置 (build.config.ts)

- 入口: `src/index`
- 输出: `dist/index.mjs` + `dist/index.d.mts`
- 启用 minify 和 declaration

### 发布检查清单 (.release-it.json)

发布前自动执行:
1. `pnpm lint` - 代码风格检查
2. `pnpm typecheck` - 类型检查
3. `pnpm test run` - 完整测试套件

发布后自动:
- 生成 Conventional Changelog
- 创建 GitHub Release
- 更新 `CHANGELOG.md`

**注意**: `npm publish` 需手动执行 (已配置 `npm.publish: false`)

## 文档站点

- **框架**: Nuxt 3 + Nuxt Content
- **位置**: `docs/` 子目录
- **内容**: `docs/content/` (Markdown 文件)
- **部署**: https://core.mhaibaraai.cn
- **本地开发**: `cd docs && pnpm dev`

文档更新时:
- 在 `docs/content/` 对应目录修改 Markdown
- 确保代码示例与实际 API 一致
- 运行 `pnpm docs` 本地预览

## 常见问题

### 开发时类型未生效

运行 `pnpm dev` 进入 stub 模式,Unbuild 会生成临时类型定义。

### 测试超时

默认超时 6000ms,如需调整修改 `vitest.config.ts`。

### 发布失败

检查:
1. Git 工作区是否干净 (已配置允许 dirty)
2. 是否通过 lint + typecheck + test
3. GitHub Token 是否配置正确
