<script setup lang="ts">
const isLoggingOut = ref(false)
const route = useRoute()
const { data: session } = await useFetch('/api/auth/session')
const composerSaveState = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')
const composerTypeLabels: Record<string, string> = {
  blog: 'Blog Composer',
  projects: 'New Project Composer',
  project: 'New Project Composer',
  docs: 'Docs Composer',
  labs: 'Lab Editor',
  lab: 'Lab Editor'
}
const isComposerRoute = computed(() => route.path.startsWith('/admin/content/'))
const composerType = computed(() => String(route.query.type || 'projects'))
const normalizedComposerType = computed(() => composerType.value === 'project'
  ? 'projects'
  : composerType.value === 'lab'
    ? 'labs'
    : composerType.value
)
const composerLabel = computed(() => composerTypeLabels[composerType.value] || 'Content Composer')
const isNewComposer = computed(() => route.path === '/admin/content/new')
const isBlogEditComposer = computed(() => isComposerRoute.value && !isNewComposer.value && normalizedComposerType.value === 'blog')
const primaryActionLabel = computed(() => {
  if (isNewComposer.value && ['projects', 'project'].includes(composerType.value)) return 'Create project'
  if (isNewComposer.value) return 'Create draft'
  return 'Save changes'
})
const composerSaveLabel = computed(() => {
  if (composerSaveState.value === 'saving') return 'Saving...'
  if (composerSaveState.value === 'saved') return 'Saved'
  if (composerSaveState.value === 'error') return 'Save failed'
  return 'Save draft'
})
const composerPrimaryActionLabel = computed(() => {
  if (composerSaveState.value === 'saving') return 'Saving...'
  if (composerSaveState.value === 'saved') return 'Saved'
  if (composerSaveState.value === 'error') return 'Try again'
  return primaryActionLabel.value
})

function emitComposerAction(action: 'save' | 'primary') {
  if (!import.meta.client) return
  window.dispatchEvent(new CustomEvent(`gribo:composer-${action}`))
}

function handleComposerSaveState(event: Event) {
  const next = (event as CustomEvent<{ state?: 'idle' | 'saving' | 'saved' | 'error' }>).detail?.state
  if (next) composerSaveState.value = next
}

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

onMounted(() => {
  window.addEventListener('gribo:composer-save-state', handleComposerSaveState)
})

onBeforeUnmount(() => {
  window.removeEventListener('gribo:composer-save-state', handleComposerSaveState)
})
</script>

<template>
  <header class="studio-topbar">
    <div>
      <p class="crumbs">
        <span>Gribo Studio</span>
        <span>/</span>
        <strong>{{ isComposerRoute ? composerLabel : 'Admin Surface' }}</strong>
      </p>
    </div>
    <div class="studio-actions">
      <button class="studio-button mobile-menu" type="button">Menu</button>
      <div class="search">
        <span>{{ isComposerRoute ? 'Search blocks, media, snippets...' : 'Search content, blocks, media...' }}</span>
        <span class="kbd">K</span>
      </div>
      <StatusBadge v-if="!isComposerRoute" label="Draft only" />
      <span v-if="session?.user" class="session-pill">{{ session.user.name || session.user.username }}</span>
      <ThemeToggle />
      <template v-if="isComposerRoute">
        <button v-if="!isBlogEditComposer" class="studio-button" type="button" :disabled="composerSaveState === 'saving'" :data-state="composerSaveState" @click="emitComposerAction('save')">
          {{ composerSaveLabel }}
        </button>
        <button class="studio-button coral" type="button" :disabled="composerSaveState === 'saving'" :data-state="composerSaveState" @click="emitComposerAction('primary')">
          {{ composerPrimaryActionLabel }}
        </button>
      </template>
      <NuxtLink v-else class="studio-button primary" to="/admin/content/new">New Draft</NuxtLink>
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

.studio-button.coral {
  border-color: var(--coral);
  background: var(--coral);
  color: #191714;
}

.studio-button[data-state='saved'] {
  border-color: color-mix(in srgb, var(--green), var(--line) 26%);
  background: color-mix(in srgb, var(--green), var(--paper) 72%);
}

.studio-button[data-state='error'] {
  border-color: color-mix(in srgb, var(--coral), var(--line) 18%);
  background: color-mix(in srgb, var(--coral), var(--paper) 65%);
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

.session-pill {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  max-width: 180px;
  padding: 0 14px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 780;
  text-overflow: ellipsis;
  white-space: nowrap;
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
