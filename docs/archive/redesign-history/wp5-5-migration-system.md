# WP5.5 migration system

> **Historical snapshot — superseded by WP6.2.** Field Log references below describe prior state and are not current information architecture or routes.

WP5.5 consolidates the remaining public site into the editorial system established in WP2–WP5. It is a migration pass, not a new visual generation.

## Shared shell

- `BaseLayout` now composes `EditorialHeader` and `EditorialFooter`, loads the redesign tokens and WP2 foundation styles, and supplies the shared skip target.
- Existing pages that still use `BaseLayout` therefore inherit the current navigation, footer, background, focus treatment, and outer gutters without being rewritten into `EditorialLayout`.
- The primary navigation is Projects, Writing, Memories, About, Explore, and Search. Field Log remains reachable as a historical collection rather than a primary destination.

## Page hierarchy

- `PageIntro` is a restrained editorial heading: eyebrow, title, optional metadata, description, and optional note.
- `ProjectWorkspaceLayout` keeps project navigation and resources but removes the emblem, status-badge, dashboard, and “currently on the desk” framing.
- `ProjectSidebar` uses plain section links and project metadata, with a compact disclosure on narrow screens.
- Supporting project pages retain their existing content and URLs while inheriting the quieter shared project shell.

## Presentation rules

- Use the editorial serif for reading and the shared sans/mono roles for interface and metadata.
- Prefer borders, whitespace, and typographic hierarchy over cards, shadows, pills, rotations, and ornamental badges.
- Keep one visible page title, one main landmark, consistent breadcrumbs/back links, and the shared header/footer.
- Preserve interactive code and content structures unless a change is needed for accessibility or shell compatibility.

## Compatibility boundary

The compatibility layout is intentional. Routes already migrated in WP2–WP5 are left on their established compositions, while older and specialized routes receive the same shell through `BaseLayout`. This avoids a high-risk route-by-route rewrite and keeps demos, search, replay, content slugs, and anchors intact.
