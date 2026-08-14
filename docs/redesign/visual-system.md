# Visual-system foundation

## Direction

The visual system should feel like an edited working publication: warm, exact, and visibly made by one person. Structure comes from typography, rules, alignment, and whitespace—not a field of interchangeable cards.

The opt-in implementation is in [`../../src/styles/redesign-tokens.css`](../../src/styles/redesign-tokens.css). It is intentionally not imported by the current site during WP1.

## Semantic palette

| Token role | Value     | Intended use                            |
| ---------- | --------- | --------------------------------------- |
| Canvas     | `#f5f0e7` | Warm cream page ground                  |
| Paper      | `#fcfaf5` | Rare inset reading surface              |
| Ink        | `#2d2926` | Primary text                            |
| Stone      | `#716a62` | Secondary text and quiet metadata       |
| Rule       | `#c9c0b4` | Dividers and structural borders         |
| Olive      | `#747d31` | Primary accent and active relationships |
| Burgundy   | `#7d3f4b` | Human Model / reflective emphasis       |
| Blue       | `#3c708e` | Technical evidence and links            |
| Lavender   | `#76688d` | Secondary conceptual grouping           |
| Ochre      | `#91651f` | Process and in-progress states          |
| Forest     | `#315f4a` | Stable or complete states               |
| Sage       | `#6e8975` | Supporting system context               |
| Coral      | `#ad594d` | Restrained warning or exception         |

Accent colors are semantic signals, not background decoration. Every text/background pairing still needs route-level contrast verification.

## Layout and grid

- Maximum composition width: `76rem`.
- Reading measure: `68ch`; dense evidence measure: `84ch`.
- Responsive gutter: `1rem` to `2rem`.
- Twelve-column editorial grid above `64rem`; four columns at intermediate widths; a single flow on narrow screens.
- Prefer asymmetric spans, baseline alignment, and full-width rules. Do not translate every content record into an equal rounded tile.

## Spacing and shape

Spacing uses a 4 px base with named steps from `0.25rem` through `8rem`. Default surfaces are square. A 2 px radius may soften small media or focus outlines; 6 px is the ceiling for controls. Pill geometry is reserved for a control or status whose shape communicates behavior—not for generic tags or metadata.

Use a one-pixel rule and a change in spacing before adding a shadow. Shadows are reserved for actual overlap or elevation.

## Motion

- `120ms`: direct control feedback.
- `180ms`: small disclosure transitions.
- `260ms`: a meaningful view change.
- No default hover lift, parallax, floating decoration, or ambient motion.
- Reduced-motion preferences must remove nonessential transitions and animated scrolling.

## Primitive implications for WP2

The token layer is sufficient to prototype these primitives without committing to a component library:

- `PageFrame`: shared width, gutter, and landmarks.
- `EditorialHeader`: eyebrow, bounded page title, premise, and evidence links.
- `SectionRule`: heading plus optional contextual link on a shared baseline.
- `ProjectIndexEntry`: typographic row with status and relationship, not a card.
- `EvidenceList`: source, date, repository, and validation information.
- `Disclosure`: accessible native-first details for D2/D3 material.

## Explicit exclusions

- giant hero type and marketing-style calls to action;
- card grids as the default information architecture;
- rounded containers around every section;
- gradients, glass effects, and generic startup visuals;
- fake desk objects, tape, paper rotations, or handwritten decoration;
- dashboard chrome for editorial content;
- decorative agent networks or recreated pixel-art rooms;
- “AI purple” as an undifferentiated identity;
- motion without information value.
