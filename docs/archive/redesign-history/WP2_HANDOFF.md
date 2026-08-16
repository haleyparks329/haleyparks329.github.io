# WP2 handoff

> **Historical snapshot — superseded by WP6.2.** Field Log references below describe prior state and are not current information architecture or routes.

Date: 2026-08-14

## Shipped

- A shared editorial shell for the WP2 routes, including desktop/mobile navigation, active states, skip link, footer, canonical metadata, and social cards.
- A new homepage positioning Haley Parks as a person building and investigating systems.
- A new Projects index with dominant Human Model and Wonderful Digital World flagships plus a supporting-project index.
- A new Human Model detail page organized from D0 through D3, with origin, system model, evidence, technical depth, findings, limitations, and current direction.
- Locally hosted variable typography and a generated social preview image.
- Centralized shared WP2 content and truth-boundary language.

## Route map

| Route                        | WP2 state                                          |
| ---------------------------- | -------------------------------------------------- |
| `/`                          | Redesigned                                         |
| `/projects/`                 | Redesigned                                         |
| `/projects/the-human-model/` | Redesigned                                         |
| `/field-log/`                | Temporary bridge behind the Memories shell label   |
| Wonderful Digital World      | External public repository                         |
| World View                   | Reserved navigation slot; intentionally not linked |
| All other routes             | Existing implementation retained                   |

## Verification

- `npm run validate`: passed, including formatting, artifact-contract, curated-relationship, Astro, production-build, and internal-link checks.
- The production build generated 39 static pages; Astro reported 0 errors, 0 warnings, and 0 hints.
- Browser QA at 1280×720 and 390×844 covered all three redesigned routes.
- Checked page titles/H1s, active navigation, landmark/link integrity, horizontal overflow, responsive composition, and the Human Model disclosure sequence.
- `git diff --check`: passed.

## Important decisions for the next work package

- Keep redesign adoption route-scoped until each legacy surface has an explicit migration brief.
- Decide whether Wonderful Digital World should eventually receive a local narrative page; until then, keep the repository as its canonical public destination.
- Confirm the information model and real destination for World View before turning the reserved label into a link.
- Preserve the distinction between Memories’ current human-reviewed publishing and any future policy-governed autonomy.
- If more glyph coverage is needed, add matching Latin Extended font subsets rather than restoring third-party runtime font loading.

## Primary implementation files

- `src/layouts/EditorialLayout.astro`
- `src/components/redesign/EditorialHeader.astro`
- `src/components/redesign/EditorialFooter.astro`
- `src/styles/wp2.css`
- `src/data/wp2-content.ts`
- `src/pages/index.astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/the-human-model/index.astro`
- `public/og.png`
- `public/fonts/`

## WP2.1 patch

### Corrected

- Wonderful Digital World positioning now describes a persistent computational environment organized around human context, durable state, and reduced human orchestration—not the spatial interface represented by World View.
- Public self-positioning now presents Haley directly as a person building and investigating systems; the independent-technology-lab framing remains an internal product model.
- Defensive maturity language and publication-governance implementation details were removed from the homepage.
- Field Log and Memories are explicitly documented as different content models; the current route is only a temporary compatibility bridge.

### Preserved

- The WP2 visual system, layout, spacing, and responsive composition.
- Route-scoped architecture, static rendering, and existing content architecture.
- Typography and locally hosted fonts.
- The Human Model D0–D3 structure, bodybuilding origin, evidence, and maturity boundaries.
- The World View implementation boundary: “Editorial view explains. World View shows.”
- Current safe publication controls and their underlying documentation and architecture.

### Deferred

- Final Memories implementation and information model.
- Agent-autonomous publication.
- World View integration.
- A local Wonderful Digital World flagship page.
- Broader voice and copy editing.
- Remaining route migrations.
