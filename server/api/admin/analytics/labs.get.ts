export default defineEventHandler(async () => {
  const summary = await aggregateAnalytics()
  return {
    items: summary.labs
  }
})
