<script setup lang="ts">
defineProps<{
  title: string
  description: string
  status: string
  accent: string
  tags: string[]
  to: string
  counts: {
    posts: number
    projects: number
    docs: number
  }
}>()
</script>

<template>
  <NuxtLink class="lab-card" :class="`accent-${accent}`" :to="to">
    <div class="lab-card__top">
      <span class="lab-orb" />
      <StatusBadge :label="status" />
    </div>

    <div>
      <p class="eyebrow">Research line</p>
      <h2>{{ title }}</h2>
      <p class="description">{{ description }}</p>
    </div>

    <div class="tag-row">
      <TagPill v-for="tag in tags.slice(0, 4)" :key="tag" :label="tag" />
    </div>

    <dl class="lab-stats">
      <div>
        <dt>Posts</dt>
        <dd>{{ counts.posts }}</dd>
      </div>
      <div>
        <dt>Projects</dt>
        <dd>{{ counts.projects }}</dd>
      </div>
      <div>
        <dt>Docs</dt>
        <dd>{{ counts.docs }}</dd>
      </div>
    </dl>
  </NuxtLink>
</template>

<style scoped>
.lab-card {
  position: relative;
  display: grid;
  min-height: 420px;
  gap: 24px;
  align-content: space-between;
  overflow: hidden;
  padding: clamp(22px, 3vw, 34px);
  border: 1px solid var(--line);
  border-radius: 32px;
  background:
    radial-gradient(circle at 100% 0%, var(--lab-glow), transparent 34%),
    linear-gradient(145deg, var(--paper), var(--paper-soft));
  box-shadow: var(--shadow);
}

.lab-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--lab-color), var(--line) 48%);
}

.lab-card__top,
.tag-row,
.lab-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lab-card__top {
  justify-content: space-between;
}

.lab-orb {
  width: 46px;
  height: 46px;
  border: 1px solid color-mix(in srgb, var(--lab-color), white 18%);
  border-radius: 50%;
  background:
    radial-gradient(circle at 34% 28%, rgba(255, 255, 255, 0.5), transparent 22%),
    var(--lab-color);
  box-shadow: 0 0 42px var(--lab-glow);
}

h2 {
  margin: 16px 0 0;
  font-size: clamp(38px, 4.4vw, 68px);
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.9;
}

.description {
  max-width: 620px;
  margin: 20px 0 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.55;
}

.tag-row {
  flex-wrap: wrap;
}

.lab-stats {
  justify-content: space-between;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.lab-stats div {
  min-width: 0;
}

dt {
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

dd {
  margin: 6px 0 0;
  color: var(--ink);
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.06em;
}

.accent-coral {
  --lab-color: var(--coral);
  --lab-glow: rgba(255, 121, 109, 0.2);
}

.accent-lavender {
  --lab-color: var(--lavender);
  --lab-glow: rgba(160, 145, 255, 0.2);
}

.accent-blue {
  --lab-color: var(--blue);
  --lab-glow: rgba(122, 169, 255, 0.18);
}

.accent-yellow {
  --lab-color: var(--yellow);
  --lab-glow: rgba(255, 205, 116, 0.2);
}

.accent-mint {
  --lab-color: var(--mint);
  --lab-glow: rgba(139, 232, 191, 0.18);
}
</style>
