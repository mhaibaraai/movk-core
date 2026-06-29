export function useHeader() {
  const { t } = useI18n()
  const { localePath } = useMovkI18n()
  const route = useRoute()

  const isActive = (path: string) => route.path.startsWith(localePath(path))

  const desktopLinks = computed(() => [{
    label: t('nav.docs'),
    to: localePath('/docs/getting-started'),
    active: isActive('/docs')
  }, {
    label: t('nav.releases'),
    to: localePath('/releases')
  }])

  const docsNav = [
    { key: 'getStarted', icon: 'i-lucide-square-play', slug: 'getting-started' },
    { key: 'composables', icon: 'i-lucide-square-function', slug: 'composables' },
    { key: 'validators', icon: 'i-lucide-square-code', slug: 'validators' },
    { key: 'utilities', icon: 'i-lucide-wrench', slug: 'utilities' },
    { key: 'transformers', icon: 'i-lucide-wand-sparkles', slug: 'transformers' },
    { key: 'helpers', icon: 'i-lucide-life-buoy', slug: 'helpers' },
    { key: 'types', icon: 'i-lucide-square-library', slug: 'types' }
  ]

  const mobileLinks = computed(() => [
    ...docsNav.map(({ key, icon, slug }) => ({
      label: t(`nav.${key}`),
      icon,
      to: localePath(`/docs/${slug}`),
      active: isActive(`/docs/${slug}`)
    })),
    {
      label: t('nav.releases'),
      icon: 'i-lucide-newspaper',
      to: localePath('/releases')
    },
    {
      label: t('nav.github'),
      to: 'https://github.com/mhaibaraai/movk-core',
      icon: 'i-simple-icons-github',
      target: '_blank'
    }
  ])

  return {
    desktopLinks,
    mobileLinks
  }
}
