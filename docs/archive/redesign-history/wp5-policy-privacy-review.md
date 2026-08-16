# WP5 policy and privacy review

## WP5 policy

Publication is manual-only. A positive evaluator recommendation is advisory and remains pending until a named human explicitly approves it. Malformed evaluator output and abstentions never publish.

## Fail-closed checks

- sensitivity must be `public`;
- provenance and public evidence must be present;
- evidence links must be public, site-relative routes;
- the projection must use schema version `public-memory-v1`;
- DTOs must contain only the public allowlist;
- raw messages, prompts, source references, secrets, private URLs, and health/body data are forbidden;
- unsupported relationship links are rejected by website projection validation.

The public DTO is built field by field. It is not a redacted serialization of the private candidate, which prevents newly added private candidate fields from leaking by default.

## Review result

The seeded projection contains five editorial memories backed by already-public site routes. Each is marked manually approved and identifies the reviewer. No private URLs, raw workflow content, credentials, personal health data, or synthetic test identifiers are present.
