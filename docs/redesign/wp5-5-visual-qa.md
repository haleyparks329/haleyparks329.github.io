# WP5.5 visual QA

> **Historical snapshot — superseded by WP6.2.** Field Log references below describe prior state and are not current information architecture or routes.

QA was completed on 14 August 2026 against the local Astro development server.

## Desktop sweep

Viewport: 1440 × 1000.

Checked About, Explore, Search, 404, Field Log, Compost Heap, Bridget, Career Intelligence, QA Agents, This Website, Writing, Memories, The Human Model, Wonderful Digital World, Human Model Current, QA Agents System, QA demo, and Meticulous replay.

Each checked route had the expected title and main landmark, shared header/footer, and no horizontal overflow. The About page was also reviewed as a full-page composition.

## Mobile sweep

Checked About, Search, Field Log, Compost Heap, Bridget, QA demo, The Human Model, Wonderful Digital World, Writing, and Memories at a narrow mobile viewport. The shared shell, project navigation, reading columns, and specialized surfaces remained within the viewport.

## Interaction checks

- Search returned the expected Field Log result for `memory`.
- The first Compost Heap artifact opened through its native disclosure control.
- Browser console inspection returned no warnings or errors.

## Automated checks

- `npm run check`: 72 files, 0 errors, 0 warnings, 0 hints.
- `npm run build`: 41 generated routes; 5 manually approved public memories validated.
- `npm run validate:relationships`: 27 curated relationships stable.
- `npm run validate:links`: 41 generated HTML files passed internal-link validation.
- `git diff --check`: clean.
