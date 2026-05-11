export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const status = body.status === 'disabled' ? 'disabled' : 'active'
  const user = await setAdminUserStatus(String(body.id || ''), status)

  return {
    ok: true,
    user: toPublicAdminUser(user)
  }
})
