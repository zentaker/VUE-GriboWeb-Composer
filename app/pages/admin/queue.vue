<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const checks = [
  ['Metadata complete', 'Ready', 'Project title, excerpt, and status are present.'],
  ['Social image', 'Blocked', 'Needs a later media-library selection.'],
  ['Docs links', 'Ready', 'Setup and architecture pages are connected.'],
  ['Editorial review', 'Review', 'Needs final copy pass before publish.'],
  ['SEO fields', 'Draft', 'Stage 1.3 will define the content model.']
]
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Publish Queue"
      title="Final checks before content goes live."
      description="Placeholder for SEO, metadata, media, preview checks, and editorial warnings. Publishing remains mock-only."
    />

    <section class="queue-layout">
      <AdminPanel title="Editorial checklist" eyebrow="Preflight">
        <div class="checklist">
          <article v-for="check in checks" :key="check[0]" class="check-item">
            <span class="check-dot">✓</span>
            <div>
              <strong>{{ check[0] }}</strong>
              <p>{{ check[2] }}</p>
            </div>
            <span class="status-badge">{{ check[1] }}</span>
          </article>
        </div>
      </AdminPanel>

      <AdminPanel title="Queue warnings" eyebrow="Mock status">
        <div class="warning-card">
          <strong>Publishing disabled</strong>
          <p>No real publish, save, webhook, auth, or deployment action exists in this stage.</p>
        </div>
        <div class="warning-card soft">
          <strong>Next required model</strong>
          <p>SEO metadata foundation should define canonical URLs, OG images, and excerpts before real queue work.</p>
        </div>
      </AdminPanel>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.queue-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 18px;
}

.checklist {
  display: grid;
  gap: 10px;
}

.check-item {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper-soft);
}

.check-dot {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--green), transparent 74%);
  color: var(--green);
  font-weight: 900;
}

.check-item p,
.warning-card p {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.warning-card {
  padding: 16px;
  border: 1px solid color-mix(in srgb, var(--coral), var(--line) 45%);
  border-radius: 20px;
  background: color-mix(in srgb, var(--coral), transparent 88%);
}

.warning-card.soft {
  margin-top: 12px;
  border-color: var(--line);
  background: var(--paper-soft);
}

@media (max-width: 980px) {
  .queue-layout {
    grid-template-columns: 1fr;
  }
}
</style>
