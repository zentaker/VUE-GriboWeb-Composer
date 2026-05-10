<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const blocks = [
  ['HeroIntroBlock', 'Lead editorial thesis, CTAs, and public identity signal.', 'Visible'],
  ['FeaturedProjectBlock', 'Spotlight card connected to the active repository shelf.', 'Visible'],
  ['BuildLogBlock', 'Recent progress notes and technical decisions.', 'Visible'],
  ['LabsTracksBlock', 'Visual preview of future research lines.', 'Draft'],
  ['ActiveProjectsBlock', 'Grid of living project dossiers.', 'Visible'],
  ['ThinkingArticlesBlock', 'Editorial articles and research essays.', 'Visible'],
  ['ManifestoBlock', 'Institutional statement and memory metaphor.', 'Visible'],
  ['ParticipationCtaBlock', 'Future contribution and contact surface.', 'Hidden'],
  ['NewsletterBlock', 'Visual-only subscription CTA.', 'Mock']
]
</script>

<template>
  <div class="admin-page">
    <AdminHero
      eyebrow="Home Composer"
      title="Arrange the front page narrative."
      description="Visual mock for ordering home modules, selecting spotlight content, and shaping the public editorial rhythm."
    />

    <section class="composer-layout">
      <div class="block-list">
        <AdminBlockCard
          v-for="(block, index) in blocks"
          :key="block[0]"
          :index="index + 1"
          :title="block[0]"
          :description="block[1]"
          :status="block[2]"
        />
      </div>

      <div class="side-stack">
        <AdminPreviewPanel />
        <AdminInspector
          title="Selected block"
          :items="[
            { label: 'Component', value: 'HeroIntroBlock' },
            { label: 'State', value: 'Visible' },
            { label: 'Source', value: 'content/home/layout.json' },
            { label: 'Mode', value: 'Visual mock' }
          ]"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.composer-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 390px;
  gap: 20px;
  align-items: start;
}

.block-list,
.side-stack {
  display: grid;
  gap: 14px;
}

@media (max-width: 1280px) {
  .composer-layout {
    grid-template-columns: 1fr;
  }
}
</style>
