<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))
const path = computed(() => `/blog/${route.params.slug}`)
const { data: post } = await useAsyncData(`blog-${path.value}`, async () => {
  const byPath = await queryCollection('blog').path(path.value).first()
  return byPath ?? await queryCollection('blog').where('slug', '=', slug.value).first()
})

const dateLabel = computed(() => post.value?.date
  ? new Date(post.value.date).toLocaleDateString('en', { month: 'long', day: '2-digit', year: 'numeric' })
  : 'Draft')
const explicitRelatedItems = computed(() => {
  const items: { label: string, title: string, to: string }[] = []
  const relatedProjects = Array.isArray(post.value?.relatedProjects) ? post.value.relatedProjects : []
  const relatedDocs = Array.isArray(post.value?.relatedDocs) ? post.value.relatedDocs : []
  const relatedPosts = Array.isArray(post.value?.relatedPosts) ? post.value.relatedPosts : []

  for (const item of relatedProjects) {
    const slug = typeof item === 'string' ? item : item.slug
    const title = typeof item === 'string' ? item : item.title
    if (slug) items.push({ label: 'Repository', title: title || slug, to: `/repository/${slug}` })
  }

  for (const item of relatedDocs) {
    const path = typeof item === 'string' ? item : item.path
    const title = typeof item === 'string' ? item : item.title
    if (path) items.push({ label: 'Docs', title: title || path, to: path.startsWith('/') ? path : `/docs/${path}` })
  }

  for (const item of relatedPosts) {
    const slug = typeof item === 'string' ? item : item.slug
    const title = typeof item === 'string' ? item : item.title
    if (slug) items.push({ label: 'Magazine', title: title || slug, to: `/blog/${slug}` })
  }

  return items
})

useGriboSeo(() => ({
  title: post.value?.title,
  description: post.value?.description,
  excerpt: post.value?.excerpt,
  seoTitle: post.value?.seoTitle,
  seoDescription: post.value?.seoDescription,
  ogTitle: post.value?.ogTitle,
  ogDescription: post.value?.ogDescription,
  ogImage: post.value?.ogImage,
  canonical: post.value?.canonical,
  noindex: post.value?.noindex
}))
</script>

<template>
  <main class="blog-story-shell">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink>
      <span>/</span>
      <NuxtLink to="/blog">Magazine</NuxtLink>
      <span>/</span>
      <span>{{ post?.title ?? 'Article' }}</span>
    </nav>

    <template v-if="post">
      <ArticleHero
        :title="post.title"
        :description="post.description"
        :category="post.category"
        :date="dateLabel"
        :status="post.status"
      />

      <div class="article-wrap">
        <article class="article">
          <div class="article-meta-row">
            <span v-for="tag in post.tags ?? []" :key="tag" class="tag">{{ tag }}</span>
            <span class="tag">{{ post.category }}</span>
          </div>

          <ContentRenderer id="content" class="content-prose" :value="post" />

          <RelatedContent
            v-if="explicitRelatedItems.length"
            title="Related notes"
            :items="explicitRelatedItems"
          />
        </article>

        <aside class="article-aside">
          <div class="aside-card toc">
            <h3>In this story</h3>
            <a href="#content">Opening note</a>
            <a href="#content">Friction signal</a>
            <a href="#content">System memory</a>
          </div>
          <div class="aside-card">
            <h3>Post status</h3>
            <p>{{ post.status ?? 'Draft' }} concept for the Gribo Digital magazine system.</p>
          </div>
          <div class="aside-card">
            <h3>Reference pattern</h3>
            <p>Long-form institutional blog style: human title, field story, tags, and reflective closing.</p>
          </div>
          <div class="aside-card">
            <h3>Project links</h3>
            <p>AI Systems · Codex Local Workflow · Gribo Docs System</p>
          </div>
        </aside>
      </div>
    </template>

    <section v-else class="missing-card">
      <p class="eyebrow">Draft gap</p>
      <h1>Article placeholder</h1>
      <p class="muted">This route is ready for Nuxt Content entries.</p>
    </section>
  </main>
</template>

<style scoped>
.blog-story-shell {
  width: min(1120px, calc(100% - 72px));
  margin: 0 auto;
  padding: 46px 0 80px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  max-width: 820px;
  margin: 0 auto 28px;
  color: var(--muted);
  font-size: 14px;
}

.breadcrumb a:hover {
  color: var(--ink);
}

.article-wrap {
  display: grid;
  grid-template-columns: minmax(0, 820px) 250px;
  gap: 56px;
  align-items: start;
  margin: 54px auto 0;
}

.article {
  min-width: 0;
}

.article-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 34px;
}

.article-aside {
  position: sticky;
  top: 104px;
  display: grid;
  gap: 16px;
}

.aside-card,
.missing-card {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper-soft);
}

.aside-card h3 {
  margin: 0 0 10px;
  font-size: 17px;
  letter-spacing: -0.035em;
  line-height: 1.1;
}

.aside-card p,
.aside-card a {
  color: var(--muted);
  font-size: 14px;
}

.toc a {
  display: block;
  padding: 7px 0;
}

.missing-card {
  margin-top: 34px;
}

@media (max-width: 980px) {
  .article-wrap {
    grid-template-columns: 1fr;
  }

  .article-aside {
    position: static;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .blog-story-shell {
    width: min(100% - 40px, 1120px);
    padding-top: 28px;
  }

  .article-aside {
    grid-template-columns: 1fr;
  }
}
</style>
