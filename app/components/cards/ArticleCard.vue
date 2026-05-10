<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  date?: string
  category?: string
  tags?: string[]
  readingTime?: string
}>()
</script>

<template>
  <NuxtLink class="article-card" :to="to">
    <div class="article-card-top">
      <span class="status-badge">{{ category ?? 'Field note' }}</span>
      <span class="muted">{{ readingTime ?? '4 min read' }}</span>
    </div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <div class="article-card-footer">
      <span class="muted">{{ date ?? 'Draft' }}</span>
      <div v-if="tags?.length" class="tags">
        <span v-for="tag in tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.article-card {
  display: grid;
  min-height: 330px;
  align-content: space-between;
  gap: 24px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper);
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--coral), var(--line) 45%);
  background: color-mix(in srgb, var(--paper), var(--paper-soft) 26%);
}

.article-card-top,
.article-card-footer,
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.article-card-top,
.article-card-footer {
  justify-content: space-between;
}

h2 {
  margin: 0;
  font-size: clamp(30px, 3.6vw, 54px);
  font-weight: 900;
  letter-spacing: -0.075em;
  line-height: 0.95;
}

p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
}
</style>
