# WP5.5 cleanup record

The migration made the editorial header/footer and the simplified project workspace the active shared paths. A repository-wide import/reference search then showed the following legacy components were no longer reachable, so they were removed:

- `Footer.astro`
- `Header.astro`
- `ProjectDirectoryCard.astro`
- `ProjectEmblem.astro`
- `ProjectFile.astro`
- `ProjectNav.astro`
- `SectionHeading.astro`
- `StatusBadge.astro`
- `TagList.astro`
- `WritingEditorialRow.astro`
- `WritingEntryRow.astro`

The cleanup also flattened `EvolutionEntry` and removed the remaining faux-handwriting role from project document cues. Specialized QA, replay, search, content-collection, and Compost Heap code was retained.

No route, content record, public slug, or required interaction was intentionally removed. Generated output contains 41 routes after cleanup.
