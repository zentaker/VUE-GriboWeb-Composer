<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tags?: string[]
}>()
</script>

<template>
  <article class="spotlight-card">
    <div>
      <div class="card-label">Featured project</div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <div class="status-row">
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </article>
</template>

<style scoped>
.spotlight-card {
  position: relative;
  display: flex;
  min-height: 292px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 28px;
  border: 1px solid color-mix(in srgb, var(--line), transparent 40%);
  border-radius: var(--radius);
  background: linear-gradient(145deg, #fff7ee, #d9c7b2);
  color: #191714;
  box-shadow: var(--shadow);
}

.spotlight-card::before {
  position: absolute;
  inset: auto -80px -140px auto;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 111, 97, 0.95), rgba(207, 195, 255, 0.52) 48%, transparent 72%);
  content: '';
}

.card-label,
.spotlight-card p {
  position: relative;
  color: rgba(25, 23, 20, 0.68);
}

.card-label {
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h2 {
  position: relative;
  max-width: 360px;
  margin: 22px 0 0;
  font-size: 38px;
  line-height: 0.95;
  letter-spacing: -0.06em;
}

p {
  max-width: 430px;
  margin: 18px 0 0;
}

.status-row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.tag {
  background: rgba(25, 23, 20, 0.08);
  border-color: rgba(25, 23, 20, 0.12);
  color: rgba(25, 23, 20, 0.78);
}
</style>
