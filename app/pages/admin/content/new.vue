<script setup lang="ts">
import type { AdminContentListItem, AdminContentType } from '~/composables/useAdminContent'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const allowedTypes: AdminContentType[] = ['blog', 'projects', 'docs', 'labs']
const labels: Record<AdminContentType, string> = {
  blog: 'Blog post',
  projects: 'Project',
  docs: 'Docs page',
  labs: 'Lab'
}

const normalizeType = (value: string): AdminContentType | '' => {
  if (value === 'project') return 'projects'
  if (value === 'lab') return 'labs'
  return allowedTypes.includes(value as AdminContentType) ? value as AdminContentType : ''
}
const routeType = computed(() => normalizeType(String(route.query.type || '')))
const hasContextualType = computed(() => allowedTypes.includes(routeType.value as AdminContentType))
const contentType = ref<AdminContentType>(hasContextualType.value ? routeType.value as AdminContentType : 'blog')
const title = ref('')
const slug = ref('')
const docsFolder = ref(String(route.query.docsFolder || 'tennis-ai-friction'))
const projectSlug = ref(String(route.query.projectSlug || 'tennis-image-analysis'))
const projectTitle = ref(String(route.query.project || 'Tennis Image Analysis Pipeline'))
const summary = ref('')
const status = ref('draft')
const lab = ref(String(route.query.lab || 'ai'))
const year = ref(String(new Date().getFullYear()))
const stackText = ref('')
const tagsText = ref('')
const docsMode = ref<'none' | 'attach' | 'create'>(String(route.query.docsMode || 'none') as 'none' | 'attach' | 'create')
const firstDocsTitle = ref('Overview')
const firstDocsSlug = ref('index')
const docsFolderMode = ref<'existing' | 'new'>('existing')
const selectedExistingDocsFolder = ref(String(route.query.docsFolder || 'tennis-ai-friction'))
const selectedDocs = ref<string[]>([])
const statusMessage = ref('')
const isCreating = ref(false)
const isDirect = computed(() => route.query.direct === 'true')
const directStartedFor = ref('')
const { createContent, listContent } = useAdminContent()

const { data: projectsData } = await useAsyncData('new-content-project-options', () => listContent('projects'))
const projectOptions = computed<AdminContentListItem[]>(() => projectsData.value?.items ?? [])
const { data: docsData } = await useAsyncData('new-content-doc-options', () => listContent('docs'))
const docsOptions = computed<AdminContentListItem[]>(() => docsData.value?.items ?? [])
const docsFolderOptions = computed(() => {
  const folders = docsOptions.value.map((item) => item.docsFolder || item.filePath.replace(/^docs\//, '').split('/')[0]).filter(Boolean)
  return Array.from(new Set(folders))
})
const docByPath = computed(() => new Map(docsOptions.value.map((doc) => [doc.publicPath, doc])))

watch(contentType, (nextType) => {
  if (nextType === 'docs' && !docsFolder.value) docsFolder.value = 'tennis-ai-friction'
})

function applyProject(value: string) {
  const project = projectOptions.value.find((item) => item.slug === value)
  projectSlug.value = value
  if (project) {
    projectTitle.value = project.title
    docsFolder.value = project.slug === 'tennis-image-analysis' ? 'tennis-ai-friction' : project.slug
  }
}

const panelTitle = computed(() => `${labels[contentType.value]} draft setup`)
const heroTitle = computed(() => hasContextualType.value
  ? `Create a new ${labels[contentType.value].toLowerCase()}.`
  : 'Create a draft in Nuxt Content.'
)
const splitComma = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean)
const getDocFolder = (doc?: AdminContentListItem) => doc?.docsFolder || doc?.filePath.replace(/^docs\//, '').split('/')[0] || ''
const getDocProject = (doc?: AdminContentListItem) => doc?.project || doc?.projectSlug || 'No project metadata'
const secondaryDocText = (doc: AdminContentListItem) => `${doc.publicPath} · folder: ${getDocFolder(doc)}`
const currentProjectSlug = computed(() => slug.value || projectSlug.value)
const activeDocsFolder = computed(() => docsFolderMode.value === 'new' ? docsFolder.value : selectedExistingDocsFolder.value)
const docOwner = (doc: AdminContentListItem) => {
  if (doc.projectSlug) {
    return projectOptions.value.find((project) => project.slug === doc.projectSlug) || { slug: doc.projectSlug, title: doc.project || doc.projectSlug }
  }
  if (doc.project) {
    return projectOptions.value.find((project) => project.title === doc.project || project.slug === doc.project) || { slug: doc.project, title: doc.project }
  }
  return projectOptions.value.find((project) => {
    const explicit = [
      project.docsPath,
      ...(project.docsPaths ?? []),
      ...(project.relatedDocs ?? [])
    ].map((item) => String(item)).filter(Boolean)
    return explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, ''))
  })
}
const isAvailableForCurrentProject = (doc: AdminContentListItem) => {
  const owner = docOwner(doc)
  return !owner || owner.slug === currentProjectSlug.value
}
const documentationOptions = computed(() => docsOptions.value.filter(isAvailableForCurrentProject))
const attachedElsewhereDocs = computed(() => docsOptions.value.filter((doc) => !isAvailableForCurrentProject(doc)))
const selectedDocItems = computed(() => docsOptions.value.filter((doc) => selectedDocs.value.includes(doc.publicPath)))
const selectedPrimaryDoc = computed(() => selectedDocs.value[0] || '')
const selectedPrimaryDocItem = computed(() => docByPath.value.get(selectedPrimaryDoc.value))
const additionalDocItems = selectedDocItems
const docAvailabilityLabel = (doc: AdminContentListItem) => {
  const owner = docOwner(doc)
  return owner ? `attached to ${owner.title}` : 'available'
}
const createButtonLabel = computed(() => {
  if (contentType.value === 'projects') return docsMode.value === 'create' ? 'Create project and first docs page' : 'Create project'
  if (contentType.value === 'docs') return 'Create docs page'
  return 'Create draft'
})
function resetForRoute() {
  const nextType = hasContextualType.value ? routeType.value as AdminContentType : 'blog'
  contentType.value = nextType
  title.value = ''
  slug.value = ''
  summary.value = ''
  status.value = 'draft'
  lab.value = String(route.query.lab || 'ai')
  year.value = String(new Date().getFullYear())
  stackText.value = ''
  tagsText.value = ''
  docsMode.value = String(route.query.docsMode || 'none') as 'none' | 'attach' | 'create'
  docsFolder.value = String(route.query.docsFolder || 'tennis-ai-friction')
  selectedExistingDocsFolder.value = String(route.query.docsFolder || 'tennis-ai-friction')
  docsFolderMode.value = 'existing'
  projectSlug.value = String(route.query.projectSlug || 'tennis-image-analysis')
  projectTitle.value = String(route.query.project || 'Tennis Image Analysis Pipeline')
  firstDocsTitle.value = 'Overview'
  firstDocsSlug.value = 'index'
  selectedDocs.value = []
  statusMessage.value = ''
  directStartedFor.value = ''
}

function maybeStartDirectCreate() {
  if (!isDirect.value || !hasContextualType.value || !['blog', 'docs', 'labs'].includes(contentType.value)) return
  if (directStartedFor.value === route.fullPath) return
  directStartedFor.value = route.fullPath
  const stamp = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '')
  title.value = contentType.value === 'blog'
    ? 'Untitled Blog Entry'
    : contentType.value === 'docs'
      ? 'Untitled Docs Page'
      : 'Untitled Lab'
  slug.value = `${contentType.value === 'blog'
    ? 'untitled-blog-entry'
    : contentType.value === 'docs'
      ? 'untitled-docs-page'
      : 'untitled-lab'}-${stamp}`
  createDraft()
}

async function createDraft() {
  isCreating.value = true
  statusMessage.value = ''

  try {
    if (contentType.value === 'projects' && docsMode.value === 'attach' && selectedDocs.value.length === 0) {
      statusMessage.value = 'Select at least one existing documentation page or choose No documentation yet.'
      return
    }

    const firstSelectedDoc = docByPath.value.get(selectedDocs.value[0])
    const resolvedDocsFolder = contentType.value === 'projects' && docsMode.value === 'attach'
      ? getDocFolder(firstSelectedDoc) || docsFolder.value
      : activeDocsFolder.value

    const extra = contentType.value === 'docs'
      ? {
          docsFolder: activeDocsFolder.value,
          projectSlug: projectSlug.value,
          project: projectTitle.value,
          relatedProject: projectSlug.value,
          lab: lab.value
        }
      : contentType.value === 'projects'
        ? {
            summary: summary.value,
            description: summary.value,
            status: status.value,
            lab: lab.value,
            year: year.value,
            stack: stackText.value,
            tags: splitComma(tagsText.value),
            docsFolder: docsMode.value === 'none' ? '' : resolvedDocsFolder,
            docsPath: docsMode.value === 'none' ? '' : docsMode.value === 'attach' ? selectedDocs.value[0] || '' : `/docs/${activeDocsFolder.value}`,
            docsPaths: docsMode.value === 'attach' ? selectedDocs.value : [],
            relatedDocs: docsMode.value === 'attach' ? selectedDocs.value : []
          }
        : { lab: lab.value, status: status.value }
    const response = await createContent(
      contentType.value,
      title.value || 'Untitled draft',
      slug.value,
      activeDocsFolder.value,
      extra
    )

    if (contentType.value === 'projects' && docsMode.value === 'create') {
      const projectFile = response.item.frontmatter
      const docsResponse = await createContent(
        'docs',
        firstDocsTitle.value || `${projectFile.title} documentation`,
        firstDocsSlug.value || 'index',
        activeDocsFolder.value || String(projectFile.slug),
        {
          docsFolder: activeDocsFolder.value || String(projectFile.slug),
          projectSlug: String(projectFile.slug),
          project: String(projectFile.title),
          relatedProject: String(projectFile.slug),
          lab: String(projectFile.lab || lab.value)
        }
      )
      await router.push(`/admin/content/edit?type=docs&file=${encodeURIComponent(docsResponse.item.filePath)}`)
      return
    }

    if (contentType.value === 'projects') {
      await router.push('/admin/projects')
      return
    }

    await router.push(`/admin/content/edit?type=${contentType.value}&file=${encodeURIComponent(response.item.filePath)}`)
  } catch (error: any) {
    statusMessage.value = error?.data?.statusMessage || error?.message || 'Create failed.'
  } finally {
    isCreating.value = false
  }
}

watch(() => route.fullPath, () => {
  resetForRoute()
  nextTick(maybeStartDirectCreate)
})

onMounted(() => {
  resetForRoute()
  maybeStartDirectCreate()
})
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="New content"
      :title="heroTitle"
      description="Create an editable draft in the current Nuxt Content structure."
    />

    <section class="new-grid">
      <AdminPanel v-if="!isDirect || !['blog', 'docs', 'labs'].includes(contentType)" :title="panelTitle" eyebrow="File creation">
        <form class="new-form" @submit.prevent="createDraft">
          <label v-if="!hasContextualType">
            Content type
            <select v-model="contentType">
              <option value="blog">Blog post</option>
              <option value="projects">Project</option>
              <option value="docs">Docs page</option>
              <option value="labs">Lab</option>
            </select>
          </label>
          <div v-else class="fixed-type">
            <span>Content type</span>
            <strong>{{ labels[contentType] }}</strong>
          </div>

          <label>
            Title
            <input v-model="title" type="text" required placeholder="A draft title">
          </label>
          <label>
            Slug
            <input v-model="slug" type="text" placeholder="generated-from-title">
          </label>

          <template v-if="contentType === 'projects'">
            <label>
              Summary
              <textarea v-model="summary" rows="3" placeholder="A short dossier description" />
            </label>
            <label>
              Lab
              <input v-model="lab" type="text" placeholder="ai">
            </label>
            <label>
              Status
              <input v-model="status" type="text" placeholder="draft">
            </label>
            <label>
              Year
              <input v-model="year" type="number">
            </label>
            <label>
              Stack
              <input v-model="stackText" type="text" placeholder="Nuxt, Python">
            </label>
            <label>
              Tags
              <input v-model="tagsText" type="text" placeholder="ai, systems, archive">
            </label>

            <div class="documentation-setup">
              <p class="setup-title">Documentation</p>
              <label class="radio-row">
                <input v-model="docsMode" type="radio" value="none">
                No documentation yet
              </label>
              <label class="radio-row">
                <input v-model="docsMode" type="radio" value="attach">
                Attach existing documentation
              </label>
              <label class="radio-row">
                <input v-model="docsMode" type="radio" value="create">
                Create first docs page
              </label>
            </div>

            <template v-if="docsMode === 'attach'">
              <section class="attach-docs-panel">
                <div>
                  <h3>Attach existing documentation</h3>
                  <p>Select one or more available documentation pages to attach to this project.</p>
                </div>

                <div v-if="false" class="selected-doc-card">
                  <span>Hidden compatibility</span>
                  <strong>Deprecated primary selection</strong>
                  <small>{{ selectedPrimaryDocItem.publicPath }} · folder: {{ getDocFolder(selectedPrimaryDocItem) }}</small>
                </div>

                <div class="doc-picker">
                  <p class="picker-title">Documentation pages</p>
                  <p v-if="!documentationOptions.length" class="muted">No available documentation found. Use Create first docs page instead.</p>
                  <label v-for="doc in documentationOptions" :key="doc.filePath" class="doc-choice">
                    <input v-model="selectedDocs" type="checkbox" :value="doc.publicPath">
                    <span>
                      <strong>{{ doc.title }}</strong>
                      <small>{{ secondaryDocText(doc) }}</small>
                      <small>Status: {{ docAvailabilityLabel(doc) }}</small>
                    </span>
                  </label>
                </div>

                <div class="selected-summary">
                  <strong>Selected documentation</strong>
                  <p v-if="!selectedDocItems.length">No documentation selected yet.</p>
                  <p v-else>{{ selectedPrimaryDocItem?.title || 'Primary inferred from first selected page' }} · {{ additionalDocItems.length }} additional page{{ additionalDocItems.length === 1 ? '' : 's' }}</p>
                </div>
                <div class="docs-selected-summary">
                  <strong>Selected documentation</strong>
                  <p v-if="!selectedDocItems.length">No documentation selected yet.</p>
                  <p v-else>{{ selectedDocItems.length }} page{{ selectedDocItems.length === 1 ? '' : 's' }} selected.</p>
                </div>
                <details v-if="attachedElsewhereDocs.length" class="attached-elsewhere">
                  <summary>Already attached to another project</summary>
                  <article v-for="doc in attachedElsewhereDocs" :key="doc.filePath" class="disabled-doc">
                    <strong>{{ doc.title }}</strong>
                    <small>{{ secondaryDocText(doc) }} - {{ docAvailabilityLabel(doc) }}</small>
                  </article>
                </details>
              </section>
            </template>

            <template v-if="docsMode === 'create'">
              <section class="folder-picker">
                <p class="picker-title">Documentation folder</p>
                <label class="radio-row">
                  <input v-model="docsFolderMode" type="radio" value="existing">
                  Select existing folder
                </label>
                <label v-if="docsFolderMode === 'existing'">
                  Existing docs folder
                  <select v-model="selectedExistingDocsFolder">
                    <option v-for="folder in docsFolderOptions" :key="folder" :value="folder">
                      {{ folder }}
                    </option>
                  </select>
                </label>
                <label class="radio-row">
                  <input v-model="docsFolderMode" type="radio" value="new">
                  Create new folder
                </label>
                <label v-if="docsFolderMode === 'new'">
                  New docs folder
                  <input v-model="docsFolder" type="text" placeholder="project-docs-folder">
                </label>
              </section>
              <label>
                First docs title
                <input v-model="firstDocsTitle" type="text" placeholder="Overview">
              </label>
              <label>
                First docs slug
                <input v-model="firstDocsSlug" type="text" placeholder="index">
              </label>
            </template>
          </template>

          <template v-if="contentType === 'docs'">
            <label>
              Related project
              <select v-model="projectSlug" @change="applyProject(projectSlug)">
                <option v-for="project in projectOptions" :key="project.filePath" :value="project.slug">
                  {{ project.title }}
                </option>
              </select>
            </label>
            <label>
              Project title
              <input v-model="projectTitle" type="text" placeholder="Tennis Image Analysis Pipeline">
            </label>
            <label>
              Project slug
              <input v-model="projectSlug" type="text" required placeholder="tennis-image-analysis">
            </label>
            <section class="folder-picker">
              <p class="picker-title">Documentation folder</p>
              <label class="radio-row">
                <input v-model="docsFolderMode" type="radio" value="existing">
                Select existing folder
              </label>
              <label v-if="docsFolderMode === 'existing'">
                Existing docs folder
                <select v-model="selectedExistingDocsFolder">
                  <option v-for="folder in docsFolderOptions" :key="folder" :value="folder">
                    {{ folder }}
                  </option>
                </select>
              </label>
              <label class="radio-row">
                <input v-model="docsFolderMode" type="radio" value="new">
                Create new folder
              </label>
              <label v-if="docsFolderMode === 'new'">
                New docs folder
                <input v-model="docsFolder" type="text" required placeholder="tennis-ai-friction">
              </label>
            </section>
          </template>

          <button class="studio-btn" type="submit" :disabled="isCreating">
            {{ isCreating ? 'Creating...' : createButtonLabel }}
          </button>
          <p v-if="statusMessage" class="muted">{{ statusMessage }}</p>
        </form>
      </AdminPanel>

      <AdminPanel v-else title="Opening editor" eyebrow="Direct flow">
        <p class="muted">Creating a draft and opening the editor directly...</p>
      </AdminPanel>

      <AdminInspector
        title="Creation rules"
        :items="[
          { label: 'Mode', value: hasContextualType ? 'Contextual' : 'Global' },
          { label: 'Type', value: labels[contentType] },
          { label: 'Write scope', value: 'content only' },
          { label: 'Overwrite', value: 'Blocked' },
          { label: 'Status', value: 'draft' }
        ]"
      />
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.new-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}

.new-form {
  display: grid;
  gap: 16px;
}

label,
.fixed-type {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.fixed-type {
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
}

.fixed-type strong {
  color: var(--ink);
  font-size: 16px;
  letter-spacing: -0.02em;
  text-transform: none;
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
  padding: 12px 14px;
}

select[multiple] {
  min-height: 150px;
}

.attach-docs-panel,
.doc-picker,
.selected-summary,
.docs-selected-summary,
.folder-picker,
.attached-elsewhere {
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--paper);
}

.attach-docs-panel h3,
.picker-title {
  margin: 0;
  color: var(--ink);
  font-size: 18px;
  letter-spacing: -0.04em;
  text-transform: none;
}

.attach-docs-panel p,
.selected-summary p,
.docs-selected-summary p,
.attached-elsewhere small {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0;
  text-transform: none;
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

.doc-choice span,
.selected-doc-card {
  display: grid;
  gap: 4px;
}

.doc-choice strong,
.selected-doc-card strong,
.selected-summary strong {
  color: var(--ink);
  font-size: 14px;
  letter-spacing: -0.02em;
  text-transform: none;
}

.doc-choice small,
.selected-doc-card small,
.selected-doc-card span,
.disabled-doc small {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0;
  text-transform: none;
}

.selected-doc-card {
  padding: 14px;
  border: 1px solid color-mix(in srgb, var(--mint), transparent 55%);
  border-radius: 16px;
  background: color-mix(in srgb, var(--mint), transparent 90%);
}

.attach-docs-panel > .selected-summary {
  display: none;
}

.docs-selected-summary strong,
.attached-elsewhere summary,
.disabled-doc strong {
  color: var(--ink);
  font-size: 14px;
  letter-spacing: -0.02em;
  text-transform: none;
}

.disabled-doc {
  display: grid;
  gap: 4px;
  padding: 13px;
  border: 1px dashed var(--line);
  border-radius: 16px;
  opacity: 0.68;
}

.documentation-setup {
  display: grid;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
}

.setup-title {
  margin: 0;
  color: var(--ink);
  font-size: 14px;
  font-weight: 850;
  letter-spacing: -0.02em;
  text-transform: none;
}

.radio-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  letter-spacing: 0;
  text-transform: none;
}

.radio-row input {
  width: auto;
}

.studio-btn {
  display: inline-grid;
  width: max-content;
  min-height: 42px;
  place-items: center;
  padding: 0 16px;
  border: 1px solid var(--coral);
  border-radius: 999px;
  background: var(--coral);
  color: #191714;
  cursor: pointer;
  font-weight: 780;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.studio-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
}

.studio-btn:disabled {
  cursor: wait;
  opacity: 0.65;
}

@media (max-width: 980px) {
  .new-grid {
    grid-template-columns: 1fr;
  }
}
</style>
