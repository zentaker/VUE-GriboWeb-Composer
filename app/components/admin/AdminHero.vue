<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <section class="admin-hero">
    <p class="eyebrow"><span class="pulse" />{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </section>
</template>

<style scoped>
.admin-hero {
  position: relative;
  overflow: hidden;
  padding: clamp(30px, 5vw, 54px);
  border: 1px solid var(--line);
  border-radius: 34px;
  background: linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

.admin-hero::after {
  position: absolute;
  right: -170px;
  top: -190px;
  width: 470px;
  height: 470px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 121, 109, 0.5), rgba(119, 103, 201, 0.22) 52%, transparent 72%);
  content: '';
  pointer-events: none;
}

.admin-hero > * {
  position: relative;
  z-index: 1;
}

h1 {
  max-width: 860px;
  margin: 18px 0 0;
  font-size: clamp(42px, 6vw, 88px);
  font-weight: 900;
  letter-spacing: -0.075em;
  line-height: 0.92;
}

p:last-child {
  max-width: 760px;
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 18px;
}

@media (max-width: 680px) {
  .admin-hero {
    border-radius: 26px;
  }
}
</style>
