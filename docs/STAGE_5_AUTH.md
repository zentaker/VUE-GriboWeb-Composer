# Stage 5 Auth

Stage 5 adds the production safety gate for Gribo Studio.

## Scope

Protected:

- `/admin`
- `/admin/**`
- `/api/admin/**`

Not protected:

- Public pages: `/`, `/blog`, `/repository`, `/labs`, `/docs/**`
- Nuxt Content public rendering
- `/api/health`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/session`

## Login Model

Stage 5 uses a single administrator login.

Required environment variables:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me-before-production
SESSION_SECRET=change-me-before-production
```

Optional:

```env
ADMIN_PASSWORD_HASH=
```

`ADMIN_PASSWORD_HASH` is a SHA-256 hex digest of the admin password. If it is present, it is used instead of `ADMIN_PASSWORD`.

## Session

Successful login creates an HTTP-only cookie:

- `httpOnly: true`
- `sameSite: lax`
- `secure: true` on non-local production hosts
- `maxAge`: 8 hours

The cookie stores a signed session payload. The signature uses `SESSION_SECRET`.

## Production Safety

In production, admin login is disabled unless credentials are configured.

Production must not use:

- missing `ADMIN_USERNAME`;
- missing password or password hash;
- missing `SESSION_SECRET`;
- `change-me-before-production` as password or session secret.

If credentials are not configured:

- `/admin/login` shows a clear disabled-login message;
- `/api/admin/**` responds with `401 Unauthorized`;
- login returns a safe error.

## Local Development

For local development only, including local preview of the built server, if no environment variables are set:

- username: `admin`
- password: `change-me-before-production`

This fallback is blocked on non-local production hosts. Localhost keeps the fallback so Product Owner and developer validation stays simple without external services.

## Endpoints

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

Admin content APIs remain the same but now require a valid admin session.

## Testing

1. Open `/admin` without a session.
2. Confirm redirect to `/admin/login`.
3. Login with valid credentials.
4. Confirm redirect to `/admin`.
5. Use Gribo Studio normally.
6. Click Logout.
7. Confirm `/admin` redirects to `/admin/login`.
8. Confirm `/api/admin/content/list` returns `401` without a session.

## Not Implemented

- Roles.
- Multi-user accounts.
- OAuth.
- Password reset.
- Account management.
- Audit log.
- Rate limiting.
- CSRF token layer beyond same-site cookie behavior.
