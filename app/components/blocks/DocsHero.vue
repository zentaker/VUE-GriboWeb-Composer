<script setup lang="ts">
defineProps<{
  title: string
  description: string
  section?: string
}>()
</script>

<template>
  <section class="docs-hero">
    <p class="eyebrow"><span class="pulse" />{{ section ?? 'Research documentation' }}</p>
    <h1>{{ title }}</h1>
    <p class="lede">{{ description }}</p>
    <div class="hero-actions">
      <a class="pill-button" href="#content">Start reading</a>
      <NuxtLink class="pill-button" to="/repository/tennis-image-analysis">View project</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.docs-hero {
  position: relative;
  overflow: hidden;
  padding: clamp(30px, 5vw, 56px);
  border: 1px solid var(--line);
  border-radius: 32px;
  background: linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

.docs-hero::after {
  position: absolute;
  right: -160px;
  top: -180px;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 121, 109, 0.48), rgba(119, 103, 201, 0.2) 54%, transparent 72%);
  content: '';
  pointer-events: none;
}

.docs-hero > * {
  position: relative;
  z-index: 1;
}

h1 {
  max-width: 940px;
  margin: 28px 0 0;
  font-size: clamp(46px, 6.2vw, 88px);
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.9;
}

.lede {
  max-width: 820px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 23px);
  line-height: 1.4;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
</style>
