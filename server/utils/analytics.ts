import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { basename, extname, join, relative, resolve } from 'node:path'
import { createError, getHeader, setHeader } from 'h3'
import { parseMarkdownContent } from './markdownContent'

export type AnalyticsEventType = 'view' | 'read_start' | 'read_progress' | 'read_complete' | 'cta_click'
export type AnalyticsContentType = 'home' | 'blog' | 'project' | 'docs' | 'lab'

export type AnalyticsEvent = {
  eventId: string
  eventType: AnalyticsEventType
  contentType: AnalyticsContentType
  slug: string
  lab: string
  title: string
  timestamp: string
  sessionId: string
  referrer: string
  userAgentHash: string
  route: string
  metadata: Record<string, string | number | boolean>
}

type ContentMeta = {
  contentType: AnalyticsContentType
  slug: string
  route: string
  title: string
  lab: string
}

const workspaceRoot = resolve(process.cwd())
const analyticsRoot = resolve(workspaceRoot, 'server/data/analytics')
const eventsPath = resolve(analyticsRoot, 'events.jsonl')
const allowedEventTypes = new Set(['view', 'read_start', 'read_progress', 'read_complete', 'cta_click'])
const allowedContentTypes = new Set(['home', 'blog', 'project', 'docs', 'lab'])
const rateWindowMs = 10_000
const maxEventsPerWindow = 40
const rateMemory = new Map<string, { count: number, resetAt: number }>()

function clampText(value: unknown, fallback = '', max = 240) {
  return String(value ?? fallback).replace(/\s+/g, ' ').trim().slice(0, max)
}

function normalizePath(value: unknown) {
  const route = String(value || '/').split('#')[0].split('?')[0].trim() || '/'
  return route.startsWith('/') ? route : `/${route}`
}

function inferContentType(route: string): AnalyticsContentType | '' {
  if (route === '/') return 'home'
  if (route === '/blog' || route.startsWith('/blog/')) return 'blog'
  if (route === '/repository' || route.startsWith('/repository/')) return 'project'
  if (route === '/docs' || route.startsWith('/docs/')) return 'docs'
  if (route === '/labs' || route.startsWith('/labs/')) return 'lab'
  return ''
}

function inferSlug(route: string, contentType: AnalyticsContentType) {
  if (contentType === 'home') return 'home'
  const parts = route.split('/').filter(Boolean)
  if (contentType === 'docs') return parts.slice(1).join('/') || 'docs-index'
  return parts[1] || 'index'
}

function safeMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const output: Record<string, string | number | boolean> = {}
  for (const [key, raw] of Object.entries(value).slice(0, 12)) {
    const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48)
    if (!safeKey) continue

    if (typeof raw === 'boolean' || typeof raw === 'number') {
      output[safeKey] = raw
    } else {
      output[safeKey] = clampText(raw, '', 220)
    }
  }

  return output
}

function hashUserAgent(value: string) {
  if (!value) return ''
  return createHash('sha256').update(`gribo-ua:${value}`).digest('hex')
}

async function fileExists(path: string) {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

async function directoryExists(path: string) {
  try {
    return (await stat(path)).isDirectory()
  } catch {
    return false
  }
}

async function walkMarkdown(root: string) {
  const absoluteRoot = resolve(workspaceRoot, root)
  const files: string[] = []

  if (!await directoryExists(absoluteRoot)) return files

  async function walk(current: string) {
    const entries = await readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      const absolute = join(current, entry.name)
      if (entry.isDirectory()) {
        await walk(absolute)
      } else if (entry.isFile() && extname(entry.name) === '.md') {
        files.push(absolute)
      }
    }
  }

  await walk(absoluteRoot)
  return files
}

function publicDocRoute(absolutePath: string) {
  const portable = relative(resolve(workspaceRoot, 'content/docs'), absolutePath).replace(/\\/g, '/')
  return `/docs/${portable.replace(/\.md$/, '').replace(/\/index$/, '')}`
}

async function readContentMeta(): Promise<ContentMeta[]> {
  const items: ContentMeta[] = [
    {
      contentType: 'home',
      slug: 'home',
      route: '/',
      title: 'Gribo Digital',
      lab: ''
    }
  ]

  const blogFiles = await walkMarkdown('content/blog')
  const projectFiles = await walkMarkdown('content/projects')
  const docsFiles = await walkMarkdown('content/docs')
  const labFiles = await walkMarkdown('content/labs')

  for (const absolutePath of blogFiles) {
    const raw = await readFile(absolutePath, 'utf8')
    const { frontmatter } = parseMarkdownContent(raw)
    const slug = String(frontmatter.slug || basename(absolutePath, '.md'))
    items.push({
      contentType: 'blog',
      slug,
      route: `/blog/${slug}`,
      title: String(frontmatter.title || slug),
      lab: String(frontmatter.lab || '')
    })
  }

  for (const absolutePath of projectFiles) {
    const raw = await readFile(absolutePath, 'utf8')
    const { frontmatter } = parseMarkdownContent(raw)
    const slug = String(frontmatter.slug || basename(absolutePath, '.md'))
    items.push({
      contentType: 'project',
      slug,
      route: `/repository/${slug}`,
      title: String(frontmatter.title || slug),
      lab: String(frontmatter.lab || '')
    })
  }

  for (const absolutePath of docsFiles) {
    const raw = await readFile(absolutePath, 'utf8')
    const { frontmatter } = parseMarkdownContent(raw)
    const route = publicDocRoute(absolutePath)
    items.push({
      contentType: 'docs',
      slug: route.replace(/^\/docs\//, ''),
      route,
      title: String(frontmatter.title || route),
      lab: String(frontmatter.lab || '')
    })
  }

  for (const absolutePath of labFiles) {
    const raw = await readFile(absolutePath, 'utf8')
    const { frontmatter } = parseMarkdownContent(raw)
    const slug = String(frontmatter.slug || basename(absolutePath, '.md'))
    items.push({
      contentType: 'lab',
      slug,
      route: `/labs/${slug}`,
      title: String(frontmatter.title || slug),
      lab: slug
    })
  }

  return items
}

async function resolveContentMeta(route: string, contentType: AnalyticsContentType, slug: string) {
  const content = await readContentMeta()
  return content.find((item) => item.route === route)
    || content.find((item) => item.contentType === contentType && item.slug === slug)
}

function checkRateLimit(sessionId: string) {
  const now = Date.now()
  const current = rateMemory.get(sessionId)

  if (!current || current.resetAt < now) {
    rateMemory.set(sessionId, { count: 1, resetAt: now + rateWindowMs })
    return
  }

  current.count += 1
  if (current.count > maxEventsPerWindow) {
    throw createError({ statusCode: 429, statusMessage: 'Too many analytics events.' })
  }
}

export async function recordAnalyticsEvent(event: any, input: any) {
  const route = normalizePath(input?.route)

  if (route.startsWith('/admin') || route.startsWith('/api')) {
    throw createError({ statusCode: 400, statusMessage: 'Admin and API routes are not tracked.' })
  }

  if (JSON.stringify(input || {}).length > 4096) {
    throw createError({ statusCode: 413, statusMessage: 'Analytics event is too large.' })
  }

  const eventType = clampText(input?.eventType) as AnalyticsEventType
  if (!allowedEventTypes.has(eventType)) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported analytics event type.' })
  }

  const inferredType = inferContentType(route)
  const requestedType = clampText(input?.contentType) as AnalyticsContentType
  const contentType = allowedContentTypes.has(requestedType) ? requestedType : inferredType

  if (!contentType) {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported analytics route.' })
  }

  const sessionId = clampText(input?.sessionId, '', 96)
  if (!/^[a-zA-Z0-9_-]{12,96}$/.test(sessionId)) {
    throw createError({ statusCode: 400, statusMessage: 'Anonymous session id is required.' })
  }

  checkRateLimit(sessionId)

  const slug = clampText(input?.slug, inferSlug(route, contentType), 220)
  const meta = await resolveContentMeta(route, contentType, slug)
  const eventRecord: AnalyticsEvent = {
    eventId: randomUUID(),
    eventType,
    contentType,
    slug: meta?.slug || slug,
    lab: meta?.lab || clampText(input?.lab, '', 120),
    title: meta?.title || clampText(input?.title, route, 220),
    timestamp: new Date().toISOString(),
    sessionId,
    referrer: clampText(input?.referrer, '', 500),
    userAgentHash: hashUserAgent(getHeader(event, 'user-agent') || ''),
    route,
    metadata: safeMetadata(input?.metadata)
  }

  await mkdir(analyticsRoot, { recursive: true })
  await writeFile(eventsPath, `${JSON.stringify(eventRecord)}\n`, { flag: 'a' })

  return {
    ok: true,
    eventId: eventRecord.eventId
  }
}

export async function readAnalyticsEvents(limit?: number) {
  if (!await fileExists(eventsPath)) return []

  const raw = await readFile(eventsPath, 'utf8')
  const events = raw
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line) as AnalyticsEvent
      } catch {
        return null
      }
    })
    .filter((event): event is AnalyticsEvent => Boolean(event))
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))

  return limit ? events.slice(0, limit) : events
}

function createEmptyContentSummary(event: AnalyticsEvent) {
  return {
    title: event.title,
    contentType: event.contentType,
    slug: event.slug,
    route: event.route,
    lab: event.lab,
    views: 0,
    readStarts: 0,
    readCompletes: 0,
    ctaClicks: 0,
    maxProgress: 0,
    completionRate: 0,
    lastViewedAt: ''
  }
}

export async function aggregateAnalytics() {
  const events = await readAnalyticsEvents()
  const byContent = new Map<string, ReturnType<typeof createEmptyContentSummary>>()
  const byLab = new Map<string, { lab: string, views: number, reads: number, completions: number }>()
  const byType = new Map<string, { contentType: string, views: number, reads: number, completions: number, ctaClicks: number }>()
  let totalViews = 0
  let totalReads = 0
  let totalCompletions = 0
  let totalCtaClicks = 0

  for (const event of events) {
    const key = `${event.contentType}:${event.route}`
    if (!byContent.has(key)) byContent.set(key, createEmptyContentSummary(event))
    const content = byContent.get(key)!

    content.title = event.title || content.title
    content.lab = event.lab || content.lab
    content.lastViewedAt = content.lastViewedAt && content.lastViewedAt > event.timestamp ? content.lastViewedAt : event.timestamp

    if (!byType.has(event.contentType)) {
      byType.set(event.contentType, { contentType: event.contentType, views: 0, reads: 0, completions: 0, ctaClicks: 0 })
    }

    const labKey = event.lab || 'unassigned'
    if (!byLab.has(labKey)) byLab.set(labKey, { lab: labKey, views: 0, reads: 0, completions: 0 })

    const type = byType.get(event.contentType)!
    const lab = byLab.get(labKey)!

    if (event.eventType === 'view') {
      totalViews += 1
      content.views += 1
      type.views += 1
      lab.views += 1
    }

    if (event.eventType === 'read_start') {
      totalReads += 1
      content.readStarts += 1
      type.reads += 1
      lab.reads += 1
    }

    if (event.eventType === 'read_complete') {
      totalCompletions += 1
      content.readCompletes += 1
      type.completions += 1
      lab.completions += 1
    }

    if (event.eventType === 'cta_click') {
      totalCtaClicks += 1
      content.ctaClicks += 1
      type.ctaClicks += 1
    }

    if (event.eventType === 'read_progress') {
      const progress = Number(event.metadata?.progress || 0)
      if (Number.isFinite(progress)) content.maxProgress = Math.max(content.maxProgress, progress)
    }
  }

  const contentRows = Array.from(byContent.values()).map((item) => ({
    ...item,
    completionRate: item.readStarts ? Math.round((item.readCompletes / item.readStarts) * 100) : 0
  }))

  return {
    overview: {
      totalViews,
      totalReads,
      readCompletions: totalCompletions,
      ctaClicks: totalCtaClicks,
      completionRate: totalReads ? Math.round((totalCompletions / totalReads) * 100) : 0
    },
    content: contentRows.sort((a, b) => b.views - a.views || b.readStarts - a.readStarts).slice(0, 50),
    labs: Array.from(byLab.values()).sort((a, b) => b.views - a.views),
    types: Array.from(byType.values()).sort((a, b) => b.views - a.views),
    recentEvents: events.slice(0, 40)
  }
}

export async function exportAnalytics(event: any) {
  const payload = {
    exportedAt: new Date().toISOString(),
    source: 'gribo-digital',
    privacy: 'Anonymous analytics export. No raw IP addresses are stored.',
    events: await readAnalyticsEvents()
  }

  setHeader(event, 'content-type', 'application/json; charset=utf-8')
  setHeader(event, 'content-disposition', `attachment; filename="gribo-analytics-${new Date().toISOString().slice(0, 10)}.json"`)
  return JSON.stringify(payload, null, 2)
}

export async function clearAnalyticsData(confirmation: string) {
  if (confirmation !== 'CLEAR ANALYTICS') {
    throw createError({ statusCode: 400, statusMessage: 'Confirmation must be CLEAR ANALYTICS.' })
  }

  await mkdir(analyticsRoot, { recursive: true })
  await writeFile(eventsPath, '', 'utf8')

  return {
    ok: true
  }
}
