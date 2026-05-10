<template>
  <footer class="site-footer">
    <p>&copy; 2026 Gribo Digital</p>
    <nav aria-label="Footer navigation">
      <NuxtLink to="/repository">Projects</NuxtLink>
      <NuxtLink to="/labs">Labs</NuxtLink>
      <NuxtLink to="/blog">Blog</NuxtLink>
      <NuxtLink to="/admin">Studio</NuxtLink>
    </nav>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 0 44px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

p {
  margin: 0;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

a:hover {
  color: var(--ink);
}

@media (max-width: 720px) {
  .site-footer {
    flex-direction: column;
  }
}
</style>
