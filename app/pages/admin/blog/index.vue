<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { listContent } = useAdminContent()
const { data, pending, refresh } = await useAsyncData('admin-blog-list', () => listContent('blog'))
const rows = computed(() => data.value?.items ?? [])
const statusFilter = ref('All')
const statusFilters = ['All', 'Draft', 'Review', 'Published', 'Archived']
const filteredRows = computed(() => {
  if (statusFilter.value === 'All') return rows.value
  return rows.value.filter((post) => String(post.status || 'draft').toLowerCase() === statusFilter.value.toLowerCase())
})

const editLink = (filePath: string) => `/admin/content/edit?type=blog&file=${encodeURIComponent(filePath)}`
const previewLink = (post: { publicPath: string, status: string }) => post.status === 'published'
  ? post.publicPath
  : `${post.publicPath}?preview=true`
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Blog Entries"
      title="Magazine drafts and published essays."
      description="Editorial surface for reading, editing, and creating Gribo article files inside content/blog."
    />

    <section class="blog-layout">
      <AdminPanel title="Editorial entries" eyebrow="Magazine queue">
        <template #action>
          <NuxtLink class="studio-btn" to="/admin/content/new?type=blog&direct=true">New Blog Entry</NuxtLink>
        </template>
        <div class="filters">
          <button
            v-for="filter in statusFilters"
            :key="filter"
            class="filter-pill"
            :class="{ active: statusFilter === filter }"
            type="button"
            @click="statusFilter = filter"
          >
            {{ filter }}
          </button>
          <button class="ghost-btn" type="button" @click="refresh">Refresh</button>
        </div>
        <p v-if="pending" class="muted">Reading content/blog...</p>
        <div v-else class="table-card">
          <div v-if="!filteredRows.length" class="empty-row">
            No blog entries match this filter.
          </div>
          <div v-for="post in filteredRows" :key="post.filePath" class="table-row">
            <div class="content-title">
              <strong>{{ post.title }}</strong>
              <span>{{ post.lab || 'unassigned' }} / {{ post.filePath }}</span>
            </div>
            <div class="row-actions">
              <span class="status-badge">{{ post.status }}</span>
              <NuxtLink class="mini-link" :to="previewLink(post)">{{ post.status === 'published' ? 'View' : 'Preview' }}</NuxtLink>
              <NuxtLink class="mini-link" :to="editLink(post.filePath)">Edit</NuxtLink>
            </div>
          </div>
        </div>
      </AdminPanel>

      <AdminInspector
        title="Entry metadata"
        :items="[
          { label: 'Collection', value: 'content/blog' },
          { label: 'Items', value: String(rows.length) },
          { label: 'Visible filter', value: statusFilter },
          { label: 'Editor', value: 'Markdown + frontmatter' },
          { label: 'Delete', value: 'Danger Zone only' }
        ]"
      >
        <div class="preview-copy">
          <strong>Stage 4 scope</strong>
          <p>Entries can now be created and saved as Nuxt Content markdown files. Auth and publishing workflow are still future stages.</p>
        </div>
      </AdminInspector>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.blog-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}

.filters,
.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.filters {
  margin-bottom: 18px;
}

.studio-btn,
.ghost-btn,
.mini-link,
.filter-pill {
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

.filter-pill.active {
  background: var(--ink);
  color: var(--bg);
}

.studio-btn:hover,
.ghost-btn:hover,
.mini-link:hover,
.filter-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.table-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 15px 18px;
  border-bottom: 1px solid var(--line);
}

.table-row:last-child {
  border-bottom: 0;
}

.empty-row {
  padding: 18px;
  color: var(--muted);
  font-size: 14px;
}

.content-title {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.content-title strong {
  letter-spacing: -0.025em;
}

.content-title span,
.preview-copy p {
  color: var(--muted);
  font-size: 13px;
}

.preview-copy {
  margin-top: 16px;
}

@media (max-width: 1080px) {
  .blog-layout,
  .table-row {
    grid-template-columns: 1fr;
  }

  .blog-layout {
    grid-template-columns: 1fr;
  }

  .table-row {
    display: grid;
  }
}
</style>
