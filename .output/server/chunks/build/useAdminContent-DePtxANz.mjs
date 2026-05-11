import { f as useRequestHeaders, g as useRequestURL } from './server.mjs';

function useAdminContent() {
  const adminFetchHeaders = useRequestHeaders(["cookie"]);
  const adminApiBase = useRequestURL().origin;
  const adminApiUrl = (path) => `${adminApiBase}${path}`;
  const listContent = (contentType) => $fetch(adminApiUrl("/api/admin/content/list"), {
    query: { contentType },
    headers: adminFetchHeaders
  });
  const readContent = (contentType, filePath) => $fetch(adminApiUrl("/api/admin/content/read"), {
    method: "POST",
    headers: adminFetchHeaders,
    body: { contentType, filePath }
  });
  const saveContent = (contentType, filePath, frontmatter, body) => $fetch(adminApiUrl("/api/admin/content/save"), {
    method: "POST",
    headers: adminFetchHeaders,
    body: { contentType, filePath, frontmatter, body }
  });
  const createContent = (contentType, title, slug, folder, extra) => $fetch(adminApiUrl("/api/admin/content/create"), {
    method: "POST",
    headers: adminFetchHeaders,
    body: { contentType, title, slug, folder, ...extra ?? {} }
  });
  const archiveContent = (contentType, filePath) => $fetch(adminApiUrl("/api/admin/content/delete"), {
    method: "POST",
    headers: adminFetchHeaders,
    body: { contentType, filePath, mode: "archive" }
  });
  const deleteBlogContent = (filePath, confirmation) => $fetch(adminApiUrl("/api/admin/content/delete"), {
    method: "POST",
    headers: adminFetchHeaders,
    body: { contentType: "blog", filePath, mode: "delete", confirmation }
  });
  return {
    listContent,
    readContent,
    saveContent,
    createContent,
    archiveContent,
    deleteBlogContent
  };
}

export { useAdminContent as u };
//# sourceMappingURL=useAdminContent-DePtxANz.mjs.map
