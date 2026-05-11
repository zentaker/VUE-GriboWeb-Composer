export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await recordAnalyticsEvent(event, body)
})
