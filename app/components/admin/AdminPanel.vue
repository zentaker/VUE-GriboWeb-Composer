<script setup lang="ts">
defineProps<{
  title?: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="admin-panel">
    <div v-if="title || eyebrow" class="panel-head">
      <div>
        <p v-if="eyebrow" class="panel-eyebrow">{{ eyebrow }}</p>
        <h2 v-if="title">{{ title }}</h2>
      </div>
      <slot name="action" />
    </div>
    <slot />
  </section>
</template>

<style scoped>
.admin-panel {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper-soft);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.panel-eyebrow {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.06em;
  line-height: 1;
}
</style>
