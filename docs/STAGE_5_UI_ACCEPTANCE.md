# Stage 5 UI Acceptance Checklist

Stage 5 closes only when authentication works from the browser and does not regress Stage 4 content flows.

## Admin Auth

- [x] `/admin` redirects to `/admin/login` without a session.
- [x] `/admin/blog` redirects to `/admin/login` without a session.
- [x] `/admin/projects` redirects to `/admin/login` without a session.
- [x] `/admin/docs` redirects to `/admin/login` without a session.
- [x] `/admin/labs` redirects to `/admin/login` without a session.
- [x] `/admin/content/new` redirects to `/admin/login` without a session.
- [x] Login with correct credentials enters Gribo Studio.
- [x] Login with incorrect credentials shows an error.
- [x] Logout closes the session.
- [x] After logout, `/admin` asks for login again.

## Admin APIs

- [x] `/api/admin/*` returns `401 Unauthorized` without a session.
- [x] `/api/admin/*` works with a valid session.
- [x] `/api/health` remains public.

## Public Site

- [x] `/` loads without login.
- [x] `/blog` loads without login.
- [x] `/repository` loads without login.
- [x] `/labs` loads without login.
- [x] `/docs/...` loads without login.

## No Regression

- [ ] Creating a blog still works after login.
- [ ] Creating a project still works after login.
- [ ] Creating docs still works after login.
- [ ] Associating docs to a project still works after login.
- [ ] Creating a lab still works after login.

## Build

- [x] `npm run build` passes.

## Known Limits

- No roles.
- No multi-user accounts.
- No OAuth.
- No password reset.
- No audit log.
- No production rate limiting.
