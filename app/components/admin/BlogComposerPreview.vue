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
    <div class="blog-preview-scale">
      <ArticleHero
        :title="title"
        :description="description"
        :category="category"
        :date="date"
        :status="status"
        :cover-style="coverStyle"
        :accent-color="accentColor"
      />
    </div>
  </div>
</template>

<style scoped>
.blog-preview-surface {
  --preview-scale: 0.44;
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.blog-preview-scale {
  width: calc(100% / var(--preview-scale));
  transform: scale(var(--preview-scale));
  transform-origin: top left;
}

.blog-preview-surface :deep(.article-hero) {
  overflow: hidden;
  border-radius: 24px;
  box-shadow: none;
}

.blog-preview-surface :deep(.article-hero-grid) {
  grid-template-columns: 1.05fr 0.95fr !important;
  min-height: 480px;
}

.blog-preview-surface :deep(.hero-copy) {
  gap: 28px;
  padding: 32px;
}

.blog-preview-surface :deep(.hero-art) {
  min-height: 480px;
  border-top: 0 !important;
  border-left: 1px solid var(--line) !important;
}

.blog-preview-surface :deep(h1) {
  margin-top: 22px;
  font-size: 48px;
  letter-spacing: -0.06em;
  line-height: 0.92;
}

.blog-preview-surface :deep(.dek) {
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.35;
}

.blog-preview-surface :deep(.byline) {
  gap: 18px;
}

.blog-preview-surface :deep(.terminal-window) {
  left: 28px;
  right: 28px;
  top: 48px;
  border-radius: 18px;
}

.blog-preview-surface :deep(.terminal-header) {
  padding: 11px 12px;
}

.blog-preview-surface :deep(.terminal-body) {
  padding: 14px;
  font-size: 11px;
  line-height: 1.7;
}

.blog-preview-surface :deep(.floating-note) {
  right: 30px;
  bottom: 28px;
  max-width: 210px;
  padding: 13px;
  font-size: 11px;
}

.blog-preview-surface :deep(.eyebrow),
.blog-preview-surface :deep(.byline strong),
.blog-preview-surface :deep(.byline span) {
  font-size: 11px;
}

@media (max-width: 420px) {
  .blog-preview-surface {
    --preview-scale: 0.4;
    height: 232px;
  }
}
</style>
