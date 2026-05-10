<script setup lang="ts">
defineProps<{
  projects: Array<{
    title: string
    description: string
    status: string
    to: string
    progress: number
    type: string
  }>
}>()
</script>

<template>
  <section id="projects" class="home-section">
    <div class="section-title">
      <h2>Active projects</h2>
      <p>These are not portfolio cards. They are living dossiers: each project has a status, progress, decisions, links and a build log.</p>
    </div>
    <div class="project-grid">
      <NuxtLink
        v-for="(project, index) in projects"
        :key="project.title"
        class="home-project-card"
        :class="{ large: index === 0 }"
        :to="project.to"
      >
        <div class="visual" />
        <div class="project-body">
          <div class="project-type">{{ project.type }}</div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-footer">
            <span>Status: {{ project.status }}</span>
            <div class="progress" :aria-label="`${project.progress}% progress`">
              <span :style="{ width: `${project.progress}%` }" />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.home-section {
  padding: 48px 0;
}

.section-title {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.section-title p {
  max-width: 620px;
  margin: 0;
  color: var(--muted);
}

.project-grid {
  display: grid;
  grid-auto-rows: minmax(320px, auto);
  grid-template-columns: 1.2fr 0.8fr 0.8fr;
  gap: 18px;
}

.home-project-card {
  position: relative;
  display: flex;
  min-height: 320px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper);
}

.home-project-card.large {
  grid-row: span 2;
  min-height: 660px;
}

.visual {
  min-height: 170px;
  height: 48%;
  background:
    linear-gradient(135deg, rgba(255, 111, 97, 0.82), rgba(207, 195, 255, 0.65)),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px 42px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.16) 0 1px, transparent 1px 42px);
  filter: saturate(0.82) brightness(0.82);
}

.home-project-card:nth-child(2) .visual {
  background: linear-gradient(135deg, #cfc3ff, #b8d8ff);
}

.home-project-card:nth-child(3) .visual {
  background: linear-gradient(135deg, #d8f3dc, #ffe8a3);
}

.home-project-card:nth-child(4) .visual {
  background: linear-gradient(135deg, #191714, #ff6f61);
}

.project-body {
  padding: 24px;
}

.project-type {
  color: var(--coral);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 14px 0 0;
  font-size: clamp(26px, 2.8vw, 44px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.project-body p {
  max-width: 580px;
  margin: 16px 0 0;
  color: var(--muted);
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 13px;
}

.progress {
  width: 140px;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--paper-muted);
}

.progress span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--coral);
}

@media (max-width: 1100px) {
  .project-grid {
    grid-template-columns: 1fr 1fr;
  }

  .home-project-card.large {
    grid-column: 1 / -1;
    grid-row: auto;
    min-height: 420px;
  }
}

@media (max-width: 760px) {
  .section-title {
    align-items: flex-start;
    flex-direction: column;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
