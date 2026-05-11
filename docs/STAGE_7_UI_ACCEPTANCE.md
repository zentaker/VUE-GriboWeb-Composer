# Stage 7 UI Acceptance - Home Composer

## Admin

- [ ] `/admin/home` redirects to login without a session.
- [ ] `/admin/home` loads after login.
- [ ] Hero fields load from `content/home/layout.json`.
- [ ] Editing hero and saving persists after refresh.
- [ ] Public `/` reflects saved hero changes.
- [ ] Featured project selector lists projects.
- [ ] Manual featured project saves and appears on `/`.
- [ ] Build log can switch between manual and latest mode.
- [ ] Manual build log items can be added and removed.
- [ ] Feed can switch between latest, manual, and mixed mode.
- [ ] Feed selector lists blog entries, projects, and labs.
- [ ] Invalid selections show clear errors.
- [ ] Save requires an admin session.
- [ ] A safety snapshot is created before saving.
- [ ] Public home remains visually consistent with the existing mockup.

## No Regression

- [ ] Blog admin still works.
- [ ] Project admin still works.
- [ ] Docs admin still works.
- [ ] Labs admin still works.
- [ ] Backups remain accessible.
- [ ] Admin Users remains accessible.
- [ ] Public Blog works.
- [ ] Public Repository works.
- [ ] Public Docs works.
- [ ] Public Labs works.
- [ ] `npm run build` passes.

## Known Limits

- No drag and drop yet.
- No media upload yet.
- No full live preview yet.
- No Home block version history yet.
