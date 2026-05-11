export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await updateAdminUser(String(body.id || ''), {
    name: String(body.name || ''),
    email: String(body.email || ''),
    username: String(body.username || ''),
    googleEmail: String(body.googleEmail || ''),
    authProvider: body.authProvider === 'google' ? 'google' : 'password'
  })

  return {
    ok: true,
    user: toPublicAdminUser(user)
  }
})
