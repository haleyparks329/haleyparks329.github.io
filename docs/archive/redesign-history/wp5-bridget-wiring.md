# WP5 Bridget wiring

Bridget receives typed candidates at the workflow boundary, reconciles evaluator advice, records a human decision, and exports only sanitized public DTOs.

The implemented path is:

1. `build_candidate` normalizes a producer event and derives its stable identity.
2. `evaluate_candidate` parses evaluator output. Invalid or incomplete output returns `abstain`.
3. `approve` requires a named human reviewer and checks sensitivity, provenance, and public evidence.
4. `to_public_memory` constructs a new allowlisted DTO rather than serializing the candidate.
5. `export_projection` writes a versioned bundle through a temporary file and atomic replacement, with bounded retry for transient failures.

The workflow is intentionally transport-neutral. Producers can add adapters without taking a dependency on website code, and the website never calls Bridget at runtime.
