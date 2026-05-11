export default defineEventHandler(async () => {
  return {
    snapshots: await listSafetySnapshots()
  }
})
