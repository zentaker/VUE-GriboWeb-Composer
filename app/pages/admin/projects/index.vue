<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const tabs = ['Content', 'Metadata', 'SEO', 'Media', 'Preview']
const { listContent } = useAdminContent()
const { data, pending, refresh } = await useAsyncData('admin-projects-list', () => listContent('projects'))
const projects = computed(() => data.value?.items ?? [])
const editLink = (filePath: string) => `/admin/content/edit?type=projects&file=${encodeURIComponent(filePath)}`
const previewLink = (project: { publicPath: string, status: string }) => project.status === 'published'
  ? project.publicPath
  : `${project.publicPath}?preview=true`
</script>

<template>
  <div class="admin-page">
    <div class="page-head">
      <AdminHero
        eyebrow="Repository Projects"
        title="Create a living project repository."
        description="Functional minimum for editing project metadata, body markdown, SEO fields, and documentation links."
      />
      <AdminTabs :tabs="tabs" active="Content" :disabled-tabs="['Media', 'Preview']" />
    </div>

    <section class="editor-shell">
      <div class="form-stack">
        <AdminPanel title="Project files" eyebrow="content/projects">
          <template #action>
            <NuxtLink class="studio-btn" to="/admin/content/new?type=projects">New Project</NuxtLink>
          </template>
          <button class="ghost-btn" type="button" @click="refresh">Refresh list</button>
          <p v-if="pending" class="muted">Reading content/projects...</p>
          <div v-else class="content-list">
            <article v-for="project in projects" :key="project.filePath" class="content-row">
              <div>
                <p class="eyebrow">{{ project.lab || 'unassigned' }} / {{ project.status }}</p>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description || project.filePath }}</p>
              </div>
              <div class="row-actions">
                <NuxtLink class="mini-link" :to="previewLink(project)">{{ project.status === 'published' ? 'View' : 'Preview' }}</NuxtLink>
                <NuxtLink class="mini-link" :to="editLink(project.filePath)">Edit</NuxtLink>
              </div>
            </article>
          </div>
        </AdminPanel>
      </div>

      <aside class="metadata-panel">
        <AdminInspector
          title="Project editor"
          :items="[
            { label: 'Collection', value: 'content/projects' },
            { label: 'Items', value: String(projects.length) },
            { label: 'Docs bridge', value: 'docsPath field' },
            { label: 'Delete', value: 'Soft archive only' }
          ]"
        />
        <AdminPreviewPanel />
      </aside>
    </section>
  </div>
</template>

<style scoped>
.admin-page,
.form-stack,
.metadata-panel,
.content-list {
  display: grid;
  gap: 20px;
}

.page-head {
  display: grid;
  gap: 18px;
}

.editor-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}

.metadata-panel {
  position: sticky;
  top: calc(var(--topbar) + 22px);
}

.studio-btn,
.ghost-btn,
.mini-link {
  display: inline-grid;
  min-height: 38px;
  place-items: center;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font-size: 13px;
  font-weight: 760;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.studio-btn {
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

.content-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--paper);
}

.content-row h3 {
  margin: 0;
  font-size: 26px;
  letter-spacing: -0.055em;
}

.content-row p:last-child {
  margin: 8px 0 0;
  color: var(--muted);
}

.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 1280px) {
  .editor-shell,
  .content-row {
    grid-template-columns: 1fr;
  }

  .metadata-panel {
    position: static;
  }
}
</style>
