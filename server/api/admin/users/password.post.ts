export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const password = String(body.password || '')
  const confirmPassword = String(body.confirmPassword || '')

  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password confirmation does not match.'
    })
  }

  const user = await changeAdminUserPassword(String(body.id || ''), password)

  return {
    ok: true,
    user: toPublicAdminUser(user)
  }
})
