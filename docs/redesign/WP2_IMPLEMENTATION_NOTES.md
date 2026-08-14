# WP2 implementation notes

Date: 2026-08-14

## Objective and scope

WP2 turns the redesign foundation into a public interface for a one-person technology lab. The implementation is intentionally route-scoped to:

- `/`
- `/projects/`
- `/projects/the-human-model/`

Writing, Memories, About, World View, the Wonderful Digital World destination, and other project detail pages remain on their existing templates. This keeps the work-package boundary explicit and avoids an accidental site-wide redesign.

## Investigation findings

- The site is an Astro static build deployed to GitHub Pages. Existing content collections, routes, and legacy layouts remain viable and were not migrated.
- The WP1 design foundation already provides the warm editorial palette, typography roles, spacing, focus treatment, and opt-in body selector used here.
- The Human Model has enough first-party material for a substantive project narrative: its bodybuilding origin, D0–D3 framework, evidence structure, technical decisions, limitations, and current direction.
- Wonderful Digital World has a real public repository, but no established first-party detail route in this site. WP2 therefore links to that repository instead of inventing a local destination.
- World View is a distinct future surface and has no confirmed canonical public URL. Its navigation position is reserved as non-interactive text.
- The existing Field Log remains the temporary destination behind the public label “Memories,” preserving existing routes while a distinct future content model is defined.

## Implementation architecture

- `EditorialLayout.astro` opts only the three WP2 routes into the redesign and supplies canonical, Open Graph, and Twitter metadata.
- `EditorialHeader.astro` and `EditorialFooter.astro` provide shared landmarks, active navigation, a skip link, and a compact mobile treatment.
- `wp2.css` contains the WP2 composition layer. It is scoped under `body[data-redesign-foundation]` so legacy pages are unaffected.
- `wp2-content.ts` centralizes the shared flagship relationship, Wonderful Digital World metadata, and the real surprise route.
- The pages are statically rendered and add no client-side JavaScript.
- Instrument Sans and Newsreader are served locally as variable WOFF2 files, avoiding a runtime font request to a third party.

## Content and interaction decisions

- The homepage uses an editorial mosaic rather than a uniform card grid. Both flagships are visible in the first project composition and their relationship is stated directly.
- Current projects are Bridget, QA Agents, and Career Intelligence; all links resolve to existing routes.
- “Surprise me” resolves to the existing How I Build trail.
- The Projects index gives the two flagships visual priority, then presents supporting systems in a quieter index.
- The Human Model page separates narrative from evidence and uses D0–D3 as the information spine. Claims are deliberately bounded: the page describes a research system and prototype direction, not a finished clinical or autonomous product.
- Publication governance remains an architectural concern but is not presented inside the homepage Memory preview.

### Field Log and Memories

**Field Log and Memories are not the same content model.**

Field Log contains existing and historical update-oriented material. Memories is a future agent-curated episodic and editorial model that may include observations, connections, discoveries, milestones, project changes, failures, interesting artifacts, and insights.

The current `/field-log/` destination behind the “Memories” navigation label is a temporary compatibility bridge, not a statement of semantic equivalence. Memories may eventually draw from or relate to Field Log material, but it should receive an appropriate information model in a later work package. WP2.1 does not build that model or migrate existing Field Log content.

## Visual and accessibility implementation

- The palette is warm paper, ink, olive, burgundy, and blue; there are no gradients, glass effects, or stock imagery.
- Heading scale is editorial rather than billboard-sized. Layout hierarchy comes from rules, asymmetric spans, whitespace, and typography.
- Keyboard focus is visible, the skip link becomes visible on focus, active navigation uses `aria-current`, and each page has a single main landmark and H1.
- Mobile layouts collapse deliberately, tables scroll within their container, and no horizontal viewport overflow is introduced at 390 px.
- The generated 1200×630 social image is abstract, text-free, and represents the bridge between human signals, computational models, and networked worlds.

## Deliberate exclusions

- No legacy page templates were redesigned.
- No new World View or Wonderful Digital World page was fabricated.
- No fake metrics, testimonials, live demos, autonomous capabilities, or publication claims were introduced.
- No SPA navigation, animation framework, analytics, or other JavaScript dependency was added.
