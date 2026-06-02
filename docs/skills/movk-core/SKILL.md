---
name: movk-core
description: Use @movk/core, a tree-shakable TypeScript utility library — type guards (validators), array/async/css/url utilities, string/object/tree/markdown transformers, object/path/file helpers, and Vue composables. Use when picking a utility, converting flat data to a tree, transforming naming cases, parsing or building URLs, deep cloning or merging objects, or calling @movk/core composables.
---

# movk-core

`@movk/core` is a tree-shakable TypeScript utility library. The entry `src/index.ts` re-exports every module: **validators** (type guards), **utilities** (array / async / css / url), **transformers** (string / object / tree / markdown), **helpers** (object / path / file), and Vue **composables**. Prefer an existing function over writing new code.

## MCP Server

The `@movk/core` MCP server serves live function docs, source, and real examples. If not already configured, add it:

```bash
claude mcp add --transport http movk-core https://core.mhaibaraai.cn/mcp
```

Tools:
- `list-functions` — list every function grouped by category and subcategory (no params).
- `get-function` — full docs and examples for one function by name (camelCase or kebab-case).
- `search-functions` — search by `category`, `subcategory`, or `keyword`.

Prompts:
- `find-function-for-usecase` — guided selection of the best function for a use case.

Resources:
- `resource://movk-core/all-functions` — the full function index.
- `resource://movk-core/tree-operations` — the tree operations reference (core feature).

Use the MCP to confirm **what a function accepts**. This skill teaches you **which function to reach for** and **how to use it correctly**.

## Core rules (always apply)

1. **Import on demand** — the build is tree-shakable, so import only what you use: `import { chunk, Tree } from '@movk/core'`. Never deep-import internal paths.
2. **Treat utilities as pure** — validators, transformers, and utilities are side-effect free and never mutate their inputs; use the returned value.
3. **Do not invent APIs** — function names and signatures follow the actual exports in `src/`; confirm via the MCP or `src/<module>/<fnName>.ts` when unsure.
4. **Tree operations take a `config`** — every `Tree.*` static method accepts `{ id, pid, children }` field names (customizable), e.g. `Tree.fromList(list, { id: 'id', pid: 'parentId', children: 'children' })`.
5. **Keep three places in sync** — when adding a capability, update `src/<module>/<fnName>.ts` (+ its re-export), `tests/<module>/<kebab-name>.test.ts` (mirrored, kebab-case), and `docs/content/docs/<n.module>/[subcategory/]<kebab-name>.md`.

## How to use this skill

Match the task to a module, then pick the function. Use the MCP `get-function` for the exact signature before writing code.

### Module map

| Module | Directory | Representative functions / types |
|------|------|------|
| composables | `src/composables` | `useAppStorage`, `useCopyCode`, `useInfiniteScrollBinding`, `useOverflowDetection` |
| validators | `src/validators` | `isArray`, `isObject`, `isPlainObject`, `isString`, `isNumber`, `isFunction`, `isEmpty`, `isValidContainer` |
| utilities/array | `src/utilities/array` | `chunk`, `flatten`, `unique` |
| utilities/async | `src/utilities/async` | `debounce`, `throttle`, `sleep`, `sleepWithCancel` |
| utilities/css | `src/utilities/css` | `lengthToPx` |
| utilities/url | `src/utilities/url` | `parseUrl`, `buildUrl`, `joinUrl`, `normalizeUrl`, `parseQuery`, `stringifyQuery`, `getQueryParam(s)`, `set/append/removeQueryParam`, `getDomain`, `getRootDomain`, `toAbsoluteUrl`, `getRelativePath` |
| transformers/string | `src/transformers/string` | `camelCase`, `pascalCase`, `kebabCase`, `snakeCase`, `startCase`, `capitalize`, `upper/lowerCase`, `upper/lowerFirst`, `words` |
| transformers/object | `src/transformers/object` | `convertToKebabCase` |
| transformers/tree | `src/transformers/tree` | `Tree.fromList`, `Tree.toList`, `Tree.find/findAll/findById`, `Tree.filter`, `Tree.transform`, `Tree.forEach`, `Tree.insertBefore/After`, `Tree.remove`, `Tree.getStats`, `Tree.validate` |
| transformers/markdown | `src/transformers/markdown` | `stringifyMinimark` (types `MinimarkNode`, `MinimarkDocument`) |
| helpers/file | `src/helpers/file` | `formatFileSize`, `extractFilename`, `triggerDownload`, `convertSvgToPng`, `replaceCurrentColor` |
| helpers/object | `src/helpers/object` | `deepClone`, `deepMerge`/`createDeepMerge`, `pick`, `omit`, `omitUndefined`, `separate`, `separateMany`, `equalsBy`/`createEqualsBy` |
| helpers/path | `src/helpers/path` | `toPath`, `getPath`, `setPath`, `joinPath` |
| helpers (root) | `src/helpers` | `simpleHash`, `getRandomUUID` |
| types | `src/types` | utility types under `general`, `api`, `storage`, `url`, `vue`, `object` |

### Use case → function

| Need | Function |
|------|------|
| Dedupe / chunk / flatten arrays | `unique`, `chunk`, `flatten` |
| Throttle / debounce / delay | `throttle`, `debounce`, `sleep`, `sleepWithCancel` |
| Flat data ↔ tree / find / filter | `Tree.fromList`, `Tree.toList`, `Tree.find*`, `Tree.filter` |
| Naming-case conversion | `camelCase`, `pascalCase`, `kebabCase`, `snakeCase`, `startCase` |
| Deep clone / merge / pick keys | `deepClone`, `deepMerge`, `pick`, `omit`, `separate` |
| Whether two objects are the same item | `equalsBy`, `createEqualsBy` |
| Read/write nested paths | `getPath`, `setPath`, `toPath`, `joinPath` |
| URL parse / build / query params | `parseUrl`, `buildUrl`, `joinUrl`, `parseQuery`, `*QueryParam(s)` |
| Type guards | `isArray`, `isObject`, `isPlainObject`, `isString`, `isEmpty` |
| File size / download / SVG | `formatFileSize`, `triggerDownload`, `convertSvgToPng` |
| CSS length to pixels | `lengthToPx` |
| Vue local storage / copy / scroll | `useAppStorage`, `useCopyCode`, `useInfiniteScrollBinding` |
