import { readdir, stat } from 'node:fs/promises'
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { createError } from 'h3'

export type AdminContentType = 'blog' | 'projects' | 'docs' | 'labs'

export const adminContentRoots: Record<AdminContentType, string> = {
  blog: 'blog',
  projects: 'projects',
  docs: 'docs',
  labs: 'labs'
}

const contentRoot = resolve(process.cwd(), 'content')

export function assertAdminContentType(value: unknown): AdminContentType {
  if (value === 'project') return 'projects'
  if (value === 'lab') return 'labs'

  if (value === 'blog' || value === 'projects' || value === 'docs' || value === 'labs') {
    return value
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'Unsupported content type'
  })
}

export function slugifyContentTitle(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96) || 'untitled'
}

function assertInside(base: string, target: string) {
  const rel = relative(base, target)

  if (rel.startsWith('..') || rel === '..' || isAbsolute(rel)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsafe content path'
    })
  }
}

function normalizePathSegment(value: string) {
  const normalized = value.replace(/\\/g, '/').replace(/^content\//, '')

  if (!normalized || isAbsolute(normalized) || normalized.includes('\0')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsafe content path'
    })
  }

  if (normalized.split('/').some((part) => part === '..' || part === '')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsafe content path'
    })
  }

  return normalized
}

export function resolveAdminContentFile(contentTypeInput: unknown, filePathInput: unknown) {
  const contentType = assertAdminContentType(contentTypeInput)
  const rootName = adminContentRoots[contentType]
  const typeRoot = resolve(contentRoot, rootName)
  const incoming = normalizePathSegment(String(filePathInput ?? ''))
  const withoutType = incoming.startsWith(`${rootName}/`) ? incoming.slice(rootName.length + 1) : incoming
  const relativeFile = withoutType.endsWith('.md') ? withoutType : `${withoutType}.md`

  if (extname(relativeFile) !== '.md') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Only markdown content can be edited in Stage 4'
    })
  }

  const absolutePath = resolve(typeRoot, relativeFile)
  assertInside(typeRoot, absolutePath)

  return {
    contentType,
    absolutePath,
    typeRoot,
    filePath: `${rootName}/${relative(typeRoot, absolutePath).split(sep).join('/')}`
  }
}

export function resolveAdminCreatePath(contentTypeInput: unknown, slugInput: unknown, folderInput?: unknown) {
  const contentType = assertAdminContentType(contentTypeInput)
  const rootName = adminContentRoots[contentType]
  const slug = slugifyContentTitle(String(slugInput ?? 'untitled'))
  const folder = contentType === 'docs' && folderInput ? normalizePathSegment(String(folderInput)).replace(/\.md$/, '') : ''
  const relativeFile = contentType === 'docs' && folder ? `${folder}/${slug}.md` : `${slug}.md`

  return resolveAdminContentFile(contentType, relativeFile)
}

export async function listAdminMarkdownFiles(contentTypeInput: unknown) {
  const contentType = assertAdminContentType(contentTypeInput)
  const rootName = adminContentRoots[contentType]
  const typeRoot = resolve(contentRoot, rootName)
  const files: string[] = []

  async function walk(current: string) {
    const entries = await readdir(current, { withFileTypes: true })

    for (const entry of entries) {
      const absolute = join(current, entry.name)

      if (entry.isDirectory()) {
        await walk(absolute)
        continue
      }

      if (entry.isFile() && extname(entry.name) === '.md') {
        files.push(`${rootName}/${relative(typeRoot, absolute).split(sep).join('/')}`)
      }
    }
  }

  try {
    const rootStat = await stat(typeRoot)

    if (!rootStat.isDirectory()) {
      return []
    }

    await walk(typeRoot)
    return files.sort()
  } catch {
    return []
  }
}

export function getContentPublicPath(contentType: AdminContentType, frontmatter: Record<string, unknown>, filePath: string) {
  const slugFromFile = filePath
    .replace(new RegExp(`^${adminContentRoots[contentType]}/`), '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
  const slug = String(frontmatter.slug || slugFromFile.split('/').pop() || slugFromFile)

  if (contentType === 'blog') return `/blog/${slug}`
  if (contentType === 'projects') return `/repository/${slug}`
  if (contentType === 'labs') return `/labs/${slug}`
  return `/docs/${slugFromFile}`
}

export function getContentDirectory(filePath: string) {
  return dirname(filePath).replace(/\\/g, '/')
}
