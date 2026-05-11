# Stage 6 — Content Portability / Backup System

Stage 6 adds a protected portability layer for Gribo content.

The goal is to move content between local and hosted instances without rebuilding posts, projects, docs, labs, home data, settings, or existing uploads by hand.

## Package Format

Stage 6 uses `.gribo.json` packages.

ZIP export is intentionally deferred. JSON packages are easier to inspect, validate, review, and reject safely in this first portability stage.

Every package contains:

- `manifest`
- `files`

Manifest fields:

- `schemaVersion`
- `packageType`: `full-site`, `project`, `blog`, `docs`, or `lab`
- `exportedAt`
- `source`: `gribo-digital`
- `title`
- `slug`
- `contentFiles`
- `uploadFiles`
- `checksum`
- `notes`

Each file entry contains:

- `path`
- `encoding`: `utf8` or `base64`
- `content`

## Allowed Areas

Import/export is limited to:

- `content/blog/`
- `content/projects/`
- `content/docs/`
- `content/labs/`
- `content/home/`
- `content/settings/`
- `public/uploads/`

## Prohibited Areas

Packages cannot write to:

- `app/`
- `server/`
- `node_modules/`
- `.env`
- `package.json`
- `package-lock.json`
- `nuxt.config.ts`
- `content.config.ts`
- anything outside approved content/upload folders

Unsafe paths are rejected:

- absolute paths
- `../`
- empty path segments
- unsupported content file extensions

## Full-Site Backup

`Export full backup` includes approved content folders and `public/uploads/` if files exist.

The downloaded file is named like:

```txt
gribo-backup-YYYYMMDDHHmm.gribo.json
```

## Project Package

A project package includes:

- `content/projects/[project].md`
- docs discovered from project frontmatter:
  - `relatedDocs`
  - `docsPaths`
  - `docsPath`
  - `docsFolder` fallback

It does not include unrelated docs.

## Blog Package

A blog package includes:

- `content/blog/[slug].md`

Upload reference detection is not fully automated yet.

## Import Preview

Import always starts with preview.

Preview shows:

- package type
- title
- slug
- files that will be created
- files that conflict
- warnings

No files are written during preview.

## Import Modes

### Import As Copy

If a file conflicts, Stage 6 creates a copy path:

```txt
my-post-copy.md
my-post-copy-2.md
```

For blog, project, and lab markdown files, the slug is updated to match the copied filename.

### Replace Existing

Replace overwrites conflict files.

If conflicts exist, the UI/API requires:

```txt
REPLACE GRIBO CONTENT
```

For full-site restore, it also requires:

```txt
RESTORE GRIBO BACKUP
```

## Safety Snapshots

Before any import or restore, Stage 6 creates a safety snapshot.

Snapshots are stored outside public content:

```txt
server/backups/snapshots/
```

For package imports, snapshots include existing files affected by the import.

For full-site replace, snapshots include all approved content and uploads.

## Protected Endpoints

All backup endpoints live under:

```txt
/api/admin/backups/*
```

They are protected by the existing Stage 5 admin API middleware.

Without a valid admin session they return `401 Unauthorized`.

## Limitations

- ZIP packages are not implemented yet.
- Git sync is not implemented yet.
- External storage is not implemented.
- Media upload is not implemented.
- Upload reference detection is basic/deferred.
- Full restore writes package files but does not prune files missing from the package.
- There is no revision browser for snapshots yet.
