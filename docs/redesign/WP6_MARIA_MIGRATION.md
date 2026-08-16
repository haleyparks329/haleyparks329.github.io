# WP6 Maria migration

## Purpose

WP6 replaces the former portfolio presentation with the Maria Astro theme while preserving the site's public content, URLs, data contracts, validation, and GitHub Pages deployment. Maria remains the visual and structural baseline; the custom work is limited to Haley's palette, local typography, content, and existing Astro integrations.

## Customization boundary

- `src/styles/maria.css` owns the Maria-derived shell, typography, collection grids, cards, and responsive behavior.
- `EditorialHeader.astro`, `EditorialFooter.astro`, `BaseLayout.astro`, and `EditorialLayout.astro` provide the shared shell.
- Project, writing, memory, explore, and about pages keep their existing content sources and public-safe projections.
- The palette uses warm paper, ink, olive, rust, plum, and blue tokens. Instrument Sans and Newsreader are served locally.
- Legacy detail pages remain compatible with the shared shell. Their repositories, schemas, prompts, policies, and runtimes remain out of scope.
- Maria is MIT licensed. Attribution and the complete license are in `THIRD_PARTY_NOTICES.md`.

## Public route inventory

The migration preserves these generated routes:

```text
/
/404
/about/
/compost-heap/
/explore/
/explore/everything/
/explore/trails/adaptive-interfaces/
/explore/trails/ai-systems/
/explore/trails/how-i-build/
/explore/trails/human-performance/
/explore/trails/meet-haley/
/field-log/
/field-log/attention-is-the-scarce-resource/
/field-log/evidence-before-claims/
/field-log/the-desk-as-workbench/
/memories/
/projects/
/projects/bridget/
/projects/career-intelligence/
/projects/career-intelligence/research/
/projects/career-intelligence/system/
/projects/qa-agents/
/projects/qa-agents/case-studies/
/projects/qa-agents/demo/
/projects/qa-agents/live/
/projects/qa-agents/meticulous/
/projects/qa-agents/meticulous/replay/
/projects/qa-agents/system/
/projects/the-human-model/
/projects/the-human-model/current/
/projects/the-human-model/research/
/projects/the-human-model/system/
/projects/this-website/
/projects/this-website/design/
/projects/this-website/evolution/
/projects/wonderful-digital-world/
/search/
/writing/
/writing/i-did-not-want-another-app/
/writing/what-i-built-instead-of-an-agent/
/writing/why-fika-jobs-felt-familiar/
```

Historical route names remain stable even where the current navigation no longer foregrounds the older desk or world-view concepts.

## Data and integration contracts

- Astro content collections remain the source for project summaries and writing.
- Memory validation, relationship validation, projection release validation, asset checks, site health checks, and internal link checks remain in the validation pipeline.
- Public projection loading remains in the projects collection route.
- GitHub Pages continues to build the single Astro application into `dist/`, including the sitemap and custom 404 output.
- Social metadata now uses `public/images/haley-parks-social-card.png`.

## Verification

Run `npm ci` followed by `npm run validate`. The validation suite formats and checks content, runs Astro type checks, builds the static site, and verifies internal links.

## Visual reference

The approved visual references are:

- [`references/wp6-warm-geometric-reference.png`](references/wp6-warm-geometric-reference.png) — preserve its warm off-white ground, muted olive, rust, plum, charcoal, and slate palette; editorial geometric balance; fine-line details; and lightly tactile paper texture.
- [`references/wp6-human-systems-reference.png`](references/wp6-human-systems-reference.png) — preserve its connection between human form and technical systems, hand-drawn signal traces, restrained network diagrams, layered data landscapes, generous negative space, and quiet archival-paper quality.

Treat both as mood, material, and composition references rather than page-layout templates.
