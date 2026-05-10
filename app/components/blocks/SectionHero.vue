<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <section class="section-hero">
    <div>
      <p class="eyebrow"><span class="pulse" />{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
.section-hero {
  position: relative;
  overflow: hidden;
  padding: clamp(30px, 5vw, 58px);
  border: 1px solid var(--line);
  border-radius: 34px;
  background: linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

.section-hero::after {
  position: absolute;
  right: -170px;
  top: -190px;
  width: 470px;
  height: 470px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 121, 109, 0.42), rgba(119, 103, 201, 0.2) 52%, transparent 72%);
  content: '';
  pointer-events: none;
}

.section-hero > div {
  position: relative;
  z-index: 1;
  max-width: 900px;
}

h1 {
  margin: 24px 0 0;
  font-size: clamp(46px, 7vw, 104px);
  font-weight: 900;
  letter-spacing: -0.085em;
  line-height: 0.9;
}

p:last-child {
  max-width: 760px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 24px);
  letter-spacing: -0.025em;
  line-height: 1.35;
}

@media (max-width: 720px) {
  .section-hero {
    border-radius: 26px;
  }
}
</style>
