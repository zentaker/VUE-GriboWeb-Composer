<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () => queryCollection('blog').order('date', 'DESC').all())

useGriboSeo({
  title: 'Blog | Gribo Digital',
  description: 'Editorial essays and research notes from Gribo Digital.',
  ogTitle: 'Gribo Digital Blog',
  ogDescription: 'Essays and research notes from the Gribo Digital editorial laboratory.',
  canonical: 'https://gribo.digital/blog'
})

const filters = ['All', 'AI Systems', 'SysArchitecture', 'Data Science', 'Physics', 'SysSecurity']

const formattedPosts = computed(() => (posts.value ?? []).map((post) => ({
  title: post.title,
  description: post.description,
  to: post.path,
  date: post.date ? new Date(post.date).toLocaleDateString('en', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Draft',
  category: post.category ?? 'Field note',
  tags: post.tags ?? [],
  readingTime: `${Math.max(3, Math.ceil((post.description?.length ?? 160) / 120))} min read`
})))
</script>

<template>
  <div class="content-shell blog-page">
    <SectionHero
      eyebrow="Magazine"
      title="Essays from the editorial lab."
      description="Critical notes on software, culture, autonomy, interfaces, and the small frictions that shape digital systems."
    />

    <nav class="filter-row" aria-label="Editorial tracks">
      <button v-for="filter in filters" :key="filter" type="button" :class="{ active: filter === 'All' }">
        {{ filter }}
      </button>
    </nav>

    <section class="article-grid" aria-label="Magazine articles">
      <ArticleCard
        v-for="post in formattedPosts"
        :key="post.to"
        :title="post.title"
        :description="post.description"
        :to="post.to"
        :date="post.date"
        :category="post.category"
        :tags="post.tags"
        :reading-time="post.readingTime"
      />
    </section>
  </div>
</template>

<style scoped>
.blog-page {
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

.article-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 820px) {
  .blog-page {
    padding-top: 28px;
  }

  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
