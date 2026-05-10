<template>
  <section class="home-hero">
    <div class="hero-copy">
      <div>
        <p class="eyebrow"><span class="pulse" />Digital systems magazine-lab</p>
        <h1>Ideas that become systems.</h1>
        <p class="hero-subtitle">
          Gribo Digital documents systems, prototypes, research notes and cultural infrastructure through a living editorial archive.
        </p>
        <div class="hero-actions">
          <NuxtLink class="home-button primary" to="/repository">Explore projects</NuxtLink>
          <NuxtLink class="home-button secondary" to="/labs">Explore labs</NuxtLink>
        </div>
      </div>
    </div>
    <div class="hero-side">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 36px;
  padding: 74px 0 34px;
}

.hero-copy {
  position: relative;
  display: flex;
  min-height: 610px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: clamp(32px, 5vw, 68px);
  border: 1px solid color-mix(in srgb, var(--line), transparent 40%);
  border-radius: var(--radius);
  background: var(--paper);
  box-shadow: var(--shadow);
}

.hero-copy::after {
  position: absolute;
  right: -140px;
  top: -180px;
  width: 460px;
  height: 460px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--hero-glow), rgba(109, 97, 184, 0.11) 58%, transparent 70%);
  content: '';
  pointer-events: none;
}

.hero-copy > div {
  position: relative;
  z-index: 1;
}

h1 {
  max-width: 950px;
  margin: 64px 0 0;
  font-size: clamp(54px, 8vw, 128px);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.085em;
}

.hero-subtitle {
  max-width: 720px;
  margin: 34px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 1.8vw, 26px);
  letter-spacing: -0.025em;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 44px;
}

.home-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32);
}

.home-button.primary {
  background: var(--ink);
  color: var(--bg);
}

.home-button.secondary {
  background: transparent;
}

.hero-side {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 22px;
}

@media (max-width: 1100px) {
  .home-hero {
    grid-template-columns: 1fr;
    padding-top: 44px;
  }

  .hero-copy {
    min-height: auto;
  }

  .hero-side {
    grid-template-rows: auto;
  }
}

@media (max-width: 720px) {
  .home-hero {
    gap: 18px;
  }

  .hero-copy {
    padding: 28px;
    border-radius: 24px;
  }

  h1 {
    margin-top: 42px;
  }
}
</style>
