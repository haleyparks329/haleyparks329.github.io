# WP6 integration proof

WP6 adds a projection and operations layer without changing the site's presentation system.

| Acceptance property                       | Evidence                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Versioned public contracts and stable IDs | `schemas/*.schema.json`, strict runtime validators, and content-addressed releases                                        |
| Representative project coverage           | The Human Model, Wonderful Digital World, Bridget, QA Agents, and Career Intelligence are asserted in the projection test |
| Explicit freshness and failure states     | `current`, `stale`, and `partial` contracts; provider results for unauthorized, invalid, and unavailable                  |
| No private fields or credentials          | Exact allowlists plus recursive sensitive-key blocking; private and sensitive candidates are tested                       |
| Atomic, retry-safe publication            | Immutable release directory, atomic manifest rename, checksum validation, and tested `noop` retry                         |
| Known-good preservation and rollback      | Invalid candidates leave the manifest unchanged; a two-release rollback is exercised                                      |
| Human authority and kill switch           | Manual publication policy requires `--approve`; automated mode is disabled by policy                                      |
| Theme-independent consumer                | Astro imports validated data at build time; contracts have no layout/theme fields and no UI was added                     |
| Existing memories preserved               | `build:site` and `maintenance:check` continue to run `validate:memories`                                                  |
| Deployment safety                         | Deployment is excluded from the commands; the runbook requires validation and build first                                 |

Run `npm run test:projections` for the focused integration proof and `npm run validate` for the full site handoff gate.
