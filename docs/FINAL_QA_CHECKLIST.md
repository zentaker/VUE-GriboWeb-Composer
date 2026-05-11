# Final QA Checklist

Use this checklist for Product Owner blackbox QA from the browser.

## Public Site

- [ ] Home loads at `/`.
- [ ] Home reflects saved Home Composer content.
- [ ] Blog index loads at `/blog`.
- [ ] Blog detail loads and reads like an article.
- [ ] Repository loads at `/repository`.
- [ ] Project detail loads as a dossier/documentation overview.
- [ ] Attached docs appear from project pages.
- [ ] Docs pages load as technical documentation.
- [ ] Labs index loads at `/labs`.
- [ ] Lab detail pages load and show related content where available.
- [ ] Public header appears once.
- [ ] Docs are not in the public main navigation.
- [ ] Mobile layout is usable on key public routes.

## Admin Access

- [ ] `/admin` redirects to `/admin/login` without session.
- [ ] Login works with valid credentials.
- [ ] Login fails with invalid credentials.
- [ ] Logout ends the session.
- [ ] After logout, `/admin` asks for login again.
- [ ] Admin sidebar is visible and usable after login.
- [ ] Admin topbar is visible and usable after login.

## Admin Surfaces

- [ ] `/admin` loads.
- [ ] `/admin/home` loads.
- [ ] `/admin/blog` loads.
- [ ] `/admin/projects` loads.
- [ ] `/admin/docs` loads.
- [ ] `/admin/labs` loads.
- [ ] `/admin/media` loads.
- [ ] `/admin/backups` loads.
- [ ] `/admin/insights` loads.
- [ ] `/admin/users` loads.

## Content Creation

- [ ] Create a blog entry.
- [ ] Edit blog metadata.
- [ ] Edit blog SEO.
- [ ] Add Text/Image/Code/Callout/Table/Banner blocks.
- [ ] Save and refresh.
- [ ] Public blog page renders blocks.
- [ ] Content without blocks still renders markdown.
- [ ] Blog Composer shows `Metadata / Danger Zone`.
- [ ] Archive a disposable blog entry.
- [ ] Archived blog entry does not appear on public `/blog`.
- [ ] Delete a disposable test blog entry only after typing `DELETE BLOG ENTRY`.
- [ ] Deleted test blog entry disappears from admin and public routes.
- [ ] Create a project with no documentation.
- [ ] Create a project with attached existing documentation.
- [ ] Create a project and first docs page.
- [ ] Project page renders as dossier overview.
- [ ] Attached docs appear in the project/sidebar context.
- [ ] Create a docs page linked to a project.
- [ ] Docs page renders in docs layout.
- [ ] Create and edit a lab.
- [ ] Public lab page loads.

## Media

- [ ] Upload JPG.
- [ ] Upload PNG.
- [ ] Upload WebP.
- [ ] Invalid file is blocked.
- [ ] Edit alt text.
- [ ] Edit caption.
- [ ] Edit tags.
- [ ] Select image from composer.
- [ ] Selected image appears in editor preview.
- [ ] Selected image appears publicly after save.

## Home Composer

- [ ] Edit hero label/headline/description.
- [ ] Save.
- [ ] Refresh admin page and confirm persistence.
- [ ] Open `/` and confirm the public home changed.
- [ ] Select featured project.
- [ ] Configure build log/feed mode.

## Backups

- [ ] Export full backup.
- [ ] Export project package.
- [ ] Export blog package.
- [ ] Import preview shows files and conflicts.
- [ ] Restore is not tested on the primary working copy unless a safety copy exists.

## Insights

- [ ] Opening public pages records views.
- [ ] Long content scroll records read progress.
- [ ] `/admin/insights` shows summary cards.
- [ ] Top content table updates after activity.
- [ ] Admin routes do not count as public analytics.

## Security

- [ ] `/api/admin/*` returns `401` without session.
- [ ] `/api/admin/*` works with session.
- [ ] Public routes do not require login.
- [ ] Password hashes are not visible in `/admin/users`.
- [ ] Google login is tested only after OAuth variables are configured.

## Pre-Deploy

- [ ] `npm run build` passes.
- [ ] No critical red browser console errors.
- [ ] Required production environment variables are configured.
- [ ] Backup export succeeds before deploy.
- [ ] Manual smoke test passes after deploy.
