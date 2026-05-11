<template>
  <aside class="studio-sidebar">
    <NuxtLink class="brand studio-brand" to="/admin">
      <BrandMark />
      <span>Gribo<br><small class="studio-label">Studio</small></span>
    </NuxtLink>
    <nav class="studio-nav" aria-label="Studio navigation">
      <p class="side-section-title">Cockpit</p>
      <NuxtLink to="/admin"><span class="nav-icon">O</span>Overview</NuxtLink>
      <NuxtLink to="/admin/home"><span class="nav-icon">H</span>Home Composer</NuxtLink>
      <NuxtLink to="/admin/queue"><span class="nav-icon">Q</span>Publish Queue</NuxtLink>

      <p class="side-section-title">Content</p>
      <NuxtLink to="/admin/blog"><span class="nav-icon">B</span>Blog Entries</NuxtLink>
      <NuxtLink to="/admin/projects"><span class="nav-icon">P</span>Repository Projects</NuxtLink>
      <NuxtLink to="/admin/docs"><span class="nav-icon">D</span>Documentation</NuxtLink>
      <NuxtLink to="/admin/labs"><span class="nav-icon">L</span>Labs</NuxtLink>
      <NuxtLink to="/admin/insights"><span class="nav-icon">I</span>Insights</NuxtLink>
      <NuxtLink to="/admin/media"><span class="nav-icon">M</span>Media Library</NuxtLink>
      <NuxtLink to="/admin/backups"><span class="nav-icon">X</span>Backups</NuxtLink>
      <NuxtLink to="/admin/users"><span class="nav-icon">U</span>Admin Users</NuxtLink>

      <p class="side-section-title">Create / Composer</p>
      <NuxtLink to="/admin/content/new?type=projects"><span class="nav-icon">P</span>New Project</NuxtLink>
      <NuxtLink to="/admin/content/new?type=blog&direct=true"><span class="nav-icon">B</span>New Blog Entry</NuxtLink>
      <NuxtLink to="/admin/content/new?type=docs"><span class="nav-icon">D</span>New Docs Page</NuxtLink>
      <NuxtLink to="/admin/content/new?type=labs&direct=true"><span class="nav-icon">L</span>New Lab</NuxtLink>
      <NuxtLink to="/admin/content/new?type=projects"><span class="nav-icon">C</span>Content Blocks</NuxtLink>
      <NuxtLink to="/admin/media"><span class="nav-icon">M</span>Media Upload</NuxtLink>
      <NuxtLink to="/admin/content/new?type=projects"><span class="nav-icon">P</span>Preview</NuxtLink>
      <NuxtLink to="/admin/queue"><span class="nav-icon">↗</span>Publish Settings</NuxtLink>
    </nav>
    <div class="side-card">
      <strong>ProjectComposer.vue</strong>
      <p>Editing surface for content/projects/*.md, rich blocks, media references and markdown fallback.</p>
    </div>
  </aside>
</template>

<style scoped>
.studio-sidebar {
  position: sticky;
  top: 0;
  z-index: 40;
  height: 100vh;
  padding: 20px 16px;
  border-right: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg), var(--paper) 18%);
  overflow: auto;
}

.studio-brand {
  padding: 6px 8px 22px;
  font-weight: 900;
  letter-spacing: -0.055em;
}

.studio-label,
.side-section-title {
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  text-transform: uppercase;
}

.studio-label {
  display: block;
  margin-top: -4px;
  letter-spacing: 0.16em;
}

.side-section-title {
  margin: 22px 10px 9px;
  letter-spacing: 0.13em;
}

.studio-nav {
  display: grid;
  gap: 8px;
}

.studio-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 9px 10px;
  border: 1px solid transparent;
  border-radius: 14px;
  color: var(--muted);
  text-align: left;
  transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.studio-nav a.router-link-exact-active,
.studio-nav a:hover {
  background: var(--paper-soft);
  color: var(--ink);
}

.studio-nav a:hover {
  transform: translateX(2px);
}

.nav-icon {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 10px;
  background: color-mix(in srgb, var(--coral), transparent 82%);
  color: var(--coral);
  font-size: 0.82rem;
  font-weight: 900;
}

.side-card {
  margin-top: 24px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: linear-gradient(145deg, var(--paper-soft), color-mix(in srgb, var(--lavender), transparent 88%));
}

.side-card strong {
  display: block;
  letter-spacing: -0.035em;
  line-height: 1.1;
}

.side-card p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.side-card code {
  color: var(--ink);
}

@media (max-width: 980px) {
  .studio-sidebar {
    display: none;
  }
}
</style>
