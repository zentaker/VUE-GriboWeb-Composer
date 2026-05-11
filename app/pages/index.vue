<script setup lang="ts">
type HomeLayout = {
  hero: {
    label: string
    headline: string
    description: string
    primaryCta: { label: string, to: string }
    secondaryCta: { label: string, to: string }
  }
  featuredProject: {
    mode: 'manual' | 'latest'
    slug: string
  }
  buildLog: {
    mode: 'manual' | 'latest'
    limit: number
    manualItems: Array<{ date: string, title: string, meta: string }>
  }
  feed: {
    mode: 'manual' | 'latest' | 'mixed'
    limit: number
    contentTypes: string[]
    manualItems: Array<{ type: 'blog' | 'projects' | 'labs', slug: string }>
  }
  identity: {
    enabled: boolean
    headline: string
    description: string
    ctaLabel: string
    ctaTarget: string
  }
}

const { data: homeLayoutResponse } = await useFetch<{ layout: HomeLayout }>('/api/home-layout')
const { data: posts } = await useAsyncData('home-blog', () => queryCollection('blog').order('date', 'DESC').limit(4).all())
const { data: projects } = await useAsyncData('home-projects', () => queryCollection('projects').limit(4).all())
const { data: contentLabs } = await useAsyncData('home-labs', () => queryCollection('labs').order('order', 'ASC').limit(5).all())

useGriboSeo({
  title: 'Gribo Digital',
  description: 'Editorial laboratory for digital systems, cultural infrastructure, and living research.',
  ogTitle: 'Gribo Digital',
  ogDescription: 'Systems, prototypes, research notes and cultural infrastructure through a living editorial archive.',
  canonical: 'https://gribo.digital'
})

const fallbackBuildLogItems = [
  {
    date: 'May 07',
    title: 'Codex as an initial sandbox',
    meta: 'Testing feasibility without starting from a cloud VM.'
  },
  {
    date: 'May 05',
    title: 'Friction in autonomous agents',
    meta: 'Editorial notes for a Gribo Digital post.'
  },
  {
    date: 'Apr 25',
    title: 'Internet and server proximity',
    meta: 'An essay about regional infrastructure and latency.'
  }
]

const fallbackLabs = [
  {
    title: 'SysSecurity',
    description: 'Security systems, threat models, operational trust, and defensive culture.'
  },
  {
    title: 'AI Systems',
    description: 'Agents, model workflows, reasoning surfaces, and applied AI tooling.'
  },
  {
    title: 'Physics',
    description: 'Physical intuition, simulation notes, measurement, and technical imagination.'
  },
  {
    title: 'SysArchitecture',
    description: 'Infrastructure, product systems, event flows, and durable technical memory.'
  },
  {
    title: 'Data Science',
    description: 'Signals, metrics, analysis pipelines, and interpretable research records.'
  }
]

const fallbackProjects = [
  {
    title: 'Tennis Image Analysis Pipeline',
    description: 'A technical repository for extracting court state, player posture, and tactical events from tennis image sequences.',
    status: 'prototype',
    to: '/repository/tennis-image-analysis',
    progress: 58,
    type: 'Computer vision / Research'
  },
  {
    title: 'Gribo Park Concept Repository',
    description: 'A concept archive for a spatial, playful way to browse cultural fragments, essays, and project artifacts.',
    status: 'concept',
    to: '/repository/gribo-park',
    progress: 31,
    type: 'Cultural infrastructure'
  },
  {
    title: 'AI Agent Sandbox',
    description: 'An exploration of how to test autonomous agents quickly, measurably, and cheaply before scaling to cloud infrastructure.',
    status: 'active research',
    to: '/repository',
    progress: 35,
    type: 'Developer tools'
  }
]

const fallbackArticles = [
  {
    title: 'The friction problem behind autonomous agent implementation',
    kicker: 'Deep dive / AI Systems',
    to: '/blog/openclaw-friction'
  },
  {
    title: 'Internet is not speed. It is server proximity.',
    kicker: 'Essay / Infrastructure',
    to: '/blog/internet-proximity'
  },
  {
    title: 'Why AI-native documentation is no longer a wiki',
    kicker: 'Notes / Documentation',
    to: '/docs/tennis-ai-friction'
  }
]

const layout = computed(() => homeLayoutResponse.value?.layout)

const activeProjects = computed(() => {
  const contentProjects = (projects.value ?? []).map((project, index) => ({
    title: project.title,
    description: project.description || project.summary || 'A living project dossier from the Gribo archive.',
    status: project.status,
    to: `/repository/${project.slug}`,
    progress: [58, 31, 44, 63][index] ?? 35,
    type: project.stack?.[0] ?? 'Living research'
  }))

  return [...contentProjects, ...fallbackProjects]
    .filter((project, index, list) => list.findIndex((item) => item.title === project.title) === index)
    .slice(0, 4)
})

const labs = computed(() => {
  const mappedLabs = (contentLabs.value ?? []).map((lab) => ({
    title: lab.title,
    description: lab.description
  }))

  return mappedLabs.length ? mappedLabs : fallbackLabs
})

const featuredProject = computed(() => {
  const configured = layout.value?.featuredProject

  if (configured?.mode === 'manual') {
    const selected = activeProjects.value.find((project) => project.to.endsWith(`/${configured.slug}`))
    if (selected) return selected
  }

  return activeProjects.value[0] ?? fallbackProjects[0]
})

const buildLogItems = computed(() => {
  const configured = layout.value?.buildLog
  const limit = configured?.limit ?? 3

  if (configured?.mode === 'manual' && configured.manualItems.length) {
    return configured.manualItems.slice(0, limit)
  }

  const latestPosts = (posts.value ?? []).map((post) => ({
    date: post.date ? new Date(post.date).toLocaleDateString('en', { month: 'short', day: '2-digit' }) : 'Now',
    title: post.title,
    meta: post.excerpt || post.description || 'Editorial note from the Gribo archive.'
  }))

  return [...latestPosts, ...fallbackBuildLogItems].slice(0, limit)
})

const thinkingArticles = computed(() => {
  const contentPosts = (posts.value ?? []).map((post) => ({
    title: post.title,
    kicker: `${post.category} / ${post.status ?? 'draft'}`,
    to: post.path
  }))
  const contentProjects = activeProjects.value.map((project) => ({
    title: project.title,
    kicker: `Repository / ${project.status}`,
    to: project.to
  }))
  const contentLabItems = (contentLabs.value ?? []).map((lab) => ({
    title: lab.title,
    kicker: `Lab / ${lab.status}`,
    to: `/labs/${lab.slug}`
  }))
  const manualItems = layout.value?.feed?.manualItems ?? []
  const manualResolved = manualItems
    .map((item) => {
      if (item.type === 'blog') {
        const post = (posts.value ?? []).find((entry) => entry.slug === item.slug)
        return post ? { title: post.title, kicker: `Blog / ${post.status ?? 'draft'}`, to: post.path } : null
      }
      if (item.type === 'projects') {
        const project = activeProjects.value.find((entry) => entry.to.endsWith(`/${item.slug}`))
        return project ? { title: project.title, kicker: `Repository / ${project.status}`, to: project.to } : null
      }
      const lab = (contentLabs.value ?? []).find((entry) => entry.slug === item.slug)
      return lab ? { title: lab.title, kicker: `Lab / ${lab.status}`, to: `/labs/${lab.slug}` } : null
    })
    .filter((item): item is { title: string, kicker: string, to: string } => Boolean(item))

  const configured = layout.value?.feed
  const limit = configured?.limit ?? 4
  const allowedTypes = configured?.contentTypes?.length ? configured.contentTypes : ['blog', 'projects']
  const latestItems = [
    ...(allowedTypes.includes('blog') ? contentPosts : []),
    ...(allowedTypes.includes('projects') ? contentProjects : []),
    ...(allowedTypes.includes('labs') ? contentLabItems : [])
  ]
  const source = configured?.mode === 'manual'
    ? manualResolved
    : configured?.mode === 'mixed'
      ? [...manualResolved, ...latestItems]
      : latestItems

  return [...source, ...fallbackArticles]
    .filter((article, index, list) => list.findIndex((item) => item.title === article.title) === index)
    .slice(0, limit)
})
</script>

<template>
  <div class="content-shell home-page">
    <HeroIntroBlock
      :eyebrow="layout?.hero.label"
      :title="layout?.hero.headline"
      :subtitle="layout?.hero.description"
      :primary-cta-label="layout?.hero.primaryCta.label"
      :primary-cta-to="layout?.hero.primaryCta.to"
      :secondary-cta-label="layout?.hero.secondaryCta.label"
      :secondary-cta-to="layout?.hero.secondaryCta.to"
    >
      <FeaturedProjectBlock
        :title="featuredProject.title"
        :description="featuredProject.description"
        :tags="[featuredProject.status, featuredProject.type, 'Living research']"
      />
      <BuildLogBlock :items="buildLogItems" />
    </HeroIntroBlock>

    <LabsTracksBlock :labs="labs" />
    <ActiveProjectsBlock :projects="activeProjects" />
    <ManifestoBlock
      v-if="layout?.identity.enabled !== false"
      :headline="layout?.identity.headline"
      :description="layout?.identity.description"
      :cta-label="layout?.identity.ctaLabel"
      :cta-target="layout?.identity.ctaTarget"
      show-cta
    >
      <ThinkingArticlesBlock :articles="thinkingArticles" />
    </ManifestoBlock>
    <NewsletterBlock />
    <SiteFooter />
  </div>
</template>

<style scoped>
.home-page {
  overflow: hidden;
}
</style>
