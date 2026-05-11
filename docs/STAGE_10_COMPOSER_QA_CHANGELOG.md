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

## Fix: Blog Slug Updates File Path

Problem:
- Changing the blog title updated metadata but did not change the markdown file path, so public URLs could stay on timestamp fallback routes.

Decision:
- For blog content, title-based auto slugs update both `frontmatter.slug` and the markdown file path unless the user manually overrides the slug.
- Nuxt Content can then resolve the clean public URL from the file path and frontmatter together.

Implementation:
- Blog-only auto/stale slug detection.
- Blog-only slug generation limited to 8 words and 72 characters without cutting words.
- Server-side markdown file rename on save when the desired blog slug differs from the current file slug.
- Editor route updates after save when the server returns a new `filePath`.

Acceptance:
- New blog title generates a clean slug.
- Saving a blog with a changed auto slug renames the markdown file.
- Editor continues saving to the new `filePath`.
- Public View opens the clean slug URL.
- Manual slug override is respected.
