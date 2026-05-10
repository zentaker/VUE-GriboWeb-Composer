export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const requestedTypes = query.contentType
    ? [assertAdminContentType(query.contentType)]
    : (['blog', 'projects', 'docs', 'labs'] as const)

  const items = []

  for (const contentType of requestedTypes) {
    const files = await listAdminMarkdownFiles(contentType)

    for (const filePath of files) {
      const resolved = resolveAdminContentFile(contentType, filePath)
      const { frontmatter } = await readMarkdownFile(resolved.absolutePath)
      const publicPath = getContentPublicPath(contentType, frontmatter, filePath)

      items.push({
        contentType,
        filePath,
        publicPath,
        title: frontmatter.title ?? filePath,
        slug: frontmatter.slug ?? publicPath.split('/').pop(),
        status: frontmatter.status ?? 'draft',
        lab: frontmatter.lab ?? '',
        date: frontmatter.date ?? '',
        updatedAt: frontmatter.updatedAt ?? '',
        tags: Array.isArray(frontmatter.tags)
          ? frontmatter.tags
          : Array.isArray(frontmatter.relatedTags) ? frontmatter.relatedTags : [],
        description: frontmatter.description ?? frontmatter.excerpt ?? frontmatter.summary ?? '',
        project: frontmatter.project ?? '',
        projectSlug: frontmatter.projectSlug ?? '',
        docsFolder: frontmatter.docsFolder ?? '',
        docsPath: frontmatter.docsPath ?? '',
        docsPaths: Array.isArray(frontmatter.docsPaths) ? frontmatter.docsPaths : [],
        relatedDocs: Array.isArray(frontmatter.relatedDocs) ? frontmatter.relatedDocs : []
      })
    }
  }

  return {
    items: items.sort((a, b) => {
      const aDate = String(a.updatedAt || a.date || '')
      const bDate = String(b.updatedAt || b.date || '')
      return bDate.localeCompare(aDate) || String(a.title).localeCompare(String(b.title))
    })
  }
})
