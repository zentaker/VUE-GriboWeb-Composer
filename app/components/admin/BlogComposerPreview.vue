<script setup lang="ts">
type RichBlock = {
  id?: string
  type?: string
  title?: string
  visible?: boolean
  data?: Record<string, any>
}

withDefaults(defineProps<{
  title?: string
  description?: string
  category?: string
  date?: string
  status?: string
  coverStyle?: string
  accentColor?: string
  blocks?: RichBlock[]
}>(), {
  title: 'Untitled content',
  description: 'Editorial preview surface.',
  category: 'Field note',
  date: 'Draft',
  status: 'draft',
  coverStyle: 'editorial-gradient',
  accentColor: 'coral',
  blocks: () => []
})
</script>

<template>
  <div class="blog-preview-surface">
    <ArticleHero
      :title="title"
      :description="description"
      :category="category"
      :date="date"
      :status="status"
      :cover-style="coverStyle"
      :accent-color="accentColor"
    />
    <div v-if="blocks.length" class="blog-preview-blocks">
      <ContentBlockRenderer :blocks="blocks.slice(0, 2)" context="blog" />
    </div>
    <p v-else class="blog-preview-empty">No visible blocks yet. The public article will use the markdown fallback until blocks are added.</p>
  </div>
</template>

<style scoped>
.blog-preview-surface {
  display: grid;
  gap: 14px;
}

.blog-preview-surface :deep(.article-hero) {
  overflow: hidden;
  border-radius: 20px;
  box-shadow: none;
}

.blog-preview-surface :deep(.article-hero-grid) {
  grid-template-columns: 1.05fr 0.95fr;
  min-height: 260px;
}

.blog-preview-surface :deep(.hero-copy) {
  gap: 18px;
  padding: 16px;
}

.blog-preview-surface :deep(.hero-art) {
  min-height: 260px;
  border-top: 0;
  border-left: 1px solid var(--line);
}

.blog-preview-surface :deep(h1) {
  margin-top: 10px;
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.06em;
}

.blog-preview-surface :deep(.dek) {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.35;
}

.blog-preview-surface :deep(.byline) {
  gap: 10px;
}

.blog-preview-surface :deep(.terminal-window) {
  left: 12px;
  right: 12px;
  top: 20px;
  border-radius: 14px;
}

.blog-preview-surface :deep(.terminal-header) {
  padding: 9px 10px;
}

.blog-preview-surface :deep(.terminal-body) {
  padding: 10px;
  font-size: 10px;
  line-height: 1.6;
}

.blog-preview-surface :deep(.floating-note) {
  right: 12px;
  bottom: 12px;
  max-width: 150px;
  padding: 10px;
  font-size: 10px;
}

.blog-preview-surface :deep(.eyebrow),
.blog-preview-surface :deep(.byline strong),
.blog-preview-surface :deep(.byline span) {
  font-size: 10px;
}

.blog-preview-blocks {
  max-height: 360px;
  overflow: hidden;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper-soft);
}

.blog-preview-blocks :deep(.rich-blocks) {
  gap: 14px;
}

.blog-preview-blocks :deep(.rich-block h2) {
  font-size: 24px;
}

.blog-preview-blocks :deep(.block-copy),
.blog-preview-blocks :deep(.callout-block p),
.blog-preview-blocks :deep(.banner-block p) {
  font-size: 13px;
}

.blog-preview-empty {
  margin: 0;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
  color: var(--muted);
  font-size: 13px;
}

@media (max-width: 420px) {
  .blog-preview-surface :deep(.article-hero-grid) {
    grid-template-columns: 1fr;
  }

  .blog-preview-surface :deep(.hero-art) {
    min-height: 190px;
    border-top: 1px solid var(--line);
    border-left: 0;
  }
}
</style>
