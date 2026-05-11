# Stage 8 - Insights / Analytics Foundation

## Purpose

Stage 8 adds first-party anonymous analytics for Gribo Digital.

The goal is to understand public reading behavior without adding external analytics services, reader accounts, invasive cookies, or personal tracking.

## Storage

Analytics data lives outside Nuxt Content:

```txt
server/data/analytics/events.jsonl
```

This keeps editorial content separate from behavioral events.

Analytics is not included in Stage 6 full content backups by default.

## Events

Tracked event types:

- `view`
- `read_start`
- `read_progress`
- `read_complete`
- `cta_click`

Tracked content types:

- `home`
- `blog`
- `project`
- `docs`
- `lab`

Each event stores:

- event id;
- event type;
- content type;
- slug/path;
- lab when resolved;
- title when resolved;
- timestamp;
- anonymous session id;
- route;
- optional referrer;
- optional user agent hash;
- minimal metadata.

## Privacy Boundaries

Stage 8 does not store:

- raw IP addresses;
- public reader emails;
- names;
- precise location;
- user accounts;
- aggressive browser fingerprints;
- raw user agent strings.

The anonymous session id is stored in `sessionStorage`, not a tracking cookie.

## Reading Progress

Reading events are sent on long-form public routes:

- blog detail pages;
- project dossier overview pages;
- docs pages;
- lab detail pages.

Rules:

- `read_start` is sent after 5 seconds or after scroll begins.
- `read_progress` is sent once for 25%, 50%, and 75%.
- `read_complete` is sent once at 90%.
- Events are deduplicated per session and route.

## Endpoints

Public ingestion:

- `POST /api/analytics/event`

Protected admin endpoints:

- `GET /api/admin/analytics/summary`
- `GET /api/admin/analytics/content`
- `GET /api/admin/analytics/labs`
- `GET /api/admin/analytics/events?limit=40`
- `GET /api/admin/analytics/export`
- `POST /api/admin/analytics/clear`

All `/api/admin/analytics/*` routes require an authenticated admin session.

## Summary Calculation

Summaries are calculated from `events.jsonl`.

The dashboard derives:

- total views;
- total reads;
- read completions;
- CTA clicks;
- top content;
- metrics by lab;
- metrics by content type;
- recent anonymous events.

Completion rate is:

```txt
read_complete / read_start
```

## Admin UI

Insights are visible at:

```txt
/admin/insights
```

The page includes:

- overview cards;
- top content table;
- metrics by lab;
- metrics by type;
- recent anonymous events;
- refresh;
- analytics JSON export;
- danger-zone clear with `CLEAR ANALYTICS` confirmation.

## Validation

To validate locally:

1. Open a public page such as `/`.
2. Open a long-form page such as `/blog/openclaw-friction`.
3. Wait at least 5 seconds or scroll.
4. Log into Gribo Studio.
5. Open `/admin/insights`.
6. Confirm views and reads appear.

## Why No Third-Party Analytics Yet

Stage 8 keeps analytics internal because Gribo does not yet need:

- third-party dashboards;
- campaign attribution;
- account-level analysis;
- cross-device tracking;
- external storage.

This keeps the analytics foundation portable, inspectable, and privacy-minded.

## Limitations

- No country/region metrics.
- No device breakdown.
- No bot filtering beyond basic payload and route validation.
- No unique visitor reporting beyond anonymous session ids.
- No long-term retention policy UI yet.
- No per-editor analytics panels yet.
