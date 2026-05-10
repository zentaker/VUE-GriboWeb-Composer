# Future Modules

## A. Labs

Labs group content by editorial and research lines.

Initial labs:

- SysSecurity
- AI Systems
- Physics
- SysArchitecture
- Data Science

Labs are planned for Stage 1.2. They should connect posts, projects, docs, and future insights without turning the site into a generic category archive.

## B. Insights

Insights should collect anonymous metrics without user accounts.

Initial metrics:

- Views
- Reads
- Completion
- Average read time
- Metrics by content
- Metrics by lab

Country or region:

- Consider as a future phase.
- Do not implement now.
- Do not store complete IP addresses.
- Consider hosting-provided headers later.

First version constraint: keep analytics inside the same project and avoid external databases.

## C. Newsletter

Newsletter should eventually support:

- Email capture.
- Subscriber list.
- Campaign drafts.
- Manual send from admin.
- Notifications for new posts and projects.

Do not send automatically in the first version. The safer first workflow is draft campaign, review, then manual send.

## D. Multilingual / Transcreation

Multilingual support should be transcreation, not literal translation.

- Adapt culturally and tonally by audience.
- Use English as the base editorial language.
- Treat Spanish as a voice-aware adaptation, not flat translation.

This belongs to a future editorial and AI layer, not the current Nuxt foundation.

## E. Gribo IA

Gribo IA is a future conversational entity.

It should speak with Gribo's voice and memory. It should guide readers through labs, projects, posts, and documentation while preserving the editorial identity of Gribo.

This should be designed after the identity system, content model, and public archive are stable.

## F. SEO Editing

Future Gribo Studio editors should include SEO Settings for every public content type:

- SEO Title.
- SEO Description.
- OG Image.
- Canonical URL.
- Noindex toggle.
- Preview snippet.

The current SEO foundation is frontmatter-driven only. It does not include admin editing, previews, sitemap generation, or production domain verification.
