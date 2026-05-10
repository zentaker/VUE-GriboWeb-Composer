<template>
  <section id="thinking" class="home-section thinking">
    <div class="manifesto">
      <h2>Build, reflect, archive, evolve.</h2>
      <p>Gribo works like external memory: it records what is being built, what breaks, what changes and what eventually becomes a system.</p>
    </div>
    <slot />
  </section>
</template>

<style scoped>
.home-section {
  padding: 48px 0;
}

.thinking {
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 20px;
}

.manifesto {
  display: flex;
  min-height: 430px;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px;
  border-radius: var(--radius);
  background: var(--ink);
  color: var(--bg);
}

h2 {
  margin: 0;
  font-size: clamp(40px, 5vw, 74px);
  line-height: 0.9;
  letter-spacing: -0.075em;
}

p {
  max-width: 520px;
  margin: 0;
  color: color-mix(in srgb, var(--bg), transparent 28%);
  font-size: 18px;
}

@media (max-width: 1100px) {
  .thinking {
    grid-template-columns: 1fr;
  }
}
</style>
