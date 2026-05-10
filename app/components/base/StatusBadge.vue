<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="status-badge">{{ label }}</span>
</template>
