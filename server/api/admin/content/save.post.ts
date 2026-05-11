export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const resolved = resolveAdminContentFile(body.contentType, body.filePath)
  const incomingFrontmatter = { ...(body.frontmatter ?? {}) }
  const title = String(incomingFrontmatter.title ?? 'Untitled')

  incomingFrontmatter.title = title
  const incomingSlug = String(incomingFrontmatter.slug || '')
  incomingFrontmatter.slug = resolved.contentType === 'blog' && isStaleBlogSlug(incomingSlug) && hasRealBlogTitle(title)
    ? slugifyContentTitle(title)
    : incomingSlug || slugifyContentTitle(title)
  incomingFrontmatter.updatedAt = todayIsoDate()

  await writeMarkdownFile(resolved.absolutePath, incomingFrontmatter, String(body.body ?? ''))

  return {
    ok: true,
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      publicPath: getContentPublicPath(resolved.contentType, incomingFrontmatter, resolved.filePath),
      frontmatter: incomingFrontmatter
    }
  }
})

function isStaleBlogSlug(value: string) {
  const slug = String(value || '').trim()
  return !slug
    || /^untitled-blog-entry-\d+$/.test(slug)
    || /^untitled-draft-\d+$/.test(slug)
    || /^draft-\d+$/.test(slug)
}

function hasRealBlogTitle(value: string) {
  const slug = slugifyContentTitle(String(value || ''))
  return Boolean(slug)
    && slug !== 'untitled-blog-entry'
    && slug !== 'untitled-draft'
    && slug !== 'untitled'
    && slug !== 'draft'
}
