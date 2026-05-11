<script setup lang="ts">
import type { AdminContentListItem, AdminContentType } from '~/composables/useAdminContent'

definePageMeta({
  layout: 'admin'
})

type RichContentBlock = {
  id: string
  type: 'heading' | 'text' | 'image' | 'code' | 'callout' | 'table' | 'banner' | 'steps' | 'gallery' | 'split'
  title: string
  visible: boolean
  data: Record<string, any>
}

const route = useRoute()
const router = useRouter()
const allowedTypes: AdminContentType[] = ['blog', 'projects', 'docs', 'labs']
const normalizeType = (value: string): AdminContentType | '' => {
  if (value === 'project') return 'projects'
  if (value === 'lab') return 'labs'
  return allowedTypes.includes(value as AdminContentType) ? value as AdminContentType : ''
}
const routeType = normalizeType(String(route.query.type || ''))
const contentType: AdminContentType = allowedTypes.includes(routeType as AdminContentType) ? routeType as AdminContentType : 'blog'
const filePath = ref(String(route.query.file || ''))
const { listContent, readContent, saveContent, archiveContent, deleteBlogContent } = useAdminContent()

const frontmatter = ref<Record<string, any>>({})
const markdownBody = ref('')
const statusMessage = ref('')
const saveState = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')
let saveMessageTimer: ReturnType<typeof setTimeout> | undefined
const isSaving = ref(false)
const isDeleting = ref(false)
const deleteConfirmation = ref('')
const slugManuallyEdited = ref(true)
const tagsText = ref('')
const stackText = ref('')
const relatedTagsText = ref('')
const roadmapText = ref('')
const openQuestionsText = ref('')
const isAttachingDocs = ref(false)
const selectedAttachmentDocs = ref<string[]>([])
const activeTab = ref<'content' | 'metadata' | 'seo' | 'media' | 'preview'>('content')
const selectedBlockId = ref('')
const mediaPickerMode = ref<'cover' | 'block' | ''>('')
const mediaPickerBlockId = ref('')
const blockTabs = [
  { id: 'content', label: 'Content' },
  { id: 'metadata', label: 'Metadata' },
  { id: 'seo', label: 'SEO' },
  { id: 'media', label: 'Media' },
  { id: 'preview', label: 'Preview' }
] as const
const { assets: mediaAssets, pending: mediaPending, error: mediaError, refreshAssets, uploadAsset } = useStudioMediaLibrary()
await useAsyncData('composer-media-assets', () => refreshAssets().then(() => true))
const { data: docsData } = await useAsyncData(`editor-related-docs-${filePath.value}`, () => contentType === 'projects'
  ? listContent('docs')
  : Promise.resolve({ items: [] })
)
const { data: labsData } = await useAsyncData('editor-labs-list', () => listContent('labs'))

const splitComma = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean)
const splitLines = (value: string) => value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)
const toText = (value: unknown) => Array.isArray(value) ? value.join(', ') : ''
const toLines = (value: unknown) => Array.isArray(value) ? value.join('\n') : ''
const docsOptions = computed<AdminContentListItem[]>(() => docsData.value?.items ?? [])
const labsOptions = computed<AdminContentListItem[]>(() => labsData.value?.items ?? [])
const statusOptions = ['draft', 'review', 'published', 'archived']
const currentStatus = computed(() => String(frontmatter.value.status || 'draft'))
const statusChoices = computed(() => statusOptions.includes(currentStatus.value)
  ? statusOptions
  : [currentStatus.value, ...statusOptions]
)
const labChoices = computed(() => labsOptions.value.map((lab) => ({
  label: lab.title,
  value: lab.slug || lab.filePath.replace(/^labs\//, '').replace(/\.md$/, '')
})))
const labSelectChoices = computed(() => {
  const current = String(frontmatter.value.lab || '')
  if (!current || labChoices.value.some((lab) => lab.value === current)) return labChoices.value
  return [{ label: current, value: current }, ...labChoices.value]
})
const labDisplayName = computed(() => labChoices.value.find((lab) => lab.value === frontmatter.value.lab)?.label || frontmatter.value.lab || 'Unassigned')
const isBlogComposer = computed(() => contentType === 'blog')
const coverStyleOptions = [
  { value: 'terminal-dark', label: 'Terminal dark' },
  { value: 'editorial-card', label: 'Editorial card' },
  { value: 'gradient-surface', label: 'Gradient surface' },
  { value: 'minimal-cover', label: 'Minimal cover' },
  { value: 'editorial-gradient', label: 'Editorial gradient' },
  { value: 'soft-image-overlay', label: 'Soft image overlay' },
  { value: 'minimal-documentation', label: 'Minimal documentation' }
]
const blogHeroStyleOptions = [
  { value: 'editorial-gradient', label: 'Editorial gradient' },
  { value: 'terminal-dark', label: 'Terminal dark' },
  { value: 'soft-magazine', label: 'Soft magazine' },
  { value: 'minimal-dark', label: 'Minimal dark' }
]
const coverPositionOptions = ['center', 'left', 'right', 'top', 'bottom']
const accentOptions = [
  { value: 'coral', label: 'Coral' },
  { value: 'lavender', label: 'Lavender' },
  { value: 'cream', label: 'Cream' },
  { value: 'graphite', label: 'Graphite' },
  { value: 'soft-red', label: 'Soft red' },
  { value: 'muted-violet', label: 'Muted violet' }
]
const docByPath = computed(() => new Map(docsOptions.value.map((doc) => [doc.publicPath, doc])))
const getDocFolder = (doc?: AdminContentListItem) => doc?.docsFolder || doc?.filePath.replace(/^docs\//, '').split('/')[0] || ''
const getDocProject = (doc?: AdminContentListItem) => doc?.project || doc?.projectSlug || 'No project metadata'
const contentLabel = computed(() => contentType === 'projects'
  ? 'Project Composer'
  : contentType === 'blog'
    ? 'Blog Composer'
    : contentType === 'docs'
      ? 'Docs Composer'
      : 'Lab Editor'
)
const composerTitle = computed(() => contentType === 'projects'
  ? 'Create a living project repository.'
  : contentType === 'blog'
    ? 'Create an editorial entry.'
    : contentType === 'docs'
      ? 'Create a technical documentation page.'
      : 'Edit a research line.'
)
const composerDescription = computed(() => contentType === 'projects'
  ? 'Upload or select images, write text, add code blocks, tables, callouts, banners and arrange the public dossier before publishing to the Gribo frontend.'
  : contentType === 'blog'
    ? 'Shape the article with text, images, code, callouts and editorial sections while keeping the markdown body available as a fallback.'
    : contentType === 'docs'
      ? 'Compose technical documentation with reusable blocks while preserving clear project metadata and markdown compatibility.'
      : 'Update the lab metadata and editorial seed copy.'
)
const composerHeroTitle = computed(() => contentType === 'blog'
  ? String(frontmatter.value.title || '').trim() || composerTitle.value
  : composerTitle.value
)
const composerHeroDescription = computed(() => contentType === 'blog'
  ? String(frontmatter.value.description || frontmatter.value.excerpt || '').trim() || composerDescription.value
  : composerDescription.value
)
const composerPreviewDate = computed(() => {
  const value = frontmatter.value.updatedAt || frontmatter.value.date
  return value
    ? new Date(value).toLocaleDateString('en', { month: 'long', day: '2-digit', year: 'numeric' })
    : 'Draft'
})
const isRichComposer = computed(() => contentType !== 'labs')
const secondaryDocText = (doc: AdminContentListItem) => `${doc.publicPath} · folder: ${getDocFolder(doc)}`

function blockId() {
  return `block-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
}

function defaultBlockTitle(type: RichContentBlock['type']) {
  const titles: Record<RichContentBlock['type'], string> = {
    heading: 'Heading Block',
    text: 'Text Block',
    image: 'Image Block',
    code: 'Code Block',
    callout: 'Callout Block',
    table: 'Table Block',
    banner: 'Banner Block',
    steps: 'Steps Block',
    gallery: 'Gallery Block',
    split: 'Split Layout'
  }
  return titles[type]
}

function normalizeBlocks(value: unknown): RichContentBlock[] {
  if (!Array.isArray(value)) return []

  return value
    .filter((block) => block && typeof block === 'object')
    .map((block: any) => ({
      id: String(block.id || blockId()),
      type: String(block.type || 'text') as RichContentBlock['type'],
      title: typeof block.title === 'string' ? block.title : '',
      visible: block.visible !== false,
      data: block.data && typeof block.data === 'object'
        ? {
            ...block.data,
            layout: String(block.type || '') === 'image' ? normalizeImageLayout(block.data.layout) : block.data.layout
          }
        : {}
    }))
}

function normalizeImageLayout(value: unknown) {
  const layout = String(value || 'contained')
  if (layout === 'full') return 'full-width'
  if (layout === 'bleed') return 'full-width'
  if (layout === 'left' || layout === 'right') return 'inline-medium'
  if (['full-width', 'contained', 'inline-medium', 'inline-small', 'editorial-crop'].includes(layout)) return layout
  return 'contained'
}

function createBlock(type: RichContentBlock['type']): RichContentBlock {
  const defaults: Record<RichContentBlock['type'], Record<string, any>> = {
    heading: {
      kicker: '',
      heading: '',
      subheading: '',
      level: 'h2'
    },
    text: {
      heading: '',
      body: ''
    },
    image: {
      imageUrl: '',
      alt: '',
      caption: '',
      layout: 'contained'
    },
    code: {
      title: 'minimum-viable-test.yaml',
      language: 'yaml',
      code: 'goal: keep the system legible\nstatus: draft\n',
      copyEnabled: true
    },
    callout: {
      variant: 'info',
      title: 'Configuration is not activation.',
      body: 'A setting is only useful when the runtime path answers.',
      icon: 'i'
    },
    table: {
      columns: ['Signal', 'Observed state', 'Next action'],
      rows: [['Runtime', 'Draft', 'Document the path']],
      columnsText: 'Signal, Observed state, Next action',
      rowsText: 'Runtime | Draft | Document the path'
    },
    banner: {
      title: 'The system leaves a trace.',
      body: 'Use this block as an editorial separator inside a project dossier.',
      accent: 'coral',
      layout: 'editorial'
    },
    steps: {
      items: [
        { title: 'Start', body: 'Define the smallest useful action.' },
        { title: 'Inspect', body: 'Record what changed and what resisted.' }
      ]
    },
    gallery: {
      images: []
    },
    split: {
      leftContent: 'Editorial note',
      rightContent: 'Technical trace',
      layout: 'text-text'
    }
  }

  return {
    id: blockId(),
    type,
    title: ['heading', 'text', 'image'].includes(type) ? '' : defaultBlockTitle(type),
    visible: true,
    data: { ...defaults[type] }
  }
}

const editableBlocks = ref<RichContentBlock[]>([])
const visibleBlocks = computed(() => editableBlocks.value.filter((block) => block.visible !== false))
const selectedBlock = computed(() => editableBlocks.value.find((block) => block.id === selectedBlockId.value))
const implementedBlockTypes = ['heading', 'text', 'image', 'code', 'callout', 'table', 'banner'] as const
const laterBlockTypes = ['steps', 'gallery', 'split'] as const
const coverFileInput = ref<HTMLInputElement | null>(null)
const pickerFileInput = ref<HTMLInputElement | null>(null)
const uploadMessage = ref('')
const allowedUploadTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxUploadBytes = 5 * 1024 * 1024

function blockUiTitle(block: RichContentBlock) {
  const title = String(block.title || '').trim()
  if (title) return title
  if (block.type === 'heading') {
    const heading = String(block.data?.heading || '').trim()
    if (heading) return heading
  }
  return `Untitled ${block.type} block`
}

function selectBlock(id: string) {
  selectedBlockId.value = id
}

function addBlock(type: RichContentBlock['type']) {
  const next = [...editableBlocks.value, createBlock(type)]
  editableBlocks.value = next
  selectedBlockId.value = next[next.length - 1]?.id || ''
}

function duplicateBlock(index: number) {
  const source = editableBlocks.value[index]
  if (!source) return
  const clone = JSON.parse(JSON.stringify(source))
  clone.id = blockId()
  clone.title = source.title ? `${source.title} copy` : ''
  const next = [...editableBlocks.value]
  next.splice(index + 1, 0, clone)
  editableBlocks.value = next
  selectedBlockId.value = clone.id
}

function removeBlock(index: number) {
  const next = editableBlocks.value.filter((_, itemIndex) => itemIndex !== index)
  editableBlocks.value = next
  if (!next.some((block) => block.id === selectedBlockId.value)) selectedBlockId.value = next[0]?.id || ''
}

function toggleBlock(block: RichContentBlock) {
  block.visible = !block.visible
  editableBlocks.value = [...editableBlocks.value]
}

function moveBlock(index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= editableBlocks.value.length) return
  const next = [...editableBlocks.value]
  const [item] = next.splice(index, 1)
  next.splice(target, 0, item)
  editableBlocks.value = next
}

function syncTableColumns(block: RichContentBlock) {
  block.data.columns = String(block.data.columnsText || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function syncTableRows(block: RichContentBlock) {
  block.data.rows = String(block.data.rowsText || '')
    .split(/\r?\n/)
    .map((row) => row.split('|').map((cell) => cell.trim()).filter(Boolean))
    .filter((row) => row.length)
}

function chooseCover(url: string) {
  frontmatter.value.coverImage = url
  if (!frontmatter.value.coverAlt) {
    const asset = mediaAssets.value.find((item) => item.url === url)
    frontmatter.value.coverAlt = asset?.title || ''
  }
  mediaPickerMode.value = ''
}

function chooseImageForBlock(block: RichContentBlock, url: string) {
  block.data.imageUrl = url
  if (!block.data.alt) {
    const asset = mediaAssets.value.find((item) => item.url === url)
    block.data.alt = asset?.title || ''
  }
  editableBlocks.value = [...editableBlocks.value]
  mediaPickerMode.value = ''
  mediaPickerBlockId.value = ''
}

function openMediaPickerForCover() {
  mediaPickerMode.value = 'cover'
  mediaPickerBlockId.value = ''
}

function openMediaPickerForBlock(block: RichContentBlock) {
  mediaPickerMode.value = 'block'
  mediaPickerBlockId.value = block.id
  selectedBlockId.value = block.id
}

function selectMediaAsset(url: string) {
  if (mediaPickerMode.value === 'cover') {
    chooseCover(url)
    return
  }

  if (mediaPickerMode.value === 'block') {
    const block = editableBlocks.value.find((item) => item.id === mediaPickerBlockId.value)
    if (block) chooseImageForBlock(block, url)
  }
}

function validateUploadFile(file: File) {
  if (!allowedUploadTypes.includes(file.type)) return 'File type not allowed.'
  if (file.size > maxUploadBytes) return 'File is too large.'
  return ''
}

async function uploadAndSelectMedia(file?: File | null) {
  if (!file) return

  const validationError = validateUploadFile(file)
  if (validationError) {
    uploadMessage.value = validationError
    return
  }

  uploadMessage.value = 'Uploading image...'

  try {
    const asset = await uploadAsset(file)
    uploadMessage.value = 'Image uploaded.'
    selectMediaAsset(asset.url)
  } catch (error: any) {
    uploadMessage.value = error?.data?.statusMessage || error?.message || 'Upload failed.'
  }
}

async function onCoverFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  await uploadAndSelectMedia(input.files?.[0])
  input.value = ''
}

async function onPickerFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  await uploadAndSelectMedia(input.files?.[0])
  input.value = ''
}

async function onCoverDrop(event: DragEvent) {
  event.preventDefault()
  mediaPickerMode.value = 'cover'
  mediaPickerBlockId.value = ''
  await uploadAndSelectMedia(event.dataTransfer?.files?.[0])
}

async function onImageBlockDrop(event: DragEvent, block: RichContentBlock) {
  event.preventDefault()
  mediaPickerMode.value = 'block'
  mediaPickerBlockId.value = block.id
  selectedBlockId.value = block.id
  await uploadAndSelectMedia(event.dataTransfer?.files?.[0])
}

function openCoverUpload() {
  mediaPickerMode.value = 'cover'
  mediaPickerBlockId.value = ''
  coverFileInput.value?.click()
}

function openPickerUpload() {
  pickerFileInput.value?.click()
}

function openUploadForBlock(block: RichContentBlock) {
  mediaPickerMode.value = 'block'
  mediaPickerBlockId.value = block.id
  selectedBlockId.value = block.id
  pickerFileInput.value?.click()
}

function imageAssetLabel(url?: string) {
  if (!url) return ''
  const asset = mediaAssets.value.find((item) => item.url === url)
  return asset?.filename || asset?.title || url.split('/').pop() || url
}

function removeBlockImage(block: RichContentBlock) {
  block.data.imageUrl = ''
  editableBlocks.value = [...editableBlocks.value]
}

function coverPreviewStyle() {
  const accent = String(frontmatter.value.accentColor || 'coral')
  const style = String(frontmatter.value.coverStyle || 'editorial-gradient')
  const position = String(frontmatter.value.coverPosition || 'center')
  const image = contentType === 'blog' ? '' : frontmatter.value.coverImage

  return {
    '--cover-preview-image': image ? `url(${image})` : 'none',
    '--cover-preview-position': position,
    '--cover-preview-accent': `var(--accent-${accent}, var(--${accent}, var(--coral)))`,
    '--cover-preview-style': style
  }
}

function collectMediaRefs(frontmatterValue: Record<string, any>) {
  const refs = new Set<string>()
  if (contentType !== 'blog' && frontmatterValue.coverImage) refs.add(String(frontmatterValue.coverImage))
  for (const block of normalizeBlocks(frontmatterValue.blocks)) {
    if (block.type === 'image' && block.data.imageUrl) refs.add(String(block.data.imageUrl))
    if (block.type === 'gallery' && Array.isArray(block.data.images)) {
      for (const image of block.data.images) if (image?.url) refs.add(String(image.url))
    }
  }
  return [...refs]
}

const usedMediaRefs = computed(() => collectMediaRefs({ ...frontmatter.value, blocks: editableBlocks.value }))
const usedMediaAssets = computed(() => usedMediaRefs.value.map((url) => mediaAssets.value.find((asset) => asset.url === url) || {
  id: url,
  title: url,
  filename: url.split('/').pop() || url,
  url,
  type: 'External',
  usage: 'Content',
  description: 'Referenced by this content.'
}))

function slugifyTitle(value: string, fallback = '') {
  const words = String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .filter(Boolean)
    .slice(0, 8)
  const selected: string[] = []

  for (const word of words) {
    const candidate = [...selected, word].join('-')
    if (candidate.length > 72) break
    selected.push(word)
  }

  return selected.join('-') || fallback
}

function isAutoGeneratedBlogSlug(value: string) {
  const slug = String(value || '').trim()
  return !slug
    || /^untitled-blog-entry-\d+$/.test(slug)
    || /^untitled-draft-\d+$/.test(slug)
    || /^draft-\d+$/.test(slug)
    || slug === 'untitled-blog-entry'
    || slug === 'untitled-draft'
    || slug === 'untitled'
    || slug === 'draft'
}

function hasRealBlogTitle(value: unknown) {
  const normalized = slugifyTitle(String(value || ''))
  return Boolean(normalized)
    && normalized !== 'untitled-blog-entry'
    && normalized !== 'untitled-draft'
    && normalized !== 'untitled'
    && normalized !== 'draft'
}

function syncBlogSlugFromTitle() {
  if (contentType !== 'blog' || slugManuallyEdited.value || !hasRealBlogTitle(frontmatter.value.title)) return
  const generated = slugifyTitle(String(frontmatter.value.title || ''))
  if (generated) frontmatter.value.slug = generated
}

const slugInput = computed({
  get: () => String(frontmatter.value.slug || ''),
  set: (value: string) => {
    frontmatter.value.slug = contentType === 'blog' ? slugifyTitle(value) : value
    if (contentType === 'blog') slugManuallyEdited.value = true
  }
})

function generateSlug() {
  if (!frontmatter.value.title) return
  frontmatter.value.slug = slugifyTitle(String(frontmatter.value.title))
  if (contentType === 'blog') slugManuallyEdited.value = false
}

function generateTags() {
  const text = `${frontmatter.value.title || ''} ${frontmatter.value.description || ''} ${frontmatter.value.excerpt || ''}`
  const stopwords = new Set(['the', 'and', 'for', 'from', 'that', 'this', 'with', 'into', 'entry', 'editorial', 'create', 'about', 'where', 'when', 'how', 'what', 'una', 'para', 'con', 'los', 'las', 'del', 'que'])
  const words = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((word) => word.replace(/^-+|-+$/g, ''))
    .filter((word) => word.length > 3 && !stopwords.has(word))
  const unique = Array.from(new Set(words)).slice(0, 6)

  if (unique.length) {
    tagsText.value = unique.join(', ')
  }
}

function previewPath() {
  const slug = String(frontmatter.value.slug || '').trim()
  if (!slug) return ''
  if (contentType === 'blog') return `/blog/${slug}?preview=true`
  if (contentType === 'projects') return `/repository/${slug}?preview=true`
  if (contentType === 'docs') {
    const folder = String(frontmatter.value.docsFolder || filePath.value.replace(/^docs\//, '').split('/')[0])
    return `/docs/${folder}/${slug === 'index' ? '' : slug}`.replace(/\/$/, '') + '?preview=true'
  }
  if (contentType === 'labs') return `/labs/${slug}?preview=true`
  return ''
}

function syncTextFields() {
  tagsText.value = toText(frontmatter.value.tags)
  stackText.value = toText(frontmatter.value.stack)
  relatedTagsText.value = toText(frontmatter.value.relatedTags)
  roadmapText.value = toLines(frontmatter.value.roadmap)
  openQuestionsText.value = toLines(frontmatter.value.openQuestions)
  selectedAttachmentDocs.value = [
    frontmatter.value.docsPath,
    ...(Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : []),
    ...(Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : [])
  ].map((item) => String(item)).filter((item, index, list) => item && list.indexOf(item) === index)
}

function normalizeFrontmatter() {
  const next = { ...frontmatter.value }
  next.tags = splitComma(tagsText.value)

  if (contentType === 'blog' && !slugManuallyEdited.value && hasRealBlogTitle(next.title)) {
    const generated = slugifyTitle(String(next.title || ''))
    if (generated && (!next.slug || isAutoGeneratedBlogSlug(String(next.slug)) || String(next.slug) !== generated)) {
      next.slug = generated
      frontmatter.value.slug = generated
    }
  }

  if (contentType === 'projects') {
    next.stack = splitComma(stackText.value)
    if (typeof next.relatedDocs === 'string') next.relatedDocs = splitComma(next.relatedDocs)
    if (typeof next.docsPaths === 'string') next.docsPaths = splitComma(next.docsPaths)
  }
  if (contentType === 'labs') {
    next.relatedTags = splitComma(relatedTagsText.value)
    next.roadmap = splitLines(roadmapText.value)
    next.openQuestions = splitLines(openQuestionsText.value)
  }
  if (next.order !== undefined && next.order !== '') next.order = Number(next.order)
  if (next.year !== undefined && next.year !== '') next.year = Number(next.year)
  next.noindex = Boolean(next.noindex)
  if (isRichComposer.value) {
    if (contentType === 'blog') {
      delete next.coverImage
      delete next.coverAlt
      delete next.coverCaption
      delete next.coverPosition
    }
    next.blocks = normalizeBlocks(editableBlocks.value)
    next.mediaRefs = collectMediaRefs(next)
  }

  return next
}

if (filePath.value) {
  const response = await readContent(contentType, filePath.value)
  frontmatter.value = { ...response.item.frontmatter }
  if (contentType === 'blog') {
    slugManuallyEdited.value = !isAutoGeneratedBlogSlug(String(frontmatter.value.slug || ''))
    syncBlogSlugFromTitle()
  }
  if (isRichComposer.value) {
    editableBlocks.value = normalizeBlocks(frontmatter.value.blocks)
    frontmatter.value.blocks = editableBlocks.value
    selectedBlockId.value = editableBlocks.value[0]?.id || ''
  }
  markdownBody.value = response.item.body
  syncTextFields()
}

watch(() => frontmatter.value.title, () => {
  syncBlogSlugFromTitle()
})

const docsFolder = computed(() => {
  if (frontmatter.value.docsFolder) return String(frontmatter.value.docsFolder)
  if (frontmatter.value.docsPath) return String(frontmatter.value.docsPath).replace(/^\/docs\//, '').split('/')[0]
  return String(frontmatter.value.slug || '').replace(/-project$/, '')
})

const relatedDocs = computed(() => (docsData.value?.items ?? []).filter((doc) => {
  const projectSlug = String(frontmatter.value.slug || '')
  const explicit = [
    ...(Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : []),
    ...(Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : [])
  ].map((item) => String(item))
  return doc.projectSlug === projectSlug
    || doc.docsFolder === docsFolder.value
    || doc.filePath.includes(`docs/${docsFolder.value}/`)
    || explicit.includes(doc.publicPath)
    || explicit.includes(doc.publicPath.replace(/^\/docs\//, ''))
}))

const explicitDocPaths = computed(() => [
  frontmatter.value.docsPath,
  ...(Array.isArray(frontmatter.value.relatedDocs) ? frontmatter.value.relatedDocs : []),
  ...(Array.isArray(frontmatter.value.docsPaths) ? frontmatter.value.docsPaths : [])
].map((item) => String(item)).filter((item, index, list) => item && list.indexOf(item) === index))
const attachedDocs = computed(() => {
  const explicit = [
    ...explicitDocPaths.value
  ]
  return docsOptions.value.filter((doc) => explicit.includes(doc.publicPath) || explicit.includes(doc.publicPath.replace(/^\/docs\//, '')))
})
const hasAttachedDocs = computed(() => attachedDocs.value.length > 0 || Boolean(frontmatter.value.docsPath))
const docOwner = (doc: AdminContentListItem) => {
  if (doc.projectSlug) return { slug: doc.projectSlug, title: doc.project || doc.projectSlug }
  if (doc.project) return { slug: doc.project, title: doc.project }
  return undefined
}
const isAvailableForProject = (doc: AdminContentListItem) => {
  const projectSlug = String(frontmatter.value.slug || '')
  const owner = docOwner(doc)
  const alreadySelected = selectedAttachmentDocs.value.includes(doc.publicPath) || explicitDocPaths.value.includes(doc.publicPath)
  return alreadySelected || !owner || owner.slug === projectSlug
}
const attachableDocs = computed(() => docsOptions.value.filter(isAvailableForProject))
const attachedElsewhereDocs = computed(() => docsOptions.value.filter((doc) => !isAvailableForProject(doc)))
const docAvailabilityLabel = (doc: AdminContentListItem) => {
  const owner = docOwner(doc)
  return owner ? `attached to ${owner.title}` : 'available'
}

const newDocsForProjectLink = computed(() => {
  const query = new URLSearchParams({
    type: 'docs',
    direct: 'true',
    projectSlug: String(frontmatter.value.slug || ''),
    project: String(frontmatter.value.title || ''),
    docsFolder: docsFolder.value
  })

  return `/admin/content/new?${query.toString()}`
})

async function save() {
  isSaving.value = true
  statusMessage.value = ''
  saveState.value = 'saving'
  if (import.meta.client) window.dispatchEvent(new CustomEvent('gribo:composer-save-state', { detail: { state: 'saving' } }))
  if (saveMessageTimer) clearTimeout(saveMessageTimer)

  try {
    const response = await saveContent(contentType, filePath.value, normalizeFrontmatter(), markdownBody.value)
    if (response.item.filePath && response.item.filePath !== filePath.value) {
      filePath.value = response.item.filePath
      await router.replace({
        path: '/admin/content/edit',
        query: { ...route.query, type: contentType, file: response.item.filePath }
      })
    }
    frontmatter.value = { ...response.item.frontmatter }
    if (isRichComposer.value) {
      editableBlocks.value = normalizeBlocks(frontmatter.value.blocks)
      frontmatter.value.blocks = editableBlocks.value
    }
    syncTextFields()
    saveState.value = 'saved'
    statusMessage.value = 'Changes saved successfully.'
    if (import.meta.client) window.dispatchEvent(new CustomEvent('gribo:composer-save-state', { detail: { state: 'saved' } }))
    saveMessageTimer = setTimeout(() => {
      if (saveState.value === 'saved') {
        saveState.value = 'idle'
        statusMessage.value = ''
      }
      if (import.meta.client) window.dispatchEvent(new CustomEvent('gribo:composer-save-state', { detail: { state: 'idle' } }))
    }, 3200)
  } catch (error: any) {
    saveState.value = 'error'
    statusMessage.value = error?.data?.statusMessage || error?.message || 'Save failed.'
    if (import.meta.client) window.dispatchEvent(new CustomEvent('gribo:composer-save-state', { detail: { state: 'error' } }))
  } finally {
    isSaving.value = false
  }
}

async function saveDocumentationAttachments() {
  if (selectedAttachmentDocs.value.length === 0) {
    statusMessage.value = 'Select at least one existing documentation page before saving attachments.'
    return
  }

  const primary = selectedAttachmentDocs.value[0]
  const primaryItem = docByPath.value.get(primary)
  frontmatter.value.docsPath = primary
  frontmatter.value.docsFolder = getDocFolder(primaryItem) || primary.replace(/^\/docs\//, '').split('/')[0]
  frontmatter.value.docsPaths = selectedAttachmentDocs.value
  frontmatter.value.relatedDocs = selectedAttachmentDocs.value
  await save()
  isAttachingDocs.value = false
}

async function archive() {
  if (!confirm('Archive this content file? The file will stay in place and status will become archived.')) return

  await archiveContent(contentType, filePath.value)
  statusMessage.value = 'Content archived with status: archived.'
  frontmatter.value.status = 'archived'
  frontmatter.value.archivedAt = new Date().toISOString()
}

async function deleteBlogEntry() {
  if (contentType !== 'blog') return

  isDeleting.value = true
  statusMessage.value = ''

  try {
    const response = await deleteBlogContent(filePath.value, deleteConfirmation.value)
    statusMessage.value = `Blog entry moved to ${response.item.trashPath}.`
    await router.push('/admin/blog')
  } catch (error: any) {
    statusMessage.value = error?.data?.statusMessage || error?.message || 'Delete failed.'
  } finally {
    isDeleting.value = false
  }
}

function handleComposerSave() {
  save()
}

function handleComposerPrimary() {
  save()
}

onMounted(() => {
  window.addEventListener('gribo:composer-save', handleComposerSave)
  window.addEventListener('gribo:composer-primary', handleComposerPrimary)
})

onBeforeUnmount(() => {
  window.removeEventListener('gribo:composer-save', handleComposerSave)
  window.removeEventListener('gribo:composer-primary', handleComposerPrimary)
  if (saveMessageTimer) clearTimeout(saveMessageTimer)
})
</script>

<template>
  <div class="admin-page">
    <input
      ref="coverFileInput"
      class="visually-hidden-file"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      @change="onCoverFileChange"
    >
    <input
      ref="pickerFileInput"
      class="visually-hidden-file"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      @change="onPickerFileChange"
    >

    <section v-if="filePath && isRichComposer" class="composer-grid">
      <div class="composer-main">
        <section class="composer-hero">
          <p class="eyebrow"><span class="pulse" />{{ contentLabel }} - CMS block composer</p>
          <h1>{{ composerHeroTitle }}</h1>
          <p class="subtitle">{{ composerHeroDescription }}</p>
          <p v-if="statusMessage" class="status-copy" :data-state="saveState">{{ statusMessage }}</p>
        </section>

        <nav class="composer-tabs" aria-label="Composer tabs">
          <button
            v-for="tab in blockTabs"
            :key="tab.id"
            type="button"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>

        <template v-if="activeTab === 'content'">
          <section class="setup-grid">
            <div class="panel">
              <div class="panel-head">
                <h2>{{ contentType === 'projects' ? 'Project basics' : contentType === 'blog' ? 'Entry basics' : 'Docs basics' }}</h2>
                <span class="status-badge">{{ frontmatter.status || 'Draft' }}</span>
              </div>
              <div class="field-grid compact">
                <label>
                  Title
                  <input v-model="frontmatter.title" type="text">
                </label>
                <label>
                  Slug
                  <span class="slug-row">
                    <input v-model="slugInput" type="text">
                    <button class="ghost-btn mini-action" type="button" @click="generateSlug">Generate</button>
                  </span>
                </label>
                <label class="span-2">
                  {{ contentType === 'projects' ? 'Short description' : 'Description' }}
                  <textarea v-if="contentType === 'projects'" v-model="frontmatter.summary" rows="3" />
                  <textarea v-else v-model="frontmatter.description" rows="3" />
                </label>
              </div>
            </div>

            <div class="panel">
              <div class="panel-head">
                <h2>Taxonomy</h2>
                <span class="status-badge friction">{{ labDisplayName }}</span>
              </div>
              <div class="field-grid compact">
                <label>
                  Status
                  <select v-model="frontmatter.status">
                    <option v-for="status in statusChoices" :key="status" :value="status">{{ status }}</option>
                  </select>
                </label>
                <label>
                  Track / Lab
                  <select v-if="labChoices.length" v-model="frontmatter.lab">
                    <option value="">Unassigned</option>
                    <option v-for="lab in labSelectChoices" :key="lab.value" :value="lab.value">{{ lab.label }}</option>
                  </select>
                  <select v-else disabled>
                    <option>No labs available yet.</option>
                  </select>
                </label>
                <label v-if="contentType === 'projects'">
                  Year
                  <input v-model="frontmatter.year" type="number">
                </label>
                <label v-if="contentType === 'projects'">
                  Stack
                  <input v-model="stackText" type="text" placeholder="Nuxt, Python">
                </label>
                <label class="span-2">
                  Tags
                  <input v-model="tagsText" type="text" placeholder="ai, systems, research">
                </label>
                <button v-if="contentType === 'blog'" class="ghost-btn mini-action span-2" type="button" @click="generateTags">
                  Generate tags
                </button>
              </div>
            </div>
          </section>

          <section class="builder-layout">
            <aside class="block-library">
              <button
                v-for="type in implementedBlockTypes"
                :key="type"
                class="block-button"
                type="button"
                @click="addBlock(type)"
              >
                <span class="block-icon">{{ defaultBlockTitle(type).charAt(0) }}</span>
                <span><strong>{{ defaultBlockTitle(type) }}</strong><small>{{ type === 'heading' ? 'Title + optional subheading' : type === 'text' ? 'Rich text body' : type === 'image' ? 'Media Library + caption' : type === 'code' ? 'Language + title' : type === 'callout' ? 'Info, warning, note' : type === 'table' ? 'Rows + columns' : 'Color + message' }}</small></span>
              </button>
              <button v-for="type in laterBlockTypes" :key="type" class="block-button disabled" type="button" disabled>
                <span class="block-icon">{{ defaultBlockTitle(type).charAt(0) }}</span>
                <span><strong>{{ defaultBlockTitle(type) }}</strong><small>Later</small></span>
              </button>
            </aside>

            <div class="canvas">
              <div class="project-form-top" :class="{ 'blog-hero-options': isBlogComposer }">
                <div
                  v-if="!isBlogComposer"
                  class="cover-upload"
                  :class="{ filled: frontmatter.coverImage }"
                  role="button"
                  tabindex="0"
                  @click="openMediaPickerForCover"
                  @keydown.enter.prevent="openMediaPickerForCover"
                  @dragover.prevent
                  @drop.stop="onCoverDrop"
                >
                  <img v-if="frontmatter.coverImage" :src="frontmatter.coverImage" :alt="frontmatter.coverAlt || ''">
                  <div class="upload-inner">
                    <div class="upload-icon">+</div>
                    <strong>{{ frontmatter.coverImage ? 'Cover selected' : 'Choose cover image' }}</strong>
                    <p>Choose from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p>
                    <div class="media-choice-row">
                      <button class="mini-btn" type="button" @click.stop="openMediaPickerForCover">Open Media Library</button>
                      <button class="mini-btn" type="button" @click.stop="openCoverUpload">Upload from computer</button>
                    </div>
                    <small v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</small>
                  </div>
                </div>

                <div class="panel visual-options">
                  <h2>{{ isBlogComposer ? 'Blog hero design' : 'Cover design' }}</h2>
                  <p class="muted">{{ isBlogComposer ? 'Blog entries use an editorial surface and accent color, not cover images.' : 'These controls update the Frontend Preview in the right inspector.' }}</p>
                  <label>
                    Visual style
                    <select v-model="frontmatter.coverStyle">
                      <option v-for="option in isBlogComposer ? blogHeroStyleOptions : coverStyleOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                    </select>
                  </label>
                  <label v-if="!isBlogComposer">
                    Image position
                    <select v-model="frontmatter.coverPosition">
                      <option v-for="position in coverPositionOptions" :key="position" :value="position">{{ position }}</option>
                    </select>
                  </label>
                  <label>
                    Accent color
                    <select v-model="frontmatter.accentColor">
                      <option v-for="option in accentOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                    </select>
                  </label>
                </div>

                <div v-if="isBlogComposer" class="inspector-card blog-hero-preview-card">
                  <h3>Frontend preview</h3>
                  <div class="preview-card">
                    <div class="preview-header"><span class="dot" /><span class="dot" /><span class="dot" /></div>
                    <div class="frontend-preview">
                      <BlogComposerPreview
                        :title="frontmatter.title || 'Untitled content'"
                        :description="frontmatter.description || frontmatter.excerpt || 'Editorial preview surface.'"
                        :category="frontmatter.category || 'Field note'"
                        :date="composerPreviewDate"
                        :status="frontmatter.status || 'draft'"
                        :cover-style="frontmatter.coverStyle || 'editorial-gradient'"
                        :accent-color="frontmatter.accentColor || 'coral'"
                        :blocks="visibleBlocks"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <article v-if="!editableBlocks.length" class="empty-canvas">
                <strong>No blocks yet.</strong>
                <p>Add a Heading Block, Text Block, Image Block, Code Block, Callout, Table or Banner from the block library.</p>
              </article>

              <article
                v-for="(block, index) in editableBlocks"
                :key="block.id"
                class="content-block"
                :class="{ selected: selectedBlockId === block.id, hidden: !block.visible }"
                @click="selectBlock(block.id)"
              >
                <div class="block-toolbar">
                  <div class="block-toolbar-left">
                    <button class="drag" type="button" aria-label="Select block">::</button>
                    <div class="block-title">
                      <strong>{{ blockUiTitle(block) }}</strong>
                      <span>{{ block.type }} block - {{ block.visible ? 'visible' : 'hidden' }}</span>
                    </div>
                  </div>
                  <div class="block-actions">
                    <button class="mini-btn" type="button" @click.stop="selectBlock(block.id)">Edit</button>
                    <button class="mini-btn" type="button" @click.stop="duplicateBlock(index)">Duplicate</button>
                    <button class="mini-btn" type="button" @click.stop="toggleBlock(block)">{{ block.visible ? 'Hide' : 'Show' }}</button>
                    <button class="mini-btn" type="button" @click.stop="moveBlock(index, -1)">Up</button>
                    <button class="mini-btn" type="button" @click.stop="moveBlock(index, 1)">Down</button>
                    <button class="mini-btn" type="button" @click.stop="removeBlock(index)">Delete</button>
                  </div>
                </div>

                <div class="block-body">
                  <div class="field-grid compact">
                    <label>
                      Block title
                      <input v-model="block.title" type="text" placeholder="Optional internal title">
                    </label>

                    <template v-if="block.type === 'heading'">
                      <label>
                        Kicker
                        <input v-model="block.data.kicker" type="text" placeholder="Optional eyebrow">
                      </label>
                      <label>
                        Level
                        <select v-model="block.data.level">
                          <option value="h2">H2</option>
                          <option value="h3">H3</option>
                          <option value="h4">H4</option>
                        </select>
                      </label>
                      <label class="span-2">
                        Heading
                        <input v-model="block.data.heading" type="text" placeholder="Visible heading">
                      </label>
                      <label class="span-2">
                        Subheading
                        <textarea v-model="block.data.subheading" rows="3" placeholder="Optional supporting text" />
                      </label>
                    </template>

                    <template v-else-if="block.type === 'text'">
                      <label>
                        Heading <small>(optional legacy)</small>
                        <input v-model="block.data.heading" type="text" placeholder="Optional visible heading">
                      </label>
                      <label class="span-2">
                        Body
                        <textarea v-model="block.data.body" rows="6" />
                      </label>
                    </template>

                    <template v-else-if="block.type === 'image'">
                      <div class="span-2 image-block-grid">
                        <div
                          class="image-drop"
                          :class="normalizeImageLayout(block.data.layout)"
                          role="button"
                          tabindex="0"
                          @click="openMediaPickerForBlock(block)"
                          @keydown.enter.prevent="openMediaPickerForBlock(block)"
                          @dragover.prevent
                          @drop.stop="onImageBlockDrop($event, block)"
                        >
                          <img v-if="block.data.imageUrl" :src="block.data.imageUrl" :alt="block.data.alt || ''">
                          <div v-else>
                            <div class="upload-icon">+</div>
                            <strong>Choose or upload image</strong>
                            <p class="muted">Select from Media Library, upload from computer, or drop a JPG/PNG/WebP.</p>
                          </div>
                        </div>
                        <div class="image-settings">
                          <label>
                            Layout
                            <select v-model="block.data.layout">
                              <option value="full-width">Full width</option>
                              <option value="contained">Contained</option>
                              <option value="inline-medium">Inline medium</option>
                              <option value="inline-small">Inline small</option>
                              <option value="editorial-crop">Editorial crop</option>
                            </select>
                          </label>
                          <label>
                            Alt text
                            <input v-model="block.data.alt" type="text">
                          </label>
                          <label>
                            Caption
                            <textarea v-model="block.data.caption" rows="3" />
                          </label>
                          <div class="media-choice-row">
                            <button class="ghost-btn" type="button" @click.stop="openMediaPickerForBlock(block)">Choose from Media Library</button>
                            <button class="ghost-btn" type="button" @click.stop="openUploadForBlock(block)">Upload from computer</button>
                            <button v-if="block.data.imageUrl" class="ghost-btn" type="button" @click.stop="removeBlockImage(block)">Remove image</button>
                          </div>
                          <div v-if="block.data.imageUrl" class="selected-asset-note">
                            <span>Selected image</span>
                            <strong>{{ imageAssetLabel(block.data.imageUrl) }}</strong>
                          </div>
                        </div>
                      </div>
                    </template>

                    <template v-else-if="block.type === 'code'">
                      <label>
                        Code title
                        <input v-model="block.data.title" type="text">
                      </label>
                      <label>
                        Language
                        <input v-model="block.data.language" type="text" placeholder="yaml">
                      </label>
                      <label class="check-row span-2">
                        <input v-model="block.data.copyEnabled" type="checkbox">
                        Copy enabled
                      </label>
                      <label class="span-2">
                        Code
                        <textarea v-model="block.data.code" class="code-textarea" rows="9" />
                      </label>
                    </template>

                    <template v-else-if="block.type === 'callout'">
                      <label>
                        Variant
                        <select v-model="block.data.variant">
                          <option value="info">Info / Blue</option>
                          <option value="warning">Warning / Yellow</option>
                          <option value="friction">Friction / Coral</option>
                          <option value="success">Success / Green</option>
                          <option value="editorial">Editorial / Lavender</option>
                        </select>
                      </label>
                      <label>
                        Icon
                        <input v-model="block.data.icon" type="text">
                      </label>
                      <label>
                        Title
                        <input v-model="block.data.title" type="text">
                      </label>
                      <label class="span-2">
                        Body
                        <textarea v-model="block.data.body" rows="4" />
                      </label>
                    </template>

                    <template v-else-if="block.type === 'table'">
                      <label class="span-2">
                        Columns
                        <input v-model="block.data.columnsText" type="text" placeholder="Signal, Observed state, Next action" @input="syncTableColumns(block)">
                      </label>
                      <label class="span-2">
                        Rows
                        <textarea v-model="block.data.rowsText" rows="5" placeholder="Runtime | Draft | Document the path" @input="syncTableRows(block)" />
                      </label>
                    </template>

                    <template v-else-if="block.type === 'banner'">
                      <label>
                        Banner title
                        <input v-model="block.data.title" type="text">
                      </label>
                      <label>
                        Accent
                        <input v-model="block.data.accent" type="text" placeholder="coral">
                      </label>
                      <label class="span-2">
                        Body
                        <textarea v-model="block.data.body" rows="4" />
                      </label>
                    </template>
                  </div>
                </div>
              </article>

              <div class="panel markdown-fallback">
                <div class="panel-head">
                  <h2>Markdown fallback</h2>
                  <span class="status-badge">Legacy body</span>
                </div>
                <p class="muted">If no visible blocks are saved, the public page keeps rendering this markdown body.</p>
                <textarea v-model="markdownBody" class="body-editor" />
              </div>
            </div>
          </section>
        </template>

        <template v-else-if="activeTab === 'metadata'">
          <section class="panel">
            <div class="panel-head">
              <h2>Core metadata</h2>
              <span class="status-badge">{{ contentType }}</span>
            </div>
            <div class="field-grid">
              <label>
                Title
                <input v-model="frontmatter.title" type="text">
              </label>
              <label>
                Slug
                <input v-model="slugInput" type="text">
              </label>
              <label>
                Status
                <select v-model="frontmatter.status">
                  <option v-for="status in statusChoices" :key="status" :value="status">{{ status }}</option>
                </select>
              </label>
              <label>
                Lab
                <select v-if="labChoices.length" v-model="frontmatter.lab">
                  <option value="">Unassigned</option>
                  <option v-for="lab in labSelectChoices" :key="lab.value" :value="lab.value">{{ lab.label }}</option>
                </select>
                <select v-else disabled>
                  <option>No labs available yet.</option>
                </select>
              </label>
              <label v-if="contentType === 'blog'">
                Excerpt
                <textarea v-model="frontmatter.excerpt" rows="3" />
              </label>
              <label v-if="contentType === 'projects'">
                Summary
                <textarea v-model="frontmatter.summary" rows="3" />
              </label>
              <label>
                Description
                <textarea v-model="frontmatter.description" rows="3" />
              </label>
              <label>
                Tags
                <input v-model="tagsText" type="text" placeholder="ai, systems, research">
              </label>
              <button v-if="contentType === 'blog'" class="ghost-btn mini-action span-2" type="button" @click="generateTags">
                Generate tags
              </button>
              <label v-if="contentType === 'projects'">
                Type
                <input v-model="frontmatter.type" type="text">
              </label>
              <label v-if="contentType === 'projects'">
                Stack
                <input v-model="stackText" type="text" placeholder="Nuxt, Python">
              </label>
            </div>
          </section>

          <section v-if="contentType === 'blog'" class="panel danger-zone">
            <div class="panel-head">
              <div>
                <p class="eyebrow">Protected action</p>
                <h2>Danger Zone</h2>
              </div>
              <span class="status-badge">Blog entry</span>
            </div>
            <p class="muted">
              Archive or permanently remove this blog entry. Use this only for drafts, tests, or content that should no longer appear in the archive.
            </p>
            <div class="danger-summary">
              <span>Title</span>
              <strong>{{ frontmatter.title || 'Untitled Blog Entry' }}</strong>
              <span>Slug</span>
              <strong>{{ frontmatter.slug || 'untitled' }}</strong>
              <span>File</span>
              <strong>{{ filePath }}</strong>
            </div>
            <div class="danger-actions">
              <button class="ghost-btn" type="button" :disabled="isSaving || frontmatter.status === 'archived'" @click="archive">
                {{ frontmatter.status === 'archived' ? 'Entry archived' : 'Archive entry' }}
              </button>
            </div>
            <div class="delete-confirm">
              <label>
                Type DELETE BLOG ENTRY to permanently remove this file
                <input v-model="deleteConfirmation" type="text" placeholder="DELETE BLOG ENTRY">
              </label>
              <button class="danger-btn" type="button" :disabled="isDeleting || deleteConfirmation !== 'DELETE BLOG ENTRY'" @click="deleteBlogEntry">
                {{ isDeleting ? 'Deleting...' : 'Delete entry' }}
              </button>
            </div>
          </section>

          <section v-if="contentType === 'projects'" class="panel">
            <div class="panel-head">
              <h2>Documentation</h2>
              <span class="status-badge">{{ attachedDocs.length ? `${attachedDocs.length} docs` : 'Empty' }}</span>
            </div>
            <div v-if="!hasAttachedDocs" class="empty-doc-state">
              <strong>No documentation attached yet.</strong>
              <p>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p>
            </div>
            <div v-else class="attached-docs">
              <article v-for="doc in attachedDocs" :key="doc.filePath" class="attached-doc-card">
                <div>
                  <strong>{{ doc.title }}</strong>
                  <small>{{ secondaryDocText(doc) }}</small>
                </div>
                <NuxtLink class="mini-doc-link" :to="doc.publicPath">View</NuxtLink>
              </article>
            </div>

            <div class="doc-actions">
              <button class="ghost-btn" type="button" @click="isAttachingDocs = !isAttachingDocs">Add existing documentation</button>
              <NuxtLink class="studio-btn" :to="newDocsForProjectLink">{{ relatedDocs.length ? 'New Docs Page for this project' : 'Create first docs page' }}</NuxtLink>
            </div>

            <div v-if="isAttachingDocs" class="attach-docs-panel">
              <div>
                <h3>Attach existing documentation</h3>
                <p>Select one or more available documentation pages to attach to this project.</p>
              </div>
              <div class="doc-picker">
                <p class="doc-section-title">Documentation pages</p>
                <p v-if="!attachableDocs.length" class="muted">No available documentation found.</p>
                <label v-for="doc in attachableDocs" :key="doc.filePath" class="doc-choice">
                  <input v-model="selectedAttachmentDocs" type="checkbox" :value="doc.publicPath">
                  <span>
                    <strong>{{ doc.title }}</strong>
                    <small>{{ secondaryDocText(doc) }}</small>
                    <small>Status: {{ docAvailabilityLabel(doc) }}</small>
                  </span>
                </label>
              </div>
              <div class="doc-actions">
                <button class="studio-btn" type="button" :disabled="isSaving" @click="saveDocumentationAttachments">Save attachment</button>
                <button class="ghost-btn" type="button" @click="isAttachingDocs = false">Cancel</button>
              </div>
            </div>
          </section>
        </template>

        <template v-else-if="activeTab === 'seo'">
          <section class="panel">
            <div class="panel-head">
              <h2>SEO settings</h2>
              <span class="status-badge">Snippet</span>
            </div>
            <div class="field-grid">
              <label>
                SEO title
                <input v-model="frontmatter.seoTitle" type="text">
              </label>
              <label>
                OG title
                <input v-model="frontmatter.ogTitle" type="text">
              </label>
              <label class="span-2">
                SEO description
                <textarea v-model="frontmatter.seoDescription" rows="4" />
              </label>
              <label class="span-2">
                OG description
                <textarea v-model="frontmatter.ogDescription" rows="4" />
              </label>
              <label>
                OG image
                <input v-model="frontmatter.ogImage" type="text">
              </label>
              <label>
                Canonical
                <input v-model="frontmatter.canonical" type="text">
              </label>
              <label class="check-row">
                <input v-model="frontmatter.noindex" type="checkbox">
                Noindex
              </label>
            </div>
          </section>
        </template>

        <template v-else-if="activeTab === 'media'">
          <section class="panel">
            <div class="panel-head">
              <h2>Media attached</h2>
              <span class="status-badge">{{ usedMediaAssets.length }} assets</span>
            </div>
            <div class="media-tab-grid">
              <article v-for="asset in usedMediaAssets" :key="asset.id" class="media-card">
                <img :src="asset.url" :alt="asset.title">
                <strong>{{ asset.title }}</strong>
                <span>{{ asset.filename }}</span>
              </article>
            </div>
            <div class="asset-list">
              <button v-for="asset in mediaAssets" :key="asset.id" class="asset-button" type="button" @click="chooseCover(asset.url)">
                <img :src="asset.url" :alt="asset.title">
                <span>{{ asset.title }}</span>
              </button>
            </div>
          </section>
        </template>

        <template v-else-if="activeTab === 'preview'">
          <section class="panel">
            <div class="panel-head">
              <h2>Frontend preview</h2>
              <NuxtLink v-if="previewPath()" class="ghost-btn mini-action" :to="previewPath()">Open route</NuxtLink>
            </div>
            <div class="preview-surface">
              <ContentBlockRenderer v-if="visibleBlocks.length" :blocks="visibleBlocks" :context="contentType === 'projects' ? 'project' : contentType === 'docs' ? 'docs' : 'blog'" />
              <div v-else class="content-prose">
                <p class="muted">No visible blocks yet. Public rendering will use the markdown body fallback.</p>
                <pre>{{ markdownBody }}</pre>
              </div>
            </div>
          </section>
        </template>
      </div>

      <aside class="composer-inspector" :class="{ 'blog-inspector-flow': isBlogComposer }">
        <div v-if="!isBlogComposer" class="inspector-card">
          <h3>Block inspector</h3>
          <template v-if="selectedBlock">
            <p>{{ blockUiTitle(selectedBlock) }} - {{ selectedBlock.type }} - {{ selectedBlock.visible ? 'Visible' : 'Hidden' }}</p>
            <label>
              Selected block title
              <input v-model="selectedBlock.title" type="text">
            </label>
          </template>
          <p v-else>Select a block to edit its properties, visibility and output mapping.</p>
        </div>

        <div v-if="!isBlogComposer" class="inspector-card">
          <h3>Frontend preview</h3>
          <div class="preview-card">
            <div class="preview-header"><span class="dot" /><span class="dot" /><span class="dot" /></div>
            <div class="frontend-preview">
              <BlogComposerPreview
                v-if="isBlogComposer"
                :title="frontmatter.title || 'Untitled content'"
                :description="frontmatter.description || frontmatter.excerpt || 'Editorial preview surface.'"
                :category="frontmatter.category || 'Field note'"
                :date="composerPreviewDate"
                :status="frontmatter.status || 'draft'"
                :cover-style="frontmatter.coverStyle || 'editorial-gradient'"
                :accent-color="frontmatter.accentColor || 'coral'"
                :blocks="visibleBlocks"
              />
              <template v-else>
                <div class="front-hero" :class="`style-${frontmatter.coverStyle || 'editorial-gradient'}`" :style="coverPreviewStyle()">
                <span class="status-badge">{{ frontmatter.status || 'Draft' }}</span>
                <h3>{{ frontmatter.title || 'Untitled content' }}</h3>
                <p>{{ frontmatter.description || frontmatter.excerpt || frontmatter.summary || 'Editorial preview surface.' }}</p>
                </div>
                <div v-for="block in visibleBlocks.slice(0, 2)" :key="block.id" class="front-section">
                  <strong>{{ blockUiTitle(block) }}</strong>
                  <p>{{ block.type }} block rendered publicly.</p>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div class="inspector-card">
          <h3>Page outline</h3>
          <div class="outline-list">
            <button class="outline-item" type="button">
              <strong>Cover</strong><span>Hero</span>
            </button>
            <button
              v-for="block in editableBlocks"
              :key="block.id"
              class="outline-item"
              :class="{ active: selectedBlockId === block.id }"
              type="button"
              @click="selectBlock(block.id)"
            >
              <strong>{{ blockUiTitle(block) }}</strong><span>{{ block.type }}</span>
            </button>
          </div>
        </div>

        <div class="inspector-card">
          <h3>Media uploaded</h3>
          <div class="media-mini-grid">
            <img v-for="asset in usedMediaAssets.slice(0, 6)" :key="asset.id" class="media-mini" :src="asset.url" :alt="asset.title">
          </div>
          <p>{{ usedMediaAssets.length ? 'Images are referenced by cover or content blocks.' : 'No media references yet.' }}</p>
        </div>

        <div class="inspector-card">
          <h3>Output mapping</h3>
          <div class="component-note">
            Saves frontmatter, <code>blocks</code>, cover fields and markdown fallback to <code>content/{{ filePath }}</code>.
          </div>
        </div>
      </aside>
    </section>

    <AdminHero
      v-if="!filePath || !isRichComposer"
      eyebrow="Content Editor"
      :title="frontmatter.title || 'Missing content file'"
      :description="`Editing ${filePath || 'no file selected'} inside Nuxt Content.`"
    />

    <section v-if="filePath && !isRichComposer" class="editor-grid">
      <div class="editor-main">
        <AdminPanel title="Core metadata" eyebrow="Frontmatter">
          <div class="field-grid">
            <label>
              Title
              <input v-model="frontmatter.title" type="text">
            </label>
            <label>
              Slug
              <input v-model="slugInput" type="text">
            </label>
            <label>
              Status
              <select v-model="frontmatter.status">
                <option v-for="status in statusChoices" :key="status" :value="status">{{ status }}</option>
              </select>
            </label>
            <label>
              Lab
              <select v-if="labChoices.length" v-model="frontmatter.lab">
                <option value="">Unassigned</option>
                <option v-for="lab in labSelectChoices" :key="lab.value" :value="lab.value">{{ lab.label }}</option>
              </select>
              <select v-else disabled>
                <option>No labs available yet.</option>
              </select>
            </label>
            <label v-if="contentType === 'blog'">
              Excerpt
              <textarea v-model="frontmatter.excerpt" rows="3" />
            </label>
            <label v-if="contentType === 'projects'">
              Summary
              <textarea v-model="frontmatter.summary" rows="3" />
            </label>
            <label>
              Description
              <textarea v-model="frontmatter.description" rows="3" />
            </label>
            <label>
              Tags
              <input v-model="tagsText" type="text" placeholder="ai, systems, research">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'projects'" title="Project fields" eyebrow="Repository">
          <div class="field-grid">
            <label>
              Type
              <input v-model="frontmatter.type" type="text">
            </label>
            <label>
              Year
              <input v-model="frontmatter.year" type="number">
            </label>
            <label>
              Stack
              <input v-model="stackText" type="text" placeholder="Nuxt, Python">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'projects'" title="Documentation" eyebrow="Project docs">
          <div v-if="!hasAttachedDocs" class="empty-doc-state">
            <strong>No documentation attached yet.</strong>
            <p>This project can stay as a standalone dossier, or you can connect existing docs / create the first docs page.</p>
          </div>

          <div v-else class="attached-docs">
            <div class="attached-section">
              <p class="doc-section-title">Attached documentation</p>
              <article class="attached-doc-card">
                <div>
                  <strong>{{ attachedDocs[0]?.title || frontmatter.docsPath }}</strong>
                  <small>{{ frontmatter.docsPath }} · folder: {{ docsFolder }}</small>
                </div>
                <NuxtLink v-if="frontmatter.docsPath" class="mini-doc-link" :to="frontmatter.docsPath">View documentation</NuxtLink>
              </article>
            </div>

            <div class="attached-section">
              <p class="doc-section-title">Attached pages</p>
              <p v-if="!attachedDocs.length" class="muted">No documentation pages selected.</p>
              <article v-for="doc in attachedDocs" v-else :key="doc.filePath" class="attached-doc-card">
                <div>
                  <strong>{{ doc.title }}</strong>
                  <small>{{ secondaryDocText(doc) }}</small>
                </div>
                <NuxtLink class="mini-doc-link" :to="doc.publicPath">View</NuxtLink>
              </article>
            </div>
          </div>

          <div class="doc-actions">
            <NuxtLink v-if="frontmatter.docsPath" class="ghost-btn" :to="frontmatter.docsPath">View documentation</NuxtLink>
            <button class="ghost-btn" type="button" @click="isAttachingDocs = !isAttachingDocs">Add existing documentation</button>
            <NuxtLink class="studio-btn" :to="newDocsForProjectLink">{{ relatedDocs.length ? 'New Docs Page for this project' : 'Create first docs page' }}</NuxtLink>
          </div>

          <div v-if="isAttachingDocs" class="attach-docs-panel">
            <div>
              <h3>Attach existing documentation</h3>
              <p>Select one or more available documentation pages to attach to this project.</p>
            </div>

            <div class="doc-picker">
              <p class="doc-section-title">Documentation pages</p>
              <p v-if="!attachableDocs.length" class="muted">No available documentation found.</p>
              <label v-for="doc in attachableDocs" :key="doc.filePath" class="doc-choice">
                <input v-model="selectedAttachmentDocs" type="checkbox" :value="doc.publicPath">
                <span>
                  <strong>{{ doc.title }}</strong>
                  <small>{{ secondaryDocText(doc) }}</small>
                  <small>Status: {{ docAvailabilityLabel(doc) }}</small>
                </span>
              </label>
            </div>

            <details v-if="attachedElsewhereDocs.length" class="advanced-doc-fields">
              <summary>Already attached to another project</summary>
              <article v-for="doc in attachedElsewhereDocs" :key="doc.filePath" class="doc-choice disabled-doc">
                <span>
                  <strong>{{ doc.title }}</strong>
                  <small>{{ secondaryDocText(doc) }}</small>
                  <small>Status: {{ docAvailabilityLabel(doc) }}</small>
                </span>
              </article>
            </details>

            <div class="doc-actions">
              <button class="studio-btn" type="button" :disabled="isSaving" @click="saveDocumentationAttachments">Save attachment</button>
              <button class="ghost-btn" type="button" @click="isAttachingDocs = false">Cancel</button>
            </div>
          </div>

          <details class="advanced-doc-fields">
            <summary>Advanced documentation fields</summary>
            <div class="field-grid">
              <label id="project-docs-path">
                Docs path
                <input v-model="frontmatter.docsPath" type="text" placeholder="/docs/tennis-ai-friction">
              </label>
              <label>
                Docs folder
                <input v-model="frontmatter.docsFolder" type="text" placeholder="tennis-ai-friction">
              </label>
              <label>
                Related docs raw
                <input v-model="frontmatter.relatedDocs" type="text" placeholder="/docs/tennis-ai-friction/setup">
              </label>
            </div>
          </details>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'docs'" title="Docs fields" eyebrow="Project documentation">
          <div class="field-grid">
            <label>
              Project
              <input v-model="frontmatter.project" type="text">
            </label>
            <label>
              Project slug
              <input v-model="frontmatter.projectSlug" type="text">
            </label>
            <label>
              Docs folder
              <input v-model="frontmatter.docsFolder" type="text">
            </label>
            <label>
              Section
              <input v-model="frontmatter.section" type="text">
            </label>
            <label>
              Order
              <input v-model="frontmatter.order" type="number">
            </label>
          </div>
        </AdminPanel>

        <AdminPanel v-if="contentType === 'labs'" title="Lab fields" eyebrow="Research line">
          <div class="field-grid">
            <label>
              Short title
              <input v-model="frontmatter.shortTitle" type="text">
            </label>
            <label>
              Accent
              <input v-model="frontmatter.accent" type="text">
            </label>
            <label>
              Order
              <input v-model="frontmatter.order" type="number">
            </label>
            <label>
              Related tags
              <input v-model="relatedTagsText" type="text">
            </label>
            <label>
              Roadmap
              <textarea v-model="roadmapText" rows="4" />
            </label>
            <label>
              Open questions
              <textarea v-model="openQuestionsText" rows="4" />
            </label>
          </div>
        </AdminPanel>

        <AdminPanel title="Markdown body" eyebrow="Content">
          <textarea v-model="markdownBody" class="body-editor" />
        </AdminPanel>
      </div>

      <aside class="editor-side">
        <AdminPanel title="Save" eyebrow="Stage 4">
          <div class="actions">
            <button class="studio-btn" type="button" :disabled="isSaving" @click="save">
              {{ isSaving ? 'Saving...' : 'Save changes' }}
            </button>
            <button class="ghost-btn" type="button" @click="archive">Archive</button>
          </div>
          <p v-if="statusMessage" class="status-copy">{{ statusMessage }}</p>
        </AdminPanel>

        <AdminPanel title="SEO settings" eyebrow="Metadata">
          <div class="field-stack">
            <label>
              SEO title
              <input v-model="frontmatter.seoTitle" type="text">
            </label>
            <label>
              SEO description
              <textarea v-model="frontmatter.seoDescription" rows="4" />
            </label>
            <label>
              OG title
              <input v-model="frontmatter.ogTitle" type="text">
            </label>
            <label>
              OG description
              <textarea v-model="frontmatter.ogDescription" rows="4" />
            </label>
            <label>
              OG image
              <input v-model="frontmatter.ogImage" type="text">
            </label>
            <label>
              Canonical
              <input v-model="frontmatter.canonical" type="text">
            </label>
            <label class="check-row">
              <input v-model="frontmatter.noindex" type="checkbox">
              Noindex
            </label>
          </div>
        </AdminPanel>
      </aside>
    </section>

    <AdminPanel v-if="!filePath" title="No file selected" eyebrow="Editor">
      <p class="muted">Open a file from Blog, Projects, Docs, or Labs to edit it.</p>
      <button class="ghost-btn" type="button" @click="router.push('/admin')">Back to Studio</button>
    </AdminPanel>

    <div v-if="mediaPickerMode" class="media-picker-backdrop" @click.self="mediaPickerMode = ''">
      <section class="media-picker-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Media Library</p>
            <h2>{{ mediaPickerMode === 'cover' ? 'Choose cover image' : 'Choose block image' }}</h2>
          </div>
          <div class="media-picker-actions">
            <button class="ghost-btn" type="button" @click="openPickerUpload">Upload image</button>
            <button class="ghost-btn" type="button" :disabled="mediaPending" @click="refreshAssets">Refresh</button>
            <button class="ghost-btn" type="button" @click="mediaPickerMode = ''">Close</button>
          </div>
        </div>
        <p v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</p>
        <p v-if="mediaError" class="muted">{{ mediaError }}</p>
        <p v-if="mediaPending" class="muted">Reading media library...</p>
        <div v-else-if="mediaAssets.length" class="media-picker-grid">
          <button v-for="asset in mediaAssets" :key="asset.id" class="media-picker-item" type="button" @click="selectMediaAsset(asset.url)">
            <img :src="asset.url" :alt="asset.title">
            <strong>{{ asset.title }}</strong>
            <span>{{ asset.filename }}</span>
          </button>
        </div>
        <div v-else class="empty-canvas">
          <strong>No media available yet.</strong>
          <p>Upload a JPG, PNG or WebP image to start using real Media Library assets.</p>
          <button class="studio-btn" type="button" @click="openPickerUpload">Upload image</button>
        </div>
      </section>
    </div>

    <div v-if="statusMessage" class="composer-toast" :data-state="saveState">
      {{ statusMessage }}
    </div>
  </div>
</template>

<style scoped>
.admin-page,
.editor-main,
.editor-side {
  display: grid;
  gap: 20px;
}

.visually-hidden-file {
  position: fixed;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.editor-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 20px;
  align-items: start;
}

.editor-side {
  position: sticky;
  top: calc(var(--topbar) + 22px);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field-stack {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  color: var(--ink);
  font: inherit;
  letter-spacing: 0;
  outline: none;
  padding: 12px 14px;
  text-transform: none;
}

textarea {
  resize: vertical;
  line-height: 1.55;
}

.body-editor {
  min-height: 520px;
  border-radius: 22px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 14px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.danger-zone {
  border-color: color-mix(in srgb, var(--coral), var(--line) 54%);
  background: color-mix(in srgb, var(--paper-soft), var(--coral) 7%);
}

.danger-zone .eyebrow {
  margin: 0 0 6px;
}

.danger-summary {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 10px 14px;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
}

.danger-summary span {
  color: var(--muted);
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.danger-summary strong {
  overflow-wrap: anywhere;
  color: var(--ink);
  font-size: 14px;
  letter-spacing: -0.02em;
}

.danger-actions,
.delete-confirm {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: end;
  margin-top: 16px;
}

.delete-confirm label {
  flex: 1 1 320px;
}

.danger-btn {
  display: inline-grid;
  min-height: 40px;
  place-items: center;
  padding: 0 14px;
  border: 1px solid color-mix(in srgb, var(--coral), #000 14%);
  border-radius: 999px;
  background: color-mix(in srgb, var(--coral), #000 10%);
  color: #191714;
  cursor: pointer;
  font-weight: 800;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.danger-btn:disabled {
  cursor: not-allowed;
  opacity: 0.46;
}

.danger-btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.doc-actions,
.related-docs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.documentation-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.doc-meta,
.related-docs a {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
}

.doc-meta span {
  display: block;
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.doc-meta strong {
  display: block;
  margin-top: 8px;
  overflow-wrap: anywhere;
  color: var(--ink);
  font-size: 14px;
  letter-spacing: -0.02em;
}

.related-docs a {
  color: var(--ink);
  font-size: 13px;
  font-weight: 760;
}

.studio-btn,
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
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.studio-btn {
  border-color: var(--coral);
  background: var(--coral);
  color: #191714;
}

.studio-btn:hover,
.ghost-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.studio-btn:disabled {
  cursor: wait;
  opacity: 0.65;
}

.status-copy {
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.status-copy[data-state='saving'] {
  color: var(--yellow);
}

.status-copy[data-state='saved'] {
  color: var(--green);
}

.status-copy[data-state='error'] {
  color: var(--coral);
}

.upload-message {
  display: inline-flex;
  width: max-content;
  max-width: 100%;
  margin-top: 10px;
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  font-size: 12px;
  font-weight: 780;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-row input {
  width: auto;
}

.empty-doc-state,
.attached-docs,
.attach-docs-panel,
.advanced-doc-fields {
  display: grid;
  gap: 14px;
}

.empty-doc-state,
.attached-doc-card,
.attach-docs-panel,
.advanced-doc-fields {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
}

.empty-doc-state strong,
.attached-doc-card strong,
.attach-docs-panel h3,
.doc-section-title {
  margin: 0;
  color: var(--ink);
  letter-spacing: -0.02em;
  text-transform: none;
}

.empty-doc-state p,
.attached-doc-card small,
.attach-docs-panel p,
.advanced-doc-fields summary {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
  letter-spacing: 0;
  text-transform: none;
}

.attached-section,
.doc-picker {
  display: grid;
  gap: 10px;
}

.doc-section-title {
  font-size: 13px;
  font-weight: 850;
}

.attached-doc-card {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
}

.attached-doc-card div {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.attached-doc-card small {
  overflow-wrap: anywhere;
}

.mini-doc-link {
  flex: 0 0 auto;
  color: var(--coral);
  font-size: 12px;
  font-weight: 800;
}

.doc-choice {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: start;
  padding: 13px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
  color: var(--ink);
  letter-spacing: 0;
  text-transform: none;
}

.doc-choice input {
  width: auto;
  margin-top: 3px;
}

.doc-choice span {
  display: grid;
  gap: 4px;
}

.doc-choice strong {
  color: var(--ink);
  font-size: 14px;
  letter-spacing: -0.02em;
  text-transform: none;
}

.doc-choice small {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0;
  text-transform: none;
}

.advanced-doc-fields {
  background: var(--paper-soft);
}

.advanced-doc-fields summary {
  cursor: pointer;
  font-weight: 800;
}

@media (max-width: 720px) {
  .attached-doc-card {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 1180px) {
  .editor-grid,
  .field-grid,
  .documentation-panel {
    grid-template-columns: 1fr;
  }

  .editor-side {
    position: static;
  }
}

.composer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 22px;
  align-items: start;
}

.composer-main,
.canvas,
.composer-inspector,
.asset-list,
.outline-list {
  display: grid;
  gap: 16px;
}

.composer-hero {
  position: relative;
  overflow: hidden;
  padding: clamp(30px, 5vw, 54px);
  border: 1px solid var(--line);
  border-radius: 34px;
  background: linear-gradient(145deg, var(--paper), var(--paper-muted));
  box-shadow: var(--shadow);
}

.composer-hero::after {
  position: absolute;
  right: -170px;
  top: -190px;
  width: 470px;
  height: 470px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 121, 109, 0.32), rgba(119, 103, 201, 0.16) 52%, transparent 72%);
  content: "";
  pointer-events: none;
}

.composer-hero > * {
  position: relative;
  z-index: 1;
}

.composer-hero h1 {
  max-width: 920px;
  margin: 16px 0 0;
  font-size: clamp(42px, 5vw, 76px);
  line-height: 0.9;
  letter-spacing: -0.08em;
}

.subtitle {
  max-width: 780px;
  margin: 18px 0 0;
  color: var(--muted);
  font-size: 18px;
  letter-spacing: -0.02em;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.composer-tabs {
  display: inline-flex;
  width: max-content;
  gap: 3px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
}

.composer-tabs button {
  min-height: 34px;
  padding: 0 13px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 13px;
  font-weight: 760;
}

.composer-tabs button.active {
  background: var(--ink);
  color: var(--bg);
}

.panel {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper-soft);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 16px;
}

.panel h2,
.inspector-card h3 {
  margin: 0;
  font-size: 24px;
  line-height: 1;
  letter-spacing: -0.055em;
}

.setup-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 16px;
}

.field-grid.compact {
  gap: 12px;
}

.span-2 {
  grid-column: 1 / -1;
}

.slug-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.mini-action {
  min-height: 42px;
  align-self: end;
}

.builder-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}

.block-library {
  position: sticky;
  top: calc(var(--topbar) + 20px);
  display: grid;
  gap: 10px;
}

.block-button {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-soft);
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  transition: 0.18s;
}

.block-button:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--paper-soft), var(--paper) 16%);
}

.block-button.disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.block-icon {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 12px;
  background: color-mix(in srgb, var(--coral), transparent 82%);
  color: var(--coral);
  font-weight: 900;
}

.block-button strong,
.block-button small {
  display: block;
}

.block-button strong {
  font-size: 13px;
  line-height: 1.1;
}

.block-button small {
  margin-top: 3px;
  color: var(--muted);
  font-size: 11px;
}

.project-form-top {
  display: grid;
  grid-template-columns: 1fr 230px;
  gap: 14px;
}

.project-form-top.blog-hero-options {
  grid-template-columns: minmax(0, 1fr) minmax(300px, 360px);
}

.cover-upload,
.image-drop {
  position: relative;
  display: grid;
  min-height: 250px;
  place-items: center;
  overflow: hidden;
  padding: 24px;
  border: 1px dashed color-mix(in srgb, var(--coral), var(--line) 45%);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255, 121, 109, 0.22), rgba(119, 103, 201, 0.14));
  cursor: pointer;
  text-align: center;
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.cover-upload:hover,
.image-drop:hover,
.cover-upload:focus-visible,
.image-drop:focus-visible {
  border-color: var(--coral);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

.cover-upload > img,
.image-drop > img {
  position: absolute;
  inset: 18px;
  width: 100%;
  width: calc(100% - 36px);
  height: calc(100% - 36px);
  border-radius: 20px;
  object-fit: contain;
  object-position: center;
  opacity: 0.72;
}

.image-drop.full-width {
  width: 100%;
  min-height: 280px;
}

.image-drop.contained {
  width: 84%;
  min-height: 240px;
  margin: 0 auto;
}

.image-drop.inline-medium {
  width: 62%;
  min-height: 220px;
  margin: 0 auto;
}

.image-drop.inline-small {
  width: 42%;
  min-height: 190px;
  margin: 0 auto;
}

.image-drop.editorial-crop {
  width: 100%;
  min-height: 260px;
}

.image-drop.editorial-crop > img {
  object-fit: cover;
}

.cover-upload > img {
  object-position: var(--cover-preview-position, center);
}

.upload-inner,
.image-drop > div {
  position: relative;
  z-index: 1;
}

.upload-icon {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  margin: 0 auto 14px;
  border-radius: 20px;
  background: var(--coral);
  color: #191714;
  font-size: 26px;
  font-weight: 900;
}

.upload-inner strong,
.empty-canvas strong {
  display: block;
  font-size: 22px;
  letter-spacing: -0.05em;
}

.upload-inner p,
.empty-canvas p {
  max-width: 440px;
  margin: 8px auto 14px;
  color: var(--muted);
  font-size: 14px;
}

.media-choice-row,
.block-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.visual-options {
  display: grid;
  gap: 12px;
}

.cover-design-preview,
.front-hero {
  --accent-coral: var(--coral);
  --accent-lavender: var(--lavender);
  --accent-cream: var(--paper);
  --accent-graphite: #2c2a28;
  --accent-soft-red: var(--rose);
  --accent-muted-violet: var(--lavender);
}

.cover-design-preview {
  position: relative;
  display: grid;
  min-height: 190px;
  align-content: end;
  gap: 8px;
  overflow: hidden;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--cover-preview-accent), transparent 36%), transparent),
    var(--cover-preview-image) var(--cover-preview-position) / contain no-repeat,
    var(--paper);
}

.cover-design-preview::after,
.front-hero::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 10%, rgba(0, 0, 0, 0.34));
  content: "";
  pointer-events: none;
}

.cover-design-preview > *,
.front-hero > * {
  position: relative;
  z-index: 1;
}

.cover-design-preview.style-terminal-dark,
.front-hero.style-terminal-dark {
  background:
    var(--cover-preview-image) var(--cover-preview-position) / contain no-repeat,
    linear-gradient(145deg, #151412, #302924);
}

.cover-design-preview.style-editorial-card,
.cover-design-preview.style-minimal-cover,
.front-hero.style-editorial-card,
.front-hero.style-minimal-cover {
  background:
    var(--cover-preview-image) var(--cover-preview-position) / contain no-repeat,
    color-mix(in srgb, var(--cover-preview-accent), var(--paper) 80%);
}

.front-hero.style-editorial-gradient,
.front-hero.style-gradient-surface {
  background:
    radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--cover-preview-accent), transparent 22%), transparent 32%),
    radial-gradient(circle at 88% 88%, rgba(119, 103, 201, 0.32), transparent 34%),
    linear-gradient(145deg, #191714, #332b26);
  color: #fff7ee;
}

.front-hero.style-soft-magazine,
.front-hero.style-soft-image-overlay {
  background:
    radial-gradient(circle at 18% 18%, color-mix(in srgb, var(--cover-preview-accent), transparent 44%), transparent 32%),
    color-mix(in srgb, var(--paper), var(--cover-preview-accent) 12%);
}

.front-hero.style-minimal-dark,
.front-hero.style-minimal-documentation {
  background: linear-gradient(145deg, #151412, #24211f);
  color: #fff7ee;
}

.cover-design-preview strong {
  color: var(--ink);
  font-size: 20px;
  line-height: 0.98;
  letter-spacing: -0.055em;
}

.cover-design-preview small {
  color: var(--muted);
  font-size: 12px;
}

.empty-canvas,
.content-block,
.inspector-card,
.media-card {
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--paper-soft);
}

.empty-canvas {
  padding: 22px;
}

.content-block {
  overflow: hidden;
}

.content-block.selected {
  border-color: color-mix(in srgb, var(--coral), var(--line) 40%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--coral), transparent 70%);
}

.content-block.hidden {
  opacity: 0.62;
}

.block-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid var(--line);
}

.block-toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drag {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 0;
  border-radius: 10px;
  background: color-mix(in srgb, var(--coral), transparent 84%);
  color: var(--coral);
  cursor: pointer;
  font-weight: 900;
}

.block-title strong,
.block-title span {
  display: block;
}

.block-title strong {
  letter-spacing: -0.035em;
}

.block-title span {
  color: var(--muted);
  font-size: 12px;
}

.mini-btn {
  min-height: 30px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--muted);
  cursor: pointer;
  font-size: 12px;
  font-weight: 780;
}

.mini-btn:hover {
  color: var(--ink);
}

.block-body {
  padding: 18px;
}

.image-block-grid {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 14px;
}

.image-settings {
  display: grid;
  gap: 12px;
}

.selected-asset-note {
  display: grid;
  gap: 3px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
}

.selected-asset-note span {
  color: var(--muted);
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.selected-asset-note strong {
  overflow-wrap: anywhere;
  color: var(--ink);
  font-size: 13px;
}

.code-textarea {
  min-height: 220px;
  background: var(--code-bg);
  color: var(--code-ink);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.markdown-fallback {
  background: color-mix(in srgb, var(--paper-soft), transparent 10%);
}

.composer-inspector {
  position: sticky;
  top: calc(var(--topbar) + 22px);
}

.composer-inspector.blog-inspector-flow {
  position: sticky;
}

.blog-hero-preview-card {
  align-self: start;
}

.inspector-card {
  display: grid;
  gap: 14px;
  padding: 20px;
}

.inspector-card p {
  color: var(--muted);
  font-size: 13px;
}

.preview-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper-soft);
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border-bottom: 1px solid var(--line);
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--coral);
}

.dot:nth-child(2) {
  background: var(--yellow);
}

.dot:nth-child(3) {
  background: var(--green);
}

.frontend-preview {
  padding: 20px;
  background: var(--paper);
}

.front-hero {
  position: relative;
  overflow: hidden;
  display: flex;
  min-height: 150px;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px;
  border-radius: 20px;
  background:
    var(--cover-preview-image) var(--cover-preview-position) / contain no-repeat,
    linear-gradient(135deg, color-mix(in srgb, var(--cover-preview-accent), transparent 50%), rgba(119, 103, 201, 0.22));
}

.front-hero h3 {
  margin: 10px 0 0;
  font-size: 28px;
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.front-hero p {
  margin: 8px 0 0;
  color: color-mix(in srgb, currentColor, transparent 28%);
  font-size: 12px;
  line-height: 1.45;
}

.front-section,
.outline-item,
.component-note {
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper-soft);
}

.front-section {
  margin-top: 12px;
}

.front-section p {
  margin: 5px 0 0;
}

.outline-item {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 16px;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
}

.outline-item.active {
  border-color: color-mix(in srgb, var(--coral), var(--line) 40%);
}

.outline-item span {
  color: var(--muted);
}

.media-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.media-mini,
.media-card img,
.asset-button img {
  width: 100%;
  object-fit: contain;
  object-position: center;
}

.media-mini {
  aspect-ratio: 1;
  border: 1px solid var(--line);
  border-radius: 14px;
}

.component-note {
  color: var(--muted);
  font-size: 13px;
}

.media-tab-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.media-card {
  overflow: hidden;
}

.media-card img {
  aspect-ratio: 16 / 9;
  display: block;
}

.media-card strong,
.media-card span {
  display: block;
  padding: 0 12px;
}

.media-card strong {
  padding-top: 12px;
  font-size: 14px;
}

.media-card span {
  padding-bottom: 12px;
  color: var(--muted);
  font-size: 12px;
}

.asset-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.compact-assets {
  grid-template-columns: 1fr;
}

.asset-button {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 10px;
  align-items: center;
  padding: 8px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper-soft);
  color: var(--ink);
  cursor: pointer;
  text-align: left;
}

.asset-button img {
  aspect-ratio: 1;
  border-radius: 10px;
  background: var(--paper);
}

.media-picker-backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(15, 14, 13, 0.68);
  backdrop-filter: blur(14px);
}

.media-picker-panel {
  display: grid;
  width: min(980px, 100%);
  max-height: min(760px, calc(100vh - 48px));
  gap: 16px;
  overflow: auto;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.media-picker-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.media-picker-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.media-picker-item {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper-soft);
  color: var(--ink);
  cursor: pointer;
  text-align: left;
}

.media-picker-item:hover {
  border-color: color-mix(in srgb, var(--coral), var(--line) 35%);
}

.media-picker-item img {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 14px;
  background: var(--paper);
  object-fit: contain;
}

.media-picker-item strong {
  font-size: 14px;
  letter-spacing: -0.02em;
}

.media-picker-item span {
  color: var(--muted);
  font-size: 12px;
}

.composer-toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  max-width: min(420px, calc(100vw - 48px));
  padding: 12px 15px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
  color: var(--ink);
  box-shadow: var(--shadow);
  font-size: 13px;
  font-weight: 820;
}

.composer-toast[data-state='saving'] {
  border-color: color-mix(in srgb, var(--yellow), var(--line) 35%);
}

.composer-toast[data-state='saved'] {
  border-color: color-mix(in srgb, var(--green), var(--line) 30%);
}

.composer-toast[data-state='error'] {
  border-color: color-mix(in srgb, var(--coral), var(--line) 24%);
}

.preview-surface {
  padding: clamp(18px, 3vw, 34px);
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--paper);
}

@media (max-width: 1320px) {
  .composer-grid {
    grid-template-columns: 1fr;
  }

  .composer-inspector {
    position: static;
    grid-template-columns: repeat(2, 1fr);
  }

  .builder-layout {
    grid-template-columns: 1fr;
  }

  .block-library {
    position: static;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 980px) {
  .setup-grid,
  .project-form-top,
  .image-block-grid,
  .media-tab-grid,
  .asset-list,
  .composer-inspector {
    grid-template-columns: 1fr;
  }
}
</style>
