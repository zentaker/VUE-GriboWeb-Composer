import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const snapshots = await listSafetySnapshots()
  const latest = snapshots[0]

  if (!latest) {
    throw createError({ statusCode: 404, statusMessage: 'No safety snapshots found.' })
  }

  setHeader(event, 'content-type', 'application/vnd.gribo.package+json; charset=utf-8')
  setHeader(event, 'content-disposition', `attachment; filename="${latest.filename}"`)

  return await readFile(resolve(process.cwd(), latest.path), 'utf8')
})
