export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = String(query.code || '')
  const state = String(query.state || '')

  try {
    assertGoogleState(event, state)

    if (!code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing Google authorization code.'
      })
    }

    const token = await exchangeGoogleCode(event, code)
    if (!token.access_token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Google access token was not returned.'
      })
    }

    const googleUser = await fetchGoogleUser(token.access_token)
    const email = String(googleUser.email || '').toLowerCase()
    const adminUser = await findGoogleAdminUser(email)

    if (!adminUser) {
      return sendRedirect(event, '/admin/login?error=google_unauthorized')
    }

    const loggedInUser = await markAdminUserLogin(adminUser.id) || adminUser
    const sessionToken = createAdminSessionToken({
      id: loggedInUser.id,
      name: loggedInUser.name || googleUser.name || loggedInUser.email,
      email: loggedInUser.email,
      username: loggedInUser.username,
      authProvider: 'google'
    }, event)
    setAdminSessionCookie(event, sessionToken)

    return sendRedirect(event, '/admin')
  } catch (error: any) {
    const message = encodeURIComponent(error?.statusMessage || error?.message || 'Google login failed.')
    return sendRedirect(event, `/admin/login?error=${message}`)
  }
})
