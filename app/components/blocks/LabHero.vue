<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description: string
  accent?: string
}>()
</script>

<template>
  <section class="lab-hero" :class="accent ? `accent-${accent}` : 'accent-coral'">
    <div>
      <p class="eyebrow"><span class="pulse" />{{ eyebrow ?? 'Editorial research line' }}</p>
      <h1>{{ title }}</h1>
    </div>
    <p>{{ description }}</p>
  </section>
</template>

<style scoped>
.lab-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(280px, 0.88fr);
  gap: clamp(24px, 5vw, 70px);
  align-items: end;
  overflow: hidden;
  min-height: 430px;
  padding: clamp(28px, 5vw, 58px);
  border: 1px solid var(--line);
  border-radius: 36px;
  background:
    radial-gradient(circle at 86% 8%, var(--lab-glow), transparent 34%),
    linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

h1 {
  max-width: 920px;
  margin: 30px 0 0;
  font-size: clamp(58px, 9vw, 132px);
  font-weight: 900;
  letter-spacing: -0.085em;
  line-height: 0.88;
}

.lab-hero > p {
  max-width: 560px;
  margin: 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 25px);
  line-height: 1.42;
  letter-spacing: -0.025em;
}

.accent-coral {
  --lab-glow: rgba(255, 121, 109, 0.16);
}

.accent-lavender {
  --lab-glow: rgba(160, 145, 255, 0.18);
}

.accent-blue {
  --lab-glow: rgba(122, 169, 255, 0.16);
}

.accent-yellow {
  --lab-glow: rgba(255, 205, 116, 0.16);
}

.accent-mint {
  --lab-glow: rgba(139, 232, 191, 0.16);
}

@media (max-width: 860px) {
  .lab-hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}
</style>
