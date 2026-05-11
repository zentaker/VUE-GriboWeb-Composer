# Admin Content Model

Stage 4 turns Gribo Studio into a minimum file-based CMS for Nuxt Content. It does not introduce a database. Markdown files remain the editorial source of truth.

## Collections

### Blog Posts

- Stored in `content/blog/*.md`.
- Edited from `/admin/blog` and `/admin/content/edit?type=blog&file=...`.
- New drafts are created from `/admin/content/new?type=blog`.
- Core fields: `title`, `slug`, `excerpt`, `description`, `date`, `updatedAt`, `author`, `category`, `type`, `status`, `lab`, `readingTime`, `tags`.
- SEO fields: `seoTitle`, `seoDescription`, `ogTitle`, `ogDescription`, `ogImage`, `canonical`, `noindex`.
- Rich composer fields: `coverImage`, `coverAlt`, `coverCaption`, `coverStyle`, `coverPosition`, `accentColor`, `mediaRefs`, `blocks`.
- Rendering rule: if `blocks` has visible items, the public blog detail renders blocks; otherwise it renders the markdown body.

### Projects

- Stored in `content/projects/*.md`.
- Edited from `/admin/projects`.
- New drafts are created from `/admin/content/new?type=projects`.
- Core fields: `title`, `slug`, `summary`, `description`, `date`, `updatedAt`, `status`, `type`, `year`, `lab`, `tags`, `stack`.
- Rich composer fields: `coverImage`, `coverAlt`, `coverCaption`, `coverStyle`, `coverPosition`, `accentColor`, `mediaRefs`, `blocks`.
- Documentation attachment fields:
  - `relatedDocs`: primary product field for the list of docs pages attached to the project.
  - `docsPath`: compatibility/fallback field used by public project CTAs when a single docs route is needed.
  - `docsPaths`: compatibility list mirroring the selected docs when available.
  - `docsFolder`: folder/group used when creating or grouping project documentation.
- Product rule: docs are attached as a flat list of documentation pages. The admin UI should not present a primary/additional hierarchy.
- Public rendering rule: `/repository/[slug]` is the Project Overview inside the existing docs visual system. It renders from `content/projects` and does not require a separate docs overview file.
- Attached docs render as secondary technical pages around the Project Overview and must not be hardcoded from unrelated projects.

### Docs Pages

- Stored in `content/docs/**/*.md`.
- Edited from `/admin/docs`.
- New drafts can be created inside a docs folder from `/admin/content/new?type=docs`.
- Core fields: `title`, `slug`, `description`, `project`, `projectSlug`, `section`, `lab`, `order`, `updatedAt`, `tags`.
- Rich composer fields: `coverImage`, `coverAlt`, `coverCaption`, `coverStyle`, `coverPosition`, `accentColor`, `mediaRefs`, `blocks`.
- Rendering rule: if `blocks` has visible items, docs detail renders blocks; otherwise it renders the markdown body.
- Docs remain public project documentation, not a top-level public navigation item.
- Availability logic:
  - Docs with no `projectSlug` or `project` are considered available.
  - Docs with `projectSlug` or `project` are considered attached to that project.
  - Docs referenced by a project `relatedDocs`, `docsPaths`, or `docsPath` are treated as attached to that project when visible in admin.
  - Attach flows should show available docs first and hide or disable docs already attached elsewhere.

### Labs

- Stored in `content/labs/*.md`.
- Edited from `/admin/labs`.
- New drafts are created from `/admin/content/new?type=labs`.
- Core fields: `title`, `slug`, `shortTitle`, `description`, `status`, `accent`, `order`, `featured`, `relatedTags`, `roadmap`, `openQuestions`.

## Write Rules

The server API only accepts the content types `blog`, `projects`, `docs`, and `labs`. File paths must stay inside their matching content folder and must use `.md`.

Invalid examples:

- `../package.json`
- `C:\absolute\path.md`
- `app/pages/index.vue`
- `content/settings/site.json`

## Delete Behavior

Stage 4 does not physically delete files. Archive sets:

```yaml
status: archived
updatedAt: YYYY-MM-DD
```

This keeps content recoverable until a future backup/revision system exists.

## Backup / Import Model

Stage 6 adds `.gribo.json` packages for portability.

Approved package write areas:

- `content/blog/`
- `content/projects/`
- `content/docs/`
- `content/labs/`
- `content/home/`
- `content/settings/`
- `public/uploads/`

Package imports are separate from the Stage 4 content editor. They validate every path before writing and create a safety snapshot before import/restore.

Project packages use the same documentation attachment model as project frontmatter:

- `relatedDocs` is the preferred list of attached docs.
- `docsPaths` is a compatibility list.
- `docsPath` is a single-route fallback.
- `docsFolder` is a folder fallback when explicit docs are not set.

Import as copy appends `-copy` suffixes to conflicting paths. Replace existing requires explicit confirmation.

## Rich Content Blocks

Stage 10 adds a structured block array for Blog, Projects, and Docs while preserving markdown body compatibility.

Block shape:

```json
{
  "id": "block-...",
  "type": "text",
  "title": "Intro narrative block",
  "visible": true,
  "data": {}
}
```

Implemented block types:

- `text`
- `image`
- `code`
- `callout`
- `table`
- `banner`

Reserved later block types:

- `steps`
- `gallery`
- `split`

Compatibility rule:

- `blocks` is the structured content model.
- The markdown body remains the fallback.
- Existing markdown-only content must not be deleted or transformed automatically.
- `mediaRefs` stores cover and block image references for future backup/media workflows.

## Pending

- Admin Auth.
- Roles and permissions.
- Publish review workflow.
- Media Library uploads.
- ZIP backup packages.
- Git/cloud sync.
- Revision history.
- Home Composer persistence.
