#!/usr/bin/env node
import { rm } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import process from 'node:process'
import fg from 'fast-glob'

const DEFAULT_TARGETS = [
  'node_modules',
  '.nuxt',
  '.data',
  '.output',
  '.cache',
  'dist',
  'dist.zip'
]
const BATCH_SIZE = 10

async function removePath(path) {
  try {
    await rm(path, { recursive: true, force: true, maxRetries: 3 })
    return { path, success: true }
  }
  catch (e) {
    if (e.code === 'ENOENT')
      return { path, success: true }
    return { path, success: false, error: e.message }
  }
}

async function processBatch(paths) {
  const results = []
  for (let i = 0; i < paths.length; i += BATCH_SIZE) {
    const batch = paths.slice(i, i + BATCH_SIZE)
    results.push(...await Promise.all(batch.map(removePath)))
  }
  return results
}

async function clean() {
  const start = Date.now()
  const args = process.argv.slice(2)
  const targets = args.length > 0 ? args : DEFAULT_TARGETS
  const root = resolve(process.cwd())

  let paths
  try {
    paths = await fg(targets.map(t => `**/${t}`), {
      cwd: root,
      onlyFiles: false,
      dot: true,
      absolute: true,
      ignore: ['**/node_modules/**/node_modules/**'],
      suppressErrors: true
    })
  }
  catch (e) {
    console.error('搜索失败:', e.message)
    process.exit(1)
  }

  if (!paths.length) {
    console.log('未找到需要清理的目标')
    return
  }

  paths = [...new Set(paths)].sort((a, b) => b.length - a.length)

  const results = await processBatch(paths)
  const removed = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success)
  const duration = ((Date.now() - start) / 1000).toFixed(2)

  console.log(`已清理 ${removed}/${results.length} 项，耗时 ${duration}s`)

  if (failed.length) {
    console.warn(`\n${failed.length} 项清理失败:`)
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
