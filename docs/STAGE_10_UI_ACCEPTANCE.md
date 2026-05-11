# Stage 10 UI Acceptance Checklist

Stage 10 closes only through UI-first validation: visual fidelity, save persistence, public rendering, route health, build health, and no critical console errors.

## Visual Composer

- [x] Project Composer follows the `gribo-project-content-composer.html` structure: hero, tabs, basics, taxonomy, block library, canvas, cover area, and inspector.
- [x] Composer uses the existing Gribo Studio visual system.
- [x] Content, Metadata, SEO, Media, and Preview tabs are available.
- [x] Tabs are not dead: each tab shows a visible panel.
- [x] Block library is visible.
- [x] Canvas is visible.
- [x] Right inspector is visible.
- [x] Cover selection is visible.
- [x] Cover design fields are visible.

## Blocks

- [x] Text Section can be added.
- [x] Image Block can be added.
- [x] Image Block can select an image from real Studio Media Library assets.
- [x] Code Block can be added.
- [x] Callout Block can be added.
- [x] Table Block can be added.
- [x] Banner Block can be added.
- [x] Blocks can move up/down.
- [x] Blocks can be duplicated.
- [x] Blocks can be hidden/shown.
- [x] Blocks can be deleted.
- [x] Save persists blocks in frontmatter.

## Public Rendering

- [x] Blog detail renders blocks when `blocks` exist.
- [x] Project Overview renders blocks when `blocks` exist.
- [x] Docs detail renders blocks when `blocks` exist.
- [x] Content without blocks still renders markdown body.
- [x] Existing public layouts are preserved.

## Media

- [x] Cover image can be selected from Studio Media Library assets.
- [x] Cover image can be uploaded from the computer.
- [x] Image Block uses Studio Media Library assets.
- [x] Image Block can upload an image from the computer.
- [x] Media tab shows referenced media.
- [x] Media Library page uses the same shared assets from `public/uploads/`.

## Blog Composer Fixes

- [x] Blog Composer hero title updates while typing the Title field.
- [x] Blog Composer hero subtitle updates while typing Description or Excerpt.
- [x] Status is a controlled select, not a free-text field.
- [x] Track / Lab is a controlled select populated from existing Labs.
- [x] Manual tags still work.
- [x] Generate tags creates local tag suggestions without external services.
- [x] Blog Composer does not expose cover image upload.
- [x] Blog images are added through Image Blocks.
- [x] Cover visual style changes update the cover preview.
- [x] Cover image position changes update the cover preview.
- [x] Cover accent color uses controlled palette options and updates preview.
- [x] Image Block opens the Media Library picker.
- [x] Image Block preview shows the selected image complete and centered by default.
- [x] Save shows visible `Saving`, `Saved`, or error feedback.
- [x] Public Image Block caption is centered and muted.
- [x] Public blog detail renders selected Image Block image and caption.
- [x] Public blog hero renders without cover image.
- [x] Blog Composer topbar shows a single `Save changes` action.
- [x] Blog right preview uses the public rendering model instead of fake preview cards.
- [x] Image Block caption persists after save and refresh.
- [x] Frontend Preview has proper internal padding.
- [x] Page Outline has proper internal padding.
- [x] Frontend Preview keeps the blog hero horizontal/two-column in compact form.
- [x] Public Blog hero has more space between description and metadata.
- [x] Text block title appears in Page Outline but not public rendering.
- [x] Text block heading remains visible when provided.
- [x] Text block with no heading renders only body.

## Media Upload Fixes

- [x] Cover `+` opens the real Media Picker.
- [x] Cover allows Upload from computer.
- [x] Uploaded cover image appears in Media Library.
- [x] Uploaded cover image is selected as `coverImage`.
- [x] Image Block allows Upload from computer.
- [x] Image Block allows selecting real uploaded images.
- [x] Image preview remains contained/centered in the composer.
- [x] Drag and drop works for JPG/PNG/WebP or shows a clear error for invalid files.
- [x] Cover Design no longer duplicates Frontend Preview.
- [x] Cover Design controls update the inspector Frontend Preview.
- [x] Save shows Saving/Saved/error feedback.

## Blog Composer Visual Corrections

- [x] Blog Composer no longer shows cover image upload.
- [x] Blog Cover Design only has visual style and accent color.
- [x] Frontend Preview reflects a blog hero without image.
- [x] Public blog hero renders without cover image.
- [x] Text Section can be saved without title.
- [x] Text Section without heading renders only body.
- [x] Image Block can be saved without title.
- [x] Image Block does not show all media inline.
- [x] Choose from Media Library opens the picker.
- [x] Upload from computer still works.
- [x] Remove image clears the selected image without deleting the asset.
- [x] Image layouts are visually distinct.
- [x] Captions stay centered.
- [x] Save feedback appears.

## Block Semantics Normalization

- [x] `block.title` appears in editor/Page Outline only.
- [x] `block.title` does not render publicly for text blocks.
- [x] `block.title` does not render publicly for image blocks.
- [x] Text block with heading renders heading + body.
- [x] Text block without heading renders only body.
- [x] Empty `block.title` is not auto-filled on save.
- [x] Image caption persists after save and refresh.
- [x] Image caption renders publicly.

## Heading Block

- [x] Heading Block appears in the block library.
- [x] Heading Block renders a visible heading.
- [x] Heading Block optional subheading renders.
- [x] Heading Block level `h2` / `h3` / `h4` works.
- [x] Heading Block optional kicker renders as an eyebrow.
- [x] `block.title` does not render publicly for Heading Block.
- [x] Text Block remains intended for rich text body.
- [x] Page Outline uses internal title or UI-only fallback correctly.

## Composer QA / Rich Blocks

- [x] `block.title` is internal and does not render publicly for Text/Image blocks.
- [x] Heading Block / Title Block can be added.
- [x] Heading Block renders visible heading content.
- [x] Text Block can render body without visible heading.
- [x] Image Block renders image and caption without exposing internal block title.
- [ ] Blog slug updates from title and renames markdown file.
- [x] Blog Composer preview shows hero only.
- [x] Blog Composer preview is a faithful miniaturized hero.
- [ ] Quote / Citation Block can be added.
- [ ] Blog Entries list shows updated timestamp.

## Blog Composer Frontend Preview

- [x] Blog Composer Frontend Preview shows only the article hero.
- [x] Blog Composer Frontend Preview does not render body blocks.
- [x] Blog Composer preview keeps hero in two-column miniature mode.
- [x] Blog Composer preview prioritizes visual fidelity over text readability.
- [x] Blog Composer preview shows the full hero without bottom clipping.
- [x] Blog Composer Frontend Preview does not remain sticky through body block editing.
- [x] Page Outline appears while editing body blocks.
- [x] Right rail scroll behavior supports the editor workflow.
- [x] Blog Composer right rail treats Frontend Preview as contextual to Blog Hero Design.
- [x] Page Outline appears by the first body block.
- [x] Frontend Preview does not remain dominant during body block editing.
- [x] Public ArticleHero remains unchanged.
- [x] Public blog page still renders body blocks.

## Blog Slug Generation

- [x] Blog slug auto-updates from title before manual override.
- [x] Blog slug is limited by words and length.
- [ ] Timestamp fallback slug is replaced on save when the blog title is real.
- [ ] Saving a blog with a changed auto slug renames the markdown file.
- [ ] Editor route updates to the new filePath after save.
- [ ] Public View opens the clean slug URL.
- [ ] Manual slug override is respected after title changes.
- [x] Project, docs, and labs slug behavior is unaffected.

## No Regression

- [x] Home Composer remains separate.
- [x] Media Library still loads.
- [x] Insights still builds.
- [x] Backups still build.
- [x] Auth/users routes still build.
- [x] Public Blog, Repository, Docs, and Labs routes still build.

## Build

- [x] `npm run build` passes.

## Limitations

- No drag and drop.
- No real upload persistence inside the composer.
- No crop/resize tooling.
- Steps, Gallery, and Split Layout are reserved as later block types.
- Preview is a simple block preview, not a pixel-perfect public-page preview.
