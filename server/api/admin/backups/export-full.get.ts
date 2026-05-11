export default defineEventHandler(async (event) => {
  const files = await collectFullBackupFiles()
  const timestamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '')
  const pkg = await createPortablePackage({
    packageType: 'full-site',
    title: 'Gribo Digital full-site backup',
    slug: `gribo-backup-${timestamp}`,
    contentFiles: files.contentFiles,
    uploadFiles: files.uploadFiles,
    notes: 'Full backup of approved Gribo content and uploads folders.'
  })

  return createDownloadResponse(event, pkg, `gribo-backup-${timestamp}.gribo.json`)
})
