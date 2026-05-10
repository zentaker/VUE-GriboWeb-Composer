<script setup lang="ts">
defineProps<{
  labs: Array<{
    title: string
    description: string
  }>
}>()
</script>

<template>
  <section id="tracks" class="home-section">
    <div class="section-title">
      <h2>Project tracks</h2>
      <p>Living lines of research and development. Each track groups projects, notes, technical decisions, progress updates and editorial pieces.</p>
    </div>
    <div class="tracks">
      <a v-for="lab in labs" :key="lab.title" class="track" href="#">
        <div class="track-icon" />
        <div>
          <h3>{{ lab.title }}</h3>
          <p>{{ lab.description }}</p>
        </div>
      </a>
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

.tracks {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
}

.track {
  display: flex;
  min-height: 210px;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper-soft);
  transition: transform 0.2s ease, background 0.2s ease;
}

.track:hover {
  transform: translateY(-4px);
  background: var(--paper);
}

.track-icon {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: var(--rose);
}

.track:nth-child(2) .track-icon {
  background: var(--lavender);
}

.track:nth-child(3) .track-icon {
  background: var(--mint);
}

.track:nth-child(4) .track-icon {
  background: var(--blue);
}

.track:nth-child(5) .track-icon {
  background: var(--yellow);
}

h3 {
  margin: 34px 0 0;
  font-size: 21px;
  line-height: 1;
  letter-spacing: -0.04em;
}

.track p {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 1180px) {
  .tracks {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .section-title {
    align-items: flex-start;
    flex-direction: column;
  }

  .tracks {
    grid-template-columns: 1fr;
  }
}
</style>
