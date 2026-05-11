<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { assets, pending, error, refreshAssets, uploadAsset } = useStudioMediaLibrary()
const fileInput = ref<HTMLInputElement | null>(null)
const uploadMessage = ref('')
const allowedUploadTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxUploadBytes = 5 * 1024 * 1024

await useAsyncData('admin-media-library-assets', () => refreshAssets().then(() => true))

function openUpload() {
  fileInput.value?.click()
}

function validateUploadFile(file: File) {
  if (!allowedUploadTypes.includes(file.type)) return 'File type not allowed.'
  if (file.size > maxUploadBytes) return 'File is too large.'
  return ''
}

async function uploadFromInput(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  const validationError = validateUploadFile(file)
  if (validationError) {
    uploadMessage.value = validationError
    return
  }

  uploadMessage.value = 'Uploading image...'

  try {
    await uploadAsset(file)
    uploadMessage.value = 'Image uploaded.'
  } catch (uploadError: any) {
    uploadMessage.value = uploadError?.data?.statusMessage || uploadError?.message || 'Upload failed.'
  }
}
</script>

<template>
  <div class="admin-page">
    <input
      ref="fileInput"
      class="visually-hidden-file"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      @change="uploadFromInput"
    >

    <AdminHero
      eyebrow="Media Library"
      title="Images, mockups, and visual references."
      description="Reusable visual assets from public/uploads for covers and image blocks. Upload JPG, PNG or WebP files and select them from the content composer."
    />

    <div class="media-toolbar">
      <button class="studio-btn" type="button" @click="openUpload">Upload image</button>
      <button class="ghost-btn" type="button" :disabled="pending" @click="refreshAssets">
        {{ pending ? 'Reading media...' : 'Refresh media' }}
      </button>
      <p v-if="uploadMessage" class="muted">{{ uploadMessage }}</p>
      <p v-if="error" class="muted">{{ error }}</p>
    </div>

    <section class="media-grid">
      <div v-if="!assets.length" class="empty-media">
        <strong>No media uploaded yet.</strong>
        <p>Upload a JPG, PNG or WebP image to make it available for covers and image blocks.</p>
        <button class="studio-btn" type="button" @click="openUpload">Upload image</button>
      </div>
      <article v-for="item in assets" :key="item.id" class="media-item">
        <div class="media-thumb">
          <img :src="item.url" :alt="item.title">
        </div>
        <div class="media-meta">
          <strong>{{ item.title }}</strong>
          <span>{{ item.filename }} · {{ item.usage }}</span>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.admin-page {
  display: grid;
  gap: 24px;
}

.visually-hidden-file {
  position: fixed;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.empty-media {
  display: grid;
  grid-column: 1 / -1;
  gap: 10px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
}

.empty-media strong {
  color: var(--ink);
  font-size: 18px;
  letter-spacing: -0.03em;
}

.empty-media p {
  margin: 0;
  color: var(--muted);
}

.media-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.ghost-btn {
  display: inline-grid;
  min-height: 40px;
  place-items: center;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
  font-weight: 780;
}

.studio-btn {
  display: inline-grid;
  min-height: 40px;
  place-items: center;
  padding: 0 14px;
  border: 1px solid var(--coral);
  border-radius: 999px;
  background: var(--coral);
  color: #191714;
  cursor: pointer;
  font-weight: 780;
}

.ghost-btn:disabled {
  cursor: wait;
  opacity: 0.6;
}

.media-item {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
}

.media-thumb {
  overflow: hidden;
  aspect-ratio: 1 / 0.78;
  background: linear-gradient(135deg, var(--coral), var(--lavender));
  filter: saturate(0.9);
}

.media-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.media-meta {
  padding: 12px;
}

.media-meta strong {
  display: block;
  font-size: 13px;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.media-meta span {
  color: var(--muted);
  font-size: 12px;
}

@media (max-width: 1280px) {
  .media-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 680px) {
  .media-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
