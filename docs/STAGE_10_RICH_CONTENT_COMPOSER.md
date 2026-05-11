# Stage 10 - Rich Content Composer

Stage 10 refines the Gribo Studio content composer against the `gribo-project-content-composer.html` reference. The goal is visual and functional alignment, not a new page-builder architecture.

## What Changed

The content editor at `/admin/content/edit` now has a block-composer surface for Blog, Project, and Docs content:

- Composer hero with the same editorial creation language as the mockup.
- Tabs for Content, Metadata, SEO, Media, and Preview.
- Project/entry basics and taxonomy panels.
- Block library.
- Central canvas.
- Project cover selection and cover design fields.
- Block toolbar with Edit, Duplicate, Hide/Show, Up, Down, and Delete.
- Right inspector with block inspector, frontend preview, page outline, media used, and output mapping.

Labs keep the simpler metadata/body editor because the current stage prioritizes Project Composer fidelity.

## Block Model

Blocks are saved in frontmatter as:

```json
[
  {
    "id": "block-...",
    "type": "text",
    "title": "Intro narrative block",
    "visible": true,
    "data": {}
  }
]
```

Implemented block types:

- `text`: `heading`, `body`
- `image`: `imageUrl`, `alt`, `caption`, `layout`
- `code`: `title`, `language`, `code`, `copyEnabled`
- `callout`: `variant`, `title`, `body`, `icon`
- `table`: `columns`, `rows`
- `banner`: `title`, `body`, `accent`, `layout`

Reserved/later types in the library:

- `steps`
- `gallery`
- `split`

## Cover And Media

Composer cover fields:

- `coverImage`
- `coverAlt`
- `coverCaption`
- `coverStyle`
- `coverPosition`
- `accentColor`

The composer uses the shared Studio Media Library assets from `public/uploads/`. Cover images and Image Blocks can open the Media Library picker, select an existing uploaded image, upload a JPG/PNG/WebP from the computer, or drop an allowed image into the cover/image area. Uploaded images are written through the protected Media Library upload endpoint and become available in the same picker. Crop, resize, SVG upload, and advanced media management remain future work.

## Blog Composer QA Fixes

The Blog Composer received a focused UI/product pass before real content population:

- The composer hero now updates live from the current blog title and description. It only shows `Create an editorial entry.` when the title is empty.
- `Status` is a controlled select with editorial states instead of free text.
- `Track / Lab` is a controlled select populated from existing Labs, while preserving older custom values if a legacy entry has one.
- Tags remain manually editable, with a lightweight local `Generate tags` action based on title and description.
- Cover selection opens the real Media Library picker and stores the selected image in `coverImage`.
- Cover upload can add JPG/PNG/WebP files from the computer through the Media Library endpoint.
- Cover design fields use controlled options for visual style, image position, and accent color.
- Cover Design only contains controls; the right inspector Frontend Preview is the visual feedback surface.
- Image Blocks open the same Media Library picker, can upload from the computer, and store the selected asset in `block.data.imageUrl`.
- Seed/demo image cards are not used as the only source; the picker lists real assets returned by the Media Library.
- Editor image previews use contained scaling by default so selected images are visible without aggressive crop.
- Save actions show `Saving`, `Saved`, or error feedback in the composer/topbar instead of silently completing.
- Public Image Block captions are centered, muted, and visually attached to the image.
- Public blog heroes do not use cover images; article images live inside Image Blocks.

## Media Upload Fixes

- Cover `+` opens a real image flow: choose an existing Media Library asset, upload from computer, or drop a JPG/PNG/WebP.
- Image Block uses the same real Media Library picker and upload flow.
- Uploaded images are stored in `public/uploads/` and immediately added to the picker state.
- The upload endpoint blocks SVG, executable/script files, unknown extensions, and files above the current 5 MB limit.
- Cover Design no longer renders a duplicate preview card; the controls update the inspector Frontend Preview instead.
- Save feedback is visible as `Saving`, `Saved`, or an error state.

## Blog Visual Model Corrections

- Blog entries no longer use cover images as public hero images.
- Blog hero design is controlled by visual style and accent color only.
- Article images belong inside Image Blocks, not the blog hero.
- Text Sections and Image Blocks can be saved with empty titles.
- If a Text Section has no title or heading, only its body renders publicly.
- Image Blocks no longer list the entire Media Library inline; the block exposes `Choose from Media Library`, `Upload from computer`, and `Remove image`.
- Image layouts now have distinct sizes: `full-width`, `contained`, `inline-medium`, `inline-small`, and `editorial-crop`.
- Captions stay centered and muted under the selected image layout.

## Blog Composer Minimal Fixes

- Blog Composer now exposes a single `Save changes` action in the topbar instead of duplicate save buttons.
- The right-side Blog Frontend Preview now uses the public rendering model through `ArticleHero` and `ContentBlockRenderer`, instead of fake preview cards.
- Blocks are edited from a stable local state before saving, so Image Block fields such as `imageUrl`, `alt`, `caption`, and `layout` persist after refresh.
- Inspector spacing was adjusted so Frontend Preview and Page Outline have clearer internal padding.
- The Blog Frontend Preview keeps a compact two-column public hero model instead of forcing the hero into a vertical reflow.
- `ArticleHero` now keeps more breathing room between description copy and byline metadata.
- For Text Sections, `block.title` is internal/editor-only; public rendering uses optional `block.data.heading` and `block.data.body`.

## Block Semantics Normalization

- `block.title` is an internal editor label for composer cards, Page Outline, inspector context, and content organization.
- `block.title` must not render publicly as article copy, kicker, heading, image label, caption, or fallback text.
- Text Blocks render visible content from `block.data.body`.
- `block.data.heading` remains a legacy optional visible heading on Text Blocks for existing content; new visible titles should use Heading Block.
- Image Blocks render only `imageUrl`, `alt`, `caption`, and `layout`; their internal title is not used as public alt text or visible copy.
- Empty `block.title` values can show UI-only fallbacks such as `Untitled text block`, but those fallbacks are not saved as content.

## Heading Block

- Heading Block was added for visible article, project, and docs titles inside the block flow.
- Heading Block fields are `block.title` for the internal editor label, plus `data.kicker`, `data.heading`, `data.subheading`, and `data.level`.
- `data.level` supports `h2`, `h3`, and `h4`.
- Public rendering shows optional kicker, visible heading, and optional subheading.
- `block.title` remains internal/editor-only and is never rendered publicly by Heading Block.
- Text Block is now intended for rich text body; its `data.heading` field remains only as a legacy optional visible heading for existing content.

## QA Documentation Policy

Every composer micro-fix must be documented in `STAGE_10_COMPOSER_QA_CHANGELOG.md` with:

- problem;
- decision;
- implementation summary;
- files changed;
- acceptance checks;
- status.

## Public Rendering

`ContentBlockRenderer` renders blocks publicly for:

- Blog detail.
- Project Overview / dossier.
- Docs detail.

Rule:

- If a page has visible `blocks`, render the blocks.
- If no visible blocks exist, render the existing markdown body with Nuxt Content.

This keeps all older content compatible.

## Storage

The editor saves:

- frontmatter metadata;
- `blocks`;
- cover fields;
- `mediaRefs`;
- markdown body fallback.

Markdown frontmatter serialization now supports arrays of objects by writing compact JSON values where needed.

## What Was Intentionally Not Implemented

- Drag and drop.
- Collaborative editing.
- Full WYSIWYG.
- Crop/resize UI.
- SVG upload or unsafe vector sanitization.
- Advanced file metadata editing from inside the picker.
- A full page builder for Home Composer.
- Advanced preview parity with the final public page.

## Validation

Run:

```bash
npm run build
```

Then validate:

- Open a Project editor.
- Add Text, Image, Code, Callout, Table, and Banner blocks.
- Select a cover image.
- Save.
- Refresh the editor and confirm blocks remain.
- Open the public Project route and confirm blocks render.
- Confirm older markdown-only content still renders.
