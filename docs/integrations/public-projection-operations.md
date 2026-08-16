# WP6 projection operations

This repository is the Astro renderer and consumer. Wonderful Digital World remains the canonical backend/domain owner; its repository is not modified by WP6. Until that producer is connected, `projection-sources/public-state.v1.json` is the explicit, human-approved public source and the world projection reports `partial` freshness.

## Gate A and ownership

- The versioned public boundary is `PublicSiteState`, `PublicProjectState`, and `WorldProjection`, plus the existing `PublicMemory` contract.
- Contracts contain presentation-independent public facts only. They do not contain theme, component, layout, credential, access-control, or private-content fields.
- Stable IDs are producer-owned. Astro validates and renders published artifacts; it does not infer canonical world state.
- The source/export adapter belongs with the Wonderful Digital World backend when that backend is connected. Preserve these JSON shapes or publish a separately versioned contract and migrate the consumer deliberately.

## Publication runbook

1. Update the allowlisted source at `projection-sources/public-state.v1.json`, or pass another reviewed source with `--source=...`.
2. Preview a deterministic staged release with `npm run projections:generate`.
3. Validate the staged output with `npm run validate:projections -- --dir=.wp6/staging/<release-id>`.
4. Publish only after human review: `npm run projections:publish -- --approve`.
5. Run `npm run validate`, which covers contracts, checksums, freshness, relationships, memories, asset alt text, Astro type checks, the production build, and built-link validation.
6. Deploy only the validated build through the repository's normal deployment workflow. WP6 does not invoke deployment.

Publication writes immutable content-addressed releases under `public/projections/releases/`, then atomically swaps `public/projections/manifest.v1.json`. A repeated identical publication is a `noop`. Local operation receipts are written under ignored `.wp6/receipts/`.

## Policy and failure behavior

`config/publication-policy.v1.json` is manual by default: automation is disabled, the kill switch is on, sensitive data may never publish, an LLM may never publish, and human approval is required. Invalid, unauthorized, unavailable, stale, and partial states remain explicit. Validation fails closed, so a bad candidate cannot replace the current known-good manifest.

To roll back, use `npm run projections:rollback -- --approve`; it selects the manifest's previous release. An explicit immutable target may be supplied as `--release=release-...`. The replacement manifest is validated before completion, and the displaced release becomes the next rollback target.

## Maintenance cadence

Run `npm run maintenance:check` before every release and at least monthly. Review broken links, canonical URLs, projection checksums/schema versions, source freshness, public-memory validation, relationship validation, missing asset alt text, and the production build. If the canonical backend is unavailable, keep the last known-good release and update freshness/attention truthfully rather than manufacturing current state.
