# World-View Integration Boundary

Wonderful Digital World (WDW) is the next website integration seam, not a runtime embedded in this repository.

## What the website owns

The website owns the reviewed source in `projection-sources/public-state.v1.json`, publication policy in `config/publication-policy.v1.json`, deterministic projection tooling in `scripts/`, and immutable public artifacts under `public/projections/releases/`. The manifest points consumers to one known-good release.

The public contract consists of versioned site-state, projects, and world artifacts. Existing schema names, visibility filtering, freshness fields, project identifiers, checksums, atomic publication, and rollback behavior must be preserved unless a separately reviewed contract migration changes them.

## What WDW may consume

WDW may read the published manifest and its referenced public artifacts. It should handle `fresh`, `partial`, `stale`, and unavailable states without treating missing data as private data or inventing state. A consumer must verify schema versions and may use the manifest checksums for integrity.

## What is outside the boundary

- Private repository state, personal memory, credentials, and unpublished drafts.
- Runtime access from the static website into another project repository.
- Direct LLM publication or automated publication without the configured human approval.
- A new interactive world-view UI, Mini Me, or background orchestration layer.
- Silent schema expansion or projection fields inferred from private data.

Publication remains deterministic and reviewable: validate the source, stage artifacts, require human approval, publish atomically, and retain a rollback path. Operational commands and recovery steps are documented in [public-projection-operations.md](./public-projection-operations.md); the existing integration proof is in [projection-integration-proof.md](./projection-integration-proof.md).
