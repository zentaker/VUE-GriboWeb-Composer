<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

type ContentItem = {
  contentType: 'blog' | 'projects' | 'docs' | 'labs'
  title: string
  slug: string
  filePath: string
  status: string
}

type PreviewResponse = {
  ok: boolean
  manifest: {
    packageType: string
    title: string
    slug: string
    exportedAt: string
    contentFiles: string[]
    uploadFiles: string[]
  }
  files: Array<{ path: string, encoding: string, size: number }>
  creates: string[]
  conflicts: string[]
  warnings: string[]
}

const { data: contentData, refresh: refreshContent } = await useFetch<{ items: ContentItem[] }>('/api/admin/content/list')
const { data: snapshotData, refresh: refreshSnapshots } = await useFetch<{ snapshots: Array<{ filename: string, createdAt: string, size: number }> }>('/api/admin/backups/snapshots')

const selectedProject = ref('')
const selectedBlog = ref('')
const packageText = ref('')
const preview = ref<PreviewResponse | null>(null)
const importMode = ref<'copy' | 'replace'>('copy')
const replaceConfirmation = ref('')
const restoreConfirmation = ref('')
const busy = ref(false)
const message = ref('')
const error = ref('')

const projects = computed(() => (contentData.value?.items || []).filter((item) => item.contentType === 'projects'))
const blogPosts = computed(() => (contentData.value?.items || []).filter((item) => item.contentType === 'blog'))
const snapshots = computed(() => snapshotData.value?.snapshots || [])

watchEffect(() => {
  if (!selectedProject.value && projects.value[0]) selectedProject.value = projects.value[0].slug
  if (!selectedBlog.value && blogPosts.value[0]) selectedBlog.value = blogPosts.value[0].slug
})

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

async function downloadEndpoint(url: string, fallbackName: string) {
  error.value = ''
  message.value = ''
  busy.value = true

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(await response.text())
    const disposition = response.headers.get('content-disposition') || ''
    const filename = disposition.match(/filename="([^"]+)"/)?.[1] || fallbackName
    downloadBlob(await response.blob(), filename)
    message.value = `Downloaded ${filename}.`
  } catch (err: any) {
    error.value = err?.message || 'Export failed.'
  } finally {
    busy.value = false
  }
}

function exportFull() {
  return downloadEndpoint('/api/admin/backups/export-full', 'gribo-backup.gribo.json')
}

function exportProject() {
  if (!selectedProject.value) return
  return downloadEndpoint(`/api/admin/backups/export-project?slug=${encodeURIComponent(selectedProject.value)}`, `gribo-project-${selectedProject.value}.gribo.json`)
}

function exportBlog() {
  if (!selectedBlog.value) return
  return downloadEndpoint(`/api/admin/backups/export-blog?slug=${encodeURIComponent(selectedBlog.value)}`, `gribo-blog-${selectedBlog.value}.gribo.json`)
}

async function loadPackageFromFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  packageText.value = await file.text()
  preview.value = null
}

function parsePackage() {
  try {
    return JSON.parse(packageText.value)
  } catch {
    throw new Error('Package JSON is invalid.')
  }
}

async function previewPackage() {
  error.value = ''
  message.value = ''
  preview.value = null
  busy.value = true

  try {
    const response = await $fetch<PreviewResponse>('/api/admin/backups/preview', {
      method: 'POST',
      body: {
        package: parsePackage()
      }
    })
    preview.value = response
    message.value = 'Package preview is ready. Nothing has been written yet.'
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Preview failed.'
  } finally {
    busy.value = false
  }
}

async function applyImport() {
  if (!preview.value) return
  error.value = ''
  message.value = ''
  busy.value = true

  try {
    const response = await $fetch<{ ok: boolean, written: string[], snapshot: { filename: string, fileCount: number } }>('/api/admin/backups/import', {
      method: 'POST',
      body: {
        package: parsePackage(),
        mode: importMode.value,
        confirmation: replaceConfirmation.value,
        restoreConfirmation: restoreConfirmation.value
      }
    })
    message.value = `Imported ${response.written.length} files. Safety snapshot: ${response.snapshot.filename} (${response.snapshot.fileCount} files).`
    preview.value = null
    packageText.value = ''
    replaceConfirmation.value = ''
    restoreConfirmation.value = ''
    await Promise.all([refreshContent(), refreshSnapshots()])
  } catch (err: any) {
    error.value = err?.data?.message || err?.message || 'Import failed.'
  } finally {
    busy.value = false
  }
}

function downloadLatestSnapshot() {
  return downloadEndpoint('/api/admin/backups/latest-snapshot', 'gribo-safety-snapshot.gribo.json')
}
</script>

<template>
  <div class="backups-page">
    <AdminHero
      eyebrow="Content Portability"
      title="Backups, packages, and safety snapshots."
      description="Move Gribo content between local and hosted instances without rebuilding posts, projects, docs, labs, settings, or uploads by hand."
    />

    <div v-if="message || error" class="notice-stack">
      <p v-if="message" class="notice success">{{ message }}</p>
      <p v-if="error" class="notice danger">{{ error }}</p>
    </div>

    <section class="backup-grid">
      <AdminPanel title="Full-site backup" eyebrow="Export">
        <p class="muted">Exports approved content folders and existing uploads into one portable `.gribo.json` package.</p>
        <button class="studio-btn primary" :disabled="busy" @click="exportFull">Export full backup</button>
      </AdminPanel>

      <AdminPanel title="Package exports" eyebrow="Single entity">
        <div class="field-row">
          <label>
            <span>Project package</span>
            <select v-model="selectedProject">
              <option v-for="project in projects" :key="project.filePath" :value="project.slug">
                {{ project.title }}
              </option>
            </select>
          </label>
          <button class="studio-btn" :disabled="busy || !selectedProject" @click="exportProject">Export project package</button>
        </div>

        <div class="field-row">
          <label>
            <span>Blog package</span>
            <select v-model="selectedBlog">
              <option v-for="post in blogPosts" :key="post.filePath" :value="post.slug">
                {{ post.title }}
              </option>
            </select>
          </label>
          <button class="studio-btn" :disabled="busy || !selectedBlog" @click="exportBlog">Export blog package</button>
        </div>
      </AdminPanel>
    </section>

    <AdminPanel title="Import package" eyebrow="Preview first">
      <div class="import-layout">
        <div class="import-inputs">
          <label class="file-picker">
            <span>Choose `.gribo.json` package</span>
            <input type="file" accept=".json,.gribo.json,application/json" @change="loadPackageFromFile">
          </label>
          <label>
            <span>Or paste package JSON</span>
            <textarea v-model="packageText" rows="10" placeholder="{ &quot;manifest&quot;: ..., &quot;files&quot;: [...] }" />
          </label>
          <button class="studio-btn primary" :disabled="busy || !packageText.trim()" @click="previewPackage">Preview import</button>
        </div>

        <div class="preview-card">
          <template v-if="preview">
            <p class="panel-eyebrow">Import preview</p>
            <h3>{{ preview.manifest.title }}</h3>
            <p class="muted">{{ preview.manifest.packageType }} · {{ preview.manifest.slug }}</p>

            <div class="preview-stats">
              <span>{{ preview.creates.length }} create</span>
              <span>{{ preview.conflicts.length }} conflicts</span>
              <span>{{ preview.files.length }} files</span>
            </div>

            <div v-if="preview.warnings.length" class="warning-list">
              <strong>Warnings</strong>
              <p v-for="warning in preview.warnings" :key="warning">{{ warning }}</p>
            </div>

            <div class="file-columns">
              <div>
                <strong>Files to create</strong>
                <small v-if="!preview.creates.length">None</small>
                <small v-for="file in preview.creates" :key="file">{{ file }}</small>
              </div>
              <div>
                <strong>Conflicts</strong>
                <small v-if="!preview.conflicts.length">None</small>
                <small v-for="file in preview.conflicts" :key="file">{{ file }}</small>
              </div>
            </div>

            <div class="mode-box">
              <label><input v-model="importMode" type="radio" value="copy"> Import as copy</label>
              <label><input v-model="importMode" type="radio" value="replace"> Replace existing</label>
            </div>

            <label v-if="importMode === 'replace' && preview.conflicts.length">
              <span>Replace confirmation</span>
              <input v-model="replaceConfirmation" type="text" placeholder="REPLACE GRIBO CONTENT">
            </label>

            <label v-if="importMode === 'replace' && preview.manifest.packageType === 'full-site'">
              <span>Restore confirmation</span>
              <input v-model="restoreConfirmation" type="text" placeholder="RESTORE GRIBO BACKUP">
            </label>

            <button class="studio-btn primary" :disabled="busy" @click="applyImport">Apply import</button>
          </template>
          <template v-else>
            <p class="panel-eyebrow">No package preview</p>
            <h3>Nothing will be written until preview and confirmation.</h3>
            <p class="muted">Packages with unsafe paths such as `../`, absolute paths, `app/`, `server/`, `.env`, package files, or config files are rejected by the API.</p>
          </template>
        </div>
      </div>
    </AdminPanel>

    <section class="backup-grid">
      <AdminPanel title="Safety snapshots" eyebrow="Automatic guardrail">
        <template #action>
          <button class="studio-btn" :disabled="busy || !snapshots.length" @click="downloadLatestSnapshot">Download latest</button>
        </template>
        <p class="muted">Snapshots are created before imports or restores and stored outside public content.</p>
        <div class="snapshot-list">
          <article v-for="snapshot in snapshots.slice(0, 6)" :key="snapshot.filename">
            <strong>{{ snapshot.filename }}</strong>
            <span>{{ new Date(snapshot.createdAt).toLocaleString() }} · {{ Math.round(snapshot.size / 1024) }} KB</span>
          </article>
          <p v-if="!snapshots.length" class="muted">No safety snapshots yet.</p>
        </div>
      </AdminPanel>

      <AdminPanel title="Danger zone" eyebrow="Restore">
        <p class="muted">Full restore can overwrite existing content. Preview the package first, choose Replace existing, and type both confirmation phrases when conflicts or full restore are involved.</p>
        <ul class="danger-rules">
          <li>Do not restore untrusted packages.</li>
          <li>Safety snapshot is created before writing.</li>
          <li>Only approved content and upload paths can be written.</li>
        </ul>
      </AdminPanel>
    </section>
  </div>
</template>

<style scoped>
.backups-page {
  display: grid;
  gap: 24px;
}

.backup-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 18px;
}

.notice-stack {
  display: grid;
  gap: 10px;
}

.notice {
  margin: 0;
  padding: 13px 15px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
}

.notice.success {
  border-color: color-mix(in srgb, var(--mint), transparent 55%);
}

.notice.danger {
  border-color: color-mix(in srgb, var(--coral), transparent 42%);
}

.muted {
  color: var(--muted);
}

.field-row,
.import-inputs {
  display: grid;
  gap: 12px;
}

.field-row + .field-row {
  margin-top: 18px;
}

label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

select,
input,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: color-mix(in srgb, var(--paper), black 7%);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  text-transform: none;
}

select,
input {
  min-height: 44px;
  padding: 0 12px;
}

textarea {
  min-height: 220px;
  padding: 12px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 13px;
  line-height: 1.55;
}

.studio-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  width: fit-content;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0 16px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font-weight: 850;
}

.studio-btn.primary {
  border-color: color-mix(in srgb, var(--coral), transparent 42%);
  background: var(--coral);
  color: #190d0b;
}

.studio-btn:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.import-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 18px;
}

.preview-card {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper);
}

.panel-eyebrow {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.preview-card h3 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.055em;
  line-height: 1;
}

.preview-stats,
.mode-box {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.preview-stats span,
.mode-box label {
  width: fit-content;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 10px;
  background: var(--paper-soft);
  color: var(--ink);
  font-size: 12px;
  letter-spacing: 0;
  text-transform: none;
}

.mode-box input {
  min-height: auto;
  width: auto;
}

.warning-list,
.file-columns {
  display: grid;
  gap: 10px;
}

.warning-list {
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--yellow), transparent 55%);
  border-radius: 16px;
  background: color-mix(in srgb, var(--yellow), transparent 92%);
}

.warning-list p {
  margin: 0;
  color: var(--muted);
}

.file-columns {
  grid-template-columns: 1fr 1fr;
}

.file-columns div,
.snapshot-list article {
  display: grid;
  gap: 6px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
}

.file-columns small,
.snapshot-list span {
  color: var(--muted);
  font-size: 12px;
  word-break: break-word;
}

.snapshot-list {
  display: grid;
  gap: 10px;
}

.danger-rules {
  margin: 16px 0 0;
  color: var(--muted);
}

@media (max-width: 1100px) {
  .backup-grid,
  .import-layout {
    grid-template-columns: 1fr;
  }
}
</style>
