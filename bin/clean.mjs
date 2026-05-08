#!/usr/bin/env node
import { readdir, rm } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import process from 'node:process'

const DEFAULT_TARGETS = ['node_modules', '.nuxt', '.data', '.output', '.cache', 'dist', 'dist.zip']
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

async function clean() {
  const start = Date.now()
  const args = process.argv.slice(2)
    .filter(t => t && !RE_PATH_SEP.test(t) && t !== '.' && t !== '..')
  const targets = new Set(args.length ? args : DEFAULT_TARGETS)
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
