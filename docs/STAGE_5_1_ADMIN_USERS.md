# Stage 5.1 Admin Users + Google Login

Stage 5.1 extends the Stage 5 safety gate with file-based admin users and optional Google OAuth login.

## What It Protects

- `/admin/**` remains protected.
- `/api/admin/**` remains protected.
- Admin user management APIs are protected under `/api/admin/users/*`.
- Public pages remain open.

## User Storage

Admin users are stored in:

```txt
server/data/admin-users.json
```

This file is intentionally outside `content/` because it can contain sensitive password hashes. It must not be exposed as public Nuxt Content.

## User Fields

Each admin user has:

- `id`
- `name`
- `email`
- `username`
- `authProvider`: `password` or `google`
- `googleEmail`
- `status`: `active` or `disabled`
- `passwordHash` for password users
- `createdAt`
- `updatedAt`
- `lastLoginAt`

The UI never receives `passwordHash`.

## Password Users

Password users authenticate with username/email and password.

Passwords are never stored as plain text. Stage 5.1 uses Node `crypto.scryptSync` with a per-password random salt:

```txt
scrypt$salt$hash
```

Validation rules:

- Password minimum length: 10 characters.
- Password confirmation must match.
- Username is required and unique.
- Email is required and unique.

## Google Users

Google users authenticate through Google OAuth.

Google login is not public registration. A Google account can enter only when its email matches an active admin user in `server/data/admin-users.json`.

Unauthorized Google accounts are redirected to login with:

```txt
This Google account is not authorized for Gribo Studio.
```

Required env variables:

```env
NUXT_OAUTH_GOOGLE_CLIENT_ID=
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=
NUXT_OAUTH_GOOGLE_REDIRECT_URL=
```

`NUXT_OAUTH_GOOGLE_REDIRECT_URL` should point to:

```txt
https://your-domain.com/api/auth/google/callback
```

For local testing it can be:

```txt
http://localhost:3000/api/auth/google/callback
```

## Session Expiration

Sessions use the existing signed HTTP-only cookie model. JWT was not introduced.

Configure expiration with:

```env
ADMIN_SESSION_MAX_AGE_SECONDS=86400
```

If missing, the fallback is 8 hours.

## Bootstrap / Lockout Safety

If no file-based admin users exist, the existing environment bootstrap still works:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me-before-production
SESSION_SECRET=change-me-before-production
```

For production, replace placeholders before publishing.

## APIs

Protected admin user APIs:

- `GET /api/admin/users/list`
- `POST /api/admin/users/create`
- `POST /api/admin/users/update`
- `POST /api/admin/users/status`
- `POST /api/admin/users/password`

Public auth APIs:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`

## Not Implemented

- Roles.
- Permission matrix.
- Multi-user teams beyond admin users.
- OAuth providers other than Google.
- Password reset.
- Invite emails.
- Audit log.
- Rate limiting.
- JWT.

