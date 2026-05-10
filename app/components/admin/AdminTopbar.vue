<script setup lang="ts">
const isLoggingOut = ref(false)

async function logout() {
  isLoggingOut.value = true

  try {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    await navigateTo('/admin/login')
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<template>
  <header class="studio-topbar">
    <div>
      <p class="crumbs"><span>Gribo Studio</span><span>/</span><strong>Admin Surface</strong></p>
    </div>
    <div class="studio-actions">
      <button class="studio-button mobile-menu" type="button">Menu</button>
      <div class="search"><span>Search content, blocks, media...</span><span class="kbd">K</span></div>
      <StatusBadge label="Draft only" />
      <ThemeToggle />
      <NuxtLink class="studio-button primary" to="/admin/content/new">New Draft</NuxtLink>
      <button class="studio-button" type="button" :disabled="isLoggingOut" @click="logout">
        {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.studio-topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  height: var(--topbar);
  padding: 0 28px;
  border-bottom: 1px solid var(--line);
  background: var(--nav-bg);
  backdrop-filter: blur(18px);
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.crumbs strong {
  color: var(--ink);
}

.studio-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.studio-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--ink);
  cursor: pointer;
  font-weight: 780;
  transition: 0.18s;
}

.studio-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.16);
}

.studio-button.primary {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--bg);
}

.studio-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.mobile-menu {
  display: none;
}

.search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(400px, 38vw);
  height: 42px;
  padding: 0 12px 0 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  font-size: 0.9rem;
}

.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--paper);
  color: var(--muted);
  font-size: 0.75rem;
}

@media (max-width: 980px) {
  .search {
    display: none;
  }

  .studio-topbar {
    padding: 0 18px;
  }

  .mobile-menu {
    display: inline-flex;
  }
}

@media (max-width: 680px) {
  .studio-actions .studio-button.primary,
  .studio-actions .studio-button:last-child,
  .studio-actions :deep(.status-badge) {
    display: none;
  }
}
</style>
