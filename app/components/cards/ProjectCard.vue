<script setup lang="ts">
defineProps<{
  title: string
  description: string
  status: string
  to: string
  stack?: string[]
}>()
</script>

<template>
  <NuxtLink class="project-card card" :to="to">
    <StatusBadge :label="status" />
    <h3>{{ title }}</h3>
    <p class="muted">{{ description }}</p>
    <div v-if="stack?.length" class="stack">
      <TagPill v-for="item in stack" :key="item" :label="item" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.project-card {
  display: grid;
  gap: 12px;
  padding: 24px;
  min-height: 250px;
  align-content: start;
}

h3 {
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.1;
}

p {
  margin: 0;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
