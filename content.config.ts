import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        type: z.string().optional(),
        status: z.string().optional(),
        lab: z.string().optional(),
        readingTime: z.string().optional(),
        tags: z.array(z.string()).default([]),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        ogTitle: z.string().optional(),
        ogDescription: z.string().optional(),
        ogImage: z.string().optional(),
        canonical: z.string().optional(),
        noindex: z.boolean().default(false)
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        summary: z.string().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        updatedAt: z.string().optional(),
        status: z.string().optional(),
        type: z.string().optional(),
        year: z.number().optional(),
        lab: z.string().optional(),
        docsPath: z.string().optional(),
        docsFolder: z.string().optional(),
        docsPaths: z.array(z.string()).default([]),
        relatedDocs: z.array(z.string()).default([]),
        relatedPosts: z.array(z.string()).default([]),
        relatedArticles: z.array(z.string()).default([]),
        relatedBlogSlugs: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        stack: z.array(z.string()).default([]),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        ogTitle: z.string().optional(),
        ogDescription: z.string().optional(),
        ogImage: z.string().optional(),
        canonical: z.string().optional(),
        noindex: z.boolean().default(false)
      })
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        project: z.string().optional(),
        projectSlug: z.string().optional(),
        section: z.string().optional(),
        date: z.string().optional(),
        status: z.string().optional(),
        docsFolder: z.string().optional(),
        lab: z.string().optional(),
        order: z.number().default(0),
        updatedAt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        ogTitle: z.string().optional(),
        ogDescription: z.string().optional(),
        ogImage: z.string().optional(),
        canonical: z.string().optional(),
        noindex: z.boolean().default(false)
      })
    }),
    labs: defineCollection({
      type: 'page',
      source: 'labs/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        shortTitle: z.string(),
        description: z.string(),
        status: z.string(),
        accent: z.string(),
        order: z.number(),
        featured: z.boolean().default(false),
        relatedTags: z.array(z.string()).default([]),
        roadmap: z.array(z.string()).default([]),
        openQuestions: z.array(z.string()).default([]),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        ogTitle: z.string().optional(),
        ogDescription: z.string().optional(),
        ogImage: z.string().optional(),
        canonical: z.string().optional(),
        noindex: z.boolean().default(false)
      })
    }),
    home: defineCollection({
      type: 'data',
      source: 'home/*.json'
    }),
    settings: defineCollection({
      type: 'data',
      source: 'settings/*.json'
    })
  }
})
