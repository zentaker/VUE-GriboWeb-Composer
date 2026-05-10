<script setup lang="ts">
defineProps<{
  tabs: string[]
  active?: string
  disabledTabs?: string[]
}>()
</script>

<template>
  <div class="admin-tabs" role="tablist" aria-label="Mock editor tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      :disabled="disabledTabs?.includes(tab)"
      :class="{ active: tab === (active ?? tabs[0]), disabled: disabledTabs?.includes(tab) }"
    >
      {{ tab }}<span v-if="disabledTabs?.includes(tab)">Later</span>
    </button>
  </div>
</template>

<style scoped>
.admin-tabs {
  display: inline-flex;
  gap: 3px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
}

button {
  min-height: 32px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 13px;
  font-weight: 760;
}

button.active {
  background: var(--ink);
  color: var(--bg);
}

button.disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

button span {
  margin-left: 6px;
  color: inherit;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
