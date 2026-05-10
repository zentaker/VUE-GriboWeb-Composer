export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const resolved = resolveAdminContentFile(body.contentType, body.filePath)
  const incomingFrontmatter = { ...(body.frontmatter ?? {}) }
  const title = String(incomingFrontmatter.title ?? 'Untitled')

  incomingFrontmatter.title = title
  incomingFrontmatter.slug = incomingFrontmatter.slug || slugifyContentTitle(title)
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
