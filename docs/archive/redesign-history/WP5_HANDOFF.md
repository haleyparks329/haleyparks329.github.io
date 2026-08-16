# WP5 handoff: Memories

> **Historical snapshot — superseded by WP6.2.** Field Log references below describe prior state and are not current information architecture or routes.

Date: 2026-08-14

## Outcome

WP5 establishes Memories as a real, privacy-bounded publication system rather than a decorative homepage fragment. Producers can create stable private candidates; Bridget evaluates and routes them through mandatory human review; a strict static projection is the only artifact the public website consumes.

## Delivered

- Shared private/public types, stable identity behavior, and `public-memory-v1` JSON Schema in `wonderful-digital-world`.
- Bridget workflow for candidate construction, evaluator abstention, explicit human approval, sanitization, and retrying atomic export.
- A manually reviewed five-entry production seed projection, kept separate from synthetic tests.
- Canonical `/memories/` archive with deterministic time groups, varied editorial weights, provenance, evidence, and related-project paths.
- Homepage “latest memory” sourced from the projection.
- Bidirectional compatibility links between Memories and the historical `/field-log/` surface.
- Build-time projection validation for allowlisted fields, review state, evidence, internal links, and forbidden private field names.

## Repository map

- `wonderful-digital-world/packages/wdw_core/memory.py`
- `wonderful-digital-world/schemas/public-memory-v1.schema.json`
- `wonderful-digital-world/tests/test_memory_contracts.py`
- `bridget/app/memories/`
- `bridget/tests/test_memory_publication.py`
- `haleyparks329.github.io/src/data/public-memories.v1.json`
- `haleyparks329.github.io/src/data/memories.ts`
- `haleyparks329.github.io/src/pages/memories/index.astro`
- `haleyparks329.github.io/scripts/validate-memories.mjs`

## Validation

- Shared contract: 3 tests passed for stable replay identity, strict public allowlisting, and private-URL rejection.
- Bridget: 5 tests passed for malformed evaluator output, abstention, evaluator non-authority, provenance and sensitivity enforcement, synthetic end-to-end export, retry, and fixture/private-data exclusion.
- Website: 5 approved memories validated; Astro checked 83 files with 0 errors, warnings, or hints; the production build emitted 41 pages; all 41 generated HTML files passed the internal-link check; and the full formatting check passed.
- Browser QA: the archive rendered all five entries and four deterministic time groups at desktop and 390 px widths; the archive, homepage latest-memory module, and Field Log bridge had no horizontal overflow; the skip-link target was present; and the browser console was error-free.

## Boundaries

- No automatic publication policy is enabled.
- No private store, evaluator prompt, or Bridget runtime is bundled into the site.
- Field Log content was not migrated or deleted.
- No producer integrations beyond the portable contract were added.
- Deployment, commits, and WP6 work are out of scope.
