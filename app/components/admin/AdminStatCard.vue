<script setup lang="ts">
defineProps<{
  label: string
  value: string
  detail: string
}>()
</script>

<template>
  <article class="stat-card">
    <span>{{ label }}</span>
    <strong>{{ value }}</strong>
    <p>{{ detail }}</p>
  </article>
</template>

<style scoped>
.stat-card {
  display: flex;
  min-height: 150px;
  flex-direction: column;
  justify-content: space-between;
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
  display: block;
  margin-top: 12px;
  font-size: 44px;
  letter-spacing: -0.07em;
  line-height: 1;
}

p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}
</style>
