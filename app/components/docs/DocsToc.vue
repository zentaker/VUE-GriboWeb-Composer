<template>
  <aside class="docs-toc" aria-label="On this page">
    <h3>On this page</h3>
    <a href="#content">Content</a>
    <a href="#project-state">Project state</a>
    <a href="#notes">Notes</a>
    <a href="#next">Next steps</a>
    <div class="mini-card">
      <strong>Project status</strong>
      <p>Active research. Public docs remain read-only in this stage.</p>
    </div>
    <div class="mini-card">
      <strong>Docs pattern</strong>
      <p>Technical documentation with Gribo's magazine-lab identity.</p>
    </div>
  </aside>
</template>

<style scoped>
.docs-toc {
  position: sticky;
  top: 68px;
  height: calc(100vh - 68px);
  overflow: auto;
  padding: 24px 18px;
  border-left: 1px solid var(--line);
}

h3 {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

a {
  display: block;
  padding: 7px 0;
  color: var(--muted);
  font-size: 13px;
}

a:hover {
  color: var(--ink);
}

.mini-card {
  margin-top: 18px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--paper-soft);
}

.mini-card p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 13px;
}

@media (max-width: 1180px) {
  .docs-toc {
    display: none;
  }
}
</style>
