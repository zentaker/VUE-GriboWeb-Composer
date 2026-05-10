<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-list', () => queryCollection('projects').all())

useGriboSeo({
  title: 'Repository | Gribo Digital',
  description: 'Living project repository from the Gribo Digital lab.',
  ogTitle: 'Gribo Repository',
  ogDescription: 'Projects, prototypes, experiments and technical dossiers from Gribo Digital.',
  canonical: 'https://gribo.digital/repository'
})

const filters = ['All', 'Active', 'Prototype', 'Archived', 'Research']

const mappedProjects = computed(() => (projects.value ?? []).map((project, index) => ({
  title: project.title,
  description: project.description,
  status: project.status,
  to: project.path.replace('/projects/', '/repository/'),
  stack: project.stack ?? [],
  progress: [58, 31, 44, 66][index] ?? 35,
  type: project.stack?.[0] ?? 'Living dossier'
})))
</script>

<template>
  <div class="content-shell repository-page">
    <SectionHero
      eyebrow="Repository"
      title="Living project repository."
      description="Projects, prototypes, experiments and technical dossiers from the Gribo lab. Not portfolio cards: living records with status, decisions and links."
    />

    <nav class="filter-row" aria-label="Project filters">
      <button v-for="filter in filters" :key="filter" type="button" :class="{ active: filter === 'All' }">
        {{ filter }}
      </button>
    </nav>

    <section class="repository-grid" aria-label="Project repository">
      <RepositoryCard
        v-for="project in mappedProjects"
        :key="project.to"
        :title="project.title"
        :description="project.description"
        :status="project.status"
        :to="project.to"
        :stack="project.stack"
        :progress="project.progress"
        :type="project.type"
      />
    </section>
  </div>
</template>

<style scoped>
.repository-page {
  display: grid;
  gap: 34px;
  padding: 48px 0 70px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-row button {
  min-height: 38px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  cursor: pointer;
  font-weight: 760;
}

.filter-row button.active,
.filter-row button:hover {
  background: var(--ink);
  color: var(--bg);
}

.repository-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 820px) {
  .repository-page {
    padding-top: 28px;
  }

  .repository-grid {
    grid-template-columns: 1fr;
  }
}
</style>
