import { mkdir, rename } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const mode = String(body.mode || 'archive')

  if (!['archive', 'delete'].includes(mode)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported delete mode.'
    })
  }

  const resolved = resolveAdminContentFile(body.contentType, body.filePath)

  if (mode === 'delete') {
    if (resolved.contentType !== 'blog') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Physical delete is only enabled for blog entries.'
      })
    }

    if (String(body.confirmation || '') !== 'DELETE BLOG ENTRY') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Type DELETE BLOG ENTRY to confirm permanent removal.'
      })
    }

    const trashRoot = resolve(process.cwd(), 'server/data/trash/blog')
    const filename = resolved.filePath.replace(/^blog\//, '').replace(/\//g, '__')
    const trashName = `${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z')}-${filename}`
    const trashPath = resolve(trashRoot, trashName)

    await mkdir(trashRoot, { recursive: true })
    await rename(resolved.absolutePath, trashPath)

    return {
      ok: true,
      deleted: true,
      softDeleted: false,
      item: {
        contentType: resolved.contentType,
        filePath: resolved.filePath,
        trashPath: `server/data/trash/blog/${trashName}`
      }
    }
  }

  const content = await readMarkdownFile(resolved.absolutePath)
  const frontmatter = {
    ...content.frontmatter,
    status: 'archived',
    archivedAt: new Date().toISOString(),
    updatedAt: todayIsoDate(),
    noindex: true
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
