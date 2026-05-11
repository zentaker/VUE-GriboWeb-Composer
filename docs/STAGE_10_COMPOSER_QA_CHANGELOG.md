# Stage 10 Composer QA Changelog

## Fix: Blog Title-Based Slug Generation

Problem:
- Blog drafts could keep timestamp fallback URLs such as `/blog/untitled-blog-entry-20260511153939` after the editor title changed.

Decision:
- Blog Composer now auto-generates the slug from the article title until the user manually edits the slug.
- Timestamp fallback slugs are treated as stale and can be replaced from the title on save.
- Manual slug overrides are respected.

Scope:
- Blog only.
- Projects, docs, labs, media, auth, backups, analytics, and Home Composer are unchanged.

Files changed:
- `app/pages/admin/content/edit.vue`
- `server/api/admin/content/save.post.ts`
- `server/api/admin/content/create.post.ts`

Acceptance checks:
- Blog slug auto-updates from title before manual override.
- Timestamp fallback slug is replaced on save when the title is real.
- Manual slug override is respected after title changes.
- Projects/docs/labs slug behavior remains unchanged.
