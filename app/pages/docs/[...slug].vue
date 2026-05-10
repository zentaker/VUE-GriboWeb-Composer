<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value.join('/') : value
})
const path = computed(() => `/docs/${slug.value}`)
const pageSlug = computed(() => slug.value.split('/').pop() || slug.value)
const { data: doc } = await useAsyncData(`docs-${path.value}`, async () => {
  const byPath = await queryCollection('docs').path(path.value).first()
  return byPath ?? await queryCollection('docs').where('slug', '=', pageSlug.value).first()
})
const { data: previewDoc } = await useAsyncData(`docs-preview-${slug.value}`, async () => {
  if (route.query.preview !== 'true') return null

  try {
    const response = await $fetch<{ item: { frontmatter: Record<string, any>, body: string } }>('/api/admin/content/read', {
      method: 'POST',
      body: {
        contentType: 'docs',
        filePath: `docs/${slug.value}.md`
      }
    })

    return response.item
  } catch {
    return null
  }
})
const displayDoc = computed(() => doc.value ?? previewDoc.value?.frontmatter)
const previewBody = computed(() => previewDoc.value?.body ?? '')
const previewHtml = computed(() => previewBody.value
  .split(/\n{2,}/)
  .map((block) => block.trim())
  .filter(Boolean)
  .map((block) => {
    if (block.startsWith('# ')) return `<h1>${block.slice(2)}</h1>`
    if (block.startsWith('## ')) return `<h2>${block.slice(3)}</h2>`
    return `<p>${block.replace(/\n/g, '<br>')}</p>`
  })
  .join('')
)

const title = computed(() => displayDoc.value?.title ?? 'Docs placeholder')
const description = computed(() => displayDoc.value?.description ?? 'This route is wired for Nuxt Content documentation pages.')
const docsFolder = computed(() => displayDoc.value?.docsFolder || slug.value.split('/')[0])
const { data: siblingDocs } = await useAsyncData(`docs-siblings-${slug.value}`, async () => {
  return await queryCollection('docs').all()
})
const { data: projects } = await useAsyncData(`docs-project-context-${slug.value}`, async () => {
  return await queryCollection('projects').all()
})
const docPath = (item: any) => item.path || `/${item.stem || ''}`.replace(/\/index$/, '')
const normalizeDocRef = (value: unknown) => {
  const ref = String(value || '').trim()
  if (!ref) return ''
  return ref.startsWith('/docs/') ? ref.replace(/\/index$/, '') : `/docs/${ref}`.replace(/\/index$/, '')
}
const explicitProject = computed(() => {
  const current = path.value.replace(/\/index$/, '')
  return (projects.value ?? []).find((project: any) => {
    const refs = [
      ...(Array.isArray(project.relatedDocs) ? project.relatedDocs : []),
      ...(Array.isArray(project.docsPaths) ? project.docsPaths : []),
      project.docsPath
    ].map(normalizeDocRef).filter(Boolean)
    return refs.includes(current)
  })
})
const projectContext = computed(() => {
  if (explicitProject.value) return explicitProject.value
  const docProjectSlug = displayDoc.value?.projectSlug
  if (docProjectSlug) {
    const bySlug = (projects.value ?? []).find((project: any) => project.slug === docProjectSlug)
    if (bySlug) return bySlug
  }
  return (projects.value ?? []).find((project: any) => project.docsFolder && project.docsFolder === docsFolder.value)
})
const projectSlug = computed(() => projectContext.value?.slug || displayDoc.value?.projectSlug || '')
const projectTitle = computed(() => projectContext.value?.title || displayDoc.value?.project || 'Project documentation')
const projectRoute = computed(() => projectSlug.value ? `/repository/${projectSlug.value}` : '/repository')
const attachedDocRefs = computed(() => {
  const projectValue = projectContext.value
  if (!projectValue) return []
  return [
    ...(Array.isArray(projectValue.relatedDocs) ? projectValue.relatedDocs : []),
    ...(Array.isArray(projectValue.docsPaths) ? projectValue.docsPaths : []),
    projectValue.docsPath
  ].map(normalizeDocRef).filter((item, index, list) => item && list.indexOf(item) === index)
})
const nextDocs = computed(() => (siblingDocs.value ?? [])
  .filter((item: any) => {
    const itemPath = docPath(item)
    if (itemPath === path.value.replace(/\/index$/, '')) return false
    if (attachedDocRefs.value.length) return attachedDocRefs.value.includes(itemPath)
    return itemPath.startsWith(`/docs/${docsFolder.value}`)
  })
  .sort((a: any, b: any) => Number(a.order ?? 99) - Number(b.order ?? 99))
  .slice(0, 2)
)

useGriboSeo(() => ({
  title: title.value ? `${title.value} - Gribo Digital` : undefined,
  description: description.value,
  seoTitle: displayDoc.value?.seoTitle,
  seoDescription: displayDoc.value?.seoDescription,
  ogTitle: displayDoc.value?.ogTitle,
  ogDescription: displayDoc.value?.ogDescription,
  ogImage: displayDoc.value?.ogImage,
  canonical: displayDoc.value?.canonical,
  noindex: displayDoc.value?.noindex
}))
</script>

<template>
  <article class="docs-page">
    <nav class="crumbs" aria-label="Breadcrumb">
      <NuxtLink to="/repository">Repository</NuxtLink>
      <span>/</span>
      <NuxtLink :to="projectRoute">{{ projectTitle }}</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/docs/${docsFolder}`">Documentation</NuxtLink>
      <span>/</span>
      <span>{{ title }}</span>
    </nav>

    <template v-if="displayDoc">
      <DocsHero :title="displayDoc.title" :description="displayDoc.description ?? ''" :section="displayDoc.section ?? 'Research documentation'" />

      <section id="project-state" class="docs-meta-grid" aria-label="Documentation metadata">
        <div class="meta-card">
          <span>System</span>
          <strong>{{ displayDoc.project ?? 'Project documentation' }}</strong>
        </div>
        <div class="meta-card">
          <span>Mode</span>
          <strong>{{ displayDoc.section ?? 'Documentation' }}</strong>
        </div>
        <div class="meta-card">
          <span>Status</span>
          <strong>Living draft</strong>
        </div>
      </section>

      <section class="docs-callout">
        <p class="eyebrow"><span class="pulse" />Technical note</p>
        <p>
          These docs are public reading surfaces in Stage 2B. They model the future project
          documentation experience without adding admin editing or persistence.
        </p>
      </section>

      <section id="content" class="docs-content-card">
        <ContentRenderer v-if="doc" class="content-prose" :value="doc" />
        <div v-else class="content-prose" v-html="previewHtml" />
      </section>

      <section id="next" class="docs-next">
        <NuxtLink v-for="nextDoc in nextDocs" :key="docPath(nextDoc)" class="next-card" :to="docPath(nextDoc)">
          <span>Related document</span>
          <strong>{{ nextDoc.title }}</strong>
        </NuxtLink>
        <div v-if="!nextDocs.length" class="next-card">
          <span>Next document</span>
          <strong>No sibling docs yet</strong>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="missing-doc card">
        <p class="eyebrow">Documentation</p>
        <h1>Docs placeholder</h1>
        <p class="muted">This route is wired for Nuxt Content documentation pages.</p>
      </section>
    </template>
  </article>
</template>

<style scoped>
.docs-page {
  display: grid;
  gap: 22px;
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 650;
}

.crumbs a:hover {
  color: var(--ink);
}

.docs-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.meta-card,
.docs-callout,
.docs-content-card,
.next-card,
.missing-doc {
  border: 1px solid var(--line);
  border-radius: 26px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.meta-card {
  min-height: 120px;
  padding: 20px;
}

.meta-card span,
.next-card span {
  display: block;
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.meta-card strong {
  font-size: 24px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.docs-callout {
  padding: 22px;
  background:
    radial-gradient(circle at 94% 0%, rgba(255, 205, 116, 0.18), transparent 30%),
    var(--paper-soft);
}

.docs-callout p:last-child {
  max-width: 780px;
  margin: 12px 0 0;
  color: var(--ink);
  font-size: 18px;
  line-height: 1.55;
}

.docs-content-card {
  padding: clamp(24px, 4vw, 54px);
}

.docs-next {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.next-card {
  padding: 22px;
}

.next-card strong {
  font-size: 28px;
  letter-spacing: -0.05em;
}

.next-card:hover {
  transform: translateY(-2px);
}

.missing-doc {
  padding: clamp(24px, 4vw, 52px);
}

.missing-doc h1 {
  margin: 10px 0;
  font-size: clamp(2rem, 5vw, 4.4rem);
  line-height: 1;
}

@media (max-width: 760px) {
  .docs-meta-grid,
  .docs-next {
    grid-template-columns: 1fr;
  }
}
</style>
