# Current Route Inventory

This is the canonical inventory of build-time routes. Classifications describe current ownership, not historical intent.

## Canonical

| Route              | Source                           | Owner                    |
| ------------------ | -------------------------------- | ------------------------ |
| `/`                | `src/pages/index.astro`          | Maria home               |
| `/about/`          | `src/pages/about.astro`          | Maria secondary page     |
| `/projects/`       | `src/pages/projects/index.astro` | Maria project collection |
| `/writing/`        | `src/pages/writing/index.astro`  | Monograph library        |
| `/writing/[slug]/` | `src/pages/writing/[slug].astro` | Monograph entry          |
| `/memories/`       | `src/pages/memories/index.astro` | Public memory layer      |

## Specialized intentional

| Route                                     | Source                                                   | Purpose                                     |
| ----------------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| `/projects/bridget/`                      | `src/pages/projects/bridget/index.astro`                 | Bridget workspace                           |
| `/projects/career-intelligence/`          | `src/pages/projects/career-intelligence/index.astro`     | Career Intelligence workspace               |
| `/projects/career-intelligence/research/` | `src/pages/projects/career-intelligence/research.astro`  | Research section                            |
| `/projects/career-intelligence/system/`   | `src/pages/projects/career-intelligence/system.astro`    | System section                              |
| `/projects/qa-agents/`                    | `src/pages/projects/qa-agents/index.astro`               | QA Agents workspace                         |
| `/projects/qa-agents/case-studies/`       | `src/pages/projects/qa-agents/case-studies.astro`        | Case-study index                            |
| `/projects/qa-agents/demo/`               | `src/pages/projects/qa-agents/demo.astro`                | Static demo                                 |
| `/projects/qa-agents/live/`               | `src/pages/projects/qa-agents/live.astro`                | Public live-status presentation             |
| `/projects/qa-agents/meticulous/`         | `src/pages/projects/qa-agents/meticulous/index.astro`    | Meticulous case study                       |
| `/projects/qa-agents/meticulous/replay/`  | `src/pages/projects/qa-agents/meticulous/replay.astro`   | Static replay                               |
| `/projects/qa-agents/system/`             | `src/pages/projects/qa-agents/system.astro`              | System section                              |
| `/projects/the-human-model/`              | `src/pages/projects/the-human-model/index.astro`         | Human Model workspace                       |
| `/projects/the-human-model/current/`      | `src/pages/projects/the-human-model/current.astro`       | Current work                                |
| `/projects/the-human-model/research/`     | `src/pages/projects/the-human-model/research.astro`      | Research section                            |
| `/projects/the-human-model/system/`       | `src/pages/projects/the-human-model/system.astro`        | System section                              |
| `/projects/this-website/`                 | `src/pages/projects/this-website/index.astro`            | Website case study                          |
| `/projects/this-website/design/`          | `src/pages/projects/this-website/design.astro`           | Design section                              |
| `/projects/this-website/evolution/`       | `src/pages/projects/this-website/evolution.astro`        | Evolution section                           |
| `/projects/wonderful-digital-world/`      | `src/pages/projects/wonderful-digital-world/index.astro` | WDW public case study and integration seam  |
| `/search/`                                | `src/pages/search.astro`                                 | Static search across current public content |
| `/compost-heap/`                          | `src/pages/compost-heap/index.astro`                     | Intentional fragment collection             |
| `/404.html`                               | `src/pages/404.astro`                                    | Not-found response                          |

## Experimental

| Route                     | Source                                  | Purpose                      |
| ------------------------- | --------------------------------------- | ---------------------------- |
| `/explore/`               | `src/pages/explore.astro`               | Discovery overview           |
| `/explore/everything/`    | `src/pages/explore/everything.astro`    | Broad public-content view    |
| `/explore/trails/[slug]/` | `src/pages/explore/trails/[slug].astro` | Generated relationship trail |

## Compatibility-only

None. No legacy alias or duplicate public route is currently retained for compatibility.

## Orphaned

None after WP6.3 cleanup. Every built route above is intentionally classified and every retained source module has an active consumer or contract role.

## Retired

| Route         | Status                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/field-log/` | Retired. No source route, redirect, navigation item, search record, sitemap record, or public projection entry. **DO NOT RESTORE.** |
