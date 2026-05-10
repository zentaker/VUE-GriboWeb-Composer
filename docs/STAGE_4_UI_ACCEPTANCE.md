# Stage 4 UI Acceptance Checklist

Stage 4 closes with a blackbox/UI-first validation model. Internal implementation details are reviewed only when they create product, security, persistence, routing, build, or deployment risk.

## Blog

- [x] `/admin/blog` loads with real `content/blog` items.
- [x] `New Blog Entry` button is aligned with the Gribo Studio panel header.
- [x] `New Blog Entry` opens the Blog editor directly.
- [x] Blog no longer uses a draft setup screen.
- [x] Draft appears in the blog list.
- [x] Edit opens an existing blog post.
- [x] Save persists frontmatter/body changes.
- [x] Refresh keeps saved changes.
- [x] Preview/View renders real content.
- [x] Existing blog content no longer falls through to `Article placeholder`.
- [x] Related notes only render when explicit `relatedProjects`, `relatedDocs`, or `relatedPosts` exist.

## Projects

- [x] `/admin/projects` loads with real `content/projects` items.
- [x] `New Project` button is aligned with the Gribo Studio panel header.
- [x] `New Project` opens Project setup.
- [x] Project setup supports `No documentation yet`.
- [x] `No documentation yet` returns to the project list after creation.
- [x] Project setup supports `Attach existing documentation`.
- [x] `Attach existing documentation` shows selectable existing docs/pages.
- [x] `Attach existing documentation` has a clear human-readable UI.
- [x] `Attach existing documentation` no longer uses Primary documentation as the product model.
- [x] Documentation pages can be selected with checkboxes.
- [x] Multiple docs can be attached to a project.
- [x] Docs already attached to another project are hidden from the main picker or shown disabled/secondary.
- [x] Docs folder can be selected from existing folders or created when starting a new docs page.
- [x] Attach mode requires at least one selected documentation item.
- [x] `Attach existing documentation` returns to the project list after creation.
- [x] Project setup supports `Create first docs page`.
- [x] `Create first docs page` opens the docs editor directly.
- [x] Draft appears in the project list.
- [x] Edit opens an existing project.
- [x] Save persists frontmatter/body changes.
- [x] Refresh keeps saved changes.
- [x] View renders real project content.
- [x] Project editor shows a `Documentation` section.
- [x] Project editor shows attached docs in human-readable form.
- [x] Project editor shows attached documentation as a list of docs pages.
- [x] `Add existing documentation` works from the Project editor.
- [x] Raw `docsPath`, `docsFolder`, and `relatedDocs` fields are not the primary UX.
- [x] Project editor exposes `View documentation` and `New Docs Page for this project` when metadata supports it.
- [x] Project editor allows adding docs after creation.
- [x] Project editor reads as a dossier surface, not a blog editor.

## Docs

- [x] `/admin/docs` loads with real `content/docs` items.
- [x] `New Docs Page` button is aligned with the Gribo Studio panel header.
- [x] Docs created from a Project open the editor directly.
- [x] Docs created from `/admin/docs` use one minimal setup only.
- [x] Docs Page creation requires or uses project association fields.
- [x] Docs Page stores project metadata: `project`, `projectSlug`, and `docsFolder`.
- [x] Docs Page is created under `content/docs/[docsFolder]/`.
- [x] `/admin/docs` shows folder, attached project/availability state, and editorial status.
- [x] `/admin/docs` can filter documentation by folder.
- [x] Edit opens an existing docs page.
- [x] Save persists docs metadata/body changes.
- [x] View renders docs content inside the public docs layout.

## Labs

- [x] `/admin/labs` loads with real `content/labs` items.
- [x] `New Lab` button is aligned with the Gribo Studio panel header.
- [x] `New Lab` opens the Lab editor directly.
- [x] Lab no longer uses a draft setup screen.
- [x] Lab draft appears in the list.
- [x] Edit opens an existing lab.
- [x] Save persists lab metadata/body changes.
- [x] View renders the public lab page.

## Global Composer Behavior

- [x] `/admin/content/new` remains a global composer and may show the content type dropdown.
- [x] Contextual sidebar buttons reset correctly when moving between content types.
- [x] `New Blog Entry` never stays stuck in Project mode.
- [x] `New Docs Page` never stays stuck in Project mode.
- [x] `New Lab` never stays stuck in Project mode.
- [x] `/admin/content/new?type=blog&direct=true` opens Blog editor directly.
- [x] `/admin/content/new?type=projects` opens fixed Project mode.
- [x] `/admin/content/new?type=docs` opens fixed Docs Page mode.
- [x] `/admin/content/new?type=docs&direct=true&projectSlug=...` opens Docs editor directly for a Project.
- [x] `/admin/content/new?type=labs&direct=true` opens Lab editor directly.

## Tabs

- [x] Content is active.
- [x] Metadata is available through editor fields.
- [x] SEO is available through editor fields.
- [x] Media is disabled as `Later`.
- [x] Preview is disabled as `Later` where no real tabbed preview exists.

## Public

- [x] Home loads.
- [x] Blog index loads.
- [x] Blog detail loads.
- [x] Repository index loads.
- [x] Project detail loads.
- [x] Project detail renders as a documentation/dossier experience.
- [x] Project Overview uses the existing docs visual system from the documentation mockup.
- [x] Project Overview does not introduce a separate blog-like or unrelated project-card layout.
- [x] Project Overview renders Project information, not an empty docs page.
- [x] Project sidebar shows Overview plus attached docs.
- [x] Attached docs appear as secondary pages.
- [x] Projects without docs show an empty documentation state.
- [x] No hardcoded docs appear in Project dossier navigation.
- [x] No hardcoded related articles appear in Project dossier.
- [x] Blog detail remains article-like.
- [x] Docs detail remains technical documentation-like.
- [x] Labs index loads.
- [x] Lab detail loads.
- [x] Docs page loads.
- [x] Public header remains consistent.
- [x] Docs does not return to the public main nav.
- [x] New saved content does not break Nuxt Content.

## Project Documentation Layout

- [x] Docs/Project layout renders a single public header.
- [x] Project Dossier layout alignment is docs-specific and does not affect Home, Blog, or Labs.
- [x] `/repository/[slug]` uses the documentation reading pattern: public header, left sidebar, central content, and right rail.
- [x] Overview is generated from `content/projects/[slug].md`.
- [x] Attached docs are resolved from `relatedDocs`, `docsPaths`, `docsPath`, then `docsFolder`.
- [x] Project Overview shows all attached docs, not only the first docs route.
- [x] Attached docs appear in the sidebar under Documentation.
- [x] Sidebar stays consistent between Project Overview and Docs Pages.
- [x] Docs pages keep project context when opened from attached docs.
- [x] Breadcrumbs use real project and docs data.
- [x] Docs pages preserve the existing docs layout and remain technical pages.
- [x] Blog detail remains article-like and does not adopt the docs layout.
- [x] No hardcoded Tennis/project data appears for unrelated projects.
- [x] No hardcoded docs appear for unrelated projects.
- [x] No hardcoded related articles appear.
- [x] A project without docs shows a clear empty state instead of fake links.
- [x] `npm run build` passes.

## Global Header Consistency

- [x] Public header appears once.
- [x] Header alignment is consistent across Home, Blog, Repository, Labs, Docs, and Studio.
- [x] Public header content is aligned to the structural viewport edges according to the visual mockups.
- [x] Public header does not use the centered editorial content shell.
- [x] Docs/project dossier layout does not duplicate header.
- [x] `npm run build` passes.

## Manual Validation Routes

Admin:

- `/admin`
- `/admin/blog`
- `/admin/projects`
- `/admin/docs`
- `/admin/labs`
- `/admin/content/new`
- `/admin/content/new?type=blog`
- `/admin/content/new?type=projects`
- `/admin/content/new?type=docs`
- `/admin/content/new?type=labs`

Public:

- `/`
- `/blog`
- `/blog/openclaw-friction`
- `/repository`
- `/repository/tennis-image-analysis`
- `/labs`
- `/labs/ai`
- `/docs/tennis-ai-friction`

## Stage 4 Test Drafts

The following drafts were created to validate create/edit/save/preview persistence:

- `content/blog/stage-4-draft-note.md`
- `content/blog/test-stage-4-blog.md`
- `content/projects/stage-4-project-draft.md`
- `content/projects/test-stage-4-project.md`
- `content/docs/tennis-ai-friction/stage-4-docs-draft.md`
- `content/docs/test-stage-4-project/test-stage-4-docs-two.md`
- `content/labs/stage-4-lab-draft.md`
- `content/labs/test-stage-4-lab.md`

## Build And Console

- [x] `npm run build` passes.
- [x] No critical red console errors appeared during route, save, and preview validation.

## Limitations

- No authentication yet.
- Admin write endpoints are not production-safe.
- No real media upload.
- No backup/import.
- No revision history.
- No physical delete requirement for Stage 4.
- Delete remains soft archive through `status: archived`.
