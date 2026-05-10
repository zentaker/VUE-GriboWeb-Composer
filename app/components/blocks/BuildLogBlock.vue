<script setup lang="ts">
defineProps<{
  items: Array<{
    date: string
    title: string
    meta: string
  }>
}>()
</script>

<template>
  <article id="log" class="build-card">
    <h2>Latest build log</h2>
    <div class="build-list">
      <div v-for="item in items" :key="item.title" class="build-item">
        <div class="build-date">{{ item.date }}</div>
        <div>
          <div class="build-title">{{ item.title }}</div>
          <div class="build-meta">{{ item.meta }}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.build-card {
  min-height: 292px;
  padding: 28px;
  border: 1px solid color-mix(in srgb, var(--line), transparent 40%);
  border-radius: var(--radius);
  background: var(--paper);
  box-shadow: var(--shadow);
}

h2 {
  margin: 0;
  font-size: 28px;
  line-height: 1;
  letter-spacing: -0.05em;
}

.build-list {
  display: grid;
  gap: 16px;
  margin-top: 22px;
}

.build-item {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.build-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.build-date {
  color: var(--coral);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.build-title {
  font-weight: 760;
  letter-spacing: -0.02em;
}

.build-meta {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
}
</style>
