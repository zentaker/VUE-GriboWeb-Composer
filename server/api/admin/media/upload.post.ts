import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'

const maxUploadBytes = 5 * 1024 * 1024
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

function titleFromFilename(filename: string) {
  return filename
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function safeFilename(filename: string) {
  const extension = extname(filename).toLowerCase()
  const base = filename
    .replace(/\.[a-z0-9]+$/i, '')
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '')

  return `${base || 'gribo-image'}-${randomUUID().slice(0, 8)}${extension}`
}

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const file = parts?.find((part) => part.name === 'file')

  if (!file || !file.filename || !file.data?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Upload failed.' })
  }

  const extension = extname(file.filename).toLowerCase()
  const mimeType = String(file.type || '').toLowerCase()

  if (!allowedExtensions.has(extension) || !allowedMimeTypes.has(mimeType)) {
    throw createError({ statusCode: 400, statusMessage: 'File type not allowed.' })
  }

  if (file.data.length > maxUploadBytes) {
    throw createError({ statusCode: 400, statusMessage: 'File is too large.' })
  }

  const uploadsRoot = resolve(process.cwd(), 'public/uploads')
  await mkdir(uploadsRoot, { recursive: true })

  const filename = safeFilename(file.filename)
  const absolutePath = resolve(uploadsRoot, filename)

  if (!absolutePath.startsWith(uploadsRoot)) {
    throw createError({ statusCode: 400, statusMessage: 'Upload path is not allowed.' })
  }

  await writeFile(absolutePath, file.data)

  const asset = {
    id: filename.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase(),
    title: titleFromFilename(filename),
    filename,
    url: `/uploads/${filename}`,
    type: extension.replace('.', '').toUpperCase(),
    usage: 'Media Library',
    description: 'Uploaded from Gribo Studio.',
    size: file.data.length,
    updatedAt: new Date().toISOString()
  }

  return {
    ok: true,
    asset
  }
})
