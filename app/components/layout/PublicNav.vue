<template>
  <header class="nav">
    <div class="nav-inner">
      <NuxtLink class="brand" to="/">
        <BrandMark />
        <span>Gribo Digital</span>
      </NuxtLink>
      <nav class="nav-links" aria-label="Public navigation">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/repository">Repository</NuxtLink>
        <NuxtLink to="/labs">Labs</NuxtLink>
        <NuxtLink class="pill-button" to="/admin">Studio</NuxtLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
