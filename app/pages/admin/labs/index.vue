<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { listContent } = useAdminContent()
const { data, pending, refresh } = await useAsyncData('admin-labs-list', () => listContent('labs'))
const labs = computed(() => data.value?.items ?? [])
const editLink = (filePath: string) => `/admin/content/edit?type=labs&file=${encodeURIComponent(filePath)}`
const previewLink = (lab: { publicPath: string, status: string }) => lab.status === 'published'
  ? lab.publicPath
  : `${lab.publicPath}?preview=true`
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Labs"
      title="Editorial research lines."
      description="Edit the living areas that group Gribo essays, projects, documentation, and open questions."
    />

    <section class="labs-layout">
      <AdminPanel title="Research lines" eyebrow="content/labs">
        <template #action>
          <NuxtLink class="studio-btn" to="/admin/content/new?type=labs&direct=true">New Lab</NuxtLink>
        </template>
        <button class="ghost-btn" type="button" @click="refresh">Refresh list</button>
        <p v-if="pending" class="muted">Reading content/labs...</p>
        <div v-else class="labs-grid">
          <article v-for="lab in labs" :key="lab.filePath" class="lab-row">
            <div>
              <p class="eyebrow">{{ lab.slug }} / {{ lab.status }}</p>
              <h3>{{ lab.title }}</h3>
              <p>{{ lab.description }}</p>
              <div class="tag-list">
                <span v-for="tag in lab.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="row-actions">
              <NuxtLink class="mini-link" :to="previewLink(lab)">{{ lab.status === 'published' ? 'View' : 'Preview' }}</NuxtLink>
              <NuxtLink class="mini-link" :to="editLink(lab.filePath)">Edit</NuxtLink>
            </div>
          </article>
        </div>
      </AdminPanel>

      <AdminInspector
        title="Lab fields"
        :items="[
          { label: 'Description', value: 'Editable' },
          { label: 'Related tags', value: 'Editable' },
          { label: 'Roadmap', value: 'Editable' },
          { label: 'Open questions', value: 'Editable' }
        ]"
      />
    </section>
  </div>
</template>

<style scoped>
.admin-page,
.labs-grid {
  display: grid;
  gap: 24px;
}

.labs-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}

.lab-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 18px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper);
}

.lab-row h3 {
  margin: 0;
  font-size: 30px;
  letter-spacing: -0.065em;
}

.lab-row p:last-of-type {
  color: var(--muted);
  line-height: 1.6;
}

.tag-list,
.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

@media (max-width: 1080px) {
  .labs-layout,
  .lab-row {
    grid-template-columns: 1fr;
  }
}
</style>
