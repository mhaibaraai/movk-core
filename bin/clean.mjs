#!/usr/bin/env node
import { lstat, rm } from 'node:fs/promises'
import { basename, relative, resolve } from 'node:path'
import process from 'node:process'
import { glob } from 'tinyglobby'

const DEFAULT_TARGETS = [
  'node_modules',
  '.nuxt',
  '.data',
  '.output',
  '.cache',
  'dist',
  'dist.zip',
]
const RE_PATH_SEP = /[/\\]/
const RE_TRAILING_SLASH = /\/+$/

async function clean() {
  const start = Date.now()
  const args = process.argv.slice(2)
  const targets = (args.length > 0 ? args : DEFAULT_TARGETS)
    .filter(t => t && !RE_PATH_SEP.test(t) && t !== '.' && t !== '..')
  const root = resolve(process.cwd())
  const targetSet = new Set(targets)

  if (targets.length === 0) {
    console.log('没有有效的清理目标')
    return
  }

  const rawPaths = await glob(targets.map(t => `**/${t}`), {
    cwd: root,
    onlyFiles: false,
    dot: true,
    absolute: true,
    followSymbolicLinks: false,
    ignore: ['**/.git/**'],
  })

  const matched = Array.from(new Set(rawPaths), p => p.replace(RE_TRAILING_SLASH, ''))
    .filter(p => p !== root && p.startsWith(`${root}/`) && targetSet.has(basename(p)))
    .sort((a, b) => a.length - b.length)

  const deduped = []
  for (const p of matched) {
    if (!deduped.some(parent => p.startsWith(`${parent}/`)))
      deduped.push(p)
  }

  const paths = []
  for (const p of deduped) {
    try {
      if ((await lstat(p)).isSymbolicLink())
        continue
    }
    catch { continue }
    paths.push(p)
  }

  if (paths.length === 0) {
    console.log('未找到需要清理的目标')
    return
  }

  paths.forEach(p => console.log(`  ${relative(root, p)}`))

  const results = await Promise.all(paths.map(async (p) => {
    try {
      await rm(p, { recursive: true, force: true, maxRetries: 3 })
      return null
    }
    catch (e) {
      return e.code === 'ENOENT' ? null : { path: p, error: e.message }
    }
  }))

  const failed = results.filter(Boolean)
  const duration = ((Date.now() - start) / 1000).toFixed(2)
  console.log(`已清理 ${paths.length - failed.length}/${paths.length} 项，耗时 ${duration}s`)

  if (failed.length) {
    failed.forEach(f => console.warn(`  ${relative(root, f.path)}: ${f.error}`))
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  console.log('\n清理中断')
  process.exit(130)
})

clean().catch((e) => {
  console.error('清理失败:', e.message)
  process.exit(1)
})
