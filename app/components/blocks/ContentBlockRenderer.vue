<script setup lang="ts">
type RichBlock = {
  id?: string
  type?: string
  title?: string
  visible?: boolean
  data?: Record<string, any>
}

const props = withDefaults(defineProps<{
  blocks?: RichBlock[] | null
  context?: 'blog' | 'project' | 'docs'
}>(), {
  blocks: () => [],
  context: 'blog'
})

const visibleBlocks = computed(() => (Array.isArray(props.blocks) ? props.blocks : [])
  .filter((block) => block && block.visible !== false)
)

function rowsFor(block: RichBlock) {
  const data = block.data ?? {}
  if (Array.isArray(data.rows)) return data.rows
  return String(data.rowsText || '')
    .split(/\r?\n/)
    .map((row) => row.split('|').map((cell) => cell.trim()).filter(Boolean))
    .filter((row) => row.length)
}

function columnsFor(block: RichBlock) {
  const data = block.data ?? {}
  if (Array.isArray(data.columns)) return data.columns
  return String(data.columnsText || '')
    .split(',')
    .map((column) => column.trim())
    .filter(Boolean)
}

function imageLayout(block: RichBlock) {
  const layout = String(block.data?.layout || 'contained')
  if (layout === 'full' || layout === 'bleed') return 'full-width'
  if (layout === 'left' || layout === 'right') return 'inline-medium'
  if (['full-width', 'contained', 'inline-medium', 'inline-small', 'editorial-crop'].includes(layout)) return layout
  return 'contained'
}

function headingLevel(block: RichBlock) {
  const level = String(block.data?.level || 'h2')
  return ['h2', 'h3', 'h4'].includes(level) ? level : 'h2'
}

async function copyCode(code?: string) {
  if (!code || !import.meta.client) return
  await navigator.clipboard?.writeText(code)
}
</script>

<template>
  <div v-if="visibleBlocks.length" class="rich-blocks" :data-context="context">
    <section
      v-for="block in visibleBlocks"
      v-show="block.type !== 'quote' || block.data?.quote"
      :key="block.id || block.title"
      class="rich-block"
      :class="`block-${block.type || 'text'}`"
    >
      <template v-if="block.type === 'heading'">
        <div class="heading-block">
          <p v-if="block.data?.kicker" class="block-kicker">{{ block.data.kicker }}</p>
          <component :is="headingLevel(block)" v-if="block.data?.heading">{{ block.data.heading }}</component>
          <p v-if="block.data?.subheading" class="heading-subtitle">{{ block.data.subheading }}</p>
        </div>
      </template>

      <template v-else-if="(block.type || 'text') === 'text'">
        <h2 v-if="block.data?.heading">{{ block.data.heading }}</h2>
        <p v-if="block.data?.body" class="block-copy">{{ block.data.body }}</p>
      </template>

      <template v-else-if="block.type === 'quote'">
        <blockquote v-if="block.data?.quote" class="content-quote-block" :data-variant="block.data?.variant || 'editorial'">
          <p>{{ block.data.quote }}</p>
          <cite v-if="block.data?.attribution">{{ block.data.attribution }}</cite>
        </blockquote>
      </template>

      <template v-else-if="block.type === 'image'">
        <figure :class="['image-figure', imageLayout(block)]">
          <img v-if="block.data?.imageUrl" :src="block.data.imageUrl" :alt="block.data?.alt || ''">
          <div v-else class="image-placeholder">Image block</div>
          <figcaption v-if="block.data?.caption">{{ block.data.caption }}</figcaption>
        </figure>
      </template>

      <template v-else-if="block.type === 'code'">
        <div class="code-panel">
          <div class="code-head">
            <span>{{ block.data?.title || 'Code block' }}</span>
            <button v-if="block.data?.copyEnabled" type="button" @click="copyCode(block.data?.code)">Copy</button>
          </div>
          <pre><code>{{ block.data?.code }}</code></pre>
        </div>
      </template>

      <template v-else-if="block.type === 'callout'">
        <aside class="callout-block" :data-variant="block.data?.variant || 'info'">
          <span class="callout-mark">{{ block.data?.icon || 'i' }}</span>
          <div>
            <h3 v-if="block.data?.title">{{ block.data.title }}</h3>
            <p>{{ block.data?.body }}</p>
          </div>
        </aside>
      </template>

      <template v-else-if="block.type === 'table'">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th v-for="column in columnsFor(block)" :key="column">{{ column }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in rowsFor(block)" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template v-else-if="block.type === 'banner'">
        <aside class="banner-block" :data-accent="block.data?.accent || 'coral'">
          <h2 v-if="block.data?.title">{{ block.data.title }}</h2>
          <p>{{ block.data?.body }}</p>
        </aside>
      </template>

      <template v-else-if="block.type === 'steps'">
        <ol class="steps-block">
          <li v-for="(item, index) in block.data?.items || []" :key="index">
            <strong>{{ item.title || `Step ${index + 1}` }}</strong>
            <span>{{ item.body }}</span>
          </li>
        </ol>
      </template>

      <template v-else-if="block.type === 'gallery'">
        <div class="gallery-block">
          <figure v-for="(image, index) in block.data?.images || []" :key="image.url || index">
            <img :src="image.url" :alt="image.alt || ''">
            <figcaption v-if="image.caption">{{ image.caption }}</figcaption>
          </figure>
        </div>
      </template>

      <template v-else-if="block.type === 'split'">
        <div class="split-block">
          <div>{{ block.data?.leftContent }}</div>
          <div>{{ block.data?.rightContent }}</div>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
.rich-blocks {
  display: grid;
  gap: 24px;
}

.rich-block {
  min-width: 0;
}

.block-kicker {
  margin: 0 0 8px;
  color: var(--coral);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.rich-block h2 {
  margin: 0 0 12px;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.heading-block {
  display: grid;
  gap: 12px;
}

.heading-block h2,
.heading-block h3,
.heading-block h4 {
  margin: 0;
  line-height: 0.98;
  letter-spacing: -0.04em;
}

.heading-block h2 {
  font-size: clamp(32px, 4vw, 52px);
}

.heading-block h3 {
  font-size: clamp(26px, 3vw, 38px);
}

.heading-block h4 {
  font-size: clamp(22px, 2.4vw, 30px);
}

.heading-subtitle {
  margin: 0;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.55;
}

.block-copy {
  margin: 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.7;
  white-space: pre-line;
}

.content-quote-block {
  margin: 2px 0;
  padding: 4px 0 4px 16px;
  border-left: 2px solid var(--coral);
  color: var(--ink);
}

.content-quote-block[data-variant='subtle'] {
  border-left-color: var(--line);
}

.content-quote-block[data-variant='pullquote'] {
  border-left-color: var(--lavender);
}

.content-quote-block p {
  margin: 0;
  font-size: clamp(17px, 1.35vw, 20px);
  font-weight: 400;
  font-style: italic;
  line-height: 1.6;
  letter-spacing: 0;
}

.content-quote-block cite {
  display: block;
  margin-top: 10px;
  color: var(--muted);
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.image-figure {
  margin: 0;
  display: grid;
  justify-items: center;
  width: 100%;
}

.image-figure img,
.image-placeholder {
  display: block;
  width: 100%;
  min-height: 240px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 121, 109, 0.3), rgba(119, 103, 201, 0.22));
  object-fit: contain;
  object-position: center;
}

.image-figure.full-width img,
.image-figure.full-width .image-placeholder {
  width: 100%;
  max-width: 100%;
}

.image-figure.contained img,
.image-figure.contained .image-placeholder {
  width: min(84%, 760px);
}

.image-figure.inline-medium img,
.image-figure.inline-medium .image-placeholder {
  width: min(64%, 620px);
  min-height: 210px;
}

.image-figure.inline-small img,
.image-figure.inline-small .image-placeholder {
  width: min(44%, 440px);
  min-height: 180px;
}

.image-figure.editorial-crop img,
.image-figure.editorial-crop .image-placeholder {
  width: 100%;
  height: clamp(260px, 38vw, 420px);
  object-fit: cover;
}

.image-placeholder {
  display: grid;
  place-items: center;
  color: var(--muted);
  font-weight: 800;
}

figcaption {
  width: min(100%, 760px);
  margin: 10px auto 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.45;
  text-align: center;
}

.image-figure.contained figcaption {
  width: min(84%, 760px);
}

.image-figure.inline-medium figcaption {
  width: min(64%, 620px);
}

.image-figure.inline-small figcaption {
  width: min(44%, 440px);
}

.code-panel {
  overflow: hidden;
  border: 1px solid rgba(255, 247, 238, 0.12);
  border-radius: 22px;
  background: var(--code-bg);
  color: var(--code-ink);
}

.code-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255, 247, 238, 0.1);
  color: rgba(255, 247, 238, 0.7);
  font-size: 13px;
}

.code-head button {
  min-height: 28px;
  padding: 0 10px;
  border: 1px solid rgba(255, 247, 238, 0.18);
  border-radius: 999px;
  background: transparent;
  color: var(--code-ink);
  cursor: pointer;
}

pre {
  margin: 0;
  padding: 18px;
  overflow: auto;
  font-size: 13px;
  line-height: 1.75;
}

.callout-block {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  padding: 18px;
  border: 1px solid color-mix(in srgb, var(--blue), var(--line) 40%);
  border-radius: 20px;
  background: color-mix(in srgb, var(--blue), transparent 86%);
}

.callout-block[data-variant='warning'] {
  border-color: color-mix(in srgb, var(--yellow), var(--line) 35%);
  background: color-mix(in srgb, var(--yellow), transparent 86%);
}

.callout-block[data-variant='friction'] {
  border-color: color-mix(in srgb, var(--coral), var(--line) 35%);
  background: color-mix(in srgb, var(--coral), transparent 88%);
}

.callout-block[data-variant='success'] {
  border-color: color-mix(in srgb, var(--green), var(--line) 35%);
  background: color-mix(in srgb, var(--green), transparent 88%);
}

.callout-block[data-variant='editorial'] {
  border-color: color-mix(in srgb, var(--lavender), var(--line) 35%);
  background: color-mix(in srgb, var(--lavender), transparent 86%);
}

.callout-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 14px;
  background: var(--blue);
  color: #191714;
  font-weight: 900;
}

.callout-block h3 {
  margin: 0;
  font-size: 19px;
  letter-spacing: -0.035em;
}

.callout-block p {
  margin: 5px 0 0;
  color: var(--muted);
}

.table-wrap {
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  padding: 12px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  text-align: left;
}

th {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

tr:last-child td {
  border-bottom: 0;
}

th:last-child,
td:last-child {
  border-right: 0;
}

.banner-block {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 121, 109, 0.42), rgba(119, 103, 201, 0.22));
}

.banner-block h2 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(34px, 5vw, 64px);
}

.banner-block p {
  max-width: 720px;
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 17px;
}

.steps-block {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.steps-block li,
.split-block > div {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper-soft);
}

.steps-block strong,
.steps-block span {
  display: block;
}

.steps-block span {
  margin-top: 5px;
  color: var(--muted);
}

.gallery-block {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.gallery-block figure {
  margin: 0;
}

.gallery-block img {
  width: 100%;
  border-radius: 18px;
}

.split-block {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 720px) {
  .gallery-block,
  .split-block {
    grid-template-columns: 1fr;
  }
}
</style>
