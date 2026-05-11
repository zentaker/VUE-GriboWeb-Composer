export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  try {
    const session = import.meta.server
      ? await $fetch<{ authenticated: boolean }>(`${useRequestURL().origin}/api/auth/session`, {
          headers: useRequestHeaders(['cookie'])
        })
      : await $fetch<{ authenticated: boolean }>('/api/auth/session')

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
