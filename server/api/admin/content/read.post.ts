export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const resolved = resolveAdminContentFile(body.contentType, body.filePath)
  const content = await readMarkdownFile(resolved.absolutePath)

  return {
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      publicPath: getContentPublicPath(resolved.contentType, content.frontmatter, resolved.filePath),
      frontmatter: content.frontmatter,
      body: content.body
    }
  }
})
