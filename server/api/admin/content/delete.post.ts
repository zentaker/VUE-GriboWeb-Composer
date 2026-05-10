export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const resolved = resolveAdminContentFile(body.contentType, body.filePath)
  const content = await readMarkdownFile(resolved.absolutePath)
  const frontmatter = {
    ...content.frontmatter,
    status: 'archived',
    updatedAt: todayIsoDate()
  }

  await writeMarkdownFile(resolved.absolutePath, frontmatter, content.body)

  return {
    ok: true,
    softDeleted: true,
    item: {
      contentType: resolved.contentType,
      filePath: resolved.filePath,
      frontmatter
    }
  }
})
