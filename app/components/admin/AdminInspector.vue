<script setup lang="ts">
defineProps<{
  title?: string
  items?: Array<{ label: string, value: string }>
}>()
</script>

<template>
  <AdminPanel :title="title ?? 'Block inspector'" eyebrow="Inspector">
    <div class="inspector-list">
      <div v-for="item in items ?? []" :key="item.label" class="inspector-row">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </div>
    <slot />
  </AdminPanel>
</template>

<style scoped>
.inspector-list {
  display: grid;
  gap: 10px;
}

.inspector-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: color-mix(in srgb, var(--paper-soft), var(--paper) 10%);
}

span {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

strong {
  text-align: right;
  font-size: 13px;
}
</style>
