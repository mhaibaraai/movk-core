export function useHeader() {
  const route = useRoute()

  const desktopLinks = computed(() => [{
    label: '文档',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/')
  }, {
    label: '版本发布',
    to: '/releases'
  }])

  const mobileLinks = computed(() => [{
    label: 'Get Started',
    icon: 'i-lucide-square-play',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started')
  }, {
    label: 'Composables',
    icon: 'i-lucide-square-function',
    to: '/docs/composables',
    active: route.path.startsWith('/docs/composables')
  }, {
    label: 'Utils',
    icon: 'i-lucide-square-code',
    to: '/docs/utils',
    active: route.path.startsWith('/docs/utils')
  }, {
    label: 'Types',
    icon: 'i-lucide-square-library',
    to: '/docs/types',
    active: route.path.startsWith('/docs/types')
  }, {
    label: '发布版本',
    icon: 'i-lucide-newspaper',
    to: '/releases'
  }, {
    label: 'GitHub',
    to: 'https://github.com/mhaibaraai/movk-core',
    icon: 'i-simple-icons-github',
    target: '_blank'
  }])

  return {
    desktopLinks,
    mobileLinks
  }
}
