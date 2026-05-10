<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: lab } = await useAsyncData(`lab-${slug.value}`, () => queryCollection('labs').where('slug', '=', slug.value).first())
const { data: previewLab } = await useAsyncData(`lab-preview-${slug.value}`, async () => {
  if (route.query.preview !== 'true') return null

  try {
    const response = await $fetch<{ item: { frontmatter: Record<string, any> } }>('/api/admin/content/read', {
      method: 'POST',
      body: {
        contentType: 'labs',
        filePath: `labs/${slug.value}.md`
      }
    })

    return response.item.frontmatter
  } catch {
    return null
  }
})
const displayLab = computed(() => lab.value ?? previewLab.value)
const { data: posts } = await useAsyncData(`lab-posts-${slug.value}`, () => queryCollection('blog').where('lab', '=', slug.value).order('date', 'DESC').all())
const { data: projects } = await useAsyncData(`lab-projects-${slug.value}`, () => queryCollection('projects').where('lab', '=', slug.value).all())
const { data: docs } = await useAsyncData(`lab-docs-${slug.value}`, () => queryCollection('docs').where('lab', '=', slug.value).order('order', 'ASC').all())

useGriboSeo(() => ({
  title: displayLab.value?.title ? `${displayLab.value.title} Lab | Gribo Digital` : undefined,
  description: displayLab.value?.description,
  seoTitle: displayLab.value?.seoTitle,
  seoDescription: displayLab.value?.seoDescription,
  ogTitle: displayLab.value?.ogTitle,
  ogDescription: displayLab.value?.ogDescription,
  ogImage: displayLab.value?.ogImage,
  canonical: displayLab.value?.canonical,
  noindex: displayLab.value?.noindex
}))
</script>

<template>
  <main class="content-shell lab-page">
    <template v-if="displayLab">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink to="/">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/labs">Labs</NuxtLink>
        <span>/</span>
        <span>{{ displayLab.title }}</span>
      </nav>

      <LabHero
        :eyebrow="`${displayLab.status} research line`"
        :title="displayLab.title"
        :description="displayLab.description"
        :accent="displayLab.accent"
      />

      <section class="lab-layout">
        <article class="lab-main">
          <section class="lab-panel">
            <p class="eyebrow"><span class="pulse" />Open questions</p>
            <ul class="question-list">
              <li v-for="question in displayLab.openQuestions" :key="question">{{ question }}</li>
            </ul>
          </section>

          <section class="lab-panel">
            <p class="eyebrow">Roadmap</p>
            <ol class="roadmap-list">
              <li v-for="item in displayLab.roadmap" :key="item">{{ item }}</li>
            </ol>
          </section>

          <RelatedContent
            title="Related posts"
            :items="(posts ?? []).map((post) => ({
              label: post.category ?? 'Article',
              title: post.title,
              to: post.path
            }))"
          />

          <RelatedContent
            title="Related projects"
            :items="(projects ?? []).map((project) => ({
              label: project.status ?? 'Project',
              title: project.title,
              to: project.path.replace('/projects/', '/repository/')
            }))"
          />

          <RelatedContent
            title="Related documentation"
            :items="(docs ?? []).map((doc) => ({
              label: doc.section ?? 'Docs',
              title: doc.title,
              to: doc.path
            }))"
          />
        </article>

        <aside class="lab-aside">
          <div class="aside-card">
            <span>Status</span>
            <strong>{{ displayLab.status }}</strong>
          </div>
          <div class="aside-card">
            <span>Related tags</span>
            <div class="tag-row">
              <TagPill v-for="tag in displayLab.relatedTags" :key="tag" :label="tag" />
            </div>
          </div>
          <div class="aside-card">
            <span>Counts</span>
            <dl>
              <div><dt>Posts</dt><dd>{{ posts?.length ?? 0 }}</dd></div>
              <div><dt>Projects</dt><dd>{{ projects?.length ?? 0 }}</dd></div>
              <div><dt>Docs</dt><dd>{{ docs?.length ?? 0 }}</dd></div>
            </dl>
          </div>
        </aside>
      </section>
    </template>

    <section v-else class="missing-card">
      <h1>Lab not found</h1>
      <p class="muted">This research line is not defined in Nuxt Content yet.</p>
    </section>
  </main>
</template>

<style scoped>
.lab-page {
  display: grid;
  gap: 24px;
  padding: 46px 0 80px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--muted);
  font-size: 14px;
}

.lab-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 24px;
  align-items: start;
}

.lab-main {
  display: grid;
  min-width: 0;
  gap: 20px;
}

.lab-panel,
.aside-card,
.missing-card {
  padding: clamp(22px, 4vw, 38px);
  border: 1px solid var(--line);
  border-radius: 28px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.question-list,
.roadmap-list {
  display: grid;
  gap: 12px;
  margin: 18px 0 0;
  padding-left: 20px;
  color: var(--ink);
  font-size: 19px;
  line-height: 1.45;
}

.roadmap-list li::marker {
  color: var(--coral);
  font-weight: 900;
}

.lab-aside {
  position: sticky;
  top: 104px;
  display: grid;
  gap: 16px;
}

.aside-card {
  padding: 20px;
  background: var(--paper-soft);
}

.aside-card span {
  display: block;
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.aside-card strong {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.06em;
  text-transform: capitalize;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

dl {
  display: grid;
  gap: 10px;
  margin: 0;
}

dl div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

dt {
  color: var(--muted);
}

dd {
  margin: 0;
  color: var(--ink);
  font-weight: 900;
}

@media (max-width: 920px) {
  .lab-layout {
    grid-template-columns: 1fr;
  }

  .lab-aside {
    position: static;
  }
}
</style>
