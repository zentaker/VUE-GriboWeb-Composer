import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { createHash } from 'node:crypto'
import { createError, setHeader } from 'h3'
import { parseMarkdownContent, stringifyMarkdownContent } from './markdownContent'

export type GriboPackageType = 'full-site' | 'project' | 'blog' | 'docs' | 'lab'
export type GriboFileEncoding = 'utf8' | 'base64'
export type GriboImportMode = 'copy' | 'replace'

export type GriboPortableFile = {
  path: string
  encoding: GriboFileEncoding
  content: string
}

export type GriboPortableManifest = {
  schemaVersion: string
  packageType: GriboPackageType
  exportedAt: string
  source: 'gribo-digital'
  title: string
  slug: string
  contentFiles: string[]
  uploadFiles: string[]
  checksum?: string
  notes?: string
}

export type GriboPortablePackage = {
  manifest: GriboPortableManifest
  files: GriboPortableFile[]
}

const workspaceRoot = resolve(process.cwd())
const snapshotsRoot = resolve(workspaceRoot, 'server/backups/snapshots')
const allowedContentRoots = [
  'content/blog/',
  'content/projects/',
  'content/docs/',
  'content/labs/',
  'content/home/',
  'content/settings/'
]
const allowedRoots = [...allowedContentRoots, 'public/uploads/']
const textExtensions = new Set(['.md', '.json', '.txt', '.csv', '.svg'])

function toPortablePath(value: string) {
  return value.replace(/\\/g, '/').replace(/^\/+/, '')
}

function timestampSlug(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z').replace('T', '-')
}

function normalizeMaybePublicDocPath(value: string) {
  const clean = toPortablePath(value.trim())
  if (!clean) return ''
  if (clean.startsWith('content/docs/')) return clean
  if (clean.startsWith('docs/')) return `content/${clean}`
  if (clean.startsWith('/docs/')) return `content/${clean.slice(1)}`
  return clean
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)))
}

function slugWithCopySuffix(slug: string, suffix: string) {
  return slug.endsWith(suffix) ? slug : `${slug}${suffix}`
}

export function validatePortablePath(pathInput: unknown) {
  const path = toPortablePath(String(pathInput || ''))

  if (!path || path.includes('\0') || isAbsolute(path) || path.split('/').some((part) => part === '..' || part === '')) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${path || '(empty)'}` })
  }

  if (!allowedRoots.some((root) => path.startsWith(root))) {
    throw createError({ statusCode: 400, statusMessage: `Portable path is outside approved areas: ${path}` })
  }

  if (path.startsWith('content/') && !['.md', '.json'].includes(extname(path))) {
    throw createError({ statusCode: 400, statusMessage: `Unsupported content file type: ${path}` })
  }

  const absolutePath = resolve(workspaceRoot, path)
  const relativePath = relative(workspaceRoot, absolutePath)

  if (relativePath.startsWith('..') || relativePath === '..' || isAbsolute(relativePath)) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${path}` })
  }

  return {
    path,
    absolutePath
  }
}

export function validatePackageManifest(manifest: any): GriboPortableManifest {
  if (!manifest || typeof manifest !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Package manifest is required.' })
  }

  if (manifest.schemaVersion !== '1.0.0') {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported Gribo package schema version.' })
  }

  if (!['full-site', 'project', 'blog', 'docs', 'lab'].includes(manifest.packageType)) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported Gribo package type.' })
  }

  const contentFiles = Array.isArray(manifest.contentFiles) ? manifest.contentFiles.map(String) : []
  const uploadFiles = Array.isArray(manifest.uploadFiles) ? manifest.uploadFiles.map(String) : []

  for (const file of [...contentFiles, ...uploadFiles]) {
    validatePortablePath(file)
  }

  return {
    schemaVersion: '1.0.0',
    packageType: manifest.packageType,
    exportedAt: String(manifest.exportedAt || new Date().toISOString()),
    source: 'gribo-digital',
    title: String(manifest.title || 'Gribo package'),
    slug: String(manifest.slug || 'gribo-package'),
    contentFiles,
    uploadFiles,
    checksum: manifest.checksum ? String(manifest.checksum) : undefined,
    notes: manifest.notes ? String(manifest.notes) : undefined
  }
}

export function validatePortablePackage(input: any): GriboPortablePackage {
  const manifest = validatePackageManifest(input?.manifest)
  const files = Array.isArray(input?.files) ? input.files : []
  const manifestPaths = new Set([...manifest.contentFiles, ...manifest.uploadFiles])

  const normalizedFiles = files.map((file: any) => {
    const { path } = validatePortablePath(file?.path)
    const encoding = file?.encoding === 'base64' ? 'base64' : 'utf8'

    if (!manifestPaths.has(path)) {
      throw createError({ statusCode: 400, statusMessage: `Package file is not declared in manifest: ${path}` })
    }

    return {
      path,
      encoding,
      content: String(file?.content ?? '')
    } satisfies GriboPortableFile
  })

  if (!normalizedFiles.length) {
    throw createError({ statusCode: 400, statusMessage: 'Package contains no files.' })
  }

  return {
    manifest,
    files: normalizedFiles
  }
}

async function fileExists(absolutePath: string) {
  try {
    return (await stat(absolutePath)).isFile()
  } catch {
    return false
  }
}

async function directoryExists(absolutePath: string) {
  try {
    return (await stat(absolutePath)).isDirectory()
  } catch {
    return false
  }
}

async function walkFiles(rootPortablePath: string) {
  const rootPath = toPortablePath(rootPortablePath).replace(/\/?$/, '/')

  if (!allowedRoots.some((root) => rootPath.startsWith(root))) {
    throw createError({ statusCode: 400, statusMessage: `Portable path is outside approved areas: ${rootPath}` })
  }

  if (rootPath.includes('\0') || isAbsolute(rootPath) || rootPath.split('/').some((part) => part === '..')) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${rootPath}` })
  }

  const root = resolve(workspaceRoot, rootPath)
  const relativeRoot = relative(workspaceRoot, root)

  if (relativeRoot.startsWith('..') || relativeRoot === '..' || isAbsolute(relativeRoot)) {
    throw createError({ statusCode: 400, statusMessage: `Unsafe portable path: ${rootPath}` })
  }
  const files: string[] = []

  if (!await directoryExists(root)) return files

  async function walk(current: string) {
    const entries = await readdir(current, { withFileTypes: true })

    for (const entry of entries) {
      const absolute = join(current, entry.name)

      if (entry.isDirectory()) {
        await walk(absolute)
        continue
      }

      if (entry.isFile()) {
        files.push(toPortablePath(relative(workspaceRoot, absolute)))
      }
    }
  }

  await walk(root)
  return files.sort()
}

async function readPortableFile(path: string): Promise<GriboPortableFile | null> {
  const { absolutePath } = validatePortablePath(path)

  if (!await fileExists(absolutePath)) return null

  const extension = extname(path).toLowerCase()
  const encoding: GriboFileEncoding = textExtensions.has(extension) ? 'utf8' : 'base64'
  const content = await readFile(absolutePath, encoding === 'utf8' ? 'utf8' : 'base64')

  return {
    path,
    encoding,
    content
  }
}

async function readPackageFiles(paths: string[]) {
  const files: GriboPortableFile[] = []

  for (const path of unique(paths)) {
    const file = await readPortableFile(path)
    if (file) files.push(file)
  }

  return files.sort((a, b) => a.path.localeCompare(b.path))
}

function checksumPackage(files: GriboPortableFile[]) {
  const hash = createHash('sha256')

  for (const file of files) {
    hash.update(file.path)
    hash.update(file.encoding)
    hash.update(file.content)
  }

  return hash.digest('hex')
}

async function findMarkdownBySlug(root: 'blog' | 'projects' | 'labs', slug: string) {
  const rootPath = `content/${root}/`
  const files = (await walkFiles(rootPath)).filter((path) => path.endsWith('.md'))

  for (const path of files) {
    const { absolutePath } = validatePortablePath(path)
    const raw = await readFile(absolutePath, 'utf8')
    const { frontmatter } = parseMarkdownContent(raw)
    const fileSlug = basename(path, '.md')

    if (String(frontmatter.slug || fileSlug) === slug || fileSlug === slug) {
      return {
        path,
        frontmatter
      }
    }
  }

  return null
}

async function resolveDocPath(input: string) {
  const normalized = normalizeMaybePublicDocPath(input).replace(/\.md$/, '')
  const candidates = normalized.endsWith('/index')
    ? [`${normalized}.md`]
    : [`${normalized}.md`, `${normalized}/index.md`]

  for (const candidate of candidates) {
    const { absolutePath, path } = validatePortablePath(candidate)
    if (await fileExists(absolutePath)) return path
  }

  return ''
}

async function collectDocsFromProject(frontmatter: Record<string, unknown>) {
  const direct = [
    ...(Array.isArray(frontmatter.relatedDocs) ? frontmatter.relatedDocs.map(String) : []),
    ...(Array.isArray(frontmatter.docsPaths) ? frontmatter.docsPaths.map(String) : []),
    frontmatter.docsPath ? String(frontmatter.docsPath) : ''
  ]
  const docs: string[] = []

  for (const item of direct) {
    const resolved = await resolveDocPath(item)
    if (resolved) docs.push(resolved)
  }

  if (docs.length) return unique(docs)

  const docsFolder = String(frontmatter.docsFolder || '').trim()
  if (docsFolder) {
    return (await walkFiles(`content/docs/${docsFolder}/`)).filter((path) => path.endsWith('.md'))
  }

  return []
}

export async function collectFullBackupFiles() {
  const contentFiles = [
    ...(await walkFiles('content/blog/')),
    ...(await walkFiles('content/projects/')),
    ...(await walkFiles('content/docs/')),
    ...(await walkFiles('content/labs/')),
    ...(await walkFiles('content/home/')),
    ...(await walkFiles('content/settings/'))
  ].filter((path) => ['.md', '.json'].includes(extname(path)))
  const uploadFiles = await walkFiles('public/uploads/')

  return {
    contentFiles: unique(contentFiles),
    uploadFiles: unique(uploadFiles)
  }
}

export async function collectProjectPackageFiles(slug: string) {
  const project = await findMarkdownBySlug('projects', slug)
  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found.' })
  }

  const docs = await collectDocsFromProject(project.frontmatter)

  return {
    source: project,
    contentFiles: unique([project.path, ...docs]),
    uploadFiles: [] as string[]
  }
}

export async function collectBlogPackageFiles(slug: string) {
  const blog = await findMarkdownBySlug('blog', slug)
  if (!blog) {
    throw createError({ statusCode: 404, statusMessage: 'Blog entry not found.' })
  }

  return {
    source: blog,
    contentFiles: [blog.path],
    uploadFiles: [] as string[]
  }
}

export async function createPortablePackage(input: {
  packageType: GriboPackageType
  title: string
  slug: string
  contentFiles: string[]
  uploadFiles?: string[]
  notes?: string
}) {
  const files = await readPackageFiles([...input.contentFiles, ...(input.uploadFiles || [])])
  const contentFiles = files.filter((file) => file.path.startsWith('content/')).map((file) => file.path)
  const uploadFiles = files.filter((file) => file.path.startsWith('public/uploads/')).map((file) => file.path)
  const manifest: GriboPortableManifest = {
    schemaVersion: '1.0.0',
    packageType: input.packageType,
    exportedAt: new Date().toISOString(),
    source: 'gribo-digital',
    title: input.title,
    slug: input.slug,
    contentFiles,
    uploadFiles,
    notes: input.notes,
    checksum: checksumPackage(files)
  }

  return {
    manifest,
    files
  } satisfies GriboPortablePackage
}

export function createDownloadResponse(event: any, pkg: GriboPortablePackage, filename: string) {
  setHeader(event, 'content-type', 'application/vnd.gribo.package+json; charset=utf-8')
  setHeader(event, 'content-disposition', `attachment; filename="${filename}"`)
  return JSON.stringify(pkg, null, 2)
}

export async function detectImportConflicts(pkg: GriboPortablePackage) {
  const conflicts: string[] = []
  const creates: string[] = []

  for (const file of pkg.files) {
    const { absolutePath, path } = validatePortablePath(file.path)

    if (await fileExists(absolutePath)) conflicts.push(path)
    else creates.push(path)
  }

  return {
    conflicts,
    creates
  }
}

async function createSnapshotFromPaths(paths: string[], notes: string) {
  const existingFiles = []

  for (const path of unique(paths)) {
    const file = await readPortableFile(path)
    if (file) existingFiles.push(file)
  }

  await mkdir(snapshotsRoot, { recursive: true })

  const snapshot = {
    manifest: {
      schemaVersion: '1.0.0',
      packageType: 'full-site' as const,
      exportedAt: new Date().toISOString(),
      source: 'gribo-digital' as const,
      title: 'Safety snapshot',
      slug: `safety-snapshot-${timestampSlug()}`,
      contentFiles: existingFiles.filter((file) => file.path.startsWith('content/')).map((file) => file.path),
      uploadFiles: existingFiles.filter((file) => file.path.startsWith('public/uploads/')).map((file) => file.path),
      notes,
      checksum: checksumPackage(existingFiles)
    },
    files: existingFiles
  } satisfies GriboPortablePackage
  const filename = `${snapshot.manifest.slug}.gribo.json`
  const absolutePath = resolve(snapshotsRoot, filename)

  await writeFile(absolutePath, JSON.stringify(snapshot, null, 2), 'utf8')

  return {
    filename,
    path: toPortablePath(relative(workspaceRoot, absolutePath)),
    fileCount: existingFiles.length,
    createdAt: snapshot.manifest.exportedAt
  }
}

export async function createSafetySnapshot(pkg: GriboPortablePackage, mode: GriboImportMode) {
  if (pkg.manifest.packageType === 'full-site' && mode === 'replace') {
    const all = await collectFullBackupFiles()
    return createSnapshotFromPaths([...all.contentFiles, ...all.uploadFiles], 'Automatic full-site safety snapshot before restore.')
  }

  return createSnapshotFromPaths(pkg.files.map((file) => file.path), `Automatic safety snapshot before ${mode} import of ${pkg.manifest.packageType}.`)
}

async function nextAvailableCopyPath(path: string) {
  const extension = extname(path)
  const withoutExtension = path.slice(0, -extension.length)
  const copyBase = `${withoutExtension}-copy`
  let candidate = `${copyBase}${extension}`
  let counter = 2

  while (await fileExists(validatePortablePath(candidate).absolutePath)) {
    candidate = `${copyBase}-${counter}${extension}`
    counter += 1
  }

  return candidate
}

function rewriteMarkdownSlug(content: string, path: string) {
  if (!path.endsWith('.md')) return content

  const parsed = parseMarkdownContent(content)
  const fileSlug = basename(path, '.md')

  if (!parsed.frontmatter.slug || path.startsWith('content/blog/') || path.startsWith('content/projects/') || path.startsWith('content/labs/')) {
    parsed.frontmatter.slug = slugWithCopySuffix(fileSlug, '')
  }

  return stringifyMarkdownContent(parsed.frontmatter, parsed.body)
}

async function writePortableFile(file: GriboPortableFile, targetPath: string) {
  const { absolutePath } = validatePortablePath(targetPath)
  const content = file.encoding === 'base64' ? Buffer.from(file.content, 'base64') : rewriteMarkdownSlug(file.content, targetPath)

  await mkdir(dirname(absolutePath), { recursive: true })
  await writeFile(absolutePath, content)
}

export async function applyImportAsCopy(pkg: GriboPortablePackage) {
  const written: string[] = []

  for (const file of pkg.files) {
    const { absolutePath } = validatePortablePath(file.path)
    const targetPath = await fileExists(absolutePath) ? await nextAvailableCopyPath(file.path) : file.path
    await writePortableFile(file, targetPath)
    written.push(targetPath)
  }

  return written
}

export async function applyImportReplace(pkg: GriboPortablePackage) {
  const written: string[] = []

  for (const file of pkg.files) {
    await writePortableFile(file, file.path)
    written.push(file.path)
  }

  return written
}

export async function listSafetySnapshots() {
  if (!await directoryExists(snapshotsRoot)) return []

  const entries = await readdir(snapshotsRoot, { withFileTypes: true })
  const snapshots = []

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.gribo.json')) continue
    const absolutePath = join(snapshotsRoot, entry.name)
    const info = await stat(absolutePath)

    snapshots.push({
      filename: entry.name,
      path: toPortablePath(relative(workspaceRoot, absolutePath)),
      createdAt: info.mtime.toISOString(),
      size: info.size
    })
  }

  return snapshots.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
