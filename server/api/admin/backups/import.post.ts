export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const pkg = validatePortablePackage(body.package)
  const mode = body.mode === 'replace' ? 'replace' : 'copy'
  const conflicts = await detectImportConflicts(pkg)

  if (mode === 'replace' && conflicts.conflicts.length && body.confirmation !== 'REPLACE GRIBO CONTENT') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Replace existing requires confirmation: REPLACE GRIBO CONTENT'
    })
  }

  if (pkg.manifest.packageType === 'full-site' && mode === 'replace' && body.restoreConfirmation !== 'RESTORE GRIBO BACKUP') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Full restore requires confirmation: RESTORE GRIBO BACKUP'
    })
  }

  const snapshot = await createSafetySnapshot(pkg, mode)
  const written = mode === 'replace'
    ? await applyImportReplace(pkg)
    : await applyImportAsCopy(pkg)

  return {
    ok: true,
    mode,
    manifest: pkg.manifest,
    snapshot,
    written
  }
})
