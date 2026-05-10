<script setup lang="ts">
import type { AdminContentListItem, AdminContentType } from '~/composables/useAdminContent'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const allowedTypes: AdminContentType[] = ['blog', 'projects', 'docs', 'labs']
const normalizeType = (value: string): AdminContentType | '' => {
  if (value === 'project') return 'projects'
  if (value === 'lab') return 'labs'
  return allowedTypes.includes(value as AdminContentType) ? value as AdminContentType : ''
}
const routeType = normalizeType(String(route.query.type || ''))
const contentType: AdminContentType = allowedTypes.includes(routeType as AdminContentType) ? routeType as AdminContentType : 'blog'
const filePath = String(route.query.file || '')
const { listContent, readContent, saveContent, archiveContent } = useAdminContent()

const frontmatter = ref<Record<string, any>>({})
const markdownBody = ref('')
const statusMessage = ref('')
const isSaving = ref(false)
const tagsText = ref('')
const stackText = ref('')
const relatedTagsText = ref('')
const roadmapText = ref('')
const openQuestionsText = ref('')
const isAttachingDocs = ref(false)
const selectedAttachmentDocs = ref<string[]>([])
const { data: docsData } = await useAsyncData(`editor-related-docs-${filePath}`, () => contentType === 'projects'
  ? listContent('docs')
  : Promise.resolve({ items: [] })
)

const splitComma = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean)
const splitLines = (value: string) => value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)
const toText = (value: unknown) => Array.isArray(value) ? value.join(', ') : ''
const toLines = (value: unknown) => Array.isArray(value) ? value.join('\n') : ''
const docsOptions = computed<AdminContentListItem[]>(() => docsData.value?.items ?? [])
const docByPath = computed(() => new Map(docsOptions.value.map((doc) => [doc.publicPath, doc])))
const getDocFolder = (doc?: AdminContentListItem) => doc?.docsFolder || doc?.filePath.replace(/^docs\//, '').split('/')[0] || ''
const getDocProject = (doc?: AdminContentListItem) => doc?.project || doc?.projectSlug || 'No project metadata'
const secondaryDocText = (doc: AdminContentListItem) => `${doc.publicPath} · folder: ${getDocFolder(doc)}`

function syncTextFields() {
  tagsText.value = toText(frontmatter.value.tags)
  stackText.value = toText(frontmatter.value.stack)
  relatedTagsText.value = toText(frontmatter.value.relatedTags)
  roadmapText.value = toLines(frontmatter.value.roadmap)
  openQuestionsText.value = toLines(frontmatter.value.openQuestions)
  selectedAttachmentDocs.value = [
    frontmatter.value.docsPath,
    ...(Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : []),
    ...(Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : [])
  ].map((item) => String(item)).filter((item, index, list) => item && list.indexOf(item) === index)
}

function normalizeFrontmatter() {
  const next = { ...frontmatter.value }
  next.tags = splitComma(tagsText.value)

  if (contentType === 'projects') {
    next.stack = splitComma(stackText.value)
    if (typeof next.relatedDocs === 'string') next.relatedDocs = splitComma(next.relatedDocs)
    if (typeof next.docsPaths === 'string') next.docsPaths = splitComma(next.docsPaths)
  }
  if (contentType === 'labs') {
    next.relatedTags = splitComma(relatedTagsText.value)
    next.roadmap = splitLines(roadmapText.value)
    next.openQuestions = splitLines(openQuestionsText.value)
  }
  if (next.order !== undefined && next.order !== '') next.order = Number(next.order)
  if (next.year !== undefined && next.year !== '') next.year = Number(next.year)
  next.noindex = Boolean(next.noindex)

  return next
}

if (filePath) {
  const response = await readContent(contentType, filePath)
  frontmatter.value = { ...response.item.frontmatter }
  markdownBody.value = response.item.body
  syncTextFields()
}

const docsFolder = computed(() => {
  if (frontmatter.value.docsFolder) return String(frontmatter.value.docsFolder)
  if (frontmatter.value.docsPath) return String(frontmatter.value.docsPath).replace(/^\/docs\//, '').split('/')[0]
  return String(frontmatter.value.slug || '').replace(/-project$/, '')
})

const relatedDocs = computed(() => (docsData.value?.items ?? []).filter((doc) => {
  const projectSlug = String(frontmatter.value.slug || '')
  const explicit = [
    ...(Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : []),
    ...(Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : [])
  ].map((item) => String(item))
  return doc.projectSlug === projectSlug
    || doc.docsFolder === docsFolder.value
    || doc.filePath.includes(`docs/${docsFolder.value}/`)
    || explicit.includes(doc.publicPath)
    || explicit.includes(doc.publicPath.replace(/^\/docs\//, ''))
}))

const explicitDocPaths = computed(() => [
  frontmatter.value.docsPath,
  ...(Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : []),
  ...(Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : [])
].map((item) => String(item)).filter((item, index, list) => item && list.indexOf(item) === index))
const attachedDocs = computed(() => {
  const explicit = [
    ...explicitDocPaths.value
  ]
  return docsOptions.value.filter((doc) => explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, '')))
})
const hasAttachedDocs = computed(() => attachedDocs.value.length > 0 || Boolean(frontmatter.value.docsPath))
const docOwner = (doc: AdminContentListItem) => {
  if (doc.projectSlug) return { slug: doc.projectSlug, title: doc.project || doc.projectSlug }
  if (doc.project) return { slug: doc.project, title: doc.project }
  return undefined
}
const isAvailableForProject = (doc: AdminContentListItem) => {
  const projectSlug = String(frontmatter.value.slug || '')
  const owner = docOwner(doc)
  const alreadySelected = selectedAttachmentDocs.value.includes(doc.publicPath) || explicitDocPaths.value.includes(doc.publicPath)
  return alreadySelected || !owner || owner.slug === projectSlug
}
const attachableDocs = computed(() => docsOptions.value.filter(isAvailableForProject))
const attachedElsewhereDocs = computed(() => docsOptions.value.filter((doc) => !isAvailableForProject(doc)))
const docAvailabilityLabel = (doc: AdminContentListItem) => {
  const owner = docOwner(doc)
  return owner ? `attached to ${owner.title}` : 'available'
}

const newDocsForProjectLink = computed(() => {
  const query = new URLSearchParams({
    type: 'docs',
    direct: 'true',
    projectSlug: String(frontmatter.value.slug || ''),
    project: String(frontmatter.value.title || ''),
    docsFolder: docsFolder.value
  })

  return `/admin/content/new?${query.toString()}`
})

async function save() {
  isSaving.value = true
  statusMessage.value = ''

  try {
    const response = await saveContent(contentType, filePath, normalizeFrontmatter(), markdownBody.value)
    frontmatter.value = { ...response.item.frontmatter }
    syncTextFields()
    statusMessage.value = 'Saved to content/ successfully.'
  } catch (error: any) {
    statusMessage.value = error?.data?.statusMessage || error?.message || 'Save failed.'
  } finally {
    isSaving.value = false
  }
}

async function saveDocumentationAttachments() {
  if (selectedAttachmentDocs.value.length === 0) {
    statusMessage.value = 'Select at least one existing documentation page before saving attachments.'
    return
  }

  const primary = selectedAttachmentDocs.value[0]
  const primaryItem = docByPath.value.get(primary)
  frontmatter.value.docsPath = primary
  frontmatter.value.docsFolder = getDocFolder(primaryItem) || primary.replace(/^\/docs\//, '').split('/')[0]
  frontmatter.value.docsPaths = selectedAttachmentDocs.value
  frontmatter.value.relatedDocs = selectedAttachmentDocs.value
  await save()
  isAttachingDocs.value = false
}

async function archive() {
  if (!confirm('Archive this content file? The file will stay in place and status will become archived.')) return

  await archiveContent(contentType, filePath)
  statusMessage.value = 'Content archived with status: archived.'
  frontmatter.value.status = 'archived'
}
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Content Editor"
      :title="frontmatter.title || 'Missing content file'"
      :description="`Editing ${filePath || 'no file selected'} inside Nuxt Content.`"
    />

    <section v-if="filePath" class="editor-grid">
      <div class="editor-main">
        <AdminPanel title="Core metadata" eyebrow="Frontmatter">
          <div class="field-grid">
            <label>
              Title
              <input v-model="frontmatter.title" type="text">
            </label>
            <label>
              Slug
              <input v-model="frontmatter.slug" type="text">
            </label>
            <label>
              Status
              <input v-model="frontmatter.status" type="text">
            </label>
            <label>
              Lab
              <input v-model="frontmatter.lab" type="text">
            </label>
            <label v-if="contentType === 'blog'">
              Excerpt
              <textarea v-model="frontmatter.excerpt" rows="3" />
            </label>
            <label v-if="contentType === 'projects'">
              Summary
              <textarea v-model="frontmatter.summary" rows="3" />
            </label>
            <label>
              Description
              <textarea v-model="frontmatter.description" rows="3" />
            </label>
            <label>
              Tags
              <input v-model="tagsText" type="text" placeholder="ai, systems, research">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'projects'" title="Project fields" eyebrow="Repository">
          <div class="field-grid">
            <label>
              Type
              <input v-model="frontmatter.type" type="text">
            </label>
            <label>
              Year
              <input v-model="frontmatter.year" type="number">
            </label>
            <label>
              Stack
              <input v-model="stackText" type="text" placeholder="Nuxt, Python">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'projects'" title="Documentation" eyebrow="Project docs">
          <div v-if="!hasAttachedDocs" class="empty-doc-state">
            <strong>No documentation attached yet.</strong>
            <p>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p>
          </div>

          <div v-else class="attached-docs">
            <div class="attached-section">
              <p class="doc-section-title">Attached documentation</p>
              <article class="attached-doc-card">
                <div>
                  <strong>{{ attachedDocs[0]?.title || frontmatter.docsPath }}</strong>
                  <small>{{ frontmatter.docsPath }} · folder: {{ docsFolder }}</small>
                </div>
                <NuxtLink v-if="frontmatter.docsPath" class="mini-doc-link" :to="frontmatter.docsPath">View documentation</NuxtLink>
              </article>
            </div>

            <div class="attached-section">
              <p class="doc-section-title">Attached pages</p>
              <p v-if="!attachedDocs.length" class="muted">No documentation pages selected.</p>
              <article v-for="doc in attachedDocs" v-else :key="doc.filePath" class="attached-doc-card">
                <div>
                  <strong>{{ doc.title }}</strong>
                  <small>{{ secondaryDocText(doc) }}</small>
                </div>
                <NuxtLink class="mini-doc-link" :to="doc.publicPath">View</NuxtLink>
              </article>
            </div>
          </div>

          <div class="doc-actions">
            <NuxtLink v-if="frontmatter.docsPath" class="ghost-btn" :to="frontmatter.docsPath">View documentation</NuxtLink>
            <button class="ghost-btn" type="button" @click="isAttachingDocs = !isAttachingDocs">Add existing documentation</button>
            <NuxtLink class="studio-btn" :to="newDocsForProjectLink">{{ relatedDocs.length ? 'New Docs Page for this project' : 'Create first docs page' }}</NuxtLink>
          </div>

          <div v-if="isAttachingDocs" class="attach-docs-panel">
            <div>
              <h3>Attach existing documentation</h3>
              <p>Select one or more available documentation pages to attach to this project.</p>
            </div>

            <div class="doc-picker">
              <p class="doc-section-title">Documentation pages</p>
              <p v-if="!attachableDocs.length" class="muted">No available documentation found.</p>
              <label v-for="doc in attachableDocs" :key="doc.filePath" class="doc-choice">
                <input v-model="selectedAttachmentDocs" type="checkbox" :value="doc.publicPath">
                <span>
                  <strong>{{ doc.title }}</strong>
                  <small>{{ secondaryDocText(doc) }}</small>
                  <small>Status: {{ docAvailabilityLabel(doc) }}</small>
                </span>
              </label>
            </div>

            <details v-if="attachedElsewhereDocs.length" class="advanced-doc-fields">
              <summary>Already attached to another project</summary>
              <article v-for="doc in attachedElsewhereDocs" :key="doc.filePath" class="doc-choice disabled-doc">
                <span>
                  <strong>{{ doc.title }}</strong>
                  <small>{{ secondaryDocText(doc) }}</small>
                  <small>Status: {{ docAvailabilityLabel(doc) }}</small>
                </span>
              </article>
            </details>

            <div class="doc-actions">
              <button class="studio-btn" type="button" :disabled="isSaving" @click="saveDocumentationAttachments">Save attachment</button>
              <button class="ghost-btn" type="button" @click="isAttachingDocs = false">Cancel</button>
            </div>
          </div>

          <details class="advanced-doc-fields">
            <summary>Advanced documentation fields</summary>
            <div class="field-grid">
              <label id="project-docs-path">
                Docs path
                <input v-model="frontmatter.docsPath" type="text" placeholder="/docs/tennis-ai-friction">
              </label>
              <label>
                Docs folder
                <input v-model="frontmatter.docsFolder" type="text" placeholder="tennis-ai-friction">
              </label>
              <label>
                Related docs raw
                <input v-model="frontmatter.relatedDocs" type="text" placeholder="/docs/tennis-ai-friction/setup">
              </label>
            </div>
          </details>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'docs'" title="Docs fields" eyebrow="Project documentation">
          <div class="field-grid">
            <label>
              Project
              <input v-model="frontmatter.project" type="text">
            </label>
            <label>
              Project slug
              <input v-model="frontmatter.projectSlug" type="text">
            </label>
            <label>
              Docs folder
              <input v-model="frontmatter.docsFolder" type="text">
            </label>
            <label>
              Section
              <input v-model="frontmatter.section" type="text">
            </label>
            <label>
              Order
              <input v-model="frontmatter.order" type="number">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'labs'" title="Lab fields" eyebrow="Research line">
          <div class="field-grid">
            <label>
              Short title
              <input v-model="frontmatter.shortTitle" type="text">
            </label>
            <label>
              Accent
              <input v-model="frontmatter.accent" type="text">
            </label>
            <label>
              Order
              <input v-model="frontmatter.order" type="number">
            </label>
            <label>
              Related tags
              <input v-model="relatedTagsText" type="text">
            </label>
            <label>
              Roadmap
              <textarea v-model="roadmapText" rows="4" />
            </label>
            <label>
              Open questions
              <textarea v-model="openQuestionsText" rows="4" />
            </label>
          </div>
        </AdminPanel>

        <AdminPanel title="Markdown body" eyebrow="Content">
          <textarea v-model="markdownBody" class="body-editor" />
        </AdminPanel>
      </div>

      <aside class="editor-side">
        <AdminPanel title="Save" eyebrow="Stage 4">
          <div class="actions">
            <button class="studio-btn" type="button" :disabled="isSaving" @click="save">
              {{ isSaving ? 'Saving...' : 'Save changes' }}
            </button>
            <button class="ghost-btn" type="button" @click="archive">Archive</button>
          </div>
          <p v-if="statusMessage" class="status-copy">{{ statusMessage }}</p>
        </AdminPanel>

        <AdminPanel title="SEO settings" eyebrow="Metadata">
          <div class="field-stack">
            <label>
              SEO title
              <input v-model="frontmatter.seoTitle" type="text">
            </label>
            <label>
              SEO description
              <textarea v-model="frontmatter.seoDescription" rows="4" />
            </label>
            <label>
              OG title
              <input v-model="frontmatter.ogTitle" type="text">
            </label>
            <label>
              OG description
              <textarea v-model="frontmatter.ogDescription" rows="4" />
            </label>
            <label>
              OG image
              <input v-model="frontmatter.ogImage" type="text">
            </label>
            <label>
              Canonical
              <input v-model="frontmatter.canonical" type="text">
            </label>
            <label class="check-row">
              <input v-model="frontmatter.noindex" type="checkbox">
              Noindex
            </label>
          </div>
        </AdminPanel>
      </aside>
    </section>

    <AdminPanel v-else title="No file selected" eyebrow="Editor">
      <p class="muted">Open a file from Blog, Projects, Docs, or Labs to edit it.</p>
      <button class="ghost-btn" type="button" @click="router.push('/admin')">Back to Studio</button>
    </AdminPanel>
  </div>
</template>

<style scoped>
.admin-page,
.editor-main,
.editor-side {
  display: grid;
  gap: 20px;
}

.editor-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 20px;
  align-items: start;
}

.editor-side {
  position: sticky;
  top: calc(var(--topbar) + 22px);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field-stack {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  outline: none;
  padding: 12px 14px;
  text-transform: none;
}

textarea {
  resize: vertical;
  line-height: 1.55;
}

.body-editor {
  min-height: 520px;
  border-radius: 22px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 14px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.doc-actions,
.related-docs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.documentation-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.doc-meta,
.related-docs a {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
}

.doc-meta span {
  display: block;
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.doc-meta strong {
  display: block;
  margin-top: 8px;
  overflow-wrap: anywhere;
  color: var(--ink);
  font-size: 14px;
  letter-spacing: -0.02em;
}

.related-docs a {
  color: var(--ink);
  font-size: 13px;
  font-weight: 760;
}

.studio-btn,
.ghost-btn {
  display: inline-grid;
  min-height: 40px;
  place-items: center;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font-weight: 780;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.studio-btn {
  border-color: var(--coral);
  background: var(--coral);
  color: #191714;
}

.studio-btn:hover,
.ghost-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.studio-btn:disabled {
  cursor: wait;
  opacity: 0.65;
}

.status-copy {
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-row input {
  width: auto;
}

.empty-doc-state,
.attached-docs,
.attach-docs-panel,
.advanced-doc-fields {
  display: grid;
  gap: 14px;
}

.empty-doc-state,
.attached-doc-card,
.attach-docs-panel,
.advanced-doc-fields {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
}

.empty-doc-state strong,
.attached-doc-card strong,
.attach-docs-panel h3,
.doc-section-title {
  margin: 0;
  color: var(--ink);
  letter-spacing: -0.02em;
  text-transform: none;
}

.empty-doc-state p,
.attached-doc-card small,
.attach-docs-panel p,
.advanced-doc-fields summary {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
  letter-spacing: 0;
  text-transform: none;
}

.attached-section,
.doc-picker {
  display: grid;
  gap: 10px;
}

.doc-section-title {
  font-size: 13px;
  font-weight: 850;
}

.attached-doc-card {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
}

.attached-doc-card div {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.attached-doc-card small {
  overflow-wrap: anywhere;
}

.mini-doc-link {
  flex: 0 0 auto;
  color: var(--coral);
  font-size: 12px;
  font-weight: 800;
}

.doc-choice {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: start;
  padding: 13px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
  color: var(--ink);
  letter-spacing: 0;
  text-transform: none;
}

.doc-choice input {
  width: auto;
  margin-top: 3px;
}

.doc-choice span {
  display: grid;
  gap: 4px;
}

.doc-choice strong {
  color: var(--ink);
  font-size: 14px;
  letter-spacing: -0.02em;
  text-transform: none;
}

.doc-choice small {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0;
  text-transform: none;
}

.advanced-doc-fields {
  background: var(--paper-soft);
}

.advanced-doc-fields summary {
  cursor: pointer;
  font-weight: 800;
}

@media (max-width: 720px) {
  .attached-doc-card {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 1180px) {
  .editor-grid,
  .field-grid,
  .documentation-panel {
    grid-template-columns: 1fr;
  }

  .editor-side {
    position: static;
  }
}
</style>
