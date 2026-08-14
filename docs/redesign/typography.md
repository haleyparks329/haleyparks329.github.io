# Typography foundation

## Decision

Use **Instrument Sans** for interface and navigational text, **Newsreader** for editorial display and long-form emphasis, and the system monospace stack for code and machine-readable metadata.

This is a WP1 recommendation, not a site-wide font switch. The tokens live in an unimported, opt-in stylesheet so WP2 can introduce the system route by route after font files, licensing, and rendering have been verified.

## Why this pairing

- Instrument Sans is direct and compact without making the site feel like a product dashboard.
- Newsreader gives essays and project premises an editorial voice while remaining calm at modest sizes.
- The contrast between the two families makes hierarchy legible without relying on oversized headings, pills, or decorative containers.
- A system monospace stack is sufficient for repository names, evidence labels, dates, and code. A third downloaded family would add cost without adding a distinct job.

## Comparison performed

The internal comparison at [`artifacts/typography-comparison.html`](artifacts/typography-comparison.html) uses real copy from The Human Model and Wonderful Digital World at title, summary, body, caption, and metadata sizes.

| System | Families                         | Strength                                                | Concern                                           | Outcome         |
| ------ | -------------------------------- | ------------------------------------------------------- | ------------------------------------------------- | --------------- |
| A      | Instrument Sans + Newsreader     | Editorial but contemporary; clear hierarchy             | Newsreader should be reserved for editorial roles | Recommended     |
| B      | IBM Plex Sans + IBM Plex Serif   | Technically credible and highly coherent                | Feels more institutional and documentation-led    | Viable fallback |
| C      | Atkinson Hyperlegible + Literata | Excellent character distinction and comfortable reading | More bookish than the product identity needs      | Not selected    |

## Role map

| Role                    | Family           | Size guidance               | Notes                                             |
| ----------------------- | ---------------- | --------------------------- | ------------------------------------------------- |
| Page title              | Newsreader       | `clamp(2rem, 3vw, 2.75rem)` | 32–44 px; no giant hero type                      |
| Section title           | Newsreader       | `clamp(1.5rem, 2vw, 2rem)`  | Short, descriptive headings                       |
| Body                    | Instrument Sans  | `1rem–1.125rem`             | 1.55–1.7 line height                              |
| Navigation and controls | Instrument Sans  | `0.875rem–1rem`             | Sentence case; visible focus state                |
| Evidence label / code   | system monospace | `0.75rem–0.875rem`          | Use sparingly; never as a personality shortcut    |
| Caption / metadata      | Instrument Sans  | `0.8125rem–0.9375rem`       | Muted color must still meet contrast requirements |

## Loading strategy for WP2

1. Self-host only the weights that survive route-level prototypes.
2. Prefer variable WOFF2 files when their measured transfer cost is lower than equivalent static cuts.
3. Preload only the font required above the fold; let the remaining cut load normally.
4. Use `font-display: swap` and metric-compatible fallbacks to limit layout movement.
5. Keep the hard ceiling at two downloaded families plus system monospace.

## Acceptance criteria

- Page titles remain within 32–44 px at rendered breakpoints.
- A long project explanation is comfortable at a 60–72 character measure.
- Navigation, links, and evidence labels remain recognizable without color alone.
- Disabling web fonts preserves hierarchy and does not cause clipped controls.
- No typography choice requires a card, pill, or oversized hero to establish hierarchy.
