# Architecture Notes

## Stage 4 - Admin Functional Minimum

Gribo Studio now has a small file-based CMS layer for Nuxt Content. The implementation keeps the existing `content/` tree as the source of truth and adds Nitro endpoints under `/api/admin/content/*` for listing, reading, saving, creating, and soft-archiving content.

Stage acceptance is now UI-first / blackbox. Internal implementation details are not reviewed unless they create product, security, persistence, deployment, routing, or build risk. Stages close by user-facing and admin-facing behavior: visible routes, working actions, saved persistence, console health, and production build.

Product Owner documentation is now part of every major stage. Technical docs explain how the system works; Product Owner docs explain how to validate the system from the UI and make product decisions without reading code.

Write scope is intentionally narrow:

- `content/blog/**/*.md`
- `content/projects/**/*.md`
- `content/docs/**/*.md`
- `content/labs/**/*.md`

The admin API does not write to `app/`, `server/`, `public/uploads/`, configuration files, package files, environment files, or external storage. Paths are validated before every read or write: absolute paths, `../`, empty path segments, and non-markdown extensions are rejected.

The Stage 4 editor supports:

- frontmatter metadata editing;
- markdown body editing;
- SEO metadata editing;
- draft creation;
- project `docsPath` editing;
- lab `relatedTags`, `roadmap`, and `openQuestions` editing;
- soft delete by setting `status: archived`.

Known limits:

- No authentication exists yet. The admin write API is not production-safe until Admin Auth is implemented.
- No publish workflow exists yet beyond the `status` field.
- No media upload or asset manager exists yet.
- No backup/import or revision history exists yet.
- Home Composer remains visual only and does not persist `content/home/layout.json`.

## Stage 5 - Admin Auth + Production Safety Gate

Stage 5 protects Gribo Studio before larger admin modules are added. The public site remains open, while `/admin/**` routes and `/api/admin/**` endpoints require a valid single-admin session.

The auth model is intentionally small:

- Credentials come from environment variables: `ADMIN_USERNAME`, `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET`.
- Successful login writes a signed HTTP-only cookie.
- The cookie uses `sameSite=lax`, an 8-hour max age, and `secure` on non-local production hosts.
- `/admin/login` is the only unprotected admin page.
- `/api/health` and public Nuxt Content rendering remain public.

Production safety rule:

- On non-local production hosts, login is disabled unless admin credentials and a session secret are configured.
- Placeholder values such as `change-me-before-production` must not be used in production.
- Localhost keeps a fallback admin login so Product Owner validation and local previews remain simple.

This stage does not add roles, OAuth, password reset, account management, audit logs, or rate limiting.

## Stage 5.1 - Admin Users + Google Login

Stage 5.1 keeps the Stage 5 cookie-session model and adds a minimal admin user registry.

Storage:

- Admin users live in `server/data/admin-users.json`.
- The file is server-internal, not Nuxt Content.
- Password hashes are stored only in this file and are stripped from API responses.

Authentication:

- Password login first checks active file-based admin users.
- If no file-based users exist, the environment bootstrap remains available.
- Google login uses OAuth only as an admin login method for pre-authorized emails.
- Google does not create public accounts or self-register new admins.

Password hashing:

- Passwords use Node `crypto.scryptSync` with a random per-user salt.
- Plain text passwords are never written to disk.

Session:

- Existing signed HTTP-only cookies are reused.
- Session payload now includes admin user identity.
- Expiration can be configured with `ADMIN_SESSION_MAX_AGE_SECONDS`.

Boundaries:

- No JWT was added because the app already has a server-side signed cookie session.
- No roles or permissions were added.
- No external identity database was added.
- No OAuth provider beyond Google was added.

## Current Foundation

Gribo Digital is a Nuxt 4 application using:

- Vue 3 and TypeScript.
- Nuxt Content v3 for local content collections.
- `app/` as the Nuxt source directory.
- CSS-first visual system in `app/assets/css/main.css`.
- Placeholder public, documentation, repository, and Studio routes.
- A minimal `server/api/health.get.ts` endpoint.

## Nuxt Content Collections

The current collections are defined in `content.config.ts`:

- `blog`: Markdown pages from `content/blog/*.md`.
- `projects`: Markdown pages from `content/projects/*.md`.
- `docs`: Markdown pages from `content/docs/**/*.md`.
- `labs`: Markdown pages from `content/labs/*.md`.
- `home`: JSON data from `content/home/*.json`.
- `settings`: JSON data from `content/settings/*.json`.

Build validation confirms Nuxt Content processes 7 collections and 14 content files.

## SEO Metadata Foundation

Stage 3.1 adds a shared SEO metadata model for public content. The goal is to avoid pages without useful titles, descriptions, Open Graph metadata, canonical hints, or robots directives while keeping the implementation simple.

Standard SEO fields:

- `seoTitle`
- `seoDescription`
- `ogTitle`
- `ogDescription`
- `ogImage`
- `canonical`
- `noindex`

Content relationship fields used by SEO and editorial grouping:

- `slug`
- `excerpt` or `summary`
- `type`
- `tags`
- `lab`
- `updatedAt`

Fallback strategy is centralized in `app/composables/useGriboSeo.ts`:

1. Title: `seoTitle`, then `title`, then `Gribo Digital`.
2. Description: `seoDescription`, then `description`, then `excerpt`, then `summary`, then the site default description.
3. Open Graph title: `ogTitle`, then resolved title.
4. Open Graph description: `ogDescription`, then resolved description.
5. Open Graph image: `ogImage`, then `/og/gribo-digital.png`.
6. Canonical: emitted only when `canonical` exists.
7. Robots: `noindex, nofollow` only when `noindex: true`; otherwise `index, follow`.

Updated content types:

- Blog posts now include `slug`, `excerpt`, `updatedAt`, `author`, `type`, `lab`, `readingTime`, tags, and SEO fields.
- Projects now include `slug`, `summary`, `date`, `updatedAt`, `type`, `lab`, `docsPath`, tags, and SEO fields.
- Docs now include `slug`, `project`, `projectSlug`, `lab`, `updatedAt`, tags, and SEO fields.
- Labs now include SEO fields in addition to their research-line metadata.

Future editors should expose an SEO Settings panel with:

- SEO Title
- SEO Description
- OG Image
- Canonical URL
- Noindex toggle
- Preview snippet

This is documentation only. No admin SEO editing UI exists yet.

## Editorial Tone Alignment

Stage 3.2 aligns seed content with the Gribo editorial voice. This is a content pass only: no routes, components, admin tools, or data systems were added.

The voice direction is documented in `docs/EDITORIAL_VOICE.md`.

Core editorial posture:

- Technical but not cold.
- Expressive but not vague.
- Poetic but still precise.
- Systems-oriented and culturally aware.
- Less brand ego, more reader resonance.

Seed content updated:

- Site settings.
- Home layout seed copy.
- Labs.
- Existing blog posts.
- Existing project records.
- Tennis AI Friction docs.

The content remains provisional. It should become editable later through Gribo Studio once the admin content model exists.

## SQLite Connector

Nuxt Content is configured with:

```ts
content: {
  experimental: {
    sqliteConnector: 'native'
  }
}
```

This intentionally uses Node native SQLite instead of requiring `better-sqlite3`, because native dependency scripts are blocked in this Windows environment.

## npm Scripts and `.npmrc`

The scripts call Nuxt through:

```txt
C:\Progra~1\nodejs\node.exe node_modules/nuxt/bin/nuxt.mjs
```

This avoids the blocked `node_modules/.bin` shims in the current Windows workspace.

`.npmrc` currently contains:

```txt
ignore-scripts=true
```

Reason: native postinstall/build scripts such as `@parcel/watcher` and `better-sqlite3` were blocked by Windows permissions. Keeping this setting makes `npm install` reproducible in this environment.

Risk: future packages that rely on postinstall scripts may not prepare native binaries or generated assets. If a future stage truly needs such a package, evaluate removing this setting only after confirming the local machine can run native scripts, or isolate the dependency behind a documented install step.

## Future Home Blocks

`content/home/layout.json` remains a lightweight placeholder. It now includes a `futureBlocks` list so the architecture can anticipate the final home model without implementing the real composer.

Expected future blocks:

- `HeroIntroBlock`
- `FeaturedProjectBlock`
- `BuildLogBlock`
- `LabsTracksBlock`
- `ActiveProjectsBlock`
- `ThinkingArticlesBlock`
- `ManifestoBlock`
- `ParticipationCtaBlock`
- `NewsletterBlock`

These should not become functional until the roadmap reaches the Home Editorial Strategy and Home Editorial Blocks stages.

## Current Boundaries

The current project intentionally does not include:

- Authentication.
- Real admin persistence.
- External databases.
- Newsletter sending.
- Analytics.
- Upload storage.
- Full mockup migration.
- Real Home Composer logic.

This keeps Stage 1.1 focused on stabilization and strategic alignment.

## Stage 2A Public Home Migration

Stage 2A migrates the public home from the HTML reference into reusable Nuxt components. It does not implement admin persistence, Home Composer, analytics, authentication, newsletter sending, or real Labs routes.

Created home blocks:

- `HeroIntroBlock.vue`
- `FeaturedProjectBlock.vue`
- `BuildLogBlock.vue`
- `LabsTracksBlock.vue`
- `ActiveProjectsBlock.vue`
- `ThinkingArticlesBlock.vue`
- `ManifestoBlock.vue`
- `NewsletterBlock.vue`
- `SiteFooter.vue`

The home page at `app/pages/index.vue` now composes those blocks in the same order as the public home reference:

1. Hero intro.
2. Featured project.
3. Latest build log.
4. Labs / project tracks preview.
5. Active projects grid.
6. Manifesto plus thinking/articles.
7. Newsletter visual block.
8. Footer.

`ActiveProjectsBlock` reads from `content/projects` when available and falls back to local mock items. `ThinkingArticlesBlock` reads from `content/blog` when available and falls back to local mock items.

Newsletter remains visual only. The form is intentionally mock-only and does not persist email addresses.

Labs remain visual only. The tracks shown are SysSecurity, AI Systems, Physics, SysArchitecture, and Data Science. The real Labs content model and routes belong to a separate Labs Foundation stage.

## Stage 2B Notes

The next public migration step should focus on blog, repository, and docs surfaces. Keep admin functionality, real newsletter, analytics, and content editing out of scope until their dedicated roadmap stages.

## Stage 6 Content Portability

Stage 6 introduces `.gribo.json` packages for backup, export, import, and restore operations.

Implementation boundaries:

- Backup/import endpoints live under `/api/admin/backups/*`.
- Existing Stage 5 API middleware protects all backup/import endpoints.
- Packages can only read/write approved content and upload areas.
- Unsafe paths such as `../`, absolute paths, `app/`, `server/`, `.env`, package files, and config files are rejected.
- Safety snapshots are written to `server/backups/snapshots/`, outside public content and outside Nuxt Content collections.

Package model:

- `manifest` describes schema, package type, title, slug, content files, upload files, timestamp, and checksum.
- `files` contains portable file payloads as `utf8` or `base64`.
- Full-site export includes approved content folders and uploads.
- Project export includes the project markdown plus docs resolved from `relatedDocs`, `docsPaths`, `docsPath`, or `docsFolder`.
- Blog export includes the selected blog markdown.

Import model:

- Preview happens before writes.
- Conflicts are detected by target path.
- Import as copy writes non-conflicting paths or creates `-copy` suffixed paths.
- Replace existing requires an explicit confirmation phrase.
- Full-site replace additionally requires `RESTORE GRIBO BACKUP`.

## Stage 7 Home Composer

Stage 7 makes the public home editable from Gribo Studio.

Source of truth:

- `content/home/layout.json`

Runtime behavior:

- Public `/` reads the home layout through a public read-only endpoint.
- `/admin/home` reads and writes the same layout through protected admin endpoints.
- Admin writes are constrained to `content/home/layout.json`.
- A safety snapshot is created before each save in `server/backups/snapshots/`.

Configurable fields:

- Hero label, headline, description, and CTAs.
- Featured project mode and manual project slug.
- Build log mode, limit, and manual entries.
- Editorial feed mode, content type filters, limit, and manual selections.
- Institutional identity block copy, CTA, and enabled state.

Boundaries:

- No drag and drop.
- No media upload.
- No full live preview.
- No home layout revision history beyond safety snapshots.
- No new external storage.

## Stage 8 Insights / Analytics Foundation

Stage 8 adds a first-party analytics layer for public Gribo pages.

Storage:

- Events are stored in `server/data/analytics/events.jsonl`.
- Analytics is intentionally outside `content/` so editorial content and behavioral events remain separate.
- Stage 6 content backups do not include analytics by default.

Public tracking:

- A client-only plugin records public page views.
- Long-form routes record `read_start`, `read_progress`, and `read_complete`.
- CTA clicks are captured for key public calls to action.
- Admin routes and API routes are ignored.

Privacy constraints:

- No raw IP addresses are stored.
- No public reader accounts are created.
- No emails, names, or sensitive data are collected.
- The anonymous session id uses `sessionStorage`, not tracking cookies.
- Raw user agent strings are not stored; only a hash is persisted.

Protected admin APIs:

- `/api/admin/analytics/summary`
- `/api/admin/analytics/content`
- `/api/admin/analytics/labs`
- `/api/admin/analytics/events`
- `/api/admin/analytics/export`
- `/api/admin/analytics/clear`

The existing `/api/admin/**` auth middleware protects all analytics admin endpoints.

Known limits:

- No external analytics services.
- No country/region metrics.
- No bot filtering beyond basic validation and simple rate limiting.
- No retention policy UI.
- No per-content editor analytics panels yet.
