export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Math.min(Math.max(Number(query.limit || 40), 1), 200)

  return {
    items: await readAnalyticsEvents(limit)
  }
})
