<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value.join('/') : String(value || '')
})
const docsFolder = computed(() => slug.value.split('/')[0] || '')
const currentPath = computed(() => `/docs/${slug.value}`.replace(/\/index$/, ''))
const { data: docs } = await useAsyncData(`docs-sidebar-${docsFolder.value}`, async () => {
  return await queryCollection('docs').all()
})
const { data: projects } = await useAsyncData(`docs-sidebar-projects-${docsFolder.value}`, async () => {
  return await queryCollection('projects').all()
})
const docPath = (doc: any) => doc.path || `/${doc.stem || ''}`.replace(/\/index$/, '')
const normalizeDocRef = (value: unknown) => {
  const ref = String(value || '').trim()
  if (!ref) return ''
  return ref.startsWith('/docs/') ? ref.replace(/\/index$/, '') : `/docs/${ref}`.replace(/\/index$/, '')
}
const currentDoc = computed(() => (docs.value ?? []).find((doc: any) => docPath(doc) === currentPath.value))
const explicitProject = computed(() => {
  const current = currentPath.value
  const candidates = projects.value ?? []
  return candidates.find((project: any) => {
    const refs = [
      ...(Array.isArray(project.relatedDocs) ? project.relatedDocs : []),
      ...(Array.isArray(project.docsPaths) ? project.docsPaths : []),
      project.docsPath
    ].map(normalizeDocRef).filter(Boolean)
    return refs.includes(current)
  })
})
const fallbackProject = computed(() => {
  if (explicitProject.value) return explicitProject.value
  const docProjectSlug = currentDoc.value?.projectSlug
  if (docProjectSlug) {
    const bySlug = (projects.value ?? []).find((project: any) => project.slug === docProjectSlug)
    if (bySlug) return bySlug
  }
  return (projects.value ?? []).find((project: any) => project.docsFolder && project.docsFolder === docsFolder.value)
})
const project = computed(() => explicitProject.value ?? fallbackProject.value)
const attachedDocRefs = computed(() => {
  const projectValue = project.value
  if (!projectValue) return []
  return [
    ...(Array.isArray(projectValue.relatedDocs) ? projectValue.relatedDocs : []),
    ...(Array.isArray(projectValue.docsPaths) ? projectValue.docsPaths : []),
    projectValue.docsPath
  ].map(normalizeDocRef).filter((item, index, list) => item && list.indexOf(item) === index)
})
const folderDocs = computed(() => (docs.value ?? [])
  .filter((doc: any) => {
    const path = docPath(doc)
    if (attachedDocRefs.value.length) return attachedDocRefs.value.includes(path)
    return path.startsWith(`/docs/${docsFolder.value}`)
  })
  .sort((a: any, b: any) => Number(a.order ?? 99) - Number(b.order ?? 99) || docPath(a).localeCompare(docPath(b)))
)
const projectSlug = computed(() => project.value?.slug || currentDoc.value?.projectSlug || '')
const projectRoute = computed(() => projectSlug.value ? `/repository/${projectSlug.value}` : '/repository')
</script>

<template>
  <aside class="docs-sidebar" aria-label="Docs sidebar">
    <div class="side-title">Start</div>
    <NuxtLink class="side-link" :to="`/docs/${docsFolder}`">Docs overview</NuxtLink>
    <NuxtLink class="side-link" :to="projectRoute">Project overview</NuxtLink>
    <a class="side-link" href="#next">Next steps</a>

    <div class="side-title">Documentation</div>
    <NuxtLink v-for="doc in folderDocs" :key="docPath(doc)" class="side-link" :to="docPath(doc)">
      {{ doc.title }}
    </NuxtLink>
    <p v-if="!folderDocs.length" class="side-note">No docs found for this folder.</p>

    <div class="side-title">Reference</div>
    <a class="side-link" href="#content">Content</a>
    <a class="side-link" href="#next">Next steps</a>
  </aside>
</template>

<style scoped>
.docs-sidebar {
  position: sticky;
  top: 68px;
  height: calc(100vh - 68px);
  overflow: auto;
  padding: 22px 16px;
  border-right: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg), var(--paper) 18%);
}

.side-title {
  margin: 22px 10px 9px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.side-title:first-child {
  margin-top: 0;
}

.side-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
  padding: 8px 10px;
  border-radius: 12px;
  color: var(--muted);
  font-size: 14px;
}

.side-link.router-link-active,
.side-link:hover {
  background: var(--paper-soft);
  color: var(--ink);
}

.side-note {
  margin: 0 10px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .docs-sidebar {
    display: none;
  }
}
</style>
