export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname

  if (!path.startsWith('/api/admin/')) return

  assertAdminAuthenticated(event)
})
