export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username = String(body.username || '')
  const password = String(body.password || '')
  const result = verifyAdminCredentials(username, password, event)

  if (!result.ok) {
    throw createError({
      statusCode: result.reason.includes('configured') ? 503 : 401,
      statusMessage: result.reason
    })
  }

  const token = createAdminSessionToken(username, event)
  setAdminSessionCookie(event, token)

  return {
    ok: true,
    user: {
      username
    }
  }
})
