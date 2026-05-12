<script setup lang="ts">
type LinkItem = {
  label?: string
  title?: string
  to?: string
  href?: string
  active?: boolean
}

const props = defineProps<{
  project: Record<string, any>
  payload: Record<string, any>
  docLinks?: LinkItem[]
}>()

const theme = computed(() => props.payload.theme || {})
const hero = computed(() => props.payload.hero || {})
const sections = computed(() => Array.isArray(props.payload.sections) ? props.payload.sections : [])
const meta = computed(() => Array.isArray(props.payload.meta) ? props.payload.meta : [])
const sidebar = computed(() => Array.isArray(props.payload.sidebar) ? props.payload.sidebar : [])
const rail = computed(() => Array.isArray(props.payload.rail) ? props.payload.rail : [])

const shellStyle = computed(() => ({
  '--pov-accent': accentValue(props.project.overviewAccentColor || theme.value.accentColor || 'coral'),
  '--pov-secondary': accentValue(props.project.overviewSecondaryAccent || theme.value.secondaryAccent || 'lavender')
}))

const heroTitle = computed(() => hero.value.title || props.project.title)
const heroSubtitle = computed(() => hero.value.subtitle || props.project.summary || props.project.description)
const heroEyebrow = computed(() => hero.value.eyebrow || `Living project repository / ${props.project.status || 'draft'}`)

const leftLinks = computed(() => {
  const docs = (props.docLinks || []).map((doc) => ({
    label: doc.label || doc.title,
    to: doc.to || doc.href
  }))
  return {
    start: sidebar.value.length ? sidebar.value : [
      { label: 'Overview', to: '#overview', active: true },
      { label: 'Project memory', to: '#memory' },
      { label: 'Project index', to: '#index' },
      { label: 'Documentation', to: '#documentation' },
      { label: 'Build log', to: '#build-log' }
    ],
    docs
  }
})

function accentValue(value: string) {
  const colors: Record<string, string> = {
    coral: '#ff796d',
    lavender: '#7767c9',
    cream: '#fff7ee',
    graphite: '#38332e',
    'soft-red': '#f5b8c5',
    'muted-violet': '#8f7fe8',
    blue: '#5e86b7',
    mint: '#6ca47a',
    yellow: '#c9a84d'
  }
  return colors[value] || value || colors.coral
}

function sectionId(section: Record<string, any>, index: number) {
  return section.id || `section-${index + 1}`
}

function items(value: unknown) {
  return Array.isArray(value) ? value : []
}
</script>

<template>
  <div class="pov-shell" :style="shellStyle">
    <div class="pov-layout">
      <aside class="pov-sidebar" aria-label="Project navigation">
        <div class="pov-side-title">Start</div>
        <a
          v-for="link in leftLinks.start"
          :key="link.to || link.label"
          class="pov-side-link"
          :class="{ active: link.active }"
          :href="link.to || '#overview'"
        >
          {{ link.label || link.title }}
        </a>

        <div class="pov-side-title">Documentation</div>
        <a
          v-for="link in leftLinks.docs"
          :key="link.to || link.label"
          class="pov-side-link"
          :href="link.to || '#documentation'"
        >
          {{ link.label || link.title }}
        </a>
        <p v-if="!leftLinks.docs.length" class="pov-side-note">No documentation attached yet.</p>

        <div class="pov-note">
          <strong>{{ payload.sidebarNote?.title || 'Overview behavior' }}</strong>
          <p>{{ payload.sidebarNote?.body || 'This overview is rendered from a structured project payload, not raw HTML.' }}</p>
        </div>
      </aside>

      <main class="pov-content">
        <article class="pov-doc">
          <div class="pov-breadcrumb">
            <span>Repository</span><span>/</span><span>{{ project.title }}</span><span>/</span><span>Overview</span>
          </div>

          <section id="overview" class="pov-hero">
            <div class="pov-eyebrow"><span class="pov-pulse" />{{ heroEyebrow }}</div>
            <h1>{{ heroTitle }}</h1>
            <p class="pov-hero-subtitle">{{ heroSubtitle }}</p>
            <div v-if="items(hero.actions).length" class="pov-actions">
              <a
                v-for="action in hero.actions"
                :key="action.to || action.label"
                class="pov-pill"
                :class="{ primary: action.primary }"
                :href="action.to || '#overview'"
              >
                {{ action.label }}
              </a>
            </div>
          </section>

          <div v-if="meta.length" id="project-state" class="pov-meta-grid">
            <div v-for="item in meta" :key="item.label" class="pov-meta-card">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>

          <template v-for="(section, index) in sections" :key="sectionId(section, index)">
            <section
              v-if="section.type === 'memory'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div class="pov-grid-2">
                <article
                  v-for="card in items(section.cards)"
                  :key="card.title"
                  class="pov-card pov-big-card"
                  :class="{ 'accent-card': card.variant === 'accent', 'warning-card': card.variant === 'warning' }"
                >
                  <h3>{{ card.title }}</h3>
                  <p>{{ card.body }}</p>
                  <ul v-if="items(card.items).length">
                    <li v-for="item in card.items" :key="item">{{ item }}</li>
                  </ul>
                </article>
              </div>
              <div v-if="section.callout" class="pov-callout">
                <div class="pov-callout-icon">{{ section.callout.icon || '!' }}</div>
                <div>
                  <h3>{{ section.callout.title }}</h3>
                  <p>{{ section.callout.body }}</p>
                </div>
              </div>
            </section>

            <section
              v-else-if="section.type === 'cards'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div :class="section.columns === 2 ? 'pov-grid-2' : 'pov-grid-3'">
                <article v-for="card in items(section.cards)" :key="card.title" class="pov-card">
                  <h3>{{ card.title }}</h3>
                  <p>{{ card.body }}</p>
                  <ul v-if="items(card.items).length">
                    <li v-for="item in card.items" :key="item">{{ item }}</li>
                  </ul>
                </article>
              </div>
            </section>

            <section
              v-else-if="section.type === 'lenses'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div class="pov-lens-grid">
                <article v-for="(lens, lensIndex) in items(section.items)" :key="lens.title" class="pov-lens">
                  <div class="pov-lens-number">{{ String(lensIndex + 1).padStart(2, '0') }}</div>
                  <div>
                    <h3>{{ lens.title }}</h3>
                    <p>{{ lens.body }}</p>
                  </div>
                </article>
              </div>
            </section>

            <section
              v-else-if="section.type === 'index'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div class="pov-index-grid">
                <a v-for="(item, itemIndex) in items(section.items)" :key="item.title" class="pov-index-item" :href="item.to || '#'">
                  <div class="pov-index-num">{{ String(itemIndex + 1).padStart(2, '0') }}</div>
                  <div>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.body }}</p>
                  </div>
                  <div class="pov-index-arrow">-></div>
                </a>
              </div>
            </section>

            <section
              v-else-if="section.type === 'flow' || section.type === 'buildLog'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div class="pov-flow">
                <article v-for="(step, stepIndex) in items(section.steps || section.items)" :key="step.title" class="pov-flow-step">
                  <span>{{ step.number || stepIndex + 1 }}</span>
                  <div>
                    <h3>{{ step.title }}</h3>
                    <p>{{ step.body }}</p>
                  </div>
                </article>
              </div>
            </section>

            <section
              v-else-if="section.type === 'doDont'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div class="pov-do-dont">
                <article v-for="card in items(section.cards)" :key="card.title" class="pov-card">
                  <h3>{{ card.title }}</h3>
                  <ul>
                    <li v-for="item in items(card.items)" :key="item">{{ item }}</li>
                  </ul>
                </article>
              </div>
            </section>

            <section
              v-else-if="section.type === 'paths'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div class="pov-path-grid">
                <article v-for="path in items(section.paths)" :key="path.title" class="pov-path-card">
                  <div>
                    <h3>{{ path.title }}</h3>
                    <p>{{ path.body }}</p>
                  </div>
                  <a class="pov-pill" :href="path.to || '#documentation'">{{ path.label || 'Open' }}</a>
                </article>
              </div>
            </section>

            <section
              v-else-if="section.type === 'code'"
              :id="sectionId(section, index)"
              class="pov-section"
            >
              <div class="pov-section-head">
                <div class="pov-section-label">{{ section.label }}</div>
                <h2>{{ section.title }}</h2>
                <p class="pov-section-intro">{{ section.intro }}</p>
              </div>
              <div class="pov-code-box">
                <div class="pov-code-head"><span>{{ section.filename }}</span><span>{{ section.badge }}</span></div>
                <pre><code>{{ section.code }}</code></pre>
              </div>
            </section>

            <section
              v-else-if="section.type === 'cta'"
              class="pov-next-card"
            >
              <h2>{{ section.title }}</h2>
              <p>{{ section.body }}</p>
              <div class="pov-actions">
                <a
                  v-for="action in items(section.actions)"
                  :key="action.to || action.label"
                  class="pov-pill"
                  :class="{ primary: action.primary }"
                  :href="action.to || '#overview'"
                >
                  {{ action.label }}
                </a>
              </div>
            </section>
          </template>
        </article>
      </main>

      <aside class="pov-rail" aria-label="Project overview table of contents">
        <div class="pov-rail-title">On this page</div>
        <a v-for="link in rail" :key="link.to || link.label" class="pov-rail-link" :href="link.to || '#overview'">
          {{ link.label || link.title }}
        </a>
        <div class="pov-rail-card">
          <strong>Project status</strong>
          <p>{{ project.status || 'draft' }}</p>
        </div>
        <div class="pov-rail-card">
          <strong>Overview pattern</strong>
          <p>{{ payload.railNote || 'Reusable project summary: memory, boundaries, lenses, index, reading guide, docs paths and limitations.' }}</p>
        </div>
        <div class="pov-rail-card">
          <strong>Related metadata</strong>
          <div class="pov-meta-mini">
            <div>
              <span>Status</span>
              <b>{{ project.status || 'draft' }}</b>
            </div>
            <div>
              <span>Docs</span>
              <b>{{ docLinks?.length ? `${docLinks.length} attached` : 'Not attached' }}</b>
            </div>
            <div>
              <span>Folder</span>
              <b>{{ project.docsFolder || 'Not set' }}</b>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.pov-shell {
  --pov-bg: #11100f;
  --pov-paper: #1b1917;
  --pov-paper-soft: rgba(255, 247, 238, 0.052);
  --pov-paper-muted: #25211e;
  --pov-ink: #fff7ee;
  --pov-muted: #b5aba1;
  --pov-line: #38332e;
  --pov-code-bg: #0d0c0b;
  --pov-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
  min-height: calc(100vh - 68px);
  background: var(--pov-bg);
  color: var(--pov-ink);
}

.pov-layout {
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr) 260px;
}

.pov-sidebar,
.pov-rail {
  position: sticky;
  top: 68px;
  height: calc(100vh - 68px);
  overflow: auto;
  background: color-mix(in srgb, var(--pov-bg), var(--pov-paper) 8%);
}

.pov-sidebar {
  padding: 24px 18px;
  border-right: 1px solid var(--pov-line);
}

.pov-rail {
  padding: 30px 22px;
  border-left: 1px solid var(--pov-line);
}

.pov-side-title,
.pov-rail-title {
  margin: 12px 6px 10px;
  color: var(--pov-muted);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.pov-side-link,
.pov-rail-link {
  display: block;
  padding: 9px 10px;
  border-radius: 12px;
  color: var(--pov-muted);
  font-size: 14px;
}

.pov-side-link.active,
.pov-side-link:hover,
.pov-rail-link:hover {
  background: var(--pov-paper-soft);
  color: var(--pov-ink);
}

.pov-side-note {
  margin: 0 10px;
  color: var(--pov-muted);
  font-size: 13px;
}

.pov-note,
.pov-rail-card {
  margin-top: 22px;
  padding: 16px;
  border: 1px solid var(--pov-line);
  border-radius: 20px;
  background: var(--pov-paper-soft);
}

.pov-note p,
.pov-rail-card p {
  margin-top: 8px;
  color: var(--pov-muted);
  font-size: 13px;
}

.pov-content {
  min-width: 0;
  padding: 48px clamp(28px, 4vw, 64px) 96px;
  background:
    radial-gradient(circle at 83% 8%, color-mix(in srgb, var(--pov-accent), transparent 82%), transparent 28%),
    radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--pov-secondary), transparent 86%), transparent 30%),
    var(--pov-bg);
}

.pov-doc {
  max-width: 1180px;
  margin: 0 auto;
}

.pov-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
  color: var(--pov-muted);
  font-size: 14px;
}

.pov-hero {
  position: relative;
  display: flex;
  min-height: 560px;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 22px;
  padding: clamp(36px, 5vw, 64px);
  border: 1px solid var(--pov-line);
  border-radius: 36px;
  background: linear-gradient(145deg, var(--pov-paper), var(--pov-paper-muted));
  box-shadow: var(--pov-shadow);
}

.pov-hero::after {
  content: "";
  position: absolute;
  right: -80px;
  top: -90px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--pov-accent), transparent 46%), color-mix(in srgb, var(--pov-secondary), transparent 76%) 52%, transparent 72%);
}

.pov-hero > * {
  position: relative;
  z-index: 1;
}

.pov-eyebrow {
  display: inline-flex;
  align-items: center;
  width: max-content;
  gap: 10px;
  padding: 8px 12px;
  border: 1px solid var(--pov-line);
  border-radius: 999px;
  background: var(--pov-paper-soft);
  color: var(--pov-muted);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pov-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--pov-accent);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--pov-accent), transparent 86%);
}

.pov-hero h1 {
  max-width: 840px;
  margin-top: 32px;
  font-size: clamp(56px, 7vw, 104px);
  line-height: 0.9;
  letter-spacing: -0.085em;
}

.pov-hero-subtitle {
  max-width: 700px;
  margin-top: 24px;
  color: var(--pov-muted);
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.35;
  letter-spacing: -0.025em;
}

.pov-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.pov-pill {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--pov-line);
  border-radius: 999px;
  background: var(--pov-paper-soft);
  color: var(--pov-ink);
  font-weight: 800;
}

.pov-pill.primary {
  border-color: var(--pov-ink);
  background: var(--pov-ink);
  color: var(--pov-bg);
}

.pov-meta-grid,
.pov-grid-3,
.pov-lens-grid,
.pov-path-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.pov-meta-grid {
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin: 22px 0 42px;
}

.pov-grid-2,
.pov-index-grid,
.pov-do-dont {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.pov-meta-card,
.pov-card,
.pov-index-item,
.pov-path-card {
  border: 1px solid var(--pov-line);
  border-radius: 26px;
  background: var(--pov-paper-soft);
}

.pov-meta-card {
  padding: 20px;
}

.pov-meta-card span {
  display: block;
  color: var(--pov-muted);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.pov-meta-card strong {
  display: block;
  margin-top: 8px;
  font-size: 23px;
  line-height: 1.05;
  letter-spacing: -0.055em;
}

.pov-section {
  margin-top: 58px;
  scroll-margin-top: 110px;
}

.pov-section-head {
  margin-bottom: 20px;
}

.pov-section-label {
  margin-bottom: 9px;
  color: var(--pov-accent);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.pov-section h2,
.pov-next-card h2 {
  font-size: clamp(36px, 4vw, 54px);
  line-height: 0.95;
  letter-spacing: -0.075em;
}

.pov-section-intro,
.pov-next-card p {
  max-width: 820px;
  margin-top: 14px;
  color: var(--pov-muted);
  font-size: 18px;
}

.pov-card,
.pov-path-card {
  padding: 24px;
}

.pov-big-card {
  padding: 30px;
  border-radius: 30px;
}

.pov-card h3,
.pov-path-card h3 {
  margin-bottom: 12px;
  font-size: 25px;
  line-height: 1.02;
  letter-spacing: -0.06em;
}

.pov-card p,
.pov-path-card p {
  color: var(--pov-muted);
  font-size: 15px;
}

.pov-card ul {
  margin: 14px 0 0 18px;
  color: var(--pov-muted);
}

.pov-card li {
  margin: 8px 0;
}

.accent-card {
  border-color: color-mix(in srgb, var(--pov-accent), var(--pov-line) 55%);
  background: linear-gradient(135deg, color-mix(in srgb, var(--pov-accent), transparent 78%), color-mix(in srgb, var(--pov-secondary), transparent 86%));
}

.warning-card {
  border-color: color-mix(in srgb, #c9a84d, var(--pov-line) 45%);
  background: linear-gradient(135deg, color-mix(in srgb, #c9a84d, transparent 82%), var(--pov-paper-soft));
}

.pov-callout {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 16px;
  margin: 24px 0;
  padding: 22px;
  border: 1px solid color-mix(in srgb, var(--pov-accent), var(--pov-line) 55%);
  border-radius: 24px;
  background: color-mix(in srgb, var(--pov-accent), transparent 88%);
}

.pov-callout-icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 17px;
  background: var(--pov-accent);
  color: #191714;
  font-weight: 950;
}

.pov-lens {
  position: relative;
  display: flex;
  min-height: 310px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 26px;
  border: 1px solid var(--pov-line);
  border-radius: 30px;
  background: var(--pov-paper-soft);
}

.pov-lens::before {
  content: "";
  position: absolute;
  right: -70px;
  top: -70px;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--pov-accent), transparent 65%);
  opacity: 0.22;
}

.pov-lens-number,
.pov-index-num,
.pov-flow-step span {
  display: grid;
  place-items: center;
  font-weight: 950;
}

.pov-lens-number {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--pov-accent), transparent 78%);
  color: var(--pov-accent);
}

.pov-lens h3 {
  font-size: 28px;
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.pov-lens p {
  color: var(--pov-muted);
}

.pov-index-item {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  gap: 16px;
  align-items: start;
  padding: 18px;
}

.pov-index-num {
  width: 52px;
  height: 52px;
  border-radius: 17px;
  background: color-mix(in srgb, var(--pov-secondary), transparent 78%);
  color: var(--pov-secondary);
}

.pov-index-item h3,
.pov-flow-step h3 {
  margin-bottom: 6px;
  font-size: 20px;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.pov-index-item p,
.pov-flow-step p {
  color: var(--pov-muted);
  font-size: 14px;
}

.pov-flow {
  display: grid;
  gap: 12px;
}

.pov-flow-step {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--pov-line);
  border-radius: 20px;
  background: var(--pov-paper-soft);
}

.pov-flow-step span {
  width: 44px;
  height: 44px;
  border-radius: 15px;
  background: var(--pov-ink);
  color: var(--pov-bg);
}

.pov-do-dont .pov-card:first-child {
  border-color: color-mix(in srgb, #7ed991, var(--pov-line) 52%);
  background: color-mix(in srgb, #7ed991, transparent 90%);
}

.pov-do-dont .pov-card:last-child {
  border-color: color-mix(in srgb, var(--pov-accent), var(--pov-line) 52%);
  background: color-mix(in srgb, var(--pov-accent), transparent 90%);
}

.pov-path-card {
  display: flex;
  min-height: 230px;
  flex-direction: column;
  justify-content: space-between;
}

.pov-code-box {
  overflow: hidden;
  margin-top: 22px;
  border: 1px solid rgba(255, 247, 238, 0.1);
  border-radius: 24px;
  background: var(--pov-code-bg);
  color: var(--pov-ink);
}

.pov-code-head {
  display: flex;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 247, 238, 0.1);
  color: rgba(255, 247, 238, 0.62);
  font-size: 13px;
}

.pov-code-box pre {
  overflow: auto;
  padding: 18px;
  font-size: 13px;
  line-height: 1.75;
}

.pov-next-card {
  margin-top: 60px;
  padding: 34px;
  border: 1px solid var(--pov-line);
  border-radius: 32px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--pov-accent), transparent 82%), color-mix(in srgb, var(--pov-secondary), transparent 86%));
}

.pov-meta-mini {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.pov-meta-mini span {
  display: block;
  color: var(--pov-muted);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.pov-meta-mini b {
  font-size: 13px;
}

@media (max-width: 1280px) {
  .pov-layout {
    grid-template-columns: 292px minmax(0, 1fr);
  }

  .pov-rail {
    display: none;
  }

  .pov-lens-grid,
  .pov-path-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 980px) {
  .pov-layout {
    grid-template-columns: 1fr;
  }

  .pov-sidebar {
    display: none;
  }

  .pov-content {
    padding: 30px 20px 72px;
  }

  .pov-meta-grid,
  .pov-grid-2,
  .pov-grid-3,
  .pov-lens-grid,
  .pov-index-grid,
  .pov-do-dont,
  .pov-path-grid {
    grid-template-columns: 1fr;
  }

  .pov-hero {
    min-height: 520px;
    border-radius: 28px;
  }
}
</style>
