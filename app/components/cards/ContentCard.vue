<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  meta?: string
  tags?: string[]
}>()
</script>

<template>
  <NuxtLink class="content-card card" :to="to">
    <span v-if="meta" class="eyebrow">{{ meta }}</span>
    <h3>{{ title }}</h3>
    <p class="muted">{{ description }}</p>
    <div v-if="tags?.length" class="tags">
      <TagPill v-for="tag in tags" :key="tag" :label="tag" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.content-card {
  display: grid;
  min-height: 230px;
  align-content: start;
  gap: 12px;
  padding: 24px;
  transition: transform 160ms ease, border-color 160ms ease;
}

.content-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--coral) 42%, var(--line));
}

h3 {
  margin: 0;
  font-size: clamp(1.35rem, 2vw, 2rem);
  line-height: 1.08;
}

p {
  margin: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
</style>
