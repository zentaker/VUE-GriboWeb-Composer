import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { createError } from 'h3'

const workspaceRoot = resolve(process.cwd())
const homeLayoutPath = resolve(workspaceRoot, 'content/home/layout.json')
const snapshotsRoot = resolve(workspaceRoot, 'server/backups/snapshots')

export type HomeLayoutMode = 'manual' | 'latest' | 'mixed'

export type HomeLayout = {
  hero: {
    label: string
    headline: string
    description: string
    primaryCta: {
      label: string
      to: string
    }
    secondaryCta: {
      label: string
      to: string
    }
  }
  featuredProject: {
    mode: 'manual' | 'latest'
    slug: string
  }
  buildLog: {
    mode: 'manual' | 'latest'
    limit: number
    manualItems: Array<{
      date: string
      title: string
      meta: string
    }>
  }
  feed: {
    mode: HomeLayoutMode
    limit: number
    contentTypes: string[]
    manualItems: Array<{
      type: 'blog' | 'projects' | 'labs'
      slug: string
    }>
  }
  identity: {
    enabled: boolean
    headline: string
    description: string
    ctaLabel: string
    ctaTarget: string
  }
  sections: unknown[]
}

const defaultHomeLayout: HomeLayout = {
  hero: {
    label: 'Digital systems magazine-lab',
    headline: 'Ideas that become systems.',
    description: 'Gribo Digital documents systems, prototypes, research notes and cultural infrastructure through a living editorial archive.',
    primaryCta: {
      label: 'Explore projects',
      to: '/repository'
    },
    secondaryCta: {
      label: 'Explore labs',
      to: '/labs'
    }
  },
  featuredProject: {
    mode: 'manual',
    slug: 'tennis-image-analysis'
  },
  buildLog: {
    mode: 'manual',
    limit: 3,
    manualItems: []
  },
  feed: {
    mode: 'mixed',
    limit: 4,
    contentTypes: ['blog', 'projects'],
    manualItems: []
  },
  identity: {
    enabled: true,
    headline: 'Build, reflect, archive, evolve.',
    description: 'Gribo works like external memory: it records what is being built, what breaks, what changes and what eventually becomes a system.',
    ctaLabel: 'Explore labs',
    ctaTarget: '/labs'
  },
  sections: []
}

function safeString(value: unknown, fallback: string) {
  const text = typeof value === 'string' ? value.trim() : ''
  return text || fallback
}

function safeMode(value: unknown, fallback: HomeLayoutMode): HomeLayoutMode {
  return value === 'manual' || value === 'latest' || value === 'mixed' ? value : fallback
}

function positiveLimit(value: unknown, fallback: number) {
  const limit = Number(value)
  return Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 12) : fallback
}

function parseManualFeedItems(value: unknown): HomeLayout['feed']['manualItems'] {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => ({
      type: item?.type === 'blog' || item?.type === 'projects' || item?.type === 'labs' ? item.type : 'blog',
      slug: safeString(item?.slug, '')
    }))
    .filter((item) => item.slug)
}

function parseBuildItems(value: unknown): HomeLayout['buildLog']['manualItems'] {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => ({
      date: safeString(item?.date, 'Now'),
      title: safeString(item?.title, 'Untitled build note'),
      meta: safeString(item?.meta, 'A short note from the Gribo build log.')
    }))
    .filter((item) => item.title)
}

export function normalizeHomeLayout(input: any): HomeLayout {
  const hero = input?.hero ?? {}
  const spotlight = input?.spotlight ?? {}
  const featuredProject = input?.featuredProject ?? {}
  const buildLog = input?.buildLog ?? {}
  const feed = input?.feed ?? {}
  const identity = input?.identity ?? {}

  return {
    hero: {
      label: safeString(hero.label ?? hero.eyebrow, defaultHomeLayout.hero.label),
      headline: safeString(hero.headline ?? hero.title, defaultHomeLayout.hero.headline),
      description: safeString(hero.description, defaultHomeLayout.hero.description),
      primaryCta: {
        label: safeString(hero.primaryCta?.label, defaultHomeLayout.hero.primaryCta.label),
        to: safeString(hero.primaryCta?.to, defaultHomeLayout.hero.primaryCta.to)
      },
      secondaryCta: {
        label: safeString(hero.secondaryCta?.label, defaultHomeLayout.hero.secondaryCta.label),
        to: safeString(hero.secondaryCta?.to, defaultHomeLayout.hero.secondaryCta.to)
      }
    },
    featuredProject: {
      mode: featuredProject.mode === 'latest' ? 'latest' : 'manual',
      slug: safeString(featuredProject.slug ?? spotlight.slug, defaultHomeLayout.featuredProject.slug)
    },
    buildLog: {
      mode: buildLog.mode === 'latest' ? 'latest' : 'manual',
      limit: positiveLimit(buildLog.limit, defaultHomeLayout.buildLog.limit),
      manualItems: parseBuildItems(buildLog.manualItems)
    },
    feed: {
      mode: safeMode(feed.mode, defaultHomeLayout.feed.mode),
      limit: positiveLimit(feed.limit, defaultHomeLayout.feed.limit),
      contentTypes: Array.isArray(feed.contentTypes)
        ? feed.contentTypes.filter((type: unknown) => ['blog', 'projects', 'labs'].includes(String(type))).map(String)
        : defaultHomeLayout.feed.contentTypes,
      manualItems: parseManualFeedItems(feed.manualItems)
    },
    identity: {
      enabled: identity.enabled !== false,
      headline: safeString(identity.headline, defaultHomeLayout.identity.headline),
      description: safeString(identity.description, defaultHomeLayout.identity.description),
      ctaLabel: safeString(identity.ctaLabel, defaultHomeLayout.identity.ctaLabel),
      ctaTarget: safeString(identity.ctaTarget, defaultHomeLayout.identity.ctaTarget)
    },
    sections: Array.isArray(input?.sections) ? input.sections : []
  }
}

export function validateHomeLayout(layout: HomeLayout) {
  if (!layout.hero.headline.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Hero headline is required.' })
  }

  if (layout.featuredProject.mode === 'manual' && !layout.featuredProject.slug.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Manual featured project requires a project slug.' })
  }

  if (layout.buildLog.limit <= 0 || layout.feed.limit <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Limits must be positive numbers.' })
  }

  if (layout.feed.contentTypes.some((type) => !['blog', 'projects', 'labs'].includes(type))) {
    throw createError({ statusCode: 400, statusMessage: 'Feed contains an invalid content type.' })
  }
}

async function fileExists(path: string) {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

function timestampSlug(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z').replace('T', '-')
}

async function createHomeLayoutSnapshot() {
  if (!await fileExists(homeLayoutPath)) return null

  const content = await readFile(homeLayoutPath, 'utf8')
  await mkdir(snapshotsRoot, { recursive: true })

  const snapshot = {
    manifest: {
      schemaVersion: '1.0.0',
      packageType: 'full-site',
      exportedAt: new Date().toISOString(),
      source: 'gribo-digital',
      title: 'Home layout safety snapshot',
      slug: `home-layout-snapshot-${timestampSlug()}`,
      contentFiles: ['content/home/layout.json'],
      uploadFiles: [],
      notes: 'Automatic safety snapshot before saving Home Composer layout.'
    },
    files: [
      {
        path: 'content/home/layout.json',
        encoding: 'utf8',
        content
      }
    ]
  }
  const filename = `${snapshot.manifest.slug}.gribo.json`
  const absolutePath = resolve(snapshotsRoot, filename)

  await writeFile(absolutePath, JSON.stringify(snapshot, null, 2), 'utf8')

  return {
    filename,
    path: relative(workspaceRoot, absolutePath).replace(/\\/g, '/'),
    createdAt: snapshot.manifest.exportedAt
  }
}

export async function readHomeLayout() {
  try {
    const raw = await readFile(homeLayoutPath, 'utf8')
    return normalizeHomeLayout(JSON.parse(raw))
  } catch {
    return defaultHomeLayout
  }
}

export async function writeHomeLayout(input: unknown) {
  const layout = normalizeHomeLayout(input)
  validateHomeLayout(layout)

  const snapshot = await createHomeLayoutSnapshot()
  await mkdir(dirname(homeLayoutPath), { recursive: true })
  await writeFile(homeLayoutPath, JSON.stringify(layout, null, 2), 'utf8')

  return {
    layout,
    snapshot
  }
}
