# WP4 handoff: Writing as a library

Date: 2026-08-14

## Outcome

WP4 replaces the chronological writing index with a collection-led library while preserving the existing essays and their quiet reading experience. Writing now has a stable editorial schema, explicit project and essay relationships, canonical-source support, and a secondary chronology for readers who still want it.

## Delivered

- A collection-led `/writing/` landing page with:
  - a short library introduction;
  - a nonuniform featured/current area;
  - three editorial collections;
  - a compact full chronology as a secondary view.
- Restrained writing detail headers that show collections, date, source, and project context without overwhelming the essay.
- Curated related navigation based on semantic relationship kinds rather than automatic previous/next links.
- Canonical and external-source handling for republished or externally sourced work.
- A shared writing-library data layer that validates IDs, memberships, relationships, project targets, public visibility, and collection coverage during page generation.
- The route-backed Meticulous investigation integrated into the same writing model and detail treatment.

## Information architecture

The public library is organized into three durable editorial bodies:

1. **Keeping context** — work about continuity, memory, and preserving the thread of an idea.
2. **Evidence before autonomy** — work about observability, replay, evaluation, and earning trust in automated systems.
3. **Tools for whole people** — work about products that accommodate identity, judgment, and the realities around a task.

An essay may belong to more than one collection, but it has one primary collection for hierarchy and presentation. Chronology remains available without defining the library.

Supporting decisions are recorded in:

- `docs/redesign/wp4-writing-corpus-audit.md`
- `docs/redesign/wp4-writing-taxonomy.md`
- `docs/redesign/wp4-writing-agent-organization.md`

## Implementation map

- `src/content.config.ts`
  - Adds stable writing IDs, collection membership, primary collection, canonical/source metadata, editorial weight, archive state, and explicit relationships.
- `src/data/writing-library.ts`
  - Defines collection metadata, relationship labels, URL resolution, sorting, lookup helpers, and corpus validation.
- `src/pages/writing/index.astro`
  - Implements the collection-led library and secondary chronology.
- `src/pages/writing/[slug].astro`
  - Preserves essay bodies while adding canonical metadata and curated connections.
- `src/pages/projects/qa-agents/meticulous/index.astro`
  - Brings the route-backed investigation into the common writing presentation and relationship system.
- `src/components/WritingDocumentHeader.astro`
  - Provides the restrained detail-page metadata hierarchy.
- `src/components/WritingLibraryEntry.astro`
  - Provides shared library-entry presentation.
- `src/components/WritingConnections.astro`
  - Renders curated project and writing paths with semantic labels.
- `src/content/writing/*.md`
  - Carries collection, source, canonical, and relationship metadata without rewriting essay prose.

## Validation evidence

The final implementation passed:

- Prettier formatting checks.
- Existing relationship-graph validation: 27 artifact relationships validated.
- Astro diagnostics: 80 files, 0 errors, 0 warnings, 0 hints.
- Static production build: 40 pages generated.
- Internal-link validation: all links across 40 generated HTML files resolved.
- Git whitespace/error check.

WP4's writing-specific validation runs as part of page generation and the production build. It verifies stable IDs and slugs, valid public collection membership, primary-collection consistency, canonical metadata, relationship counts and targets, duplicate/self/private links, project targets, and collection coverage.

Visual browser QA was not run; the site-building workflow used for this implementation reserves browser-driven QA for an explicit request. Static, type, build, and link validation are complete.

## Boundaries and follow-up

- Essay prose was not rewritten.
- No search, CMS, tagging interface, or dynamic filtering was added.
- Memories remain separate for WP5; the schema reserves `relatedMemories` without surfacing unfinished navigation.
- No forced flagship-project links were added where the editorial relationship would be weak.
- The homepage required no change because it does not contain a legacy writing-mode switch.
- Deployment, staging, and committing were not part of this work package.
