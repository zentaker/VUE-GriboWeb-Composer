<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const queueItems = [
  { title: 'When Agents Promise Autonomy but Deliver Friction', type: 'Essay', status: 'Draft' },
  { title: 'Tennis Image Analysis Pipeline', type: 'Project', status: 'Review' },
  { title: 'AI Documentation as Product Interface', type: 'Docs', status: 'Scheduled' }
]
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Overview"
      title="Editorial cockpit for Gribo Digital."
      description="Mock surface for planning home modules, articles, projects, docs, media, and publishing queues."
    />

    <section class="stats-grid">
      <AdminStatCard label="Magazine queue" value="12" detail="Drafts, essays, and editorial fragments." />
      <AdminStatCard label="Repository shelf" value="04" detail="Living project records staged for metadata." />
      <AdminStatCard label="Labs map" value="05" detail="Research tracks prepared for Stage 1.2." />
      <AdminStatCard label="Publish queue" value="03" detail="Mock checks waiting for editorial review." />
    </section>

    <section class="grid-2">
      <AdminPanel title="Editorial queue" eyebrow="Magazine">
        <div class="content-rows">
          <article v-for="item in queueItems" :key="item.title" class="content-row">
            <div class="content-title">
              <strong>{{ item.title }}</strong>
              <span>{{ item.type }} / Gribo Digital</span>
            </div>
            <span class="status-badge">{{ item.status }}</span>
          </article>
        </div>
      </AdminPanel>

      <AdminPanel title="Studio map" eyebrow="Infrastructure">
        <div class="path-card">content/
  blog/
  projects/
  docs/
  home/
  settings/

admin/
  home composer
  editorial queue
  repository manager
  publish checks</div>
      </AdminPanel>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.content-rows {
  display: grid;
  gap: 10px;
}

.content-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 15px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: color-mix(in srgb, var(--paper-soft), var(--paper) 10%);
}

.content-title {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.content-title strong {
  letter-spacing: -0.025em;
}

.content-title span {
  color: var(--muted);
  font-size: 12px;
}

.path-card {
  overflow: auto;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--code-bg);
  color: var(--code-ink);
  font-size: 13px;
  line-height: 1.75;
  white-space: pre-wrap;
}

@media (max-width: 980px) {
  .stats-grid,
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
