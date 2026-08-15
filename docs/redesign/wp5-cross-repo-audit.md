# WP5 cross-repository audit

Date: 2026-08-14

## Repositories inspected

| Repository                | Existing role                           | WP5 role                                                               |
| ------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| `wonderful-digital-world` | Shared domain primitives                | Owns the portable memory contract and JSON Schema                      |
| `bridget`                 | Review, policy, and publishing workflow | Owns candidate evaluation, human approval, sanitization, and export    |
| `haleyparks329.github.io` | Public Astro website                    | Consumes only the versioned public projection and renders `/memories/` |

Other repositories in the split workspace were left unchanged. They may produce memory candidates later, but WP5 does not make any producer a publication authority.

## Existing public surfaces

- `/field-log/` already held informal, chronological notes. It remains available as a historical compatibility surface and now points readers to Memories.
- The homepage contained a hand-authored “latest memory” fragment. It now reads from the same public projection as the archive.
- No private memory database or runtime API existed in the website and none was added.

## Decision

The boundary is a static, versioned JSON projection. Bridget may receive private candidates, but the website can only receive explicitly allowed public fields. This keeps private source material and workflow state out of the deployable site.
