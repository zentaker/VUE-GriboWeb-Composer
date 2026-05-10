<template>
  <aside class="block-preview-panel">
    <div class="preview-top">
      <strong>Frontend preview</strong>
      <span class="status-badge">Mock</span>
    </div>
    <div class="mini-browser">
      <div class="browser-bar">
        <span class="browser-dot" />
        <span class="browser-dot" />
        <span class="browser-dot" />
      </div>
      <div class="browser-preview">
        <div class="preview-hero">
          <h3>Ideas that become systems.</h3>
        </div>
        <div class="preview-grid">
          <div class="preview-tile"><strong>Featured project</strong></div>
          <div class="preview-tile"><strong>Build log</strong></div>
        </div>
      </div>
    </div>
    <slot />
  </aside>
</template>

<style scoped>
.block-preview-panel {
  position: sticky;
  top: calc(var(--topbar) + 22px);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: var(--paper-soft);
}

.preview-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--line);
}

.mini-browser {
  overflow: hidden;
  margin: 18px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.browser-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 13px;
  border-bottom: 1px solid var(--line);
}

.browser-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--coral);
}

.browser-dot:nth-child(2) {
  background: var(--yellow);
}

.browser-dot:nth-child(3) {
  background: var(--green);
}

.browser-preview {
  padding: 18px;
}

.preview-hero {
  display: flex;
  min-height: 180px;
  flex-direction: column;
  justify-content: flex-end;
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(255, 121, 109, 0.55), rgba(119, 103, 201, 0.28));
}

.preview-hero h3 {
  max-width: 250px;
  margin: 0;
  font-size: 30px;
  letter-spacing: -0.07em;
  line-height: 0.92;
}

.preview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
}

.preview-tile {
  min-height: 92px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
}

.preview-tile strong {
  display: block;
  font-size: 13px;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

@media (max-width: 1280px) {
  .block-preview-panel {
    position: static;
  }
}
</style>
