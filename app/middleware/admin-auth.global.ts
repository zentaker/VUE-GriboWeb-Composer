export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  try {
    const session = await $fetch<{ authenticated: boolean }>('/api/auth/session', {
      headers: import.meta.server ? useRequestHeaders(['cookie']) : undefined
    })

    if (session.authenticated) return
  } catch {
    // Fall through to login redirect.
  }

  return navigateTo({
    path: '/admin/login',
    query: {
      redirect: to.fullPath
    }
  })
})
