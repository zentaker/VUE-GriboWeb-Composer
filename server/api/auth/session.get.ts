export default defineEventHandler((event) => {
  const config = getAdminAuthConfig(event)
  const googleConfig = getGoogleOAuthConfig(event)
  const session = readAdminSession(event)

  return {
    authenticated: Boolean(session),
    loginEnabled: config.enabled,
    googleLoginEnabled: googleConfig.enabled,
    production: config.production,
    reason: config.enabled ? '' : config.reason,
    user: session
      ? {
          id: session.id,
          name: session.name,
          email: session.email,
          authProvider: session.authProvider,
          username: session.username
        }
      : null
  }
})
