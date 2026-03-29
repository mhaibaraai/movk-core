<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { useFilter } from '@nuxt/ui/composables'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const route = useRoute()
const { scoreItem } = useFilter()
const { navigationByCategory } = useNavigation(navigation!)

const input = useTemplateRef('input')
const searchTerm = ref('')

const isSearchActive = computed(() => [
  '/docs/validators',
  '/docs/utilities',
  '/docs/transformers',
  '/docs/helpers',
].some(path => route.path.startsWith(path)))
const navigationKey = computed(() => `${route.path}-${searchTerm.value ? 'filtered' : 'unfiltered'}`)

const filteredNavigation = computed(() => {
  if (!searchTerm.value) {
    return navigationByCategory.value
  }

  return navigationByCategory.value.map(item => ({
    ...item,
    children: item.children?.filter(child => scoreItem(child, searchTerm.value, ['title', 'description']) !== null)
  })).filter(item => item.children && item.children.length > 0)
})

watch(() => route.path, () => {
  if (!isSearchActive.value) {
    searchTerm.value = ''
  }
})

defineShortcuts({
  '/': {
    usingInput: false,
    handler: () => {
      input.value?.inputRef?.focus()
    }
  }
})
</script>

<template>
  <UMain class="relative">
    <UContainer>
      <UPage>
        <template #left>
          <UPageAside>
            <template v-if="isSearchActive" #top>
              <UInput ref="input" v-model="searchTerm" variant="soft" placeholder="Filter..." class="group">
                <template #trailing>
                  <UKbd value="/" variant="subtle" class="ring-muted bg-transparent text-muted" />
                </template>
              </UInput>
            </template>

            <UContentNavigation :key="navigationKey" highlight :navigation="filteredNavigation" />
          </UPageAside>
        </template>

        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>
