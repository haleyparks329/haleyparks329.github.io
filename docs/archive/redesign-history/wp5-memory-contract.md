# WP5 memory contract

## Private candidate

A candidate carries a stable ID, kind, title, summary, significance context, occurrence time, sensitivity, producer provenance, source references, evidence references, and optional relationships. Stable IDs are derived from producer, source identity, and source revision so replaying the same event is idempotent.

Candidate records are private workflow inputs. Raw source references, evaluator material, internal URLs, prompts, message bodies, secrets, health/body data, and review notes must never be inferred as public simply because they are present.

## Publication decision

The decision records a recommendation separately from the final state. Publication requires:

- an explicit `approved` state;
- a named human reviewer;
- public sensitivity;
- complete provenance;
- public, site-relative evidence links;
- a matching schema version.

An evaluator may recommend publish, reject, or abstain. It cannot set the publication state.

## Public projection

The versioned `public-memory-v1` projection uses an exact allowlist:

- `id`, `slug`, `kind`, `title`, `excerpt`, `significance`, `occurredAt`;
- `sourceLabel`, `publicEvidence`, `relatedProjects`, `weight`;
- `publicationState`, `reviewedBy`, `reviewedAt`.

The bundle contains `schemaVersion`, `generatedAt`, and `memories`. Unknown fields fail validation. The canonical JSON Schema lives in `wonderful-digital-world/schemas/public-memory-v1.schema.json`; Bridget's adapter and the website validator enforce the same public boundary.

Unsupported or external evidence URLs, non-public sensitivity, missing provenance, raw-message-like fields, and schema mismatches fail closed.
