# Gribo Digital

Nuxt 4 foundation for Gribo Digital: an editorial laboratory for digital systems, cultural infrastructure, and living research.test

## Install

```bash
npm install
```

The repository includes `.npmrc` with `ignore-scripts=true` because this Windows environment blocks native package build scripts such as `@parcel/watcher`. Nuxt Content is configured with Node native SQLite, so no native SQLite package is required.

## Run locally

```bash
npm run dev
```

Useful scripts:

```bash
npm run build
npm run generate
npm run preview
```

On this Windows workspace the scripts call Nuxt through `C:\Progra~1\nodejs\node.exe` so local runs do not depend on the blocked `node_modules/.bin` shims.

## Structure

- `app/assets/css/main.css`: global visual system, theme tokens, reusable Gribo classes.
- `app/components`: small base, layout, card, block, and admin components.
- `app/layouts`: public, admin Studio, and docs layouts.
- `app/pages`: navigable placeholder routes for home, blog, repository, docs, and admin.
- `content`: Nuxt Content v3 mock entries for blog, projects, docs, home layout, and site settings.
- `docs`: strategic and technical project documentation.
- `server/api`: minimal health endpoint.
- `public/uploads`: reserved upload target for later stages.
- `references`: reserved HTML mockup folder.

## Project Docs

- [Roadmap](docs/ROADMAP.md)
- [Project Brief](docs/PROJECT_BRIEF.md)
- [Architecture Notes](docs/ARCHITECTURE_NOTES.md)
- [Future Modules](docs/FUTURE_MODULES.md)
- [Codex Prompts](docs/CODEX_PROMPTS.md)

## Implemented in this stage

- Nuxt 4 project scaffold with Vue 3, TypeScript, npm scripts, and Nuxt Content v3.
- Content collections for blog, projects, docs, home data, and settings data.
- Dark-first Gribo visual system with light theme support.
- Public, docs, and Gribo Studio layouts.
- Placeholder pages for editorial home, blog, repository, docs, and admin areas.
- HTML references copied into `references/` and used to align tokens, cards, nav, docs, and Studio styling.
- Mock content for initial editorial and technical routes.
- Stage 1.1 strategic documentation and stabilization notes.

## Not implemented yet

- Real authentication.
- Real admin persistence.
- Image uploads or media library behavior.
- Backend services, databases, microservices, or external CMS integrations.
- Functional Home Composer, Markdown editor, or publishing workflow.

## Stage 2 suggestion

Turn the placeholders into a content editing workflow: define stable Content schemas, add draft/published states, create form-only Studio screens that write to local mock state, and map the available HTML references into component-level design targets without building persistence yet.
