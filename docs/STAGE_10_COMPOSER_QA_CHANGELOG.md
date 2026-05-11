# Stage 10 Composer QA Changelog

This document records Rich Content Composer fixes, product decisions, technical changes, and acceptance criteria during QA. It is meant to help Product Owner validation and AI-assisted development continue without losing context between micro-fixes.

## Completed - Block Semantics Normalization

Problem:
- Text/Image blocks were mixing internal editor labels with public article content.

Decision:
- `block.title` is internal only.
- It is used by the editor, inspector and Page Outline, but it should not render publicly.

Implementation summary:
- Text blocks render `block.data.heading` only if present.
- Text blocks render `block.data.body` as the main visible content.
- Image blocks render `imageUrl`, `alt`, `caption` and `layout`.
- Image blocks do not render `block.title` publicly.
- Empty `block.title` can have UI fallback labels, but those fallbacks should not be saved as content.

Files changed:
- `app/pages/admin/content/edit.vue`
- `app/components/blocks/ContentBlockRenderer.vue`
- `docs/STAGE_10_RICH_CONTENT_COMPOSER.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Acceptance:
- `block.title` appears in editor/Page Outline.
- `block.title` does not appear in the public article body.
- Text block without heading renders only body.
- Image block caption persists and renders publicly.

Status:
- Completed.

## Completed - Heading / Title Block

Problem:
- Visible article headings were being mixed into Text Block fields, which made the editor confusing.

Decision:
- A separate Heading Block / Title Block should be used for visible article headings.

Implementation summary:
- Added Heading Block to the block library.
- Heading Block supports visible heading text.
- Heading Block can support optional subheading/kicker/level if implemented.
- Text Block should remain focused on rich text body.

Files changed:
- `app/pages/admin/content/edit.vue`
- `app/components/blocks/ContentBlockRenderer.vue`
- `docs/STAGE_10_RICH_CONTENT_COMPOSER.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Acceptance:
- Heading Block can be added from the block library.
- Heading Block renders visible title content publicly.
- Text Block can be used without visible heading.
- `block.title` remains internal.

Status:
- Completed / Accepted by UI review.

## Pending - Blog Slug Should Update File Path

Problem:
- Changing a blog title may update `frontmatter.slug`, but the public URL can remain timestamp-based if the markdown file path is still `content/blog/untitled-blog-entry-*.md`.

Decision:
- For blog content, title-based auto slugs should update both `frontmatter.slug` and the markdown file path unless the user manually overrides the slug.

Expected behavior:
- New blog title generates clean slug.
- Slug should be limited by words/length.
- Save should rename the markdown file for blog content.
- Editor should continue saving to the new `filePath`.
- Public URL should use the clean slug.
- Manual slug override should be respected.

Files expected:
- `app/pages/admin/content/edit.vue`
- `server/api/admin/content/save.post.ts`
- `server/api/admin/content/create.post.ts`
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Status:
- Pending implementation.

## Completed - Blog Composer Preview Shows Hero Only

Problem:
- The Blog Composer Frontend Preview currently tries to show hero plus body blocks, which makes the inspector noisy and too tall.

Decision:
- The right-side Frontend Preview should focus only on the public blog hero/header preview.

Implementation summary:
- Removed body block rendering from `BlogComposerPreview`.
- Kept `ArticleHero` as the only preview surface.
- Left body rendering to the public article page.
- Kept the existing `blocks` prop for compatibility with the composer call site, but it is no longer used for preview rendering.

Files changed:
- `app/components/admin/BlogComposerPreview.vue`
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Acceptance:
- Blog Composer preview shows only hero/header.
- No Text Block appears under the hero in the right preview.
- No Image Block appears under the hero in the right preview.
- Public blog page still renders body blocks normally.

Status:
- Completed.

## Completed - Blog Composer Hero Preview Miniaturized

Problem:
- The Blog Composer preview used the public `ArticleHero` but did not scale it down properly, causing oversized text and squeezed visual areas.

Decision:
- The preview should behave as a small thumbnail of the public hero, prioritizing visual proportion over full text readability.

Implementation summary:
- Added a preview-only scale wrapper around `ArticleHero`.
- Kept the two-column hero composition in the preview.
- Reduced preview-only typography and spacing.
- Left the public `ArticleHero` unchanged.

Files changed:
- `app/components/admin/BlogComposerPreview.vue`
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Acceptance:
- Preview shows only the hero.
- Preview keeps two-column composition.
- Preview looks like a miniaturized public hero.
- Public blog page hero remains unchanged.

Status:
- Completed.

## Completed - Blog Composer Hero Preview Scale Refined

Problem:
- The preview-only hero was already miniaturized, but it still rendered slightly too large and the lower section was clipped.

Implementation summary:
- Reduced preview-only hero scale slightly more.
- Adjusted preview container height so the full hero remains visible.
- Kept the public hero unchanged.

Acceptance:
- Full hero visible in preview.
- No bottom clipping.
- Public hero unchanged.

Status:
- Completed.

## Completed - Blog Composer Right Rail Sticky Behavior Adjusted

Problem:
- The right inspector column kept the Frontend Preview sticky for too long, delaying access to Page Outline while editing body blocks.

Decision:
- The hero preview should be contextually useful near Blog Hero Design, but it should scroll away naturally once the editor reaches body blocks.

Implementation summary:
- Adjusted right rail sticky/scroll behavior for Blog Composer.
- Allowed Page Outline to appear earlier during body block editing.
- Kept the hero preview itself unchanged.

Acceptance:
- Frontend Preview is visible near Blog Hero Design.
- Frontend Preview does not remain stuck through several body blocks.
- Page Outline appears earlier and is usable while editing blocks.
- Blog Composer layout remains stable.

Status:
- Completed.

## Completed - Blog Composer Right Rail Context Zones

Problem:
- The right rail kept Frontend Preview visible too far into body block editing. This made Page Outline appear too late.

Decision:
- Frontend Preview belongs to Blog Hero Design. Page Outline belongs to body block editing.

Implementation summary:
- Moved the Blog Composer Frontend Preview into the Blog Hero Design zone.
- Removed the Blog Composer Frontend Preview from the global right inspector rail.
- Made Page Outline visible earlier while editing body blocks.
- Kept `BlogComposerPreview` visual scale unchanged.

Acceptance:
- Frontend Preview is visible around Blog Hero Design.
- Frontend Preview is not visible or no longer dominant when editing the first body block.
- Page Outline appears by the first Text Block.
- Page Outline remains usable through Image/Text body blocks.
- Public blog view remains unchanged.

Status:
- Completed.

## Pending - Quote / Citation Block

Problem:
- The composer does not yet have a block for editorial quote/citation fragments, such as a short italic sentence with a vertical rule on the left.

Decision:
- Add a Quote Block / Citation Block later.

Expected behavior:
- Left vertical rule.
- Italic or emphasized quote text.
- Optional attribution.
- Optional visual variant.

Files expected:
- `app/pages/admin/content/edit.vue`
- `app/components/blocks/ContentBlockRenderer.vue`
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Status:
- Pending implementation.

## Pending - Blog Entries List Updated Timestamp

Problem:
- The Blog Entries list shows title and file path, but not last updated date/time.

Decision:
- Rows should display last updated timestamp.

Expected behavior:
- Show `updatedAt` or file modified date.
- Later: support sorting/filtering by updated or published date.

Files expected:
- `app/pages/admin/blog/index.vue` or the current Blog Entries list surface.
- `server/api/admin/content/list.get.ts`, only if file modified time is needed.
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Status:
- Pending implementation.
