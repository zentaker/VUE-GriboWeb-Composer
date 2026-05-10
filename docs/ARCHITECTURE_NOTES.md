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
