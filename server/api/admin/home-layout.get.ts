export default defineEventHandler(async () => {
  const layout = await readHomeLayout()

  return {
    layout
  }
})
