export default defineEventHandler((event) => {
  const config = getGoogleOAuthConfig(event)

  if (!config.enabled) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Google login is not configured.'
    })
  }

  const state = createGoogleState(event)
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.searchParams.set('client_id', config.clientId)
  url.searchParams.set('redirect_uri', config.redirectUrl)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'openid email profile')
  url.searchParams.set('state', state)
  url.searchParams.set('prompt', 'select_account')

  return sendRedirect(event, url.toString())
})

