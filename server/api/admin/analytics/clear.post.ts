export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await clearAnalyticsData(String(body?.confirmation || ''))
})
