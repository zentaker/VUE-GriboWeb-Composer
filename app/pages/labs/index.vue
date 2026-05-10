<script setup lang="ts">
const { data: labs } = await useAsyncData('labs-list', () => queryCollection('labs').order('order', 'ASC').all())
const { data: posts } = await useAsyncData('labs-blog-counts', () => queryCollection('blog').all())
const { data: projects } = await useAsyncData('labs-project-counts', () => queryCollection('projects').all())
const { data: docs } = await useAsyncData('labs-doc-counts', () => queryCollection('docs').all())

useGriboSeo({
  title: 'Labs | Gribo Digital',
  description: 'Editorial research lines for digital systems, cultural infrastructure, and living research.',
  ogTitle: 'Gribo Labs',
  ogDescription: 'Research lines that group Gribo projects, essays, documentation and open questions.',
  canonical: 'https://gribo.digital/labs'
})

const labCounts = (slug: string) => ({
  posts: (posts.value ?? []).filter((post) => post.lab === slug).length,
  projects: (projects.value ?? []).filter((project) => project.lab === slug).length,
  docs: (docs.value ?? []).filter((doc) => doc.lab === slug).length
})
</script>

<template>
  <main class="content-shell labs-page">
    <LabHero
      eyebrow="Research map"
      title="Gribo Labs"
      description="Editorial research lines for digital systems, cultural infrastructure, and living research."
    />

    <section class="labs-intro">
      <p>
        Labs are the living areas where Gribo groups projects, essays, documentation
        and open questions. Each lab works as a research line, not just a category.
      </p>
    </section>

    <section class="labs-grid" aria-label="Gribo research lines">
      <LabCard
        v-for="lab in labs"
        :key="lab.slug"
        :title="lab.title"
        :description="lab.description"
        :status="lab.status"
        :accent="lab.accent"
        :tags="lab.relatedTags ?? []"
        :to="`/labs/${lab.slug}`"
        :counts="labCounts(lab.slug)"
      />
    </section>

    <section class="why-labs">
      <p class="eyebrow"><span class="pulse" />Why labs?</p>
      <h2>Research lines keep Gribo from becoming a drawer of disconnected artifacts.</h2>
      <p>
        Labs let projects, essays and technical documentation accumulate over time.
        A project can begin as a small experiment, produce a note, grow documentation,
        and later become part of a larger editorial memory.
      </p>
    </section>
  </main>
</template>

<style scoped>
.labs-page {
  display: grid;
  gap: 34px;
  padding: 48px 0 78px;
}

.labs-intro,
.why-labs {
  border: 1px solid var(--line);
  border-radius: 30px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.labs-intro {
  padding: clamp(24px, 4vw, 44px);
}

.labs-intro p {
  max-width: 980px;
  margin: 0;
  color: var(--ink);
  font-size: clamp(24px, 3vw, 42px);
  font-weight: 820;
  letter-spacing: -0.065em;
  line-height: 1;
}

.labs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.why-labs {
  padding: clamp(26px, 5vw, 58px);
  background:
    radial-gradient(circle at 95% 12%, rgba(255, 205, 116, 0.13), transparent 30%),
    var(--paper-soft);
}

.why-labs h2 {
  max-width: 960px;
  margin: 18px 0 0;
  font-size: clamp(34px, 5.4vw, 76px);
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.92;
}

.why-labs p:last-child {
  max-width: 760px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: 19px;
  line-height: 1.55;
}

@media (max-width: 860px) {
  .labs-page {
    padding-top: 28px;
  }

  .labs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
