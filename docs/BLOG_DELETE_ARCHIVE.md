# Blog Delete / Archive

## Purpose

This note documents the safe cleanup flow for Blog entries in Gribo Studio.

The goal is to let the Product Owner remove development drafts and obsolete entries before real content population without risking accidental deletion of editorial content.

## Where The Action Lives

Open a blog entry from:

- `/admin/blog`
- `Edit`
- `Metadata`
- `Danger Zone`

The destructive action intentionally lives inside the Blog Composer, not on the list row, so a single accidental click from the list cannot remove content.

## Archive Entry

Archive is the recommended action.

It keeps the markdown file in `content/blog/` and updates frontmatter:

- `status: archived`
- `archivedAt: <ISO timestamp>`
- `noindex: true`
- `updatedAt: <date>`

Archived entries are hidden from the normal public blog index and from the public detail route unless opened with explicit preview mode.

To restore an archived entry, edit the file in Gribo Studio and change `status` back to `draft`, `review`, or `published`.

## Delete Entry

Delete is protected and only enabled for Blog entries.

It requires typing:

```text
DELETE BLOG ENTRY
```

When confirmed, the file is moved out of `content/blog/` into:

```text
server/data/trash/blog/
```

This keeps the file recoverable during local development, but removes it from Nuxt Content and from the public blog.

Delete cannot be used by this endpoint for projects, docs, or labs.

## Test Blog Cleanup

The following development/test blog entries were moved to `server/data/trash/blog/`:

- `eeeeee.md`
- `ffdfd.md`
- `hrrrrr.md`
- `stage-4-draft-note.md`
- `test-stage-4-blog.md`
- `test.md`
- `untitled-blog-entry-20260510013949.md`
- `untitled-blog-entry-20260510014715.md`
- `untitled-blog-entry-20260510014751.md`
- `untitled-blog-entry-20260510014932.md`
- `untitled-blog-entry-20260510020400.md`
- `untitled-blog-entry-20260510214206.md`

The real seed posts were preserved:

- `openclaw-friction.md`
- `internet-proximity.md`

## Product Validation

- Open `/admin/blog`.
- Confirm the test entries are gone from the default list.
- Open a real blog entry.
- Confirm `Metadata / Danger Zone` is visible.
- Archive a disposable draft and verify it no longer appears publicly.
- Delete a disposable test entry only after typing the confirmation phrase.
- Confirm `/blog` still loads.
- Confirm existing posts still preview and render.

## Limitations

- Delete currently moves files to local trash; there is no restore UI yet.
- Archive restore is manual through the editor status field.
- Deep restore should use Stage 6 backups or the files in `server/data/trash/blog/`.
