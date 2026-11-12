# World-View Integration Boundary

Wonderful Digital World (WDW) has a read-only website integration seam at `/world/`; it is not a runtime embedded in this repository.

## What the website owns

The website owns the reviewed source in `projection-sources/public-state.v1.json`, publication policy in `config/publication-policy.v1.json`, deterministic projection tooling in `scripts/`, immutable public artifacts under `public/projections/releases/`, the typed consumer in `src/data/world-view.ts`, and the presentation route at `/world/`. The manifest points consumers to one known-good release.

Since 2026-11-12 the WDW publisher (`wdw-publish-public`) commits a 24-hour-delayed release under `public/projections/wdw/` once a day. Haley approved automatic publication of resident status on 2026-11-12; text still needs her review. When a WDW release is present and valid, `/world/` reads it before the manual publication.

`/world/` draws a flat cutaway house on the server (`src/data/world-cutaway.ts`). No renderer runs in the browser, and the page uses only the published fields: resident name, role, place and status.

The public contract consists of versioned site-state, projects, and world artifacts. Existing schema names, visibility filtering, freshness fields, project identifiers, checksums, atomic publication, and rollback behavior must be preserved unless a separately reviewed contract migration changes them.

## What WDW may consume

The World View may read the published manifest and its referenced public artifacts through the existing validation boundary. It handles `fresh`, `partial`, `stale`, and unavailable states without treating missing data as private data or inventing state. The consumer verifies schema versions, publication status, relationships, route-safe links, and manifest checksums before rendering.

## What is outside the boundary

- Private repository state, personal memory, credentials, and unpublished drafts.
- Runtime access from the static website into another project repository.
- Direct LLM publication, or automated publication of anything beyond the WDW resident-status release described above without the configured human approval.
- Live or private interactive simulation, Mini Me runtime state, or a background orchestration layer. A reviewed, sanitized Mini Me resident may appear in the public projection like any other published resident.
- Silent schema expansion or projection fields inferred from private data.

Publication remains deterministic and reviewable: validate the source, stage artifacts, require human approval, publish atomically, and retain a rollback path. Operational commands and recovery steps are documented in [public-projection-operations.md](./public-projection-operations.md); the existing integration proof is in [projection-integration-proof.md](./projection-integration-proof.md).
