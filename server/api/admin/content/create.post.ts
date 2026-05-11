import { access } from 'node:fs/promises'
import type { AdminContentType } from '../../../utils/safeContentPaths'

function createBaseFrontmatter(contentType: AdminContentType, title: string, slug: string, body: any) {
  const today = todayIsoDate()
  const base = {
    title,
    slug,
    date: today,
    updatedAt: today,
    status: String(body.status || 'draft'),
    lab: String(body.lab || 'ai'),
    tags: splitInputList(body.tags),
    seoTitle: `${title} | Gribo Digital`,
    seoDescription: 'Draft editorial note from the Gribo Digital archive.',
    ogImage: '/og/gribo-digital.png',
    canonical: '',
    noindex: true,
    coverImage: '',
    coverAlt: '',
    coverCaption: '',
    coverStyle: 'editorial-gradient',
    coverPosition: 'center',
    accentColor: 'coral',
    mediaRefs: [],
    blocks: []
  }

  if (contentType === 'blog') {
    return {
      ...base,
      excerpt: 'A draft essay for the Gribo magazine archive.',
      description: 'A draft essay for the Gribo magazine archive.',
      author: 'Gribo Digital',
      category: 'Draft',
      type: 'blog',
      readingTime: '3 min read'
    }
  }

  if (contentType === 'projects') {
    const docsFolder = body.docsFolder ? slugifyContentTitle(String(body.docsFolder)) : ''
    const docsPath = String(body.docsPath || (docsFolder ? `/docs/${docsFolder}` : ''))
    const docsPaths = splitInputList(body.docsPaths)
    const relatedDocs = splitInputList(body.relatedDocs)

    return {
      ...base,
      summary: String(body.summary || 'A draft project dossier for an unfinished system.'),
      description: String(body.description || body.summary || 'A draft project dossier for an unfinished system.'),
      type: 'project',
      year: Number(body.year || new Date().getFullYear()),
      stack: Array.isArray(body.stack) ? body.stack : splitInputList(body.stack),
      docsFolder,
      docsPath,
      docsPaths,
      relatedDocs
    }
  }

  if (contentType === 'docs') {
    const docsFolder = slugifyContentTitle(String(body.docsFolder || body.folder || 'project-docs'))
    const projectSlug = slugifyContentTitle(String(body.projectSlug || body.relatedProject || docsFolder))
    const project = String(body.project || body.relatedProject || projectSlug)

    return {
      ...base,
      description: 'A draft technical page connected to a project dossier.',
      project,
      projectSlug,
      docsFolder,
      section: 'Draft',
      order: 99
    }
  }

  return {
    ...base,
    shortTitle: title,
    description: 'A draft research line for grouping essays, projects, docs, and open questions.',
    accent: 'coral',
    order: 99,
    featured: false,
    relatedTags: [],
    roadmap: [],
    openQuestions: []
  }
}

function splitInputList(value: unknown) {
  if (!value) return []
  if (Array.isArray(value)) return value
  return String(value).split(',').map((item) => item.trim()).filter(Boolean)
}

function createSeedBody(contentType: AdminContentType, title: string) {
  if (contentType === 'docs') {
    return `# ${title}\n\nThis draft page should explain the technical context first: setup, decisions, constraints, and the part of the system it helps remember.\n`
  }

  if (contentType === 'projects') {
    return `# ${title}\n\nBefore this becomes a finished system, this dossier keeps track of what is being built, what is still uncertain, and which decisions leave a trace.\n`
  }

  if (contentType === 'labs') {
    return `# ${title}\n\nA research line for gathering the essays, prototypes, documentation, and questions that continue to move through Gribo.\n`
  }

  return `# ${title}\n\nA draft note for the Gribo archive. Shape the argument, keep the friction visible, and let the system explain what it is becoming.\n`
}

function isStaleBlogSlug(value: string) {
  const slug = String(value || '').trim()
  return !slug
    || /^untitled-blog-entry-\d+$/.test(slug)
    || /^untitled-draft-\d+$/.test(slug)
    || /^draft-\d+$/.test(slug)
}

function hasRealBlogTitle(value: string) {
  const slug = slugifyContentTitle(String(value || ''))
  return Boolean(slug)
    && slug !== 'untitled-blog-entry'
    && slug !== 'untitled-draft'
    && slug !== 'untitled'
    && slug !== 'draft'
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const contentType = assertAdminContentType(body.contentType)
  const title = String(body.title || 'Untitled draft')
  const providedSlug = slugifyContentTitle(String(body.slug || title))
  const slug = contentType === 'blog' && isStaleBlogSlug(providedSlug) && hasRealBlogTitle(title)
    ? slugifyContentTitle(title)
    : providedSlug
  const resolved = resolveAdminCreatePath(contentType, slug, body.docsFolder || body.folder)

  try {
    await access(resolved.absolutePath)
    throw createError({
      statusCode: 409,
      statusMessage: 'A content file with this slug already exists'
    })
  } catch (error: any) {
    if (error?.statusCode === 409) throw error
  }

  const frontmatter = createBaseFrontmatter(contentType, title, slug, body)
  const markdownBody = createSeedBody(contentType, title)

  await writeMarkdownFile(resolved.absolutePath, frontmatter, markdownBody)

  return {
    ok: true,
    item: {
      contentType,
      filePath: resolved.filePath,
      publicPath: getContentPublicPath(contentType, frontmatter, resolved.filePath),
      frontmatter,
      body: markdownBody
    }
  }
})
