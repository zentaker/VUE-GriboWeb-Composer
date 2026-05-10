<script setup lang="ts">
defineProps<{
  articles: Array<{
    title: string
    kicker: string
    to: string
  }>
}>()
</script>

<template>
  <div class="articles">
    <NuxtLink v-for="article in articles" :key="article.title" class="article" :to="article.to">
      <div class="article-kicker">{{ article.kicker }}</div>
      <h3>{{ article.title }}</h3>
      <div class="article-arrow">-&gt;</div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.articles {
  display: grid;
  gap: 14px;
}

.article {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  align-items: center;
  gap: 20px;
  min-height: 125px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper);
}

.article-kicker {
  color: var(--muted);
  font-size: 13px;
}

h3 {
  margin: 0;
  font-size: 26px;
  line-height: 1;
  letter-spacing: -0.05em;
}

.article-arrow {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  font-weight: 900;
}

@media (max-width: 760px) {
  .article {
    grid-template-columns: 1fr auto;
  }

  .article-kicker {
    grid-column: 1 / -1;
  }
}
</style>
