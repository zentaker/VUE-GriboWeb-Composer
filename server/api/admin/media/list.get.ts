import { mkdir, readdir, stat } from 'node:fs/promises'
import { extname, join, relative, resolve, sep } from 'node:path'

const allowedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'])

function titleFromFilename(filename: string) {
  return filename
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default defineEventHandler(async () => {
  const uploadsRoot = resolve(process.cwd(), 'public/uploads')
  const assets = []

  async function walk(current: string) {
    const entries = await readdir(current, { withFileTypes: true })

    for (const entry of entries) {
      const absolutePath = join(current, entry.name)

      if (entry.isDirectory()) {
        await walk(absolutePath)
        continue
      }

      if (!entry.isFile()) continue

      const extension = extname(entry.name).toLowerCase()
      if (!allowedImageExtensions.has(extension)) continue

      const relativePath = relative(uploadsRoot, absolutePath).split(sep).join('/')
      const info = await stat(absolutePath)
      const filename = relativePath.split('/').pop() || relativePath

      assets.push({
        id: relativePath.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase(),
        title: titleFromFilename(filename),
        filename,
        url: `/uploads/${relativePath}`,
        type: extension.replace('.', '').toUpperCase(),
        usage: 'Media Library',
        description: 'Image available from public/uploads.',
        size: info.size,
        updatedAt: info.mtime.toISOString()
      })
    }
  }

  try {
    await mkdir(uploadsRoot, { recursive: true })
    await walk(uploadsRoot)
  } catch {
    return { assets: [] }
  }

  return {
    assets: assets.sort((a, b) => a.title.localeCompare(b.title))
  }
})
