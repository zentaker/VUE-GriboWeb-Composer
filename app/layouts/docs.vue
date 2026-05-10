<template>
  <div class="docs-shell">
    <PublicNav />
    <div class="docs-layout">
      <DocsSidebar />
      <main class="docs-main">
        <slot />
      </main>
      <DocsToc />
    </div>
  </div>
</template>

<style scoped>
.docs-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at 84% 8%, rgba(255, 121, 109, 0.13), transparent 28%),
    radial-gradient(circle at 14% 18%, rgba(160, 145, 255, 0.1), transparent 26%),
    var(--bg);
}

.docs-layout {
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr) 230px;
}

.docs-main {
  min-width: 0;
  padding: clamp(24px, 4vw, 52px);
}

@media (max-width: 1180px) {
  .docs-layout {
    grid-template-columns: 292px minmax(0, 1fr);
  }
}

@media (max-width: 900px) {
  .docs-layout {
    grid-template-columns: 1fr;
  }

  .docs-main {
    padding: 22px 16px 42px;
  }
}
</style>
