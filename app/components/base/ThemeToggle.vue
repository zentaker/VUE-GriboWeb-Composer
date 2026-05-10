<script setup lang="ts">
const theme = ref<'dark' | 'light'>('dark')

const applyTheme = (value: 'dark' | 'light') => {
  theme.value = value
  if (import.meta.client) {
    document.documentElement.dataset.theme = value
    localStorage.setItem('gribo-theme', value)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('gribo-theme')
  applyTheme(saved === 'light' ? 'light' : 'dark')
})
</script>

<template>
  <button class="theme-toggle" type="button" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`" @click="applyTheme(theme === 'dark' ? 'light' : 'dark')">
    <span class="theme-dot" aria-hidden="true" />
    {{ theme === 'dark' ? 'Dark' : 'Light' }}
  </button>
</template>

<style scoped>
.theme-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--coral);
  box-shadow: 0 0 0 5px rgba(255, 121, 109, 0.14);
}
</style>
