<script setup lang="ts">
defineProps<{
  title: string
  description: string
  category?: string
  date?: string
  status?: string
  coverStyle?: string
  accentColor?: string
}>()
</script>

<template>
  <section class="article-hero">
    <div class="article-hero-grid">
      <div class="hero-copy">
        <div>
          <p class="eyebrow"><span class="pulse" />{{ category ?? 'Field note' }}</p>
          <h1>{{ title }}</h1>
          <p class="dek">{{ description }}</p>
        </div>
        <div class="byline">
          <div>
            <strong>Gribo Digital</strong>
            <span>Editorial laboratory</span>
          </div>
          <div>
            <strong>{{ date ?? 'Draft' }}</strong>
            <span>{{ status ?? 'working note' }}</span>
          </div>
        </div>
      </div>
      <div
        class="hero-art"
        :class="`style-${coverStyle || 'editorial-gradient'}`"
        :style="{ '--cover-accent': `var(--${accentColor || 'coral'}, var(--coral))` }"
      >
        <div class="terminal-window">
          <div class="terminal-header"><span /><span /><span /></div>
          <div class="terminal-body">
            <div><b>$</b> gribo story inspect</div>
            <div><em>✓</em> content: loaded</div>
            <div><em>✓</em> archive: living</div>
            <div><i>!</i> friction: visible</div>
            <div><b>→</b> publish mode: editorial draft</div>
          </div>
        </div>
        <div class="floating-note">Systems become visible where promises meet setup, latency, interfaces, and maintenance.</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.article-hero {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 38px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.article-hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  min-height: 620px;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 5vw, 72px);
  justify-content: space-between;
  padding: clamp(34px, 5vw, 62px);
}

h1 {
  margin: 34px 0 0;
  font-size: clamp(46px, 6vw, 84px);
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.9;
}

.dek {
  max-width: 660px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.35;
}

.byline {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  color: var(--muted);
}

.byline div {
  display: grid;
  gap: 3px;
}

.byline strong {
  color: var(--ink);
  font-size: 14px;
}

.byline span {
  font-size: 13px;
}

.hero-art {
  position: relative;
  min-height: 620px;
  overflow: hidden;
  border-left: 1px solid var(--line);
  background:
    radial-gradient(circle at 24% 18%, color-mix(in srgb, var(--cover-accent), transparent 12%), transparent 28%),
    radial-gradient(circle at 78% 82%, rgba(119, 103, 201, 0.7), transparent 30%),
    linear-gradient(145deg, #191714, #332b26);
}

.hero-art.style-soft-magazine {
  background:
    radial-gradient(circle at 20% 16%, color-mix(in srgb, var(--cover-accent), transparent 20%), transparent 32%),
    radial-gradient(circle at 78% 82%, rgba(255, 247, 238, 0.32), transparent 30%),
    linear-gradient(145deg, #3a302a, #171412);
}

.hero-art.style-minimal-dark,
.hero-art.style-terminal-dark {
  background: linear-gradient(145deg, #0f0e0d, #25211f);
}

.terminal-window {
  position: absolute;
  left: 38px;
  right: 38px;
  top: 78px;
  overflow: hidden;
  border: 1px solid rgba(255, 247, 238, 0.14);
  border-radius: 24px;
  background: rgba(13, 12, 11, 0.82);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.36);
}

.terminal-header {
  display: flex;
  gap: 7px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 247, 238, 0.1);
}

.terminal-header span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--coral);
}

.terminal-header span:nth-child(2) {
  background: var(--yellow);
}

.terminal-header span:nth-child(3) {
  background: var(--green);
}

.terminal-body {
  padding: 18px;
  color: rgba(255, 247, 238, 0.78);
  font-size: 13px;
  line-height: 1.8;
}

.terminal-body b {
  color: #ffb0a9;
  font-style: normal;
}

.terminal-body em {
  color: #a7e5b2;
  font-style: normal;
}

.terminal-body i {
  color: #ffe8a3;
  font-style: normal;
}

.floating-note {
  position: absolute;
  right: 42px;
  bottom: 44px;
  max-width: 320px;
  padding: 18px;
  border: 1px solid rgba(255, 247, 238, 0.14);
  border-radius: 22px;
  background: rgba(255, 247, 238, 0.1);
  color: rgba(255, 247, 238, 0.8);
  backdrop-filter: blur(14px);
}

@media (max-width: 980px) {
  .article-hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-art {
    min-height: 440px;
    border-top: 1px solid var(--line);
    border-left: 0;
  }
}

@media (max-width: 680px) {
  .article-hero {
    border-radius: 28px;
  }
}
</style>
