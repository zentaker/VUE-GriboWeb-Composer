<script setup lang="ts">
defineProps<{
  title: string
  description: string
  fields?: string[]
}>()
</script>

<template>
  <AdminPanel :title="title">
    <p class="muted">{{ description }}</p>
    <div class="form-grid">
      <label v-for="field in fields ?? []" :key="field" class="field">
        <span>{{ field }}</span>
        <input class="input" type="text" :value="field === 'Title' ? 'Tennis Image Analysis Pipeline' : ''" readonly>
      </label>
    </div>
  </AdminPanel>
</template>

<style scoped>
.muted {
  margin: -4px 0 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.field {
  display: grid;
  gap: 7px;
}

.field span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  outline: 0;
  background: var(--paper-soft);
  color: var(--ink);
}

@media (max-width: 980px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
