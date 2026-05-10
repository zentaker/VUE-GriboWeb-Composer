<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const assets = ['openclaw-terminal.png', 'tennis-analysis-card.jpg', 'gribo-park-night.png', 'ai-docs-interface.png', 'studio-preview.png', 'lab-map-card.jpg']
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Media Library"
      title="Images, mockups, and visual references."
      description="Placeholder grid for future uploads. No real image upload or media persistence is implemented in this stage."
    />

    <section class="media-grid">
      <article v-for="item in assets" :key="item" class="media-item">
        <div class="media-thumb" />
        <div class="media-meta">
          <strong>{{ item }}</strong>
          <span>Reserved asset slot</span>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.media-item {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
}

.media-thumb {
  aspect-ratio: 1 / 0.78;
  background: linear-gradient(135deg, var(--coral), var(--lavender));
  filter: saturate(0.9);
}

.media-item:nth-child(2n) .media-thumb {
  background: linear-gradient(135deg, var(--mint), var(--yellow));
}

.media-item:nth-child(3n) .media-thumb {
  background: linear-gradient(135deg, var(--blue), var(--rose));
}

.media-meta {
  padding: 12px;
}

.media-meta strong {
  display: block;
  font-size: 13px;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.media-meta span {
  color: var(--muted);
  font-size: 12px;
}

@media (max-width: 1280px) {
  .media-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 680px) {
  .media-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
