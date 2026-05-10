<script setup lang="ts">
defineProps<{
  title: string
  items: Array<{ label: string, title: string, to: string }>
}>()
</script>

<template>
  <section class="related-content">
    <h2>{{ title }}</h2>
    <div class="related-grid">
      <NuxtLink v-for="item in items" :key="item.title" class="related-card" :to="item.to">
        <span>{{ item.label }}</span>
        <strong>{{ item.title }}</strong>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.related-content {
  margin-top: 42px;
}

h2 {
  margin: 0 0 16px;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 900;
  letter-spacing: -0.065em;
  line-height: 1;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.related-card {
  display: block;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
}

.related-card span {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 13px;
}

.related-card strong {
  display: block;
  letter-spacing: -0.035em;
  line-height: 1.1;
}

@media (max-width: 680px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
