export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const pkg = validatePortablePackage(body.package)
  const conflicts = await detectImportConflicts(pkg)

  return {
    ok: true,
    manifest: pkg.manifest,
    files: pkg.files.map((file) => ({
      path: file.path,
      encoding: file.encoding,
      size: file.content.length
    })),
    creates: conflicts.creates,
    conflicts: conflicts.conflicts,
    warnings: [
      ...pkg.files.some((file) => file.path.startsWith('public/uploads/'))
        ? ['Uploads are included as portable file payloads. Media upload management is still future work.']
        : [],
      ...conflicts.conflicts.length
        ? ['Conflicting files already exist. Use Import as copy or confirm Replace existing.']
        : []
    ]
  }
})
