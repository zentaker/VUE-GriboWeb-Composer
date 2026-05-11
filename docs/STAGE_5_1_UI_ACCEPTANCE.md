# Stage 5.1 UI Acceptance Checklist

## Admin Users

- [ ] `/admin/users` appears in the Studio sidebar.
- [ ] `/admin/users` redirects to login without a session.
- [ ] `/admin/users` loads after login.
- [ ] User list loads.
- [ ] Password hashes are not visible in the UI.
- [ ] New password user can be created.
- [ ] New Google user can be created by email.
- [ ] User name/email/username can be edited.
- [ ] Password can be changed.
- [ ] User can be disabled.
- [ ] Disabled user cannot sign in.
- [ ] User can be enabled again.

## Password Login

- [ ] Active password user can sign in.
- [ ] Incorrect password shows an error.
- [ ] Disabled password user cannot sign in.
- [ ] Session includes user identity.

## Google Login

- [ ] `Continue with Google` appears on `/admin/login`.
- [ ] Google button is disabled/not useful until OAuth env vars are configured.
- [ ] Authorized active Google user can sign in.
- [ ] Unauthorized Google account is rejected.
- [ ] Google session remains active after redirect.
- [ ] Logout works after Google login.

## Session

- [ ] Session expires according to `ADMIN_SESSION_MAX_AGE_SECONDS`.
- [ ] `/admin` asks for login without session.
- [ ] `/api/admin/*` responds `401` without session.
- [ ] `/api/admin/users/*` responds `401` without session.
- [ ] `/api/health` remains public.

## No Regression

- [ ] Blog admin still works after login.
- [ ] Project admin still works after login.
- [ ] Docs admin still works after login.
- [ ] Labs admin still works after login.
- [ ] Public home loads without login.
- [ ] Public blog loads without login.
- [ ] Public repository loads without login.
- [ ] Public labs load without login.
- [ ] Public docs load without login.

## Build

- [ ] `npm run build` passes.

## Known Limits

- No roles yet.
- No granular permissions yet.
- No password reset yet.
- No audit log yet.
- Google login requires external OAuth credentials to fully validate.

