# Current Website Architecture

This document is the canonical architecture reference for the website. Historical redesign work packages live in `docs/archive/redesign-history/` and do not override it.

## Product model

- **Maria** owns the global shell, homepage, project collection, and About page. It provides the calm editorial surface shared by the site.
- **Compass** owns deep project navigation: workspace headers, grouped project links, related material, and cross-project context.
- **Monograph** owns Writing: the library index, writing taxonomy, entry metadata, and long-form reading layout.
- **Memories** is the public memory layer. Every item must pass the repository's provenance, privacy, visibility, and asset validation before it can render.
- **Explore** is the experimental discovery surface. It may present current public routes and relationships in new ways, but it does not create a parallel content system.
- **Wonderful Digital World (WDW)** is the next integration seam. This repository currently exposes static, reviewed public projections only; it does not implement a private runtime or autonomous publication.
- **Field Log is retired. DO NOT RESTORE.** It has no current route, navigation item, search entry, sitemap entry, or public projection entry.

## Shared shell and styles

`src/layouts/BaseLayout.astro` owns document metadata, the global header/footer, skip link target, and the stylesheet load order. Page families compose it through the layouts in `src/layouts/`.

Styles have four retained responsibilities:

- `src/styles/redesign-tokens.css`: shared color, typography, spacing, radius, and shadow tokens.
- `src/styles/global.css`: reset, base document behavior, accessibility, and shared project/document utilities.
- `src/styles/maria.css`: global Maria shell, collection, page, and card primitives.
- `src/styles/wp2.css`: specialized editorial and deep-workspace patterns retained by active routes.

Component-scoped styles stay with the component that owns them. New global rules should reuse existing tokens and enter the narrowest applicable layer.

## Content and data ownership

- `src/content/projects/` and `src/content/writing/` own public authored entries.
- `src/data/project-workspaces.ts` owns Compass navigation groups and project-specific summaries.
- `src/data/writing-library.ts` owns Monograph collections and relationship validation.
- `src/data/memories.ts` plus `src/data/memories/` own the reviewed public memory dataset and provenance rules.
- `src/data/navigation.ts` owns Explore destinations, trails, topics, and relationships.
- `projection-sources/public-state.v1.json` is the reviewed source for public projection artifacts.
- `public/projections/` contains generated, versioned artifacts only. Its schema and publication policy remain stable integration contracts.

Search and Explore consume only these current public sources. Archived documentation and retired concepts are never search content.

## Route families

The full classification is in [CURRENT_ROUTE_INVENTORY.md](./CURRENT_ROUTE_INVENTORY.md). In summary, Maria owns the canonical top level, Compass specializes project descendants, Monograph specializes Writing, Memories has one canonical public surface, and Explore owns explicitly experimental discovery routes.

## Integration boundary

The website may publish reviewed, static, public-safe projections for WDW and other consumers. It may not read private repositories at runtime, expose secrets or private memory, let an LLM publish directly, or silently change projection schemas. See [integrations/world-view-boundary.md](./integrations/world-view-boundary.md).
