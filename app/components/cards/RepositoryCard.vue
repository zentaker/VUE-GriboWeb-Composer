<script setup lang="ts">
defineProps<{
  title: string
  description: string
  status: string
  to: string
  stack?: string[]
  progress?: number
  type?: string
}>()
</script>

<template>
  <NuxtLink class="repository-card" :to="to">
    <div class="repo-visual" />
    <div class="repo-body">
      <div class="repo-top">
        <span class="status-badge">{{ status }}</span>
        <span class="muted">{{ type ?? 'Living dossier' }}</span>
      </div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="repo-footer">
        <div v-if="stack?.length" class="stack">
          <span v-for="item in stack.slice(0, 3)" :key="item" class="tag">{{ item }}</span>
        </div>
        <div class="progress" :aria-label="`${progress ?? 35}% progress`">
          <span :style="{ width: `${progress ?? 35}%` }" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.repository-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.repository-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--coral), var(--line) 45%);
}

.repo-visual {
  min-height: 190px;
  background:
    linear-gradient(135deg, rgba(255, 111, 97, 0.82), rgba(207, 195, 255, 0.65)),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px 42px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.16) 0 1px, transparent 1px 42px);
  filter: saturate(0.82) brightness(0.82);
}

.repository-card:nth-child(2n) .repo-visual {
  background: linear-gradient(135deg, #d8f3dc, #ffe8a3);
}

.repo-body {
  display: grid;
  gap: 16px;
  padding: 24px;
}

.repo-top,
.repo-footer,
.stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.repo-top,
.repo-footer {
  justify-content: space-between;
}

h2 {
  margin: 0;
  font-size: clamp(30px, 4vw, 54px);
  font-weight: 900;
  letter-spacing: -0.075em;
  line-height: 0.95;
}

p {
  margin: 0;
  color: var(--muted);
}

.progress {
  width: 140px;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--paper-muted);
}

.progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--coral);
}
</style>
