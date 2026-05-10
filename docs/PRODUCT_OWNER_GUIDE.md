# Product Owner Guide

## 1. Purpose

This guide exists to validate Gribo Digital from the interface, not from the code.

Use it to understand what is ready, what is incomplete, what should be tested in the browser, and which product decisions still need attention. It complements the technical documentation; it does not replace it.

## 2. Current Product Stage

Current stage: **Stage 5 - Admin Auth + Production Safety Gate**.

Gribo Studio now starts to behave like a minimal CMS. From the UI, it can create, edit, save, and preview core content types:

- Blog entries.
- Repository projects.
- Documentation pages linked to projects.
- Labs.

Stage 5 adds the safety gate around Gribo Studio. The admin now requires login before a Product Owner can create, edit, or save content. The public website remains open.

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

## 6. Known Limitations

- Authentication is single-admin only.
- No roles or multi-user accounts.
- No OAuth.
- No password reset.
- No audit log.
- No media upload.
- No backup/import.
- No revision history.
- No physical delete.
- Home Composer is not functional yet.
- Newsletter is not implemented.
- Analytics/insights are not implemented.
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
- When should Backup/Import be implemented?
- Should Publish become a full workflow before Media Library?
- Should Labs eventually have their own editorial queues?
- Should Preview become a dedicated admin preview mode instead of opening public routes with draft preview?
