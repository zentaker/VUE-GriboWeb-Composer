import { access, rename } from 'node:fs/promises'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const resolved = resolveAdminContentFile(body.contentType, body.filePath)
  const incomingFrontmatter = { ...(body.frontmatter ?? {}) }
  const title = String(incomingFrontmatter.title ?? 'Untitled')
  let targetResolved = resolved

  incomingFrontmatter.title = title
  const incomingSlug = String(incomingFrontmatter.slug || '')
  incomingFrontmatter.slug = resolved.contentType === 'blog'
    ? resolveBlogSaveSlug(incomingSlug, title)
    : incomingSlug || slugifyContentTitle(title)
  incomingFrontmatter.updatedAt = todayIsoDate()

  if (resolved.contentType === 'blog') {
    const desiredSlug = String(incomingFrontmatter.slug || '')
    const currentSlug = resolved.filePath.replace(/^blog\//, '').replace(/\.md$/, '').split('/').pop() || ''

    if (desiredSlug && desiredSlug !== currentSlug) {
      targetResolved = resolveAdminContentFile('blog', `${desiredSlug}.md`)

      try {
        await access(targetResolved.absolutePath)
        if (targetResolved.absolutePath !== resolved.absolutePath) {
          throw createError({
            statusCode: 409,
            statusMessage: 'A blog entry with this slug already exists'
          })
        }
      } catch (error: any) {
        if (error?.statusCode === 409) throw error
      }

      await rename(resolved.absolutePath, targetResolved.absolutePath)
    }
  }

  await writeMarkdownFile(targetResolved.absolutePath, incomingFrontmatter, String(body.body ?? ''))

  return {
    ok: true,
    item: {
      contentType: targetResolved.contentType,
      filePath: targetResolved.filePath,
      publicPath: getContentPublicPath(targetResolved.contentType, incomingFrontmatter, targetResolved.filePath),
      frontmatter: incomingFrontmatter
    }
  }
})

function slugTimestamp() {
  return new Date().toISOString().replace(/\D/g, '').slice(0, 14)
}

function slugifyBlogTitle(value: string, fallback = '') {
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

function resolveBlogSaveSlug(incomingSlug: string, title: string) {
  if (isStaleBlogSlug(incomingSlug) && hasRealBlogTitle(title)) return slugifyBlogTitle(title)
  if (incomingSlug) return slugifyBlogTitle(incomingSlug)
  return slugifyBlogTitle(title) || `draft-${slugTimestamp()}`
}

function isStaleBlogSlug(value: string) {
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

function hasRealBlogTitle(value: string) {
  const slug = slugifyBlogTitle(String(value || ''))
  return Boolean(slug)
    && slug !== 'untitled-blog-entry'
    && slug !== 'untitled-draft'
    && slug !== 'untitled'
    && slug !== 'draft'
}
