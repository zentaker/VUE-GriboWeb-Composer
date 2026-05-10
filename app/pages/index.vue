<script setup lang="ts">
const { data: posts } = await useAsyncData('home-blog', () => queryCollection('blog').order('date', 'DESC').limit(4).all())
const { data: projects } = await useAsyncData('home-projects', () => queryCollection('projects').limit(4).all())

useGriboSeo({
  title: 'Gribo Digital',
  description: 'Editorial laboratory for digital systems, cultural infrastructure, and living research.',
  ogTitle: 'Gribo Digital',
  ogDescription: 'Systems, prototypes, research notes and cultural infrastructure through a living editorial archive.',
  canonical: 'https://gribo.digital'
})

const buildLogItems = [
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

const labs = [
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

const activeProjects = computed(() => {
  const contentProjects = (projects.value ?? []).map((project, index) => ({
    title: project.title,
    description: project.description,
    status: project.status,
    to: project.path.replace('/projects/', '/repository/'),
    progress: [58, 31, 44, 63][index] ?? 35,
    type: project.stack?.[0] ?? 'Living research'
  }))

  return [...contentProjects, ...fallbackProjects]
    .filter((project, index, list) => list.findIndex((item) => item.title === project.title) === index)
    .slice(0, 4)
})

const featuredProject = computed(() => activeProjects.value.find((project) => project.title.includes('Tennis')) ?? activeProjects.value[0] ?? fallbackProjects[0])

const thinkingArticles = computed(() => {
  const contentPosts = (posts.value ?? []).map((post) => ({
    title: post.title,
    kicker: `${post.category} / ${post.status ?? 'draft'}`,
    to: post.path
  }))

  return [...contentPosts, ...fallbackArticles]
    .filter((article, index, list) => list.findIndex((item) => item.title === article.title) === index)
    .slice(0, 4)
})
</script>

<template>
  <div class="content-shell home-page">
    <HeroIntroBlock>
      <FeaturedProjectBlock
        :title="featuredProject.title"
        :description="featuredProject.description"
        :tags="[featuredProject.status, featuredProject.type, 'Living research']"
      />
      <BuildLogBlock :items="buildLogItems" />
    </HeroIntroBlock>

    <LabsTracksBlock :labs="labs" />
    <ActiveProjectsBlock :projects="activeProjects" />
    <ManifestoBlock>
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
