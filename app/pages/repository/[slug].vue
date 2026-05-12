<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))
const path = computed(() => `/projects/${route.params.slug}`)
const { data: project } = await useAsyncData(`project-${path.value}`, async () => {
  const byPath = await queryCollection('projects').path(path.value).first()
  return byPath ?? await queryCollection('projects').where('slug', '=', slug.value).first()
})
const { data: previewProject } = await useAsyncData(`project-preview-${slug.value}`, async () => {
  if (route.query.preview !== 'true') return null

  try {
    const response = await $fetch<{ item: { frontmatter: Record<string, any>, body: string } }>('/api/admin/content/read', {
      method: 'POST',
      body: {
        contentType: 'projects',
        filePath: `projects/${slug.value}.md`
      }
    })

    return response.item
  } catch {
    return null
  }
})
const displayProject = computed(() => project.value ?? previewProject.value?.frontmatter)
const previewBody = computed(() => previewProject.value?.body ?? '')
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
const { data: allDocs } = await useAsyncData(`project-docs-${slug.value}`, async () => {
  return await queryCollection('docs').all()
})

const docPath = (doc: any) => doc.path || `/${doc.stem || ''}`.replace(/\/index$/, '')
const docsFolder = computed(() => {
  const projectValue = displayProject.value
  if (!projectValue) return ''
  if (projectValue.docsFolder) return String(projectValue.docsFolder)
  if (projectValue.docsPath) return String(projectValue.docsPath).replace(/^\/docs\//, '').split('/')[0]
  return ''
})
const explicitDocPaths = computed(() => {
  const projectValue = displayProject.value
  if (!projectValue) return []
  return [
    ...(Array.isArray(projectValue.relatedDocs) ? projectValue.relatedDocs : []),
    ...(Array.isArray(projectValue.docsPaths) ? projectValue.docsPaths : []),
    projectValue.docsPath
  ].map((item) => String(item || '')).filter((item, index, list) => item && item !== '/docs/' && list.indexOf(item) === index)
})
const attachedDocs = computed(() => {
  const docs = allDocs.value ?? []
  const explicit = explicitDocPaths.value
  const folder = docsFolder.value

  return docs
    .filter((doc: any) => {
      const path = docPath(doc)
      if (explicit.includes(path)) return true
      if (explicit.includes(path.replace(/^\/docs\//, ''))) return true
      if (!explicit.length && folder && path.startsWith(`/docs/${folder}`)) return true
      return false
    })
    .sort((a: any, b: any) => Number(a.order ?? 99) - Number(b.order ?? 99) || docPath(a).localeCompare(docPath(b)))
})
const firstDocPath = computed(() => attachedDocs.value[0] ? docPath(attachedDocs.value[0]) : explicitDocPaths.value[0] || '')
const explicitRelatedArticles = computed(() => {
  const projectValue = displayProject.value
  if (!projectValue) return []
  const posts = [
    ...(Array.isArray(projectValue.relatedPosts) ? projectValue.relatedPosts : []),
    ...(Array.isArray(projectValue.relatedArticles) ? projectValue.relatedArticles : []),
    ...(Array.isArray(projectValue.relatedBlogSlugs) ? projectValue.relatedBlogSlugs : [])
  ].map((item) => String(item)).filter(Boolean)
  return posts.map((item) => ({
    title: item.replace(/^\/blog\//, '').replace(/-/g, ' '),
    to: item.startsWith('/blog/') ? item : `/blog/${item}`
  }))
})
const projectDescription = computed(() => displayProject.value?.summary ?? displayProject.value?.description ?? 'A living project dossier from the Gribo repository.')
const projectField = (key: string, fallback = '') => {
  const value = displayProject.value?.[key]
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}
const stackLine = computed(() => {
  const stack = displayProject.value?.stack
  if (Array.isArray(stack)) return stack.join(', ')
  return stack || 'Not set'
})
const projectOverviewTitle = computed(() => projectField('projectOverviewTitle', 'Project overview'))
const projectOverviewBody = computed(() => projectField(
  'projectOverviewBody',
  'This overview is generated from the project record. Attached documentation appears as technical pages around it, using the same reading surface.'
))
const projectMemoryIntro = computed(() => projectField(
  'projectMemoryIntro',
  'The overview holds the public state of the project: what it is, what it is becoming, and which technical documents belong to it.'
))
const projectMemoryTitle = computed(() => projectField('projectMemoryTitle', displayProject.value?.title ?? 'Project memory'))
const projectMemoryBody = computed(() => projectField('projectMemoryBody', projectField('projectMemory', '')))
const hasStructuredProjectMemory = computed(() => Boolean(projectMemoryBody.value || projectField('projectMemoryTitle', '')))
const projectIndexIntro = computed(() => projectField(
  'projectIndexIntro',
  'Signals, fields and decisions that make this project legible as a living dossier.'
))
const projectHoldsTitle = computed(() => projectField('projectHoldsTitle', 'What this project holds'))
const projectHoldsBody = computed(() => projectField(
  'projectHoldsBody',
  projectField('projectIndex', displayProject.value?.description ?? displayProject.value?.summary ?? 'A repository entry for notes, decisions and technical direction.')
))
const workingStackNote = computed(() => projectField('workingStackNote', stackLine.value))
const documentationIntro = computed(() => projectField('documentationIntro', attachedDocs.value.length
  ? 'Technical pages attached to this project from Gribo Studio.'
  : 'No technical documentation is attached to this project yet.'
))
const emptyDocumentationTitle = computed(() => projectField('emptyDocumentationTitle', 'No documentation attached yet'))
const emptyDocumentationBody = computed(() => projectField(
  'emptyDocumentationBody',
  'Technical pages can be connected later from Gribo Studio without changing the project overview.'
))
const buildLogIntro = computed(() => projectField('buildLogIntro', projectField('buildLogNote', 'No explicit build log entries are attached to this project yet.')))
const decisionTraceTitle = computed(() => projectField('decisionTraceTitle', 'Decision trace'))
const decisionTraceBody = computed(() => projectField(
  'decisionTraceBody',
  'Use explicit project fields or related documents when this project needs a public build log.'
))
const relatedArticlesNote = computed(() => projectField('relatedArticlesNote', 'No related articles are configured for this project.'))
const projectBlocks = computed(() => Array.isArray(displayProject.value?.blocks)
  ? displayProject.value.blocks.filter((block: any) => block?.visible !== false)
  : []
)
const metaItems = computed(() => [
  { label: 'Status', value: displayProject.value?.status ?? 'Draft' },
  { label: 'Lab / Track', value: displayProject.value?.lab ?? 'Unassigned' },
  { label: 'Last update', value: displayProject.value?.updatedAt ?? displayProject.value?.date ?? 'Not set' },
  { label: 'Type / Year', value: [displayProject.value?.type ?? 'Project dossier', displayProject.value?.year].filter(Boolean).join(' / ') }
])
const rightRailMeta = computed(() => [
  { label: 'Status', value: displayProject.value?.status ?? 'Draft' },
  { label: 'Docs', value: attachedDocs.value.length ? `${attachedDocs.value.length} attached` : 'Not attached' },
  { label: 'Folder', value: docsFolder.value || 'Not set' },
  { label: 'Stack', value: stackLine.value }
])

useGriboSeo(() => ({
  title: displayProject.value?.title,
  description: displayProject.value?.description,
  summary: displayProject.value?.summary,
  seoTitle: displayProject.value?.seoTitle,
  seoDescription: displayProject.value?.seoDescription,
  ogTitle: displayProject.value?.ogTitle,
  ogDescription: displayProject.value?.ogDescription,
  ogImage: displayProject.value?.ogImage,
  canonical: displayProject.value?.canonical,
  noindex: displayProject.value?.noindex
}))
</script>

<template>
  <div class="project-docs-shell">
    <template v-if="displayProject">
      <div class="project-docs-layout">
        <aside class="docs-sidebar" aria-label="Project documentation sidebar">
          <div class="side-title">Start</div>
          <NuxtLink class="side-link active" :to="`/repository/${displayProject.slug}`">Overview</NuxtLink>
          <a class="side-link" href="#project-index">Project index</a>
          <a class="side-link" href="#build-log">Build log</a>

          <div class="side-title">Documentation</div>
          <NuxtLink v-for="doc in attachedDocs" :key="docPath(doc)" class="side-link" :to="docPath(doc)">
            {{ doc.title }}
          </NuxtLink>
          <p v-if="!attachedDocs.length" class="side-note">No documentation attached yet.</p>
        </aside>

        <main class="project-docs-main">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <NuxtLink to="/repository">Repository</NuxtLink>
            <span>/</span>
            <span>{{ displayProject.title }}</span>
            <span>/</span>
            <span>Overview</span>
          </nav>

          <section class="hero-card">
            <div class="hero-inner">
              <p class="label"><span class="pulse" />Living project repository / {{ displayProject.status ?? 'draft' }}</p>
              <h1>{{ displayProject.title }}</h1>
              <p class="lede">{{ projectDescription }}</p>
              <div class="hero-actions">
                <a class="pill-button" href="#project-memory">Start reading</a>
                <NuxtLink v-if="firstDocPath" class="pill-button primary" :to="firstDocPath">Read documentation</NuxtLink>
                <span v-else class="docs-empty-pill">No documentation attached yet</span>
              </div>
            </div>
          </section>

          <section id="project-state" class="meta-grid" aria-label="Project metadata">
            <div v-for="item in metaItems" :key="item.label" class="meta-card">
              <span>{{ item.label }}</span>
              <strong>{{ item.value || 'Not set' }}</strong>
            </div>
          </section>

          <section class="callout">
            <div class="callout-icon">i</div>
            <div>
              <h3>{{ projectOverviewTitle }}</h3>
              <p>{{ projectOverviewBody }}</p>
            </div>
          </section>

          <section id="project-memory" class="doc-section">
            <h2>Project memory</h2>
            <p>{{ projectMemoryIntro }}</p>
            <article class="doc-body-card">
              <div v-if="hasStructuredProjectMemory" id="content" class="content-prose structured-project-copy">
                <h3 v-if="projectMemoryTitle">{{ projectMemoryTitle }}</h3>
                <p v-if="projectMemoryBody">{{ projectMemoryBody }}</p>
              </div>
              <ContentBlockRenderer v-else-if="projectBlocks.length" id="content" :blocks="projectBlocks" context="project" />
              <ContentRenderer v-else-if="project" id="content" class="content-prose" :value="project" />
              <div v-else id="content" class="content-prose" v-html="previewHtml" />
            </article>
          </section>

          <section id="project-index" class="doc-section">
            <h2>Project index</h2>
            <p>{{ projectIndexIntro }}</p>
            <div class="cards-2">
              <article class="info-card">
                <h3>{{ projectHoldsTitle }}</h3>
                <p>{{ projectHoldsBody }}</p>
              </article>
              <article class="info-card">
                <h3>Working stack</h3>
                <p>{{ workingStackNote }}</p>
              </article>
            </div>
          </section>

          <section id="documentation" class="doc-section">
            <h2>Documentation</h2>
            <p>{{ documentationIntro }}</p>
            <div v-if="attachedDocs.length" class="cards-2">
              <NuxtLink v-for="doc in attachedDocs" :key="docPath(doc)" class="info-card linked-card" :to="docPath(doc)">
                <h3>{{ doc.title }}</h3>
                <p>{{ doc.description ?? docPath(doc) }}</p>
                <small>{{ docPath(doc) }}</small>
              </NuxtLink>
            </div>
            <div v-else class="info-card empty-docs">
              <h3>{{ emptyDocumentationTitle }}</h3>
              <p>{{ emptyDocumentationBody }}</p>
            </div>
          </section>

          <section id="build-log" class="doc-section">
            <h2>Build log</h2>
            <p>{{ buildLogIntro }}</p>
            <div class="cards-2">
              <article class="info-card">
                <h3>{{ decisionTraceTitle }}</h3>
                <p>{{ decisionTraceBody }}</p>
              </article>
              <article class="info-card">
                <h3>Related articles</h3>
                <p v-if="!explicitRelatedArticles.length">{{ relatedArticlesNote }}</p>
                <NuxtLink v-for="article in explicitRelatedArticles" v-else :key="article.to" :to="article.to">
                  {{ article.title }}
                </NuxtLink>
              </article>
            </div>
          </section>

          <nav id="next" class="next-prev" aria-label="Project navigation">
            <NuxtLink to="/repository">
              <span>Repository</span>
              <strong>Back to projects</strong>
            </NuxtLink>
            <NuxtLink v-if="firstDocPath" :to="firstDocPath">
              <span>Documentation</span>
              <strong>Read first attached page</strong>
            </NuxtLink>
            <div v-else>
              <span>Documentation</span>
              <strong>No attached docs yet</strong>
            </div>
          </nav>
        </main>

        <aside class="toc" aria-label="Project overview table of contents">
          <h3>On this page</h3>
          <a href="#project-state">Project state</a>
          <a href="#project-memory">Project memory</a>
          <a href="#project-index">Project index</a>
          <a href="#documentation">Documentation</a>
          <a href="#build-log">Build log</a>
          <a href="#next">Next</a>

          <div class="mini-card">
            <strong>Project status</strong>
            <p>{{ displayProject.status ?? 'Draft' }}</p>
          </div>
          <div class="mini-card">
            <strong>Docs pattern</strong>
            <p>Overview comes from the project. Attached pages come from docs.</p>
          </div>
          <div class="mini-card">
            <strong>Related metadata</strong>
            <dl>
              <div v-for="item in rightRailMeta" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </template>

    <main v-else class="project-docs-main missing-wrapper">
      <section class="hero-card missing-card">
        <p class="label"><span class="pulse" />Repository</p>
        <h1>Project placeholder</h1>
        <p class="lede">This repository route is ready for a Nuxt Content project entry.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.project-docs-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at 84% 8%, rgba(255, 121, 109, 0.13), transparent 28%),
    radial-gradient(circle at 14% 18%, rgba(160, 145, 255, 0.1), transparent 26%),
    var(--bg);
}

.project-docs-layout {
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr) 230px;
  min-height: calc(100vh - 68px);
}

.docs-sidebar {
  position: sticky;
  top: 68px;
  height: calc(100vh - 68px);
  overflow: auto;
  padding: 22px 16px;
  border-right: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg), var(--paper) 18%);
}

.side-title {
  margin: 22px 10px 9px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.side-title:first-child {
  margin-top: 0;
}

.side-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
  padding: 8px 10px;
  border-radius: 12px;
  color: var(--muted);
  font-size: 14px;
}

.side-link.active,
.side-link:hover {
  background: var(--paper-soft);
  color: var(--ink);
}

.side-note {
  margin: 0 10px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.45;
}

.project-docs-main {
  min-width: 0;
  padding: clamp(24px, 4vw, 52px);
}

.missing-wrapper {
  max-width: 980px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 26px;
  color: var(--muted);
  font-size: 14px;
}

.breadcrumb a:hover {
  color: var(--ink);
}

.hero-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 32px;
  padding: clamp(30px, 5vw, 56px);
  background: linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

.hero-card::before {
  content: none;
}

.hero-card::after {
  content: "";
  position: absolute;
  right: -160px;
  top: -180px;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 121, 109, 0.46), rgba(119, 103, 201, 0.18) 52%, transparent 72%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.label {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

h1 {
  max-width: 900px;
  margin: 30px 0 0;
  font-size: clamp(46px, 6.2vw, 88px);
  line-height: 0.9;
  letter-spacing: -0.08em;
}

.lede {
  max-width: 760px;
  margin-top: 22px;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 23px);
  line-height: 1.35;
  letter-spacing: -0.025em;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.pill-button.primary {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

.docs-empty-pill {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 15px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  font-size: 13px;
  font-weight: 760;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 24px 0 44px;
}

.meta-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
  background: var(--paper-soft);
}

.meta-card span {
  display: block;
  color: var(--muted);
  font-size: 12px;
  font-weight: 780;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.meta-card strong {
  display: block;
  margin-top: 8px;
  font-size: 22px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.callout {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  margin: 28px 0;
  padding: 20px;
  border: 1px solid color-mix(in srgb, var(--coral), var(--line) 55%);
  border-radius: 20px;
  background: color-mix(in srgb, var(--coral), transparent 88%);
}

.callout-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 15px;
  background: var(--coral);
  color: #191714;
  font-weight: 900;
}

.callout h3 {
  font-size: 18px;
  letter-spacing: -0.035em;
}

.callout p {
  margin-top: 4px;
  color: var(--muted);
}

.doc-section {
  margin-top: 54px;
  scroll-margin-top: 92px;
}

.doc-section h2 {
  margin-bottom: 14px;
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1;
  letter-spacing: -0.065em;
}

.doc-section > p {
  max-width: 780px;
  margin-bottom: 18px;
  color: var(--muted);
  font-size: 17px;
}

.doc-body-card {
  padding: clamp(22px, 4vw, 42px);
  border: 1px solid var(--line);
  border-radius: 26px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.structured-project-copy p {
  white-space: pre-line;
}

.cards-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 22px 0;
}

.info-card {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
}

.info-card h3 {
  margin-bottom: 9px;
  font-size: 21px;
  line-height: 1.05;
  letter-spacing: -0.045em;
}

.info-card p {
  color: var(--muted);
  font-size: 15px;
}

.info-card small {
  display: block;
  margin-top: 14px;
  color: var(--muted);
  font-size: 12px;
}

.linked-card {
  display: block;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.linked-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--coral), var(--line) 45%);
}

.info-card a {
  display: block;
  margin-top: 8px;
  color: var(--ink);
  font-weight: 760;
  text-transform: capitalize;
}

.toc {
  position: sticky;
  top: 68px;
  height: calc(100vh - 68px);
  overflow: auto;
  padding: 34px 22px;
  border-left: 1px solid var(--line);
}

.toc h3 {
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.toc a {
  display: block;
  padding: 7px 0;
  color: var(--muted);
  font-size: 13px;
}

.toc a:hover {
  color: var(--ink);
}

.mini-card {
  margin-top: 26px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper-soft);
}

.mini-card strong {
  display: block;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.mini-card p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 13px;
}

.mini-card dl {
  display: grid;
  gap: 10px;
  margin: 12px 0 0;
}

.mini-card dt {
  color: var(--muted);
  font-size: 11px;
  font-weight: 780;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mini-card dd {
  margin: 2px 0 0;
  color: var(--ink);
  font-size: 13px;
  font-weight: 720;
}

.next-prev {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 56px;
}

.next-prev a,
.next-prev div {
  display: block;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
}

.next-prev span {
  display: block;
  margin-bottom: 6px;
  color: var(--muted);
  font-size: 13px;
}

.next-prev strong {
  display: block;
  letter-spacing: -0.035em;
}

@media (max-width: 1180px) {
  .project-docs-layout {
    grid-template-columns: 292px minmax(0, 1fr);
  }

  .toc {
    display: none;
  }
}

@media (max-width: 900px) {
  .project-docs-layout {
    grid-template-columns: 1fr;
  }

  .docs-sidebar {
    display: none;
  }

  .project-docs-main {
    padding: 22px 16px 42px;
  }

  .meta-grid,
  .cards-2,
  .next-prev {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: clamp(42px, 13vw, 72px);
  }
}
</style>
