<script setup lang="ts">
defineProps<{
  items: Array<{ label: string, value: string }>
}>()
</script>

<template>
  <section class="project-meta-grid">
    <article v-for="item in items" :key="item.label" class="meta-card">
      <span>{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
    </article>
  </section>
</template>

<style scoped>
.project-meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.meta-card {
  display: grid;
  gap: 18px;
  min-height: 138px;
  align-content: space-between;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper-soft);
}

span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

strong {
  font-size: 24px;
  letter-spacing: -0.055em;
  line-height: 1;
}

@media (max-width: 980px) {
  .project-meta-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 620px) {
  .project-meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
