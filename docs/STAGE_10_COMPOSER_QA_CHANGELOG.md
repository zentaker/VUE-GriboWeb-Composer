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

## Completed - Blog Composer Block Inspector Removed From Right Rail

Problem:
- The Blog Composer right rail showed a Block Inspector card that duplicated information already visible in the editable block cards and Page Outline.

Decision:
- Remove the Block Inspector card from the Blog Composer right rail so Page Outline becomes the primary navigation surface.

Implementation summary:
- Removed the redundant Block Inspector card from Blog Composer right rail.
- Kept block selection/editor behavior intact.
- Kept Page Outline as the first visible right rail card.

Acceptance:
- Block Inspector no longer appears in Blog Composer.
- Page Outline appears first in the right rail.
- Block selection still works.
- Block controls still work.
- Project/Docs Composer remain unchanged.

Status:
- Completed.

## Completed - Quote / Citation Block Added

Problem:
- The Rich Composer did not include a dedicated block for editorial quotes or citation-style fragments.

Decision:
- Add a Quote Block for short emphasized editorial fragments with a left vertical rule and optional attribution.

Implementation summary:
- Added Quote Block to the block library.
- Added editor fields for quote text, optional attribution and variant.
- Added public rendering for quote blocks.
- Kept `block.title` internal/editor-only.

Files changed:
- `app/pages/admin/content/edit.vue`
- `app/components/blocks/ContentBlockRenderer.vue`
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Acceptance:
- Quote Block can be added from the block library.
- Quote text renders publicly.
- Optional attribution renders when present.
- `block.title` does not render publicly.
- Page Outline shows the quote block.
- Existing blocks remain unaffected.

Status:
- Completed.

## Completed - Quote Block Visual Scale Adjusted

Problem:
- The Quote / Citation Block was functionally correct, but visually oversized and too close to a heading.

Decision:
- Reduce the visual scale and weight of the Quote Block so it behaves like an editorial quotation, closer to a Medium-style blockquote.

Implementation summary:
- Reduced quote text scale.
- Kept left vertical rule.
- Preserved optional attribution.
- Preserved block semantics and rendering logic.

Refinement:
- Reduced Quote Block visual scale one more level after UI review.

Acceptance:
- Quote Block remains functional.
- Quote text appears smaller and more editorial.
- Quote no longer resembles a heading.
- Attribution remains optional.
- Existing blocks remain unaffected.

Status:
- Completed.

## Completed - Blog Block Contract Propagated To Project/Docs Composer

Problem:
- Project Composer and Docs Composer share similar editing surfaces with Blog Composer and could repeat the same block semantics bugs.

Decision:
- Propagate the accepted Blog Composer block contract to Project/Docs without a broad refactor.

Implementation summary:
- Verified that Blog, Project and Docs use the shared rich composer surface in `app/pages/admin/content/edit.vue`.
- Verified that Project and Docs public pages use the shared `ContentBlockRenderer`.
- Ensured `block.title` remains internal/editor-only in the shared public renderer.
- Ensured Heading Block is available where rich blocks are used.
- Ensured Text Block remains body-focused.
- Ensured Quote Block is available where rich blocks are used.
- Ensured Image Block caption/layout behavior remains handled by the shared renderer.
- Removed remaining public `block.title` fallbacks from code, callout and banner rendering.
- Preserved contextual differences between Blog, Project and Docs.

Acceptance:
- Project Composer supports the accepted block contract.
- Docs Composer supports the accepted block contract.
- `block.title` does not render publicly.
- Heading/Text/Quote/Image blocks persist through the shared composer state.
- Heading/Text/Quote/Image blocks render through the shared public renderer.
- Blog Composer remains stable.
- `npm run build` passes.

Status:
- Completed.

## Completed - Repository Project Delete Flow And Test Cleanup

Problem:
- Repository Projects did not expose a clear delete action, and the project list contained many temporary CRUD test entries.

Decision:
- Add a safe delete flow for projects and clean only temporary/test project files before deeper Project/Docs Composer QA.

Implementation summary:
- Added a delete/danger action in the Repository Project editor.
- Reused the protected admin content delete endpoint.
- Added textual confirmation before project deletion.
- Redirected back to the Repository Projects list after deletion.
- Moved clearly temporary/test project files from `content/projects` to `server/data/trash/projects`.
- Preserved blogs, docs, labs, media, backups and real seed projects.

Acceptance:
- Project can be deleted from the edit screen.
- Delete requires confirmation.
- Project list refreshes after deletion.
- Temporary/test projects are removed.
- Real/seed projects remain.
- Blogs/docs/labs/media remain unaffected.

Status:
- Completed.

## Completed - Project Composer Structured Dossier Editor

Problem:
- Project Composer reused the Blog/Docs free rich-block surface, making project overview editing behave like an article/document composer.

Decision:
- Project Composer should be a structured dossier editor.
- Blog and Docs remain free block composers.

Implementation summary:
- Gated the free block composer to Blog/Docs.
- Made Project Composer focus on structured project fields.
- Added simple structured dossier fields for project memory, project index and build log note.
- Kept existing `project.blocks` as preserved legacy data.
- Elevated documentation management inside the project editor.
- Preserved Blog and Docs composer behavior.

Files changed:
- `app/pages/admin/content/edit.vue`
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Acceptance:
- Project Composer no longer appears as a free article canvas.
- Project Basics are the primary editing surface.
- Documentation Manager is visible in Project Composer.
- Existing project relationships are preserved.
- Existing project blocks are not deleted.
- Blog Composer remains unchanged.
- Docs Composer remains unchanged.

Status:
- Completed.

## Completed - Project Composer Fields Connected To Public Overview

Problem:
- Project Composer began moving toward a structured dossier editor, but the public Project Overview still rendered hardcoded/default copy in several sections.

Decision:
- Expose structured project overview fields in Project Composer and make `/repository/[slug]` use those fields with safe fallbacks.

Implementation summary:
- Added structured frontmatter fields for project overview, memory, index, documentation empty state and build log.
- Updated the public repository page to read those fields.
- Preserved default fallback text for older projects.
- Preserved legacy `project.blocks` without making them the primary Project Overview model.

Files changed:
- `app/pages/admin/content/edit.vue`
- `app/pages/repository/[slug].vue`
- `docs/STAGE_10_COMPOSER_QA_CHANGELOG.md`
- `docs/STAGE_10_UI_ACCEPTANCE.md`

Acceptance:
- Project Composer fields update the public Project Overview.
- Empty fields fall back safely.
- Blog Composer remains unchanged.
- Docs Composer remains unchanged.
- Existing projects do not break.

Status:
- Completed.

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
