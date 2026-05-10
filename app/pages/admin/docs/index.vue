<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { listContent } = useAdminContent()
const { data, pending, refresh } = await useAsyncData('admin-docs-list', () => listContent('docs'))
const { data: projectsData } = await useAsyncData('admin-docs-projects-list', () => listContent('projects'))
const docs = computed(() => data.value?.items ?? [])
const projects = computed(() => projectsData.value?.items ?? [])
const selectedFolder = ref('all')
const getDocFolder = (doc: { docsFolder?: string, filePath: string }) => doc.docsFolder || doc.filePath.replace(/^docs\//, '').split('/')[0] || 'not set'
const folderOptions = computed(() => Array.from(new Set(docs.value.map(getDocFolder))).sort())
const projectOwner = (doc: { project?: string, projectSlug?: string, publicPath: string }) => {
  if (doc.projectSlug) return projects.value.find((project) => project.slug === doc.projectSlug) || { title: doc.project || doc.projectSlug, slug: doc.projectSlug }
  if (doc.project) return projects.value.find((project) => project.title === doc.project || project.slug === doc.project) || { title: doc.project, slug: doc.project }
  return projects.value.find((project) => {
    const explicit = [
      project.docsPath,
      ...(project.docsPaths ?? []),
      ...(project.relatedDocs ?? [])
    ].map((item) => String(item)).filter(Boolean)
    return explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, ''))
  })
}
const availabilityLabel = (doc: { project?: string, projectSlug?: string, publicPath: string, status: string }) => {
  if (doc.status === 'archived') return 'Archived'
  const owner = projectOwner(doc)
  if (owner) return `Attached to ${owner.title}`
  return doc.status === 'draft' ? 'Available draft' : 'Available'
}
const filteredDocs = computed(() => selectedFolder.value === 'all'
  ? docs.value
  : docs.value.filter((doc) => getDocFolder(doc) === selectedFolder.value)
)
const editLink = (filePath: string) => `/admin/content/edit?type=docs&file=${encodeURIComponent(filePath)}`
const previewLink = (doc: { publicPath: string, status: string }) => doc.status === 'published'
  ? doc.publicPath
  : `${doc.publicPath}?preview=true`
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Documentation Manager"
      title="Technical pages as product interface."
      description="Functional minimum for editing docs markdown connected to project dossiers."
    />

    <section class="docs-layout">
      <AdminPanel title="Docs tree" eyebrow="content/docs">
        <template #action>
          <NuxtLink class="studio-btn" to="/admin/content/new?type=docs">New Docs Page</NuxtLink>
        </template>
        <button class="ghost-btn" type="button" @click="refresh">Refresh list</button>
        <label class="folder-filter">
          Filter by folder
          <select v-model="selectedFolder">
            <option value="all">All folders</option>
            <option v-for="folder in folderOptions" :key="folder" :value="folder">
              {{ folder }}
            </option>
          </select>
        </label>
        <p v-if="pending" class="muted">Reading content/docs...</p>
        <div v-else class="doc-tree">
          <article v-for="doc in filteredDocs" :key="doc.filePath" class="tree-item">
            <span class="tree-icon">D</span>
            <div>
              <strong>{{ doc.title }}</strong>
              <p>{{ doc.publicPath }}</p>
              <div class="doc-meta-line">
                <span>Folder: {{ getDocFolder(doc) }}</span>
                <span>{{ availabilityLabel(doc) }}</span>
                <span>Editorial: {{ doc.status || 'draft' }}</span>
              </div>
            </div>
            <div class="row-actions">
              <span class="status-badge">{{ doc.projectSlug || doc.project || 'available' }}</span>
              <NuxtLink class="mini-link" :to="previewLink(doc)">{{ doc.status === 'published' ? 'View' : 'Preview' }}</NuxtLink>
              <NuxtLink class="mini-link" :to="editLink(doc.filePath)">Edit</NuxtLink>
            </div>
          </article>
        </div>
      </AdminPanel>

      <AdminPanel title="Editor scope" eyebrow="Markdown">
        <div class="markdown-editor">
          <h3>Docs editing is file-based.</h3>
          <p>Select any docs page to edit frontmatter, project metadata, SEO fields, and markdown body.</p>
          <p>Hierarchy management stays simple in Stage 4: new pages can be created inside a docs folder, but no drag tree or route designer exists yet.</p>
        </div>
      </AdminPanel>

      <AdminPanel title="Docs preview" eyebrow="Frontend">
        <article class="docs-preview">
          <p class="eyebrow">Project documentation</p>
          <h2>Repository-linked technical memory</h2>
          <p>Docs stay public, but they remain project documentation rather than a top-level public nav surface.</p>
        </article>
      </AdminPanel>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.docs-layout {
  display: grid;
  grid-template-columns: 1fr 0.9fr 0.8fr;
  gap: 18px;
  align-items: start;
}

.doc-tree,
.row-actions {
  display: grid;
  gap: 10px;
}

.folder-filter {
  display: grid;
  gap: 8px;
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.folder-filter select {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  padding: 12px 14px;
  text-transform: none;
}

.tree-item {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
}

.tree-icon {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 10px;
  background: color-mix(in srgb, var(--lavender), transparent 78%);
  color: var(--lavender);
  font-weight: 900;
}

.tree-item p {
  margin: 3px 0 0;
  color: var(--muted);
  font-size: 12px;
}

.doc-meta-line {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.doc-meta-line span {
  padding: 5px 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--muted);
  font-size: 11px;
}

.studio-btn,
.ghost-btn,
.mini-link {
  display: inline-grid;
  min-height: 34px;
  place-items: center;
  padding: 0 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font-size: 12px;
  font-weight: 760;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.studio-btn {
  min-height: 38px;
  border-color: var(--coral);
  background: var(--coral);
  color: #191714;
}

.studio-btn:hover,
.ghost-btn:hover,
.mini-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.ghost-btn {
  margin-bottom: 14px;
}

.markdown-editor,
.docs-preview {
  min-height: 360px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper);
}

.markdown-editor p,
.docs-preview p:last-child {
  color: var(--muted);
  line-height: 1.65;
}

.docs-preview h2 {
  margin: 22px 0 0;
  font-size: 42px;
  letter-spacing: -0.065em;
  line-height: 0.95;
}

@media (max-width: 1280px) {
  .docs-layout,
  .tree-item {
    grid-template-columns: 1fr;
  }
}
</style>
