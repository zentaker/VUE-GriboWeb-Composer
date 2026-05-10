export default defineEventHandler((event) => {
  const config = getAdminAuthConfig(event)
  const session = readAdminSession(event)

  return {
    authenticated: Boolean(session),
    loginEnabled: config.enabled,
    production: config.production,
    reason: config.enabled ? '' : config.reason,
    user: session
      ? {
          username: session.username
        }
      : null
  }
})
