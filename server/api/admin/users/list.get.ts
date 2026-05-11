export default defineEventHandler(async () => {
  const users = (await readAdminUsers()).map(toPublicAdminUser)

  return {
    users
  }
})
