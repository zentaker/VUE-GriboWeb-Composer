import type { PageCollectionItemBase, DataCollectionItemBase } from '@nuxt/content'

declare module '@nuxt/content' {
   interface BlogCollectionItem extends PageCollectionItemBase {
    title: string
    slug: string
    excerpt?: string
    description?: string
    date?: string
    updatedAt?: string
    archivedAt?: string
    author?: string
    category?: string
    type?: string
    status?: string
    lab?: string
    readingTime?: string
    tags: string[]
    coverImage?: string
    coverAlt?: string
    coverCaption?: string
    coverStyle?: string
    coverPosition?: string
    accentColor?: string
    mediaRefs: string[]
    blocks: unknown[]
    seoTitle?: string
    seoDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    canonical?: string
    noindex: boolean
  }
  
   interface ProjectsCollectionItem extends PageCollectionItemBase {
    title: string
    slug: string
    summary?: string
    description?: string
    date?: string
    updatedAt?: string
    status?: string
    type?: string
    year?: number
    lab?: string
    docsPath?: string
    docsFolder?: string
    docsPaths: string[]
    relatedDocs: string[]
    relatedPosts: string[]
    relatedArticles: string[]
    relatedBlogSlugs: string[]
    tags: string[]
    stack: string[]
    coverImage?: string
    coverAlt?: string
    coverCaption?: string
    coverStyle?: string
    coverPosition?: string
    accentColor?: string
    mediaRefs: string[]
    blocks: unknown[]
    seoTitle?: string
    seoDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    canonical?: string
    noindex: boolean
  }
  
   interface DocsCollectionItem extends PageCollectionItemBase {
    title: string
    slug: string
    description?: string
    project?: string
    projectSlug?: string
    section?: string
    date?: string
    status?: string
    docsFolder?: string
    lab?: string
    order: number
    updatedAt?: string
    tags: string[]
    coverImage?: string
    coverAlt?: string
    coverCaption?: string
    coverStyle?: string
    coverPosition?: string
    accentColor?: string
    mediaRefs: string[]
    blocks: unknown[]
    seoTitle?: string
    seoDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    canonical?: string
    noindex: boolean
  }
  
   interface LabsCollectionItem extends PageCollectionItemBase {
    title: string
    slug: string
    shortTitle: string
    description: string
    status: string
    accent: string
    order: number
    featured: boolean
    relatedTags: string[]
    roadmap: string[]
    openQuestions: string[]
    seoTitle?: string
    seoDescription?: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    canonical?: string
    noindex: boolean
  }
  
   interface HomeCollectionItem extends DataCollectionItemBase {}
  
   interface SettingsCollectionItem extends DataCollectionItemBase {}
  

  interface PageCollections {
    blog: BlogCollectionItem
    projects: ProjectsCollectionItem
    docs: DocsCollectionItem
    labs: LabsCollectionItem
  }

  interface Collections {
    blog: BlogCollectionItem
    projects: ProjectsCollectionItem
    docs: DocsCollectionItem
    labs: LabsCollectionItem
    home: HomeCollectionItem
    settings: SettingsCollectionItem
  }
}
