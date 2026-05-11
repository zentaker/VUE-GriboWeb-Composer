# Roadmap

## 0. Global Architecture Conversation

- Type: Strategy
- Status: In progress
- Goal: Maintain global vision, decisions, and general project direction.

## 1. Nuxt Base

- Type: Development
- Status: Done
- Goal: Create Nuxt 4 + Vue 3 + TypeScript + Nuxt Content v3 base with layouts and placeholders.

## 1.1 Stabilization + Strategic Alignment

- Type: Development / Documentation
- Status: Done
- Goal: Validate the technical base and document the new strategic direction.

## 1.2 Labs Foundation

- Type: Development
- Goal: Add editorial lines: SysSecurity, AI Systems, Physics, SysArchitecture, Data Science.

## 1.3 SEO Metadata Foundation

- Type: Development / Content Model
- Status: Completed as Stage 3.1 foundation
- Goal: Add SEO fields to posts, projects, docs, and labs.
- Stage 3.1 implementation notes:
  - Blog, projects, docs, and labs now support SEO frontmatter.
  - Public pages use a shared `useGriboSeo` fallback strategy.
  - Site defaults include `siteUrl` and `defaultOgImage`.
  - No admin SEO UI was implemented.

## B1. Gribo Identity System

- Type: Brand / Editorial
- Goal: Define purpose, voice, tone, manifesto, values, target audience, and future Gribo IA vision.
- Note: This is not a programming stage.

## B2. Home Editorial Strategy

- Type: Brand / Content / UX
- Goal: Define exactly which blocks the home shows, which institutional copy it uses, which CTAs it presents, and how it represents the laboratory.
- Note: This stage happens before programming the final home.

## 2. Public Frontend Migration

- Type: Development
- Goal: Migrate home, blog, repository, and docs from mockups into the real Nuxt system.

## 2A. Public Home + Gribo Studio Visual Fidelity

- Type: Development / UI Implementation
- Status: Completed
- Goal: Migrate and visually calibrate the public home and Gribo Studio mock surfaces against the HTML references while preserving the existing Nuxt 4 structure.
- Completed visual alignment:
  - Public home.
  - Gribo Studio shell.
  - Admin overview.
  - Home Composer mock.
  - Project Composer mock.
  - Admin mock pages for blog, docs, media, and publish queue.
- Functional status:
  - No real CRUD.
  - No authentication.
  - No real newsletter.
  - No real analytics.
  - No functional Home Composer.
  - Admin and composer surfaces remain visual mocks only.

## 2B. Public Content Pages Visual Migration

- Type: Development / UI Implementation
- Status: Completed
- Goal: Visually migrate the public content surfaces for blog, repository, project dossiers, and technical documentation while keeping them read-only.
- Completed visual alignment:
  - Blog index as an editorial magazine surface.
  - Blog detail as a premium article/story page.
  - Repository index as a living project archive.
  - Project detail as a living dossier.
  - Docs layout with topbar, sidebar, central reading area, and TOC rail.
  - Docs detail pages for Tennis AI Friction overview, setup, and architecture.
- Functional status:
  - Public pages remain read-only.
  - No real CRUD.
  - No authentication.
  - No real analytics.
  - No real newsletter.
  - No functional Home Composer.
  - No admin editing or persistence was added.

## 3. Labs Foundation / Editorial Areas

- Type: Development / Content Architecture
- Status: Completed as Stage 2C foundation
- Goal: Add editorial areas/labs as first-class content surfaces: SysSecurity, AI Systems, Physics, SysArchitecture, and Data Science.
- Stage 2C implementation notes:
  - Docs was removed from the public main navigation.
  - Docs remains available as internal project documentation routes, linked from repository/project detail surfaces.
  - Labs was added as a public strategic section at `/labs`.
  - Labs group blog posts, projects, and documentation through a normalized `lab` field.
  - Initial labs:
    - SysSecurity.
    - AI Systems.
    - Physics.
    - SysArchitecture.
    - Data Science.

## 3.1 SEO Metadata Foundation

- Type: Development / Content Model
- Status: Completed
- Goal: Normalize SEO metadata across public content and apply reusable page-level metadata fallbacks.
- Completed scope:
  - Standard SEO fields for blog, projects, docs, and labs.
  - Frontmatter updated for existing content.
  - Reusable SEO composable added.
  - Basic `title`, `description`, Open Graph, canonical, and robots support.
- Functional status:
  - No admin SEO editor.
  - No sitemap generation.
  - No final production domain verification.

## 3.2 Editorial Tone Alignment / Seed Content Pass

- Type: Editorial / Content Architecture
- Status: Completed
- Goal: Align existing seed content with the Gribo voice defined in B1/B2 without implementing new features.
- Completed scope:
  - Site settings and home seed copy were refined.
  - Labs were rewritten as research lines instead of generic categories.
  - Existing blog posts and projects received stronger editorial framing.
  - Docs intros were lightly refined while keeping clarity first.
  - `docs/EDITORIAL_VOICE.md` was added as an internal writing guide.
- Functional status:
  - No new admin functionality.
  - No CRUD.
  - No analytics.
  - No newsletter implementation.
  - Seed content remains provisional and should evolve through the future editor.

## 3.3 Labs Deepening / Editorial Areas

- Type: Development / Content Architecture
- Status: Future
- Goal: Expand Labs into richer editorial area pages with curated sequences, lab-specific indexes, stronger docs relationships, and future navigation into each research track.

## 4. Admin Functional Minimum

- Type: Development / CMS Foundation
- Status: Closed / Done
- Goal: Create and edit posts, projects, docs, and labs from Gribo Studio using Nuxt Content files as the storage layer.
- Completed scope:
  - Admin list views now read real files from `content/blog`, `content/projects`, `content/docs`, and `content/labs`.
  - A generic content editor can read frontmatter, edit metadata, edit SEO fields, edit markdown body, and save changes.
  - New drafts can be created for blog posts, projects, docs pages, and labs.
  - Delete is intentionally soft: content is archived by setting `status: archived`.
  - Server endpoints validate content type and file paths before reading or writing.
- Functional status:
  - No authentication yet.
  - No roles or permissions.
  - No media upload.
  - No Home Composer persistence.
  - No backup/import.
  - Admin write endpoints are not production-safe until Admin Auth is implemented.
- Acceptance:
  - Stage acceptance is UI-first / blackbox.
  - Routes, visible actions, persistence, console health, and build output decide closure.
  - See `docs/STAGE_4_UI_ACCEPTANCE.md`.

## 5. Admin Auth + Production Safety Gate

- Type: Development / Security / Product Safety
- Status: Completed
- Goal: Protect Gribo Studio and admin write APIs before adding larger modules.
- Scope:
  - Single-admin login.
  - HTTP-only signed session cookie.
  - `/admin/**` route protection.
  - `/api/admin/**` protection.
  - Public site remains open.
- Functional status:
  - No roles.
  - No multi-user accounts.
  - No OAuth.
  - No external database.
  - No password reset.
- No audit log.

## 5.1 Admin Users + Google Login

- Type: Development / Security / Product Safety
- Status: Completed
- Goal: Add minimal file-based admin users and optional Google OAuth login without introducing external databases or roles.
- Scope:
  - Admin Users screen in Gribo Studio.
  - Password-based admin users with hashed passwords.
  - Google-based admin users by authorized email.
  - User enable/disable.
  - Password change.
  - Session identity includes admin user metadata.
- Functional status:
  - No roles.
  - No granular permissions.
  - No public registration.
  - No password reset.
  - No audit log.

## 6. Content Portability / Backup System

- Type: Development / CMS Safety / Content Operations
- Status: Completed / Provisionally accepted in local UI
- Goal: Export, import, and restore Gribo content between local and hosted instances without rebuilding content manually.
- Scope:
  - Backups screen in Gribo Studio.
  - Full-site `.gribo.json` backup export.
  - Project package export with associated docs.
  - Blog package export.
  - Package import preview.
  - Import as copy.
  - Replace existing with confirmation.
  - Automatic safety snapshots before import/restore.
  - Protected `/api/admin/backups/*` endpoints.
- Functional status:
  - No ZIP packaging yet.
  - No external/cloud storage.
  - No Git sync.
  - No media upload workflow.
  - Full restore writes package files but does not prune files missing from the package.

## 7. Home Composer Real

- Type: Development / CMS Editing
- Status: Completed
- Goal: Edit the public home from Gribo Studio without touching code.
- Scope:
  - `/admin/home` edits `content/home/layout.json`.
  - Public `/` reads the saved home layout.
  - Hero, featured project, build log, editorial feed, and institutional block are configurable.
  - Manual, latest, and mixed feed modes are supported.
  - Saving requires admin authentication and creates a safety snapshot.
- Functional status:
  - No drag and drop.
  - No media upload.
  - No full live preview.
  - No version history.

## 8. Insights / Analytics Foundation

- Type: Development / Analytics / Privacy
- Status: Completed
- Goal: Track anonymous public usage signals and expose them in Gribo Studio.
- Scope:
  - First-party event ingestion at `/api/analytics/event`.
  - Anonymous session id stored in `sessionStorage`.
  - Page views for public routes.
  - Read start, progress and completion events for long-form content.
  - CTA click events for key public calls to action.
  - Insights dashboard at `/admin/insights`.
  - Protected admin analytics endpoints.
  - Local JSONL storage under `server/data/analytics/`.
- Functional status:
  - No third-party analytics.
  - No raw IP storage.
  - No reader accounts.
  - No country/region analytics yet.
  - No external dashboard.

## 9. Media Library / Asset Manager

- Type: Development / Media Operations
- Status: Completed / Provisional seed foundation
- Goal: Provide a Studio media surface and reusable seed assets for covers and content blocks.
- Functional status:
  - Shared Studio Media Library assets are available for composer selection.
  - Upload persistence remains future work.

## 10. Rich Content Composer

- Type: Development / CMS Editing / Visual Fidelity
- Status: Completed
- Goal: Align the content composer with `gribo-project-content-composer.html` and add a functional block-based editing foundation.
- Scope:
  - Project/Blog/Docs editor now supports blocks.
  - Block library and canvas added.
  - Right inspector added.
  - Cover/media selection added from Studio Media Library seed assets.
  - Public Blog, Project, and Docs pages render blocks when present.
  - Markdown body remains fallback for older content.
- Functional status:
  - No drag and drop.
  - No real upload persistence inside the composer.
  - No crop/resize tooling.
  - Preview is a simple block preview, not full public-page parity.

## 11. Final Integration / Programming Closure

- Type: QA / Stabilization / Production Readiness
- Status: Completed
- Goal: Close the main programming pass before deep manual QA and real content population.
- Scope:
  - Production build validated.
  - Public route smoke test completed.
  - Admin route smoke test completed after login.
  - Admin API protection smoke test completed.
  - Admin route middleware session bug fixed for production SSR.
  - Product Owner final QA checklist added.
- Functional status:
  - Manual browser QA is still required for real content creation.
  - Media upload, backup restore, analytics read-progress, and Google OAuth need deeper environment-specific testing.
- Next phase:
  - Manual QA + Content Population.

## 2.1 Home Editorial Blocks

- Type: Development
- Goal: Turn the home into configurable blocks: hero, labs, active projects, manifesto, newsletter, participation CTA.

## 5. Content Model Completion

- Type: Development / Content Architecture
- Goal: Consolidate the blog, projects, docs, labs, home, and settings model.

## 6. Admin Visual / Gribo Studio

- Type: Development
- Status: Done as part of 2A visual fidelity pass
- Goal: Visually migrate the admin from the mockups.

## 7. Home Composer Real (Legacy Roadmap Slot)

- Type: Development
- Status: Covered by Stage 7 current implementation
- Goal: Edit home blocks from the admin.

## 8. Media Library

- Type: Development
- Goal: Upload and manage images.

## 9. Insights / Analytics (Legacy Roadmap Slot)

- Type: Development
- Status: Covered by Stage 8 foundation
- Goal: Views, reads, completion, metrics by content, and metrics grouped by lab.
- Note: Keep this inside the same project. Do not use an external database in the first version. Evaluate internal or local storage.

## 10. Newsletter / Subscriptions

- Type: Development
- Goal: Email capture, subscribers, manual campaigns, and sending new posts/projects.
- Note: Do not send automatically in the first version. Create campaign drafts and allow manual sending from admin.

## 11. Admin Auth

- Type: Development
- Goal: Login, guards, and admin route protection.

## 12. Multilingual / Transcreation Layer

- Type: Future / AI / Editorial
- Goal: Culturally adapted language versions, not literal translation.
- Note: English is the base editorial language. Spanish and other languages are tone adaptations for their audiences.

## 13. Gribo IA

- Type: Future / AI Product
- Goal: Conversational layer for Gribo identity, editorial memory, and research lines.

## 14. Deploy / Performance / Final SEO

- Type: Development / Release
- Goal: Publication, optimization, sitemap, OG metadata, performance, and final release preparation.
