export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const slug = String(query.slug || '')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Blog slug is required.' })
  }

  const collected = await collectBlogPackageFiles(slug)
  const title = String(collected.source.frontmatter.title || slug)
  const pkg = await createPortablePackage({
    packageType: 'blog',
    title,
    slug,
    contentFiles: collected.contentFiles,
    uploadFiles: collected.uploadFiles,
    notes: 'Portable Gribo blog package.'
  })

  return createDownloadResponse(event, pkg, `gribo-blog-${slug}.gribo.json`)
})
