# Stage 7 - Home Composer Real

## Purpose

Stage 7 turns `/admin/home` from a visual mock into a functional editor for the public home page.

The source of truth is:

```txt
content/home/layout.json
```

The public `/` route reads that file and keeps safe fallbacks so missing fields do not break the page.

## Edited Areas

The Home Composer currently edits:

- hero label, headline, description, and CTAs;
- featured project selection;
- build log mode, limit, and manual notes;
- editorial feed mode, limit, content type filters, and manual items;
- institutional identity block copy and CTA.

## Layout Schema

```json
{
  "hero": {
    "label": "Digital systems magazine-lab",
    "headline": "Ideas that become systems.",
    "description": "Gribo Digital documents systems, prototypes, research notes and cultural infrastructure through a living editorial archive.",
    "primaryCta": {
      "label": "Explore projects",
      "to": "/repository"
    },
    "secondaryCta": {
      "label": "Explore labs",
      "to": "/labs"
    }
  },
  "featuredProject": {
    "mode": "manual",
    "slug": "tennis-image-analysis"
  },
  "buildLog": {
    "mode": "manual",
    "limit": 3,
    "manualItems": []
  },
  "feed": {
    "mode": "mixed",
    "limit": 4,
    "contentTypes": ["blog", "projects"],
    "manualItems": []
  },
  "identity": {
    "enabled": true,
    "headline": "Build, reflect, archive, evolve.",
    "description": "Gribo works like external memory.",
    "ctaLabel": "Explore labs",
    "ctaTarget": "/labs"
  },
  "sections": []
}
```

## Modes

- `manual`: use explicit admin-selected content.
- `latest`: derive content from the newest available content records.
- `mixed`: use manual selections first, then fill remaining space with latest content.

## Write Safety

Saving the Home Composer:

- requires an authenticated admin session;
- writes only to `content/home/layout.json`;
- validates the hero headline and positive limits;
- creates an automatic safety snapshot before writing.

Snapshots are stored under:

```txt
server/backups/snapshots/
```

## Current Limitations

- No drag and drop.
- No full live page preview.
- No media upload or hero image picker.
- No per-block enable/disable manager beyond the current identity block.
- Docs are not part of the home feed selector by default.
