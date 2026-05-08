#!/usr/bin/env node
import { readdir, rm } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import process from 'node:process'

const DEFAULT_TARGETS = ['node_modules', '.nuxt', '.data', '.output', '.cache', 'dist', 'dist.zip', 'auto-imports.d.ts', 'components.d.ts']
const SKIP_DIRS = new Set(['.git'])
const RE_PATH_SEP = /[/\\]/

async function findTargets(dir, targets, out = []) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  }
  catch { return out }

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name) || entry.isSymbolicLink())
      continue

    const full = join(dir, entry.name)
    if (targets.has(entry.name)) {
      out.push(full)
      continue
    }
    if (entry.isDirectory())
      await findTargets(full, targets, out)
  }
  return out
}

function isValidName(name) {
  return name && !RE_PATH_SEP.test(name) && name !== '.' && name !== '..'
}

// 解析参数：`+name` 在 base 上追加，普通 `name` 替换 base
// base = 存在普通参数时为它们，否则为 DEFAULT_TARGETS
function resolveTargets(rawArgs) {
  const additions = []
  const replacements = []
  for (const raw of rawArgs) {
    const isAddition = raw.startsWith('+')
    const name = isAddition ? raw.slice(1) : raw
    if (!isValidName(name))
      continue
    ;(isAddition ? additions : replacements).push(name)
  }
  const base = replacements.length ? replacements : DEFAULT_TARGETS
  return new Set([...base, ...additions])
}

async function clean() {
  const start = Date.now()
  const targets = resolveTargets(process.argv.slice(2))
  const root = resolve(process.cwd())

  const paths = await findTargets(root, targets)
  if (!paths.length) {
    console.log('无需清理')
    return
  }

  paths.forEach(p => console.log(`  ${relative(root, p)}`))

  const failed = []
  await Promise.all(paths.map(async (p) => {
    try { await rm(p, { recursive: true, force: true, maxRetries: 3 }) }
    catch (e) { if (e.code !== 'ENOENT') failed.push({ path: p, error: e.message }) }
  }))

  const ok = paths.length - failed.length
  const duration = ((Date.now() - start) / 1000).toFixed(2)
  console.log(`\n清理完成 ${ok}/${paths.length}（${duration}s）`)

  if (failed.length) {
    failed.forEach(f => console.error(`  ${relative(root, f.path)}：${f.error}`))
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  console.log('\n清理中断')
  process.exit(130)
})

clean().catch((e) => {
  console.error(`清理失败：${e.message}`)
  process.exit(1)
})
