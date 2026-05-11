# Stage 8 UI Acceptance - Insights / Analytics

## Public Tracking

- [ ] Opening `/` records a `view`.
- [ ] Opening `/blog/[slug]` records a `view`.
- [ ] Waiting or scrolling on `/blog/[slug]` records `read_start`.
- [ ] Scrolling long-form content records 25%, 50%, and 75% `read_progress`.
- [ ] Scrolling to 90% records `read_complete`.
- [ ] Opening `/repository/[slug]` records a `view`.
- [ ] Opening `/docs/[slug]` records a `view`.
- [ ] Opening `/labs/[slug]` records a `view`.
- [ ] `/admin/**` does not record public analytics.

## Admin Insights

- [ ] `/admin/insights` appears in the Gribo Studio sidebar.
- [ ] `/admin/insights` requires login.
- [ ] Overview cards load.
- [ ] Top content shows data after public events are recorded.
- [ ] Metrics by lab show data when lab can be resolved.
- [ ] Metrics by type show blog/project/docs/lab/home groups.
- [ ] Refresh metrics works.
- [ ] Export analytics JSON works.
- [ ] Clear analytics requires `CLEAR ANALYTICS`.

## Privacy / Security

- [ ] Raw IP addresses are not stored.
- [ ] Reader emails are not stored.
- [ ] Reader accounts are not created.
- [ ] `/api/admin/analytics/*` requires a session.
- [ ] Invalid event types are rejected.
- [ ] Admin and API routes are rejected by public event ingestion.

## No Regression

- [ ] Home Composer still works.
- [ ] Backups still work.
- [ ] Users/Auth still work.
- [ ] Blog public pages still work.
- [ ] Repository public pages still work.
- [ ] Docs public pages still work.
- [ ] Labs public pages still work.
- [ ] `npm run build` passes.
