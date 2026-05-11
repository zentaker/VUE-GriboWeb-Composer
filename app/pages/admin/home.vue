<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

type ContentType = 'blog' | 'projects' | 'labs'

type AdminContentItem = {
  contentType: ContentType | 'docs'
  title: string
  slug: string
  status: string
  lab: string
  publicPath: string
  description: string
}

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
    manualItems: Array<{ type: ContentType, slug: string }>
  }
  identity: {
    enabled: boolean
    headline: string
    description: string
    ctaLabel: string
    ctaTarget: string
  }
  sections: unknown[]
}

const requestHeaders = import.meta.server ? useRequestHeaders(['cookie']) : undefined
const isSaving = ref(false)
const statusMessage = ref('')
const selectedFeedType = ref<ContentType>('blog')
const selectedFeedSlug = ref('')

const emptyLayout = (): HomeLayout => ({
  hero: {
    label: 'Digital systems magazine-lab',
    headline: 'Ideas that become systems.',
    description: 'Gribo Digital documents systems, prototypes, research notes and cultural infrastructure through a living editorial archive.',
    primaryCta: { label: 'Explore projects', to: '/repository' },
    secondaryCta: { label: 'Explore labs', to: '/labs' }
  },
  featuredProject: {
    mode: 'manual',
    slug: 'tennis-image-analysis'
  },
  buildLog: {
    mode: 'manual',
    limit: 3,
    manualItems: []
  },
  feed: {
    mode: 'mixed',
    limit: 4,
    contentTypes: ['blog', 'projects'],
    manualItems: []
  },
  identity: {
    enabled: true,
    headline: 'Build, reflect, archive, evolve.',
    description: 'Gribo works like external memory: it records what is being built, what breaks, what changes and what eventually becomes a system.',
    ctaLabel: 'Explore labs',
    ctaTarget: '/labs'
  },
  sections: []
})

const editor = reactive<HomeLayout>(emptyLayout())

const { data: layoutResponse, refresh: refreshLayout } = await useAsyncData('admin-home-layout', () => $fetch<{ layout: HomeLayout }>('/api/admin/home-layout', {
  headers: requestHeaders
}))
const { data: contentResponse, refresh: refreshContent } = await useAsyncData('admin-home-content-list', () => $fetch<{ items: AdminContentItem[] }>('/api/admin/content/list', {
  headers: requestHeaders
}))

function cloneLayout(layout: HomeLayout) {
  return JSON.parse(JSON.stringify(layout)) as HomeLayout
}

function applyLayout(layout: HomeLayout) {
  Object.assign(editor, cloneLayout(layout))
}

watch(layoutResponse, (response) => {
  if (response?.layout) applyLayout(response.layout)
}, { immediate: true })

const contentItems = computed(() => contentResponse.value?.items ?? [])
const projects = computed(() => contentItems.value.filter((item) => item.contentType === 'projects'))
const blogPosts = computed(() => contentItems.value.filter((item) => item.contentType === 'blog'))
const labs = computed(() => contentItems.value.filter((item) => item.contentType === 'labs'))

const selectableContent = computed(() => ({
  blog: blogPosts.value,
  projects: projects.value,
  labs: labs.value
}))

const featuredProject = computed(() => projects.value.find((project) => project.slug === editor.featuredProject.slug))
const previewFeedItems = computed(() => {
  const manual = editor.feed.manualItems
    .map((item) => selectableContent.value[item.type].find((entry) => entry.slug === item.slug))
    .filter((item): item is AdminContentItem => Boolean(item))
  const latest = [
    ...(editor.feed.contentTypes.includes('blog') ? blogPosts.value : []),
    ...(editor.feed.contentTypes.includes('projects') ? projects.value : []),
    ...(editor.feed.contentTypes.includes('labs') ? labs.value : [])
  ]
  const source = editor.feed.mode === 'manual'
    ? manual
    : editor.feed.mode === 'mixed'
      ? [...manual, ...latest]
      : latest

  return source
    .filter((item, index, list) => list.findIndex((entry) => entry.publicPath === item.publicPath) === index)
    .slice(0, editor.feed.limit)
})

const validationErrors = computed(() => {
  const errors: string[] = []

  if (!editor.hero.headline.trim()) errors.push('Hero headline is required.')
  if (editor.featuredProject.mode === 'manual' && !featuredProject.value) errors.push('Choose an existing featured project.')
  if (!Number.isFinite(Number(editor.buildLog.limit)) || Number(editor.buildLog.limit) < 1) errors.push('Build log limit must be a positive number.')
  if (!Number.isFinite(Number(editor.feed.limit)) || Number(editor.feed.limit) < 1) errors.push('Feed limit must be a positive number.')

  const missingManualItems = editor.feed.manualItems.filter((item) => !selectableContent.value[item.type].some((entry) => entry.slug === item.slug))
  if (missingManualItems.length) errors.push('One or more manual feed items no longer exist.')

  return errors
})

function addBuildItem() {
  editor.buildLog.manualItems.push({
    date: 'Now',
    title: 'New build note',
    meta: 'A short progress note from the Gribo build.'
  })
}

function removeBuildItem(index: number) {
  editor.buildLog.manualItems.splice(index, 1)
}

function addFeedItem() {
  if (!selectedFeedSlug.value) return

  const exists = editor.feed.manualItems.some((item) => item.type === selectedFeedType.value && item.slug === selectedFeedSlug.value)
  if (!exists) {
    editor.feed.manualItems.push({
      type: selectedFeedType.value,
      slug: selectedFeedSlug.value
    })
  }
}

function removeFeedItem(index: number) {
  editor.feed.manualItems.splice(index, 1)
}

function getContentLabel(item: { type: ContentType, slug: string }) {
  return selectableContent.value[item.type].find((entry) => entry.slug === item.slug)?.title ?? item.slug
}

async function reloadComposer() {
  statusMessage.value = 'Reloading Home layout...'
  await Promise.all([refreshLayout(), refreshContent()])
  if (layoutResponse.value?.layout) applyLayout(layoutResponse.value.layout)
  statusMessage.value = 'Home layout reloaded.'
}

async function saveLayout() {
  statusMessage.value = ''
  if (validationErrors.value.length) {
    statusMessage.value = validationErrors.value[0]
    return
  }

  isSaving.value = true

  try {
    const response = await $fetch<{ ok: boolean, layout: HomeLayout }>('/api/admin/home-layout/save', {
      method: 'POST',
      body: {
        layout: cloneLayout(editor)
      }
    })
    applyLayout(response.layout)
    statusMessage.value = 'Home layout saved. The public home will use these values.'
    await refreshLayout()
  } catch (error: any) {
    statusMessage.value = error?.statusMessage || 'Home layout could not be saved.'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Home Composer"
      title="Edit the public front page."
      description="Functional editor for the hero, featured project, build log and editorial feed stored in content/home/layout.json."
    />

    <section class="composer-layout">
      <div class="composer-stack">
        <AdminPanel title="Hero" eyebrow="Public identity">
          <div class="form-grid">
            <label>
              Label
              <input v-model="editor.hero.label" type="text">
            </label>
            <label>
              Headline
              <textarea v-model="editor.hero.headline" rows="2" />
            </label>
            <label class="wide">
              Description
              <textarea v-model="editor.hero.description" rows="3" />
            </label>
            <label>
              Primary CTA label
              <input v-model="editor.hero.primaryCta.label" type="text">
            </label>
            <label>
              Primary CTA target
              <input v-model="editor.hero.primaryCta.to" type="text">
            </label>
            <label>
              Secondary CTA label
              <input v-model="editor.hero.secondaryCta.label" type="text">
            </label>
            <label>
              Secondary CTA target
              <input v-model="editor.hero.secondaryCta.to" type="text">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel title="Featured Project" eyebrow="Spotlight card">
          <div class="mode-row">
            <label><input v-model="editor.featuredProject.mode" type="radio" value="manual"> Manual</label>
            <label><input v-model="editor.featuredProject.mode" type="radio" value="latest"> Latest</label>
          </div>
          <label v-if="editor.featuredProject.mode === 'manual'" class="field-block">
            Project
            <select v-model="editor.featuredProject.slug">
              <option value="">Choose a project</option>
              <option v-for="project in projects" :key="project.publicPath" :value="project.slug">
                {{ project.title }} · {{ project.slug }}
              </option>
            </select>
          </label>
          <div class="preview-card">
            <span class="status-badge">{{ editor.featuredProject.mode }}</span>
            <strong>{{ featuredProject?.title || 'Latest project will be selected on the public home' }}</strong>
            <p>{{ featuredProject?.description || 'The public home falls back to the newest available project.' }}</p>
          </div>
        </AdminPanel>

        <AdminPanel title="Latest Build Log" eyebrow="Progress notes">
          <div class="form-row">
            <div class="mode-row">
              <label><input v-model="editor.buildLog.mode" type="radio" value="manual"> Manual</label>
              <label><input v-model="editor.buildLog.mode" type="radio" value="latest"> Latest</label>
            </div>
            <label>
              Limit
              <input v-model.number="editor.buildLog.limit" min="1" max="12" type="number">
            </label>
          </div>

          <div v-if="editor.buildLog.mode === 'manual'" class="editable-list">
            <div v-for="(item, index) in editor.buildLog.manualItems" :key="index" class="editable-item">
              <input v-model="item.date" type="text" placeholder="May 07">
              <input v-model="item.title" type="text" placeholder="Build note title">
              <textarea v-model="item.meta" rows="2" placeholder="Short context" />
              <button class="text-btn" type="button" @click="removeBuildItem(index)">Remove</button>
            </div>
            <button class="studio-btn" type="button" @click="addBuildItem">Add build note</button>
          </div>
          <p v-else class="muted">Latest mode derives this block from recent editorial entries.</p>
        </AdminPanel>

        <AdminPanel title="Editorial Feed" eyebrow="Magazine surface">
          <div class="form-row">
            <div class="mode-row">
              <label><input v-model="editor.feed.mode" type="radio" value="latest"> Latest</label>
              <label><input v-model="editor.feed.mode" type="radio" value="manual"> Manual</label>
              <label><input v-model="editor.feed.mode" type="radio" value="mixed"> Mixed</label>
            </div>
            <label>
              Limit
              <input v-model.number="editor.feed.limit" min="1" max="12" type="number">
            </label>
          </div>

          <div class="type-toggles">
            <label><input v-model="editor.feed.contentTypes" type="checkbox" value="blog"> Blog</label>
            <label><input v-model="editor.feed.contentTypes" type="checkbox" value="projects"> Projects</label>
            <label><input v-model="editor.feed.contentTypes" type="checkbox" value="labs"> Labs</label>
          </div>

          <div v-if="editor.feed.mode !== 'latest'" class="feed-picker">
            <select v-model="selectedFeedType">
              <option value="blog">Blog entry</option>
              <option value="projects">Project</option>
              <option value="labs">Lab</option>
            </select>
            <select v-model="selectedFeedSlug">
              <option value="">Choose content</option>
              <option v-for="item in selectableContent[selectedFeedType]" :key="item.publicPath" :value="item.slug">
                {{ item.title }} · {{ item.slug }}
              </option>
            </select>
            <button class="studio-btn" type="button" @click="addFeedItem">Add item</button>
          </div>

          <div class="selected-list">
            <div v-for="(item, index) in editor.feed.manualItems" :key="`${item.type}-${item.slug}`" class="selected-row">
              <span>{{ item.type }}</span>
              <strong>{{ getContentLabel(item) }}</strong>
              <button class="text-btn" type="button" @click="removeFeedItem(index)">Remove</button>
            </div>
            <p v-if="!editor.feed.manualItems.length" class="muted">No manual feed items selected yet.</p>
          </div>
        </AdminPanel>

        <AdminPanel title="Institutional Block" eyebrow="Lab identity">
          <div class="form-grid">
            <label class="check-row wide">
              <input v-model="editor.identity.enabled" type="checkbox">
              Enabled on public home
            </label>
            <label>
              Headline
              <textarea v-model="editor.identity.headline" rows="2" />
            </label>
            <label class="wide">
              Description
              <textarea v-model="editor.identity.description" rows="3" />
            </label>
            <label>
              CTA label
              <input v-model="editor.identity.ctaLabel" type="text">
            </label>
            <label>
              CTA target
              <input v-model="editor.identity.ctaTarget" type="text">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel title="Save Home Layout" eyebrow="Protected write">
          <div v-if="validationErrors.length" class="validation-box">
            <strong>Before saving</strong>
            <p v-for="error in validationErrors" :key="error">{{ error }}</p>
          </div>
          <div class="action-row">
            <button class="studio-btn primary" :disabled="isSaving || validationErrors.length > 0" type="button" @click="saveLayout">
              {{ isSaving ? 'Saving...' : 'Save Home Layout' }}
            </button>
            <button class="studio-btn" type="button" @click="reloadComposer">Reset / Reload</button>
            <NuxtLink class="studio-btn ghost" to="/" target="_blank">Open public home</NuxtLink>
          </div>
          <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>
        </AdminPanel>
      </div>

      <aside class="preview-stack">
        <AdminPreviewPanel>
          <div class="preview-copy">
            <p class="eyebrow">{{ editor.hero.label }}</p>
            <h3>{{ editor.hero.headline }}</h3>
            <p>{{ editor.hero.description }}</p>
          </div>
        </AdminPreviewPanel>

        <AdminPanel title="Composer preview" eyebrow="Selected content">
          <div class="preview-list">
            <div>
              <span>Featured project</span>
              <strong>{{ featuredProject?.title || 'Latest available project' }}</strong>
            </div>
            <div>
              <span>Build log</span>
              <strong>{{ editor.buildLog.mode }} · {{ editor.buildLog.limit }} items</strong>
            </div>
            <div>
              <span>Feed</span>
              <strong>{{ editor.feed.mode }} · {{ previewFeedItems.length }} preview items</strong>
            </div>
          </div>
        </AdminPanel>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.composer-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 390px;
  gap: 20px;
  align-items: start;
}

.composer-stack,
.preview-stack,
.editable-list,
.selected-list {
  display: grid;
  gap: 14px;
}

.preview-stack {
  position: sticky;
  top: calc(var(--topbar) + 22px);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.form-row,
.action-row,
.feed-picker,
.mode-row,
.type-toggles {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 12px;
}

.field-block,
label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.wide {
  grid-column: 1 / -1;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  text-transform: none;
}

input,
select {
  min-height: 44px;
  padding: 0 13px;
}

textarea {
  min-height: 92px;
  padding: 13px;
  resize: vertical;
}

.mode-row label,
.type-toggles label,
.check-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: auto;
  min-height: 40px;
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  letter-spacing: 0;
  text-transform: none;
}

.mode-row input,
.type-toggles input,
.check-row input {
  width: auto;
  min-height: auto;
  padding: 0;
}

.editable-item {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr);
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--paper);
}

.editable-item textarea,
.editable-item button {
  grid-column: 1 / -1;
}

.studio-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  font-weight: 850;
  letter-spacing: -0.02em;
  cursor: pointer;
}

.studio-btn.primary {
  border-color: color-mix(in srgb, var(--coral), transparent 35%);
  background: var(--coral);
  color: #191714;
}

.studio-btn.ghost {
  background: transparent;
}

.studio-btn:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.text-btn {
  border: 0;
  background: transparent;
  color: var(--coral);
  font-weight: 850;
  text-align: left;
  cursor: pointer;
}

.preview-card,
.validation-box,
.selected-row,
.preview-list > div {
  padding: 15px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
}

.preview-card strong,
.preview-list strong,
.selected-row strong {
  display: block;
  margin-top: 8px;
  color: var(--ink);
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.preview-card p,
.validation-box p,
.status-message,
.selected-row span,
.preview-list span,
.preview-copy p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.selected-row {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
}

.validation-box {
  border-color: color-mix(in srgb, var(--coral), transparent 45%);
}

.preview-copy {
  padding: 0 18px 18px;
}

.preview-copy h3 {
  margin: 8px 0 0;
  font-size: 30px;
  line-height: 0.92;
  letter-spacing: -0.07em;
}

.muted {
  color: var(--muted);
}

@media (max-width: 1280px) {
  .composer-layout {
    grid-template-columns: 1fr;
  }

  .preview-stack {
    position: static;
  }
}

@media (max-width: 720px) {
  .form-grid,
  .editable-item,
  .selected-row {
    grid-template-columns: 1fr;
  }
}
</style>
