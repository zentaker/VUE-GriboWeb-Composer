# Product Owner Guide

## 1. Purpose

This guide exists to validate Gribo Digital from the interface, not from the code.

Use it to understand what is ready, what is incomplete, what should be tested in the browser, and which product decisions still need attention. It complements the technical documentation; it does not replace it.

## 2. Current Product Stage

Current stage: **Stage 10 - Rich Content Composer**.

Gribo Studio now starts to behave like a minimal CMS. From the UI, it can create, edit, save, and preview core content types:

- Blog entries.
- Repository projects.
- Documentation pages linked to projects.
- Labs.

Stage 8 adds anonymous first-party analytics. The admin now requires login before a Product Owner can create, edit, save content, manage backups/users, change the public Home layout, or review Insights. The public website remains open.

## 3. Product Areas

### Public Site

- **Home**: public editorial entry point for Gribo Digital.
- **Blog**: magazine/editorial entries.
- **Repository**: living project dossiers.
- **Labs**: research and editorial areas.
- **Docs**: technical documentation linked to projects, not a main public navigation area.

### Gribo Studio

- **Admin overview**: internal cockpit for the current editorial system.
- **Blog entries**: list, create, edit, save, and preview article drafts.
- **Repository projects**: list, create, edit, save, preview, and associate documentation.
- **Documentation**: create and edit docs pages connected to project folders.
- **Labs**: create and edit editorial/research lines.
- **Home Composer**: edit the public home hero, featured project, build log, feed, and institutional copy.
- **Insights**: review anonymous page views, reading progress, CTA clicks, top content, metrics by lab, and metrics by content type.
- **Rich Content Composer**: create and edit project, blog, and docs content with blocks, cover images, media references, metadata, SEO, and markdown fallback.
- **Content creation flows**: contextual creation from each admin area.

## 4. What The Product Owner Can Validate

### Blog

- [ ] Can open `/admin/blog`.
- [ ] Can create a new blog entry.
- [ ] New Blog Entry opens the editor directly.
- [ ] Can edit a blog entry.
- [ ] Can save changes.
- [ ] Can refresh and see that changes persist.
- [ ] Can preview/view the entry.
- [ ] Related notes do not appear unless explicitly configured.

### Projects

- [ ] Can open `/admin/projects`.
- [ ] Can create a new project.
- [ ] Project creation includes a setup step.
- [ ] If `No documentation yet` is selected, Create Project returns to `/admin/projects`.
- [ ] Can edit project metadata.
- [ ] Can create a project with no documentation yet.
- [ ] Can associate existing documentation.
- [ ] If existing documentation is attached, Create Project returns to `/admin/projects`.
- [ ] Can create the first documentation page if needed.
- [ ] If `Create first docs page` is selected, Create Project opens the docs editor directly.
- [ ] Can view the project page.

### Docs

- [ ] Can open `/admin/docs`.
- [ ] Can create docs linked to a project.
- [ ] Docs creation asks for project/docs folder information.
- [ ] Can edit docs.
- [ ] Can view docs in the public docs layout.
- [ ] Docs do not feel like orphan content unless intentionally treated as an orphan draft.

### Labs

- [ ] Can open `/admin/labs`.
- [ ] Can create a lab.
- [ ] New Lab opens the editor directly.
- [ ] Can edit a lab.
- [ ] Can view the public lab page.

## 5. Stage 5 Acceptance Criteria

Stage 5 can be accepted only if the product works from the browser:

- Public routes load without login.
- Admin routes redirect to `/admin/login` without a session.
- Correct credentials open Gribo Studio.
- Incorrect credentials show an error.
- Logout closes the session.
- Admin APIs reject unauthenticated requests.
- Admin APIs work with a valid session.
- Existing Stage 4 content flows still work after login.
- Build passes.
- There are no critical browser console errors.

Acceptance should not depend on whether internal code follows a preferred framework style. Internal details matter only when they affect product behavior, security, persistence, deployment, routing, or build stability.

## Admin Login & Safety

Gribo Studio now requires login.

What changed:

- Public pages still load without login.
- `/admin` and every admin subpage redirect to `/admin/login` without a session.
- Admin write APIs are blocked without a session.
- Logout clears the session.

How to validate:

- Open `/admin` in a fresh browser session.
- Confirm it redirects to `/admin/login`.
- Try a wrong username or password and confirm an error appears.
- Login with the configured admin credentials.
- Confirm `/admin` loads.
- Click Logout.
- Confirm `/admin` asks for login again.

Production safety:

- Gribo Studio should not be published without `ADMIN_USERNAME`, `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET`.
- If production credentials are missing, login should not be allowed.
- This is still a single-admin system. Roles, team accounts, OAuth, password reset, and audit logs are future work.

## Admin Users & Google Login

Stage 5.1 adds a minimal Admin Users area inside Gribo Studio.

What the Product Owner can do:

- Open `/admin/users` after login.
- See the list of admin users.
- Create a password-based admin user.
- Create a Google-based admin user by authorized email.
- Edit name, email, username, and provider.
- Change a password.
- Disable or enable a user.

Password login:

- Password users sign in with username/email and password.
- A disabled user should not be able to enter.
- Password hashes must never appear in the UI.

Google login:

- `/admin/login` includes `Continue with Google`.
- Google OAuth must be configured before this can be fully tested.
- Only Google emails already registered as active admin users can enter.
- If a Google account is not registered, the UI should show: `This Google account is not authorized for Gribo Studio.`

Before production:

- Create at least one real admin user.
- Replace placeholder credentials and `SESSION_SECRET`.
- Configure Google OAuth only if Google login will be used.
- Confirm disabled users cannot enter.
- Confirm `/api/admin/users/*` returns `401` without a session.

## Project Creation Behavior

Project creation has three expected outcomes:

- **No documentation yet**: creates the project as a draft and returns to the project list. Documentation can be added later from the Project editor.
- **Attach existing documentation**: lets the Product Owner select existing docs/pages, creates the project, links the selected documentation, and returns to the project list.
- **Create first docs page**: creates the project, creates the first docs page, and opens the Docs editor directly. This is the only Project creation path that should continue into another editor immediately.

If the interface sends the Product Owner to a second generic setup screen, that is a UX bug.

## Project Documentation Attach Flow

Use **No documentation yet** when the project should exist as a draft dossier before technical docs are ready. After creation, the system should return to `/admin/projects`; documentation can be added later from the Project editor.

Use **Attach existing documentation** when docs already exist and should be connected to the project. The UI should show a list of documentation pages with checkboxes, not a primary/additional hierarchy.

Available docs can be attached. Attached docs are already connected to another project and should not appear in the main picker unless they already belong to the project being edited.

To validate this flow:

- Create or edit a Project.
- Choose Attach existing documentation.
- Select one or more documentation pages.
- Save or create the Project.
- Open the Project editor again and confirm the Documentation section shows the selected docs as attached documentation.

Use **Create first docs page** when the project and its first docs page should be created together. This is the only Project creation flow that should open the Docs editor immediately after creation.

The current content fields are:

- `relatedDocs`: main list of docs attached to the project.
- `docsPath`: compatibility/fallback public documentation route.
- `docsFolder`: primary documentation folder.
- `docsPaths`: complete selected documentation route list when available.

## Documentation Management

`/admin/docs` is the place to understand the state of documentation before attaching it to projects.

- **Available docs** have no project attached yet and can be connected to a project.
- **Attached docs** already belong to a project.
- **Archived docs** should not be treated as active content.
- **Docs folders** organize documentation groups, such as `tennis-ai-friction` or `dev`.

Use **Attach existing documentation** when the docs already exist. Use **Create first docs page** when documentation starts from zero and needs a new folder or first page.

## Project As Documentation Overview

A Project is a living dossier, not a Blog article. Its public page should look like the documentation experience, not like a new invented layout.

- **Project Overview** is rendered from the Project itself: title, summary, status, lab, year, stack, body, and documentation state.
- **Docs pages** are technical pages attached to the Project through `relatedDocs`, `docsPaths`, `docsPath`, or `docsFolder`.
- **Visual rule**: Project Overview should reuse the docs visual system: public header, left sidebar, central documentation content, and right rail.
- **Blog** remains an editorial article surface.
- **Docs** remains a technical reading surface.
- If a Project page looks like a blog article, a project-card page, or a new visual system unrelated to docs, treat it as a visual regression.

To validate a Project with docs:

- Open `/repository/[project-slug]`.
- Confirm the page uses the docs-style experience: sidebar, central documentation content, and right rail.
- Confirm the sidebar shows Overview plus only docs attached to that project.
- Confirm the Documentation section lists the same attached docs.
- Click a docs page and confirm it opens a real `/docs/...` route.

To validate a Project without docs:

- Open `/repository/[project-slug]`.
- Confirm Overview still renders the Project.
- Confirm Documentation shows `No documentation attached yet`.
- Confirm there are no fake docs links or unrelated Tennis/OpenClaw links.

## Project Dossier Navigation

The Project Dossier navigation must stay consistent between the Project Overview and every attached docs page.

- **Overview** is the project detail page at `/repository/[project-slug]`.
- **Documentation items** are docs pages attached to that specific project.
- The sidebar should show the same project context on Overview and docs pages.
- If a project has two attached docs, both must appear in the sidebar and in the Overview documentation index.
- The public header should appear only once.

Validation steps:

- Open the Project Overview.
- Confirm the sidebar shows Overview, Project index, Build log, and every attached doc.
- Open the first attached doc.
- Confirm the sidebar still shows the same project and all attached docs.
- Open the second attached doc.
- Confirm the active item changes, but the project context does not.
- Confirm breadcrumbs use the real project title and doc title.

## Global Visual Validation

The Product Owner should verify that the header remains visually consistent across public pages, docs/dossier pages, and Gribo Studio.

- The public header should appear only once.
- The Gribo Digital logo should sit near the left structural edge.
- The public navigation should sit near the right structural edge.
- Home, Blog, Repository, Labs, and Docs should not feel like they use different public headers.
- Gribo Studio may use its own admin topbar, but it should keep the same edge-aware alignment logic.

## Backups & Content Portability

Stage 6 adds a protected Backups area inside Gribo Studio.

What the Product Owner can do:

- Open `/admin/backups` after login.
- Export a full-site backup.
- Export a single project package.
- Export a single blog package.
- Import a package by uploading a `.gribo.json` file or pasting package JSON.
- Preview an import before anything is written.
- Choose Import as copy to avoid overwriting existing content.
- Choose Replace existing only when intentionally overwriting content.
- Download the latest safety snapshot after imports create one.

When to use each action:

- Use **Export full backup** before deployments, migrations, major content edits, or risky imports.
- Use **Export project package** to move one project plus its associated docs.
- Use **Export blog package** to move one article/editorial entry.
- Use **Import as copy** when testing a package or moving content into an instance that may already contain similar work.
- Use **Replace existing** only when the package is trusted and replacing the current content is intentional.

Before restore:

- Confirm the package comes from a trusted Gribo instance.
- Review the preview list.
- Check conflicts.
- Confirm a safety snapshot will be created.
- For full restore, type the required danger-zone confirmation.

Validation after import:

- Imported blog content should appear in `/blog`.
- Imported project content should appear in `/repository`.
- Imported docs should appear in `/docs` or project documentation context.
- Imported labs should appear in `/labs`.
- Existing content should still load.

## Home Composer

Stage 7 makes `/admin/home` a real editor for the public Home.

What the Product Owner can edit:

- Hero label, headline, description, and CTA buttons.
- Featured project.
- Build log mode, limit, and manual notes.
- Editorial feed mode, content types, limit, and manual selections.
- Institutional identity block copy and CTA.

How to validate:

- Login and open `/admin/home`.
- Change the hero headline or description.
- Click **Save Home Layout**.
- Refresh `/admin/home` and confirm the value persists.
- Open `/` and confirm the public Home reflects the saved change.
- Select a manual featured project and confirm it appears in the public spotlight card.
- Switch build log or feed modes and confirm the preview updates before saving.

What not to expect yet:

- No drag and drop.
- No media upload.
- No complete live page preview.
- No version history for home layout changes.

The Home Composer writes to `content/home/layout.json`. A safety snapshot is created before saving.

## Insights / Analytics

Stage 8 adds a first-party analytics foundation inside Gribo Studio.

Open:

```txt
/admin/insights
```

What the Product Owner can see:

- Total views.
- Total reads.
- Reading completion rate.
- CTA clicks.
- Top content.
- Metrics by lab/editorial line.
- Metrics by content type.
- Recent anonymous events.

Definitions:

- **View**: a public page was opened.
- **Read**: a reader stayed at least 5 seconds or started scrolling on a long-form page.
- **Completion**: a reader reached around 90% scroll depth.
- **CTA click**: a tracked public call-to-action was clicked.

Privacy boundaries:

- No public reader accounts.
- No reader emails.
- No raw IP addresses.
- No precise country/region tracking yet.
- No third-party analytics vendor.
- No tracking cookies.

How to validate:

- Open a public page such as `/`.
- Open `/blog/openclaw-friction`, wait a few seconds, and scroll.
- Log into Gribo Studio.
- Open `/admin/insights`.
- Click Refresh metrics.
- Confirm the overview cards and top content update.

Data management:

- Export analytics downloads local anonymous analytics as JSON.
- Clear analytics requires typing `CLEAR ANALYTICS`.
- Clearing analytics does not delete editorial content.

## Rich Content Composer

Stage 10 improves the Project Composer and shared content editor so it feels closer to the provided `gribo-project-content-composer.html` mockup.

What the Product Owner can validate:

- Open a Project editor from `/admin/projects`.
- Confirm the editor looks like a composer, not a plain form.
- Confirm it has a hero, tabs, block library, central canvas, cover image area, and right inspector.
- Add a Text Section, Image Block, Code Block, Callout, Table, and Banner.
- Select a cover image from the real Media Library or upload a JPG/PNG/WebP from the computer.
- Select or upload an image inside an Image Block.
- Move a block up/down.
- Duplicate a block.
- Hide/show a block.
- Delete a block.
- Save, refresh, and confirm blocks persist.
- Open the public Project page and confirm blocks render.

Blog Composer validation:

- Open a Blog entry from `/admin/blog`.
- Type a title and confirm the composer hero title updates immediately.
- Type a description or excerpt and confirm the composer hero subtitle updates immediately.
- Choose `draft`, `review`, `published`, or `archived` from the Status select.
- Choose a Lab from the Track / Lab select.
- Use manual tags, or click Generate tags for simple local suggestions.
- In the cover area, choose an image from Media Library or upload one from the computer and confirm the composer updates.
- Blog entries do not use cover images. Use Image Blocks for article images.
- Change visual style and accent color, then confirm the right-side Frontend Preview changes.
- Add an Image Block, choose/upload an image, add alt text and caption, and save.
- Choose an Image Block layout: full-width for large article media, contained for diagrams/screenshots, inline-medium or inline-small for support images, and editorial-crop for intentional decorative crop.
- Use Remove image to clear an Image Block without deleting the asset from Media Library.
- Leave Text Section or Image Block titles empty when the public content should not show an internal block title.
- Confirm the Save control shows Saving/Saved feedback.
- Open the public blog page and confirm the image appears with a centered caption.

How to think about blocks:

- Blocks are structured editorial sections saved with the content.
- Markdown body remains as fallback for older content.
- If a page has visible blocks, public rendering uses the blocks.
- If a page has no visible blocks, public rendering keeps using the markdown body.

What not to expect yet:

- No drag and drop.
- No full WYSIWYG editor.
- No crop/resize tool.
- No collaborative editing.
- No real upload persistence from inside the block editor.
- Preview is useful but not a pixel-perfect final public page preview.

## 6. Known Limitations

- Authentication is admin-only.
- Admin Users exist, but there are no roles or granular permissions yet.
- No password reset.
- No audit log.
- Media Library supports local JPG/PNG/WebP upload, but crop/resize, SVG sanitization, and cloud storage are not implemented yet.
- Google OAuth foundation exists, but it still requires real provider credentials.
- Backup/import uses `.gribo.json`; ZIP packages are not implemented yet.
- Git sync and cloud storage are not implemented.
- Analytics is local file-based and does not include country/region, bot filtering, retention rules, or external dashboards yet.
- No revision history.
- Physical delete is only available for Blog test/draft cleanup, and it moves files to local trash instead of removing them with one click.
- Home Composer is functional for the current home layout fields, but it does not include drag and drop, media upload, or version history yet.
- Newsletter is not implemented.
- Insights/analytics foundation is implemented, but deep validation needs real content and server traffic.
- Publishing is still a content status, not a complete editorial workflow.

## 7. What Not To Worry About Yet

The Product Owner does not need to review:

- Internal folder structure.
- Endpoint naming.
- Composables.
- Server utilities.
- Exact framework conventions.
- Whether the implementation resembles Angular, Express, or a classic REST backend.

Those details should be reviewed only if they create visible product issues, security risk, persistence problems, routing bugs, deployment failures, or build errors.

## 8. How To Report Bugs

Use this format:

- **Where did it happen?** Include the route, such as `/admin/blog`.
- **What did you click?** Name the button, link, field, or action.
- **What did you expect?** Describe the intended result.
- **What happened instead?** Describe the visible issue.
- **Screenshot if possible.**
- **Does refreshing change anything?**
- **Does it affect public page, admin page, save, preview, or navigation?**

Example:

> On `/admin/projects`, I clicked New Project and selected Create first docs page. I expected to land in the docs editor. Instead, I saw the generic content type setup again.

## 9. How Future Stages Should Be Validated

Every future implementation stage must include:

- UI checklist.
- Product Owner validation steps.
- Known limitations.
- What was intentionally not implemented.
- Next-stage recommendations.

Technical docs should explain how the system works. Product Owner docs should explain how to validate the system and make decisions without reading code.

## 10. Current Open Questions

- Should Blog have direct publishing, or only drafts for now?
- Should Project setup allow attaching multiple docs folders?
- Should Docs ever be allowed without a Project?
- When should Auth move earlier in the roadmap?
- Should backup packages become ZIP files when media handling grows?
- Should Publish become a full workflow before Media Library?
- Should Labs eventually have their own editorial queues?
- Should Preview become a dedicated admin preview mode instead of opening public routes with draft preview?

## 11. Cleaning Test Blog Entries

Before adding real editorial content, Blog test entries can be cleaned from the UI.

Open `/admin/blog`, edit a blog entry, then open the `Metadata` tab. The `Danger Zone` is inside the Blog Composer.

Use **Archive entry** when content should stop appearing publicly but remain recoverable from the editor. Archive changes the entry status to `archived` and keeps the file.

Use **Delete entry** only for drafts, tests, or content that should leave `content/blog/`. Delete requires typing `DELETE BLOG ENTRY` and moves the file to local server-side trash instead of deleting it with a single click.

Product Owner validation:

- Confirm test entries no longer appear in `/admin/blog`.
- Confirm `openclaw-friction` and `internet-proximity` still exist.
- Confirm archived entries do not appear on the public `/blog`.
- Confirm a deleted test entry no longer opens publicly.
- Confirm normal create/edit/save/preview still works for Blog.

## 12. Final Manual Testing Plan

This is the recommended Product Owner path before real launch or hosted deployment.

### First Pass: Access And Navigation

- Open `/admin` without a session and confirm it redirects to `/admin/login`.
- Log in.
- Visit `/admin`, `/admin/home`, `/admin/blog`, `/admin/projects`, `/admin/docs`, `/admin/labs`, `/admin/media`, `/admin/backups`, `/admin/insights`, and `/admin/users`.
- Confirm the Studio sidebar and topbar remain consistent.
- Log out and confirm `/admin` asks for login again.

### Second Pass: Real Content Population

- Create one real blog entry.
- Add metadata, SEO fields, markdown body, and at least three blocks.
- Add or select an image.
- Save, refresh, and open the public blog page.
- Create one real project.
- Add cover image, metadata, blocks, and documentation.
- Create at least two docs pages linked to that project.
- Open the public project page and confirm it behaves like a documentation dossier.
- Create or refine one lab page and confirm `/labs/[slug]` loads.

### Third Pass: Operational Safety

- Export a full backup before large edits.
- Export one project package.
- Export one blog package.
- Test import preview only in the main working copy.
- Test restore only in a copied workspace or clean environment.
- Confirm `/admin/insights` shows activity after public routes are visited.

### Before Deploy

- Confirm `npm run build` passes.
- Check public routes on desktop and mobile.
- Check browser console for critical red errors.
- Configure real production credentials.
- Configure Google OAuth variables only when ready to test Google login.
- Export a backup before deploying.

### After Deploy

- Log in on the hosted URL.
- Confirm public routes do not require login.
- Confirm `/admin` requires login.
- Create one small draft and save it.
- Verify backups, users, media, and insights load.
- Re-test the public home, one blog, one project, one docs page, and one lab page.
