# Stage 6 UI Acceptance Checklist

## Backups Page

- [ ] `/admin/backups` appears in the Studio sidebar.
- [ ] `/admin/backups` redirects to login without a session.
- [ ] `/admin/backups` loads after login.
- [ ] Export full backup downloads a `.gribo.json` file.
- [ ] Export project package downloads a project `.gribo.json` file.
- [ ] Export blog package downloads a blog `.gribo.json` file.
- [ ] Import package accepts file input.
- [ ] Import package accepts pasted JSON.
- [ ] Import package shows preview before writing.
- [ ] Preview lists files to create.
- [ ] Preview lists conflicting files.
- [ ] Import as copy works.
- [ ] Replace existing requires confirmation.
- [ ] Full restore is treated as danger-zone behavior.
- [ ] Safety snapshot is created before import/restore.
- [ ] Latest safety snapshot can be downloaded when one exists.

## Public Validation

- [ ] Imported blog content appears in `/blog`.
- [ ] Imported project content appears in `/repository`.
- [ ] Imported docs content appears in `/docs`.
- [ ] Imported labs content appears in `/labs`.
- [ ] Existing public content is not broken after import.

## Security

- [ ] `/api/admin/backups/*` responds `401` without session.
- [ ] Packages with `../` paths are rejected.
- [ ] Packages with absolute paths are rejected.
- [ ] Packages targeting `app/` are rejected.
- [ ] Packages targeting `server/` are rejected.
- [ ] Packages targeting `.env` are rejected.
- [ ] Packages targeting package/config files are rejected.

## No Regression

- [ ] Blog admin still works after login.
- [ ] Project admin still works after login.
- [ ] Docs admin still works after login.
- [ ] Labs admin still works after login.
- [ ] Admin Users still works after login.
- [ ] Public frontend remains public.

## Build

- [ ] `npm run build` passes.

## Known Limits

- ZIP export is deferred.
- Git sync is deferred.
- External/cloud storage is deferred.
- Upload reference extraction is limited.
- Full restore does not delete files that are absent from the backup package.
