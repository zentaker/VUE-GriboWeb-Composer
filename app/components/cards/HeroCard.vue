<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description: string
  cta?: string
  to?: string
}>()
</script>

<template>
  <article class="hero-card">
    <div class="hero-copy">
      <p v-if="eyebrow" class="eyebrow"><span class="pulse" />{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="muted">{{ description }}</p>
      <NuxtLink v-if="to && cta" class="pill-button" :to="to">{{ cta }}</NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 760px;
}

h1 {
  margin: 14px 0;
  font-size: clamp(3.2rem, 8vw, 7.8rem);
  line-height: 0.95;
}

p.muted {
  max-width: 660px;
  margin-bottom: 26px;
  font-size: clamp(1rem, 2vw, 1.28rem);
}
</style>
