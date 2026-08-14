# WP4 Writing Relationship Map

## Editorial rule

Writing relationships are curated paths, not an automatically generated graph. A published entry should expose two to four strong next steps whose labels describe why the connection matters. Collection membership supplies broader discovery; explicit relationships supply the editorial argument.

The supported relationship labels are:

- `explains`
- `origin-of`
- `informed-by`
- `continues`
- `related-to`
- `implementation-of`
- `reflection-on`

Each relationship targets a stable writing ID, project slug, or (when WP5 introduces them) memory ID. The build rejects unknown targets, duplicate targets, self-links, links to private writing, and published entries outside the two-to-four-link editorial range.

## Curated paths

| Writing                          | Project path                        | Writing paths                                                                          | Editorial intent                                                                                                                   |
| -------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| I Did Not Want Another App       | `origin-of` Bridget                 | `continues` What I Built Instead of an Agent; `related-to` Why Fika Jobs Felt Familiar | Move from the need to preserve context into the system design and then to an earlier product expression of the same human concern. |
| What I Built Instead of an Agent | `explains` Bridget                  | `informed-by` I Did Not Want Another App; `related-to` Extending Deterministic Replay  | Connect the architectural argument to both its motivating essay and a concrete evidence-first QA implementation.                   |
| Why Fika Jobs Felt Familiar      | `reflection-on` Career Intelligence | `related-to` I Did Not Want Another App; `related-to` What I Built Instead of an Agent | Link a product reflection to later thinking about context, agency, and tools built around whole people.                            |
| Extending Deterministic Replay   | `implementation-of` QA Agents       | `related-to` What I Built Instead of an Agent                                          | Treat the technical note as an implementation example of the broader evidence-before-autonomy principle.                           |

## Collection organization

The library uses three intentionally overlapping bodies of work:

- **Keeping Context** — systems that preserve continuity, state, and the shape of an ongoing life or task.
- **Evidence Before Autonomy** — work that favors inspectable evidence and bounded agency over opaque automation.
- **Tools for Whole People** — products designed around a person's broader context rather than a narrow transaction.

An entry may belong to multiple collections, but it has one primary collection for detail-page orientation. Collection membership is deliberately separate from explicit related-item curation.

## Project integration decisions

Bridget, Career Intelligence, and QA Agents receive direct writing paths because the corresponding essays explain, reflect on, or implement those projects. The Human Model and WDW are not linked in WP4: no current essay makes a sufficiently specific editorial connection, and adding one would weaken the usefulness of the map.

The homepage is unchanged. It does not contain a legacy chronological-writing switch, and the existing route to `/writing/` already leads to the new library.

## Boundaries carried forward

- Memories remain a reserved relationship type for WP5 and are not rendered as placeholder links.
- Tags remain available in content metadata but do not drive the public library hierarchy.
- Route-backed writing keeps its project route and canonical URL instead of creating a duplicate essay URL.
- External-source metadata is shown as provenance without replacing the site's canonical writing route.
