<script setup lang="ts">
defineProps<{
  title: string
  description: string
  status?: string
  stack?: string[]
}>()
</script>

<template>
  <section class="project-hero">
    <div class="project-copy">
      <p class="eyebrow"><span class="pulse" />Living project repository</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="stack">
        <span v-if="status" class="status-badge">{{ status }}</span>
        <span v-for="item in stack ?? []" :key="item" class="tag">{{ item }}</span>
      </div>
    </div>
    <div class="project-map" aria-hidden="true">
      <div class="map-node large">Core</div>
      <div class="map-node">Docs</div>
      <div class="map-node">Notes</div>
      <div class="map-node">Build</div>
    </div>
  </section>
</template>

<style scoped>
.project-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) 0.85fr;
  gap: 22px;
  overflow: hidden;
  padding: clamp(30px, 5vw, 58px);
  border: 1px solid var(--line);
  border-radius: 34px;
  background: linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

.project-copy {
  min-width: 0;
}

h1 {
  margin: 28px 0 0;
  font-size: clamp(46px, 7vw, 98px);
  font-weight: 900;
  letter-spacing: -0.085em;
  line-height: 0.9;
}

.project-copy > p:last-of-type {
  max-width: 760px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.35;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 34px;
}

.project-map {
  position: relative;
  min-height: 420px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    radial-gradient(circle at 25% 22%, rgba(255, 121, 109, 0.5), transparent 28%),
    radial-gradient(circle at 78% 70%, rgba(119, 103, 201, 0.36), transparent 32%),
    var(--paper-soft);
}

.map-node {
  position: absolute;
  display: grid;
  width: 92px;
  height: 92px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper);
  color: var(--muted);
  font-weight: 850;
}

.map-node.large {
  left: 50%;
  top: 45%;
  width: 138px;
  height: 138px;
  color: var(--ink);
  transform: translate(-50%, -50%);
}

.map-node:nth-child(2) {
  left: 32px;
  top: 42px;
}

.map-node:nth-child(3) {
  right: 36px;
  top: 76px;
}

.map-node:nth-child(4) {
  right: 76px;
  bottom: 46px;
}

@media (max-width: 980px) {
  .project-hero {
    grid-template-columns: 1fr;
  }
}
</style>
