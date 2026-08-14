# WP4 Writing Taxonomy

The writing library is organized around bodies of thought, not publishing format. A piece may belong to more than one collection because the same work can carry several lines of inquiry.

## Collections

### Keeping Context (`keeping-context`)

How systems preserve continuity across fragmented information, tools, and time. The current evidence is Bridget's contextual orchestration and the replay investigation's effort to retain inspectable evidence.

### Evidence Before Autonomy (`evidence-before-autonomy`)

Why deterministic behavior, explicit state, inspection, and human authority should precede autonomous action. This connects Bridget's architecture, QA replay research, and the Fika investigation's emphasis on grounded context.

### Tools for Whole People (`tools-for-whole-people`)

How software can acknowledge a person's lived context instead of reducing them to transactions, records, or a CV. This connects personal orchestration with career intelligence.

## Metadata contract

Writing entries carry:

- `writingId`: stable identity, independent of route.
- `slug`, `title`, `description`, `pubDate`, and optional `updatedDate`.
- `collections`: one or more collection IDs for published work; `primaryCollection` must be one of them.
- `topics`: descriptive subject metadata, distinct from curated collection membership.
- `relatedProjects` and `relatedWriting`: explicit relationships with one of the approved semantics below.
- `relatedMemories`: reserved, empty relationship field for a later work package. WP4 creates no Memories UI.
- `canonicalUrl`: local route or external canonical URL.
- `externalSource`: optional named source and URL; this never silently overrides the canonical URL.
- optional `readingTime`, plus `archived`, `featured`, and `editorialWeight` for editorial ordering.

Approved relationship semantics are: `explains`, `origin-of`, `informed-by`, `continues`, `related-to`, `implementation-of`, and `reflection-on`.

## Curation rules

- Every published, non-archived entry belongs to at least one collection and has a primary collection.
- Collection IDs, writing IDs, writing slugs, and project slugs are validated against canonical content data.
- A published piece has two to four strong outgoing paths across writing and projects. Relationships are deliberate, typed, unique, and cannot point to the current piece.
- Collections with no published members are not rendered.
- Chronology remains available as a complete secondary index; it is not the main organizing principle.
- Drafts may be prepared with metadata but remain absent from public routes, counts, and relationships.
