export type AdminContentType = 'blog' | 'projects' | 'docs' | 'labs'

export interface AdminContentListItem {
  contentType: AdminContentType
  filePath: string
  publicPath: string
  title: string
  slug: string
  status: string
  lab: string
  date: string
  updatedAt: string
  tags: string[]
  description: string
  project?: string
  projectSlug?: string
  docsFolder?: string
  docsPath?: string
  docsPaths?: string[]
  relatedDocs?: string[]
}

export interface AdminContentReadItem {
  contentType: AdminContentType
  filePath: string
  publicPath: string
  frontmatter: Record<string, any>
  body: string
}

export function useAdminContent() {
  const listContent = (contentType: AdminContentType) =>
    $fetch<{ items: AdminContentListItem[] }>('/api/admin/content/list', {
      query: { contentType }
    })

  const readContent = (contentType: AdminContentType, filePath: string) =>
    $fetch<{ item: AdminContentReadItem }>('/api/admin/content/read', {
      method: 'POST',
      body: { contentType, filePath }
    })

  const saveContent = (contentType: AdminContentType, filePath: string, frontmatter: Record<string, any>, body: string) =>
    $fetch<{ ok: boolean, item: AdminContentReadItem }>('/api/admin/content/save', {
      method: 'POST',
      body: { contentType, filePath, frontmatter, body }
    })

  const createContent = (
    contentType: AdminContentType,
    title: string,
    slug?: string,
    folder?: string,
    extra?: Record<string, unknown>
  ) =>
    $fetch<{ ok: boolean, item: AdminContentReadItem }>('/api/admin/content/create', {
      method: 'POST',
      body: { contentType, title, slug, folder, ...(extra ?? {}) }
    })

  const archiveContent = (contentType: AdminContentType, filePath: string) =>
    $fetch<{ ok: boolean, softDeleted: boolean }>('/api/admin/content/delete', {
      method: 'POST',
      body: { contentType, filePath }
    })

  return {
    listContent,
    readContent,
    saveContent,
    createContent,
    archiveContent
  }
}
