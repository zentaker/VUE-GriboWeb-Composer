<template>
  <div class="admin-shell">
    <AdminSidebar />
    <div class="studio-main">
      <AdminTopbar />
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.studio-main {
  min-width: 0;
}

.studio-main main {
  padding: 32px;
}

@media (max-width: 980px) {
  .studio-main main {
    padding: 22px;
  }
}
</style>
