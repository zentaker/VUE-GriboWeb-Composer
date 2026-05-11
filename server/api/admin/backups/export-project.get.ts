export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const slug = String(query.slug || '')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Project slug is required.' })
  }

  const collected = await collectProjectPackageFiles(slug)
  const title = String(collected.source.frontmatter.title || slug)
  const pkg = await createPortablePackage({
    packageType: 'project',
    title,
    slug,
    contentFiles: collected.contentFiles,
    uploadFiles: collected.uploadFiles,
    notes: 'Project package with associated documentation detected from project frontmatter.'
  })

  return createDownloadResponse(event, pkg, `gribo-project-${slug}.gribo.json`)
})
