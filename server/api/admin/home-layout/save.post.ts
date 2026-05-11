export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = await writeHomeLayout(body?.layout ?? body)

  return {
    ok: true,
    ...result
  }
})
