<script setup lang="ts">
defineProps<{
  index: number
  title: string
  description: string
  status?: string
}>()
</script>

<template>
  <article class="home-block-card">
    <div class="drag-handle">{{ String(index).padStart(2, '0') }}</div>
    <div class="block-info">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="block-actions">
      <span v-if="status" class="status-badge">{{ status }}</span>
      <button type="button" class="mini-btn">Edit</button>
      <button type="button" class="mini-btn">Duplicate</button>
      <button type="button" class="mini-btn">Hide</button>
      <button type="button" class="mini-btn">Delete</button>
    </div>
  </article>
</template>

<style scoped>
.home-block-card {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
  transition: 0.18s;
}

.home-block-card:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--paper-soft), var(--paper) 18%);
}

.drag-handle {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 17px;
  background: color-mix(in srgb, var(--coral), transparent 84%);
  color: var(--coral);
  cursor: grab;
  font-weight: 900;
}

h3 {
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.045em;
  line-height: 1.05;
}

p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.block-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.mini-btn {
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;
  font-weight: 780;
}

.mini-btn:hover {
  color: var(--ink);
}

@media (max-width: 680px) {
  .home-block-card {
    grid-template-columns: 1fr;
  }

  .block-actions {
    justify-content: flex-start;
  }
}
</style>
