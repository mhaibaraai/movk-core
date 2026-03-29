<script lang="ts" setup>
import type { TreeNode } from '@movk/core'
import type { TabsItem } from '@nuxt/ui'
import { debounce, deepMerge, omit, pick, throttle, Tree } from '@movk/core'

const items = [{
  label: '树形结构',
  icon: 'i-lucide:list-tree',
  slot: 'tree',
}, {
  label: '对象操作',
  icon: 'i-lucide:braces',
  slot: 'object',
}, {
  label: '异步控制',
  icon: 'i-lucide:clock',
  slot: 'async',
}] satisfies TabsItem[]

const ORG_CONFIG = { id: 'id', pid: 'parentId', children: 'children' } as const

const orgFlatList = [
  { id: '1', name: '技术部', parentId: null },
  { id: '2', name: '前端组', parentId: '1' },
  { id: '3', name: '后端组', parentId: '1' },
  { id: '4', name: 'UI 组', parentId: '2' },
  { id: '5', name: '测试组', parentId: '2' },
  { id: '6', name: '运维组', parentId: '3' },
  { id: '7', name: '安全组', parentId: '3' },
]

const treeKeyword = ref('')
const treeResult = ref<TreeNode[]>([])
const treeMode = ref<'build' | 'filter' | null>(null)

interface FlatNode { node: TreeNode, depth: number }

function flattenTree(nodes: TreeNode[], depth = 0): FlatNode[] {
  const result: FlatNode[] = []
  for (const node of nodes) {
    result.push({ node, depth })
    const children = node.children as TreeNode[] | undefined
    if (children?.length) {
      result.push(...flattenTree(children, depth + 1))
    }
  }
  return result
}

const flatTree = computed(() => flattenTree(treeResult.value))

function buildTree() {
  treeMode.value = 'build'
  treeKeyword.value = ''
  treeResult.value = Tree.fromList(orgFlatList, ORG_CONFIG)
}

function filterTree() {
  const keyword = treeKeyword.value.trim()
  if (!keyword) {
    buildTree()
    return
  }
  treeMode.value = 'filter'
  const full = Tree.fromList(orgFlatList, ORG_CONFIG)
  treeResult.value = Tree.filter(full, ({ node }) =>
    (node as { name: string }).name.includes(keyword),)
}

const sourceObj = {
  name: 'Alice',
  email: 'alice@example.com',
  password: 's3cr3t',
  role: 'admin',
}

const defaultConfig = { theme: 'light', tags: ['ts'], pagination: { page: 1, size: 10 } }
const userConfig = { theme: 'dark', tags: ['vue', 'ts'], pagination: { size: 20 } }

type ObjOp = 'pick' | 'omit' | null
const objOp = ref<ObjOp>(null)
const objResult = ref<Record<string, unknown> | null>(null)

function applyPick() {
  objOp.value = 'pick'
  objResult.value = pick(sourceObj, ['name', 'email'])
}

function applyOmit() {
  objOp.value = 'omit'
  objResult.value = omit(sourceObj, ['password'])
}

function resetObj() {
  objOp.value = null
  objResult.value = null
}

type ArrayStrategy = 'concat' | 'unique' | 'replace'
const mergeStrategy = ref<ArrayStrategy>('concat')

const objSubItems = [{
  label: '属性选择',
  slot: 'pick-omit',
}, {
  label: '深度合并',
  slot: 'deep-merge',
}] satisfies TabsItem[]

const mergeResult = computed(() =>
  deepMerge([defaultConfig, userConfig], { arrayStrategy: mergeStrategy.value }),
)

const asyncInput = ref('')
const totalTriggerCount = ref(0)

const debounceExecCount = ref(0)
const debounceLastTime = ref('')
const debouncedHandler = debounce(() => {
  debounceExecCount.value++
  debounceLastTime.value = new Date().toLocaleTimeString()
}, 500)

const throttleExecCount = ref(0)
const throttleLastTime = ref('')
const throttledHandler = throttle(() => {
  throttleExecCount.value++
  throttleLastTime.value = new Date().toLocaleTimeString()
}, 200)

function onAsyncInput() {
  totalTriggerCount.value++
  debouncedHandler()
  throttledHandler()
}

function resetAsync() {
  asyncInput.value = ''
  totalTriggerCount.value = 0
  debounceExecCount.value = 0
  debounceLastTime.value = ''
  throttleExecCount.value = 0
  throttleLastTime.value = ''
}

const { width } = useWindowSize()
const isNarrow = computed(() => width.value < 640)

onMounted(() => buildTree())
</script>

<template>
  <UCard class="w-full max-w-2xl mx-auto shadow-lg ring-1 ring-gray-200 dark:ring-gray-800">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          交互式演示
        </h3>
        <UBadge color="primary" variant="subtle" size="xs">
          Live Demo
        </UBadge>
      </div>
    </template>

    <UTabs :items="items" class="w-full">
      <template #tree>
        <div class="p-3 space-y-3 h-64 overflow-y-auto">
          <div class="flex gap-2" :class="[isNarrow ? 'flex-col' : 'items-center']">
            <UInput
              v-model="treeKeyword"
              icon="i-lucide:search"
              placeholder="输入关键词过滤..."
              class="flex-1"
              @keyup.enter="filterTree"
            />
            <div class="flex gap-2">
              <UButton color="neutral" variant="solid" size="sm" icon="i-lucide:list-tree" @click="buildTree">
                构建树
              </UButton>
              <UButton
                color="primary"
                variant="soft"
                size="sm"
                icon="i-lucide:filter"
                :disabled="!treeKeyword.trim()"
                @click="filterTree"
              >
                过滤
              </UButton>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <div class="text-xs text-gray-400 mb-1">
                扁平数据
              </div>
              <div class="overflow-auto max-h-32 space-y-0.5">
                <div v-for="item in orgFlatList" :key="item.id" class="font-mono text-xs text-gray-500 dark:text-gray-400">
                  { "{{ item.id }}", "{{ item.name }}" }
                </div>
              </div>
            </div>

            <div class="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
              <div class="flex items-center gap-1.5 mb-1">
                <span class="text-xs text-gray-400">树形结构</span>
                <UBadge v-if="treeMode === 'filter'" color="primary" variant="subtle" size="xs">
                  已过滤
                </UBadge>
              </div>
              <div v-if="flatTree.length" class="space-y-0.5 overflow-auto max-h-32">
                <div
                  v-for="(item, i) in flatTree"
                  :key="i"
                  class="flex items-center gap-1 font-mono text-xs"
                  :style="{ paddingLeft: `${item.depth * 12}px` }"
                >
                  <UIcon name="i-lucide:chevron-right" class="size-3 text-gray-400 shrink-0" />
                  <span :class="treeMode === 'filter' && treeKeyword && (item.node as { name: string }).name.includes(treeKeyword) ? 'text-primary-500 font-semibold' : 'text-gray-700 dark:text-gray-300'">
                    {{ (item.node as { name: string }).name }}
                  </span>
                </div>
              </div>
              <div v-else class="text-xs text-gray-400 italic">
                无匹配节点
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #object>
        <UTabs :items="objSubItems" variant="link" class="h-64">
          <template #pick-omit>
            <div class="p-3 space-y-3">
              <div class="flex items-center gap-2 flex-wrap">
                <UButton
                  color="primary"
                  :variant="objOp === 'pick' ? 'solid' : 'soft'"
                  size="xs"
                  icon="i-lucide:check-square"
                  @click="applyPick"
                >
                  pick(['name','email'])
                </UButton>
                <UButton
                  color="neutral"
                  :variant="objOp === 'omit' ? 'solid' : 'outline'"
                  size="xs"
                  icon="i-lucide:square-minus"
                  @click="applyOmit"
                >
                  omit(['password'])
                </UButton>
                <UButton
                  v-if="objOp"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide:rotate-ccw"
                  @click="resetObj"
                />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div class="text-xs text-gray-400 mb-1">
                    源对象
                  </div>
                  <pre class="font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{{ JSON.stringify(sourceObj, null, 1) }}</pre>
                </div>
                <div class="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div class="text-xs text-gray-400 mb-1">
                    结果
                  </div>
                  <pre v-if="objResult" class="font-mono text-xs text-primary-500 whitespace-pre-wrap">{{ JSON.stringify(objResult, null, 1) }}</pre>
                  <p v-else class="text-xs text-gray-400 italic mt-1">
                    点击上方按钮查看结果...
                  </p>
                </div>
              </div>
            </div>
          </template>

          <template #deep-merge>
            <div class="p-3 space-y-3">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs text-gray-400">tags 合并策略：</span>
                <UButton
                  v-for="s in (['concat', 'unique', 'replace'] as ArrayStrategy[])"
                  :key="s"
                  size="xs"
                  :color="mergeStrategy === s ? 'primary' : 'neutral'"
                  :variant="mergeStrategy === s ? 'solid' : 'outline'"
                  @click="mergeStrategy = s"
                >
                  {{ s }}
                </UButton>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div class="text-xs text-gray-400 mb-1.5">
                    输入
                  </div>
                  <div class="font-mono text-xs space-y-1">
                    <div class="text-gray-500">
                      default: <span class="text-gray-600 dark:text-gray-400">{{ JSON.stringify(defaultConfig.tags) }}</span>
                    </div>
                    <div class="text-gray-500">
                      user: <span class="text-gray-600 dark:text-gray-400">{{ JSON.stringify(userConfig.tags) }}</span>
                    </div>
                  </div>
                </div>
                <div class="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div class="text-xs text-gray-400 mb-1">
                    tags 合并结果
                  </div>
                  <div class="font-mono text-xs text-primary-500">
                    {{ JSON.stringify(mergeResult.tags) }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </UTabs>
      </template>

      <template #async>
        <div class="p-3 space-y-3 h-64 overflow-y-auto">
          <UInput
            v-model="asyncInput"
            icon="i-lucide:zap"
            placeholder="快速连续输入，观察两侧执行次数差异..."
            @input="onAsyncInput"
          />

          <div class="grid grid-cols-2 gap-2">
            <div class="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">Debounce</span>
                <UBadge color="neutral" variant="subtle" size="xs">
                  500ms
                </UBadge>
              </div>
              <div class="flex items-end gap-3">
                <div class="text-center">
                  <div class="text-xs text-gray-400">
                    触发
                  </div>
                  <div class="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    {{ totalTriggerCount }}
                  </div>
                </div>
                <div class="text-gray-300 dark:text-gray-600 pb-0.5">
                  →
                </div>
                <div class="text-center">
                  <div class="text-xs text-primary-500">
                    执行
                  </div>
                  <div class="text-2xl font-bold text-primary-500">
                    {{ debounceExecCount }}
                  </div>
                </div>
              </div>
              <div class="text-xs text-gray-400 truncate">
                {{ debounceLastTime ? `最后: ${debounceLastTime}` : '&nbsp;' }}
              </div>
            </div>

            <div class="p-3 rounded-lg border border-primary-100 dark:border-primary-900/30 bg-primary-50 dark:bg-primary-900/10 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-primary-600 dark:text-primary-400">Throttle</span>
                <UBadge color="primary" variant="subtle" size="xs">
                  200ms
                </UBadge>
              </div>
              <div class="flex items-end gap-3">
                <div class="text-center">
                  <div class="text-xs text-gray-400">
                    触发
                  </div>
                  <div class="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    {{ totalTriggerCount }}
                  </div>
                </div>
                <div class="text-primary-300 dark:text-primary-700 pb-0.5">
                  →
                </div>
                <div class="text-center">
                  <div class="text-xs text-primary-500">
                    执行
                  </div>
                  <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {{ throttleExecCount }}
                  </div>
                </div>
              </div>
              <div class="text-xs text-primary-400 truncate">
                {{ throttleLastTime ? `最后: ${throttleLastTime}` : '&nbsp;' }}
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              icon="i-lucide:rotate-ccw"
              :disabled="totalTriggerCount === 0"
              @click="resetAsync"
            >
              重置
            </UButton>
          </div>
        </div>
      </template>
    </UTabs>
  </UCard>
</template>
