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
  const adminFetchHeaders = import.meta.server ? useRequestHeaders(['cookie']) : undefined
  const adminApiBase = import.meta.server ? useRequestURL().origin : ''
  const adminApiUrl = (path: string) => `${adminApiBase}${path}`

  const listContent = (contentType: AdminContentType) =>
    $fetch<{ items: AdminContentListItem[] }>(adminApiUrl('/api/admin/content/list'), {
      query: { contentType },
      headers: adminFetchHeaders
    })

  const readContent = (contentType: AdminContentType, filePath: string) =>
    $fetch<{ item: AdminContentReadItem }>(adminApiUrl('/api/admin/content/read'), {
      method: 'POST',
      headers: adminFetchHeaders,
      body: { contentType, filePath }
    })

  const saveContent = (contentType: AdminContentType, filePath: string, frontmatter: Record<string, any>, body: string) =>
    $fetch<{ ok: boolean, item: AdminContentReadItem }>(adminApiUrl('/api/admin/content/save'), {
      method: 'POST',
      headers: adminFetchHeaders,
      body: { contentType, filePath, frontmatter, body }
    })

  const createContent = (
    contentType: AdminContentType,
    title: string,
    slug?: string,
    folder?: string,
    extra?: Record<string, unknown>
  ) =>
    $fetch<{ ok: boolean, item: AdminContentReadItem }>(adminApiUrl('/api/admin/content/create'), {
      method: 'POST',
      headers: adminFetchHeaders,
      body: { contentType, title, slug, folder, ...(extra ?? {}) }
    })

  const archiveContent = (contentType: AdminContentType, filePath: string) =>
    $fetch<{ ok: boolean, softDeleted: boolean }>(adminApiUrl('/api/admin/content/delete'), {
      method: 'POST',
      headers: adminFetchHeaders,
      body: { contentType, filePath, mode: 'archive' }
    })

  const deleteBlogContent = (filePath: string, confirmation: string) =>
    $fetch<{ ok: boolean, deleted: boolean, item: { trashPath: string } }>(adminApiUrl('/api/admin/content/delete'), {
      method: 'POST',
      headers: adminFetchHeaders,
      body: { contentType: 'blog', filePath, mode: 'delete', confirmation }
    })

  return {
    listContent,
    readContent,
    saveContent,
    createContent,
    archiveContent,
    deleteBlogContent
  }
}
