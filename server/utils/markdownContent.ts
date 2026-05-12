import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

export type MarkdownFrontmatter = Record<string, unknown>

const frontmatterOrder = [
  'title',
  'slug',
  'shortTitle',
  'excerpt',
  'summary',
  'description',
  'date',
  'updatedAt',
  'archivedAt',
  'author',
  'category',
  'type',
  'status',
  'year',
  'project',
  'projectSlug',
  'section',
  'lab',
  'accent',
  'order',
  'featured',
  'tags',
  'relatedTags',
  'stack',
  'coverImage',
  'coverAlt',
  'coverCaption',
  'coverStyle',
  'coverPosition',
  'accentColor',
  'mediaRefs',
  'blocks',
  'roadmap',
  'openQuestions',
  'docsPath',
  'docsFolder',
  'docsPaths',
  'relatedDocs',
  'projectOverviewTitle',
  'projectOverviewBody',
  'projectMemoryIntro',
  'projectMemoryTitle',
  'projectMemoryBody',
  'projectMemory',
  'projectIndexIntro',
  'projectHoldsTitle',
  'projectHoldsBody',
  'projectIndex',
  'workingStackNote',
  'documentationIntro',
  'emptyDocumentationTitle',
  'emptyDocumentationBody',
  'buildLogIntro',
  'buildLogNote',
  'decisionTraceTitle',
  'decisionTraceBody',
  'relatedArticlesNote',
  'overviewHeroStyle',
  'overviewBackgroundMode',
  'overviewAccentColor',
  'overviewSecondaryAccent',
  'overviewPayload',
  'readingTime',
  'seoTitle',
  'seoDescription',
  'ogTitle',
  'ogDescription',
  'ogImage',
  'canonical',
  'noindex'
]

function parseScalar(value: string) {
  const trimmed = value.trim()

  if (trimmed === '') return ''
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (trimmed === 'null') return null
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
    try {
      const parsed = JSON.parse(trimmed)
      return parsed
    } catch {
      try {
        const parsed = JSON.parse(trimmed.replace(/'/g, '"'))
        return parsed
      } catch {
        return trimmed
      }
    }
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed.replace(/'/g, '"'))
      return parsed
    } catch {
      return trimmed
    }
  }

  return trimmed
}

export function parseMarkdownContent(raw: string) {
  const normalized = raw.replace(/^\uFEFF/, '')

  if (!normalized.startsWith('---')) {
    return {
      frontmatter: {} as MarkdownFrontmatter,
      body: normalized
    }
  }

  const closing = normalized.indexOf('\n---', 3)

  if (closing === -1) {
    return {
      frontmatter: {} as MarkdownFrontmatter,
      body: normalized
    }
  }

  const yaml = normalized.slice(3, closing).trim()
  const body = normalized.slice(closing + 4).replace(/^\r?\n/, '')
  const frontmatter: MarkdownFrontmatter = {}
  const lines = yaml.split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/)

    if (!match) continue

    const key = match[1]
    const rawValue = match[2] ?? ''
    const values: string[] = []

    if (rawValue === '') {
      let cursor = index + 1

      while (cursor < lines.length) {
        const listMatch = lines[cursor].match(/^\s*-\s*(.*)$/)
        if (!listMatch) break
        values.push(String(parseScalar(listMatch[1])))
        cursor += 1
      }

      if (values.length) {
        frontmatter[key] = values
        index = cursor - 1
      } else {
        frontmatter[key] = ''
      }

      continue
    }

    frontmatter[key] = parseScalar(rawValue)
  }

  return { frontmatter, body }
}

function needsQuotes(value: string) {
  return (
    value === '' ||
    value.includes(':') ||
    value.includes('#') ||
    value.includes('{') ||
    value.includes('}') ||
    value.includes('[') ||
    value.includes(']') ||
    value.startsWith('@') ||
    value.startsWith('!')
  )
}

function stringifyScalar(value: unknown) {
  if (typeof value === 'boolean' || typeof value === 'number') return String(value)
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'object') return JSON.stringify(value)
  const text = String(value)
  return needsQuotes(text) ? JSON.stringify(text) : text
}

export function stringifyMarkdownContent(frontmatter: MarkdownFrontmatter, body: string) {
  const keys = [
    ...frontmatterOrder.filter((key) => Object.prototype.hasOwnProperty.call(frontmatter, key)),
    ...Object.keys(frontmatter)
      .filter((key) => !frontmatterOrder.includes(key))
      .sort()
  ]

  const yaml = keys.flatMap((key) => {
    const value = frontmatter[key]

    if (value === undefined) return []

    if (Array.isArray(value)) {
      if (!value.length) return [`${key}: []`]
      if (value.some((item) => typeof item === 'object' && item !== null)) {
        return [`${key}: ${JSON.stringify(value)}`]
      }
      return [`${key}:`, ...value.map((item) => `  - ${stringifyScalar(item)}`)]
    }

    return [`${key}: ${stringifyScalar(value)}`]
  })

  return `---\n${yaml.join('\n')}\n---\n\n${body.trim()}\n`
}

export async function readMarkdownFile(absolutePath: string) {
  const raw = await readFile(absolutePath, 'utf8')
  return parseMarkdownContent(raw)
}

export async function writeMarkdownFile(absolutePath: string, frontmatter: MarkdownFrontmatter, body: string) {
  await mkdir(dirname(absolutePath), { recursive: true })
  await writeFile(absolutePath, stringifyMarkdownContent(frontmatter, body), 'utf8')
}

export function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}
