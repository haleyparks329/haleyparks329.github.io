# Current-state audit

Date: 2026-08-14
Scope: WP1 foundation only

## Executive finding

The site has a sound technical base and substantial real material, but its public
model still reads as a personal portfolio. The redesign should preserve the
Astro/content foundation and the strongest evidence-rich routes while changing
the editorial hierarchy around an independent, one-person technology lab. That
change belongs to WP2; WP1 records the decisions and supplies non-visual
foundations.

The two flagship projects are **The Human Model** and **Wonderful Digital
World**. The latter is missing from the site's project collection. World View is
a separate application and repository within the Wonderful Digital World
ecosystem; the site should explain and link to it, not recreate its pixel-art
interface as decoration.

## Evidence reviewed

| Evidence                                             | What it establishes                                                                                                     | Confidence |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------- |
| `src/pages/index.astro`, `src/data/homepage.ts`      | The homepage centers a giant personal name, a “current desk,” object-like project panels, and three existing flagships. | High       |
| `src/components/Header.astro`                        | Primary navigation currently exposes Home, Explore, Projects, Writing, Field Log, About, and Search.                    | High       |
| `src/content.config.ts` and `src/content/**`         | Projects, Writing, and Field Log are typed Astro collections with real content and relationships.                       | High       |
| `src/styles/global.css`                              | The site already has semantic colors, type sizes, spacing, reading widths, focus states, and reduced-motion handling.   | High       |
| Public repository metadata                           | The Human Model, Wonderful Digital World, and World View are public and active as of the audit date.                    | High       |
| Wonderful Digital World README and architecture docs | WDW is a persistent computational environment with explicit domain, provenance, and authority boundaries.               | High       |
| World View README                                    | World View is a standalone PixiJS isometric viewer, GPL-separated from WDW's MIT-licensed architecture repository.      | High       |

Public sources checked:

- [The Human Model](https://github.com/haleyparks329/the-human-model)
- [Wonderful Digital World](https://github.com/Wonderful-Digital-World/wonderful-digital-world)
- [World View](https://github.com/Wonderful-Digital-World/world-view)
- [Current production site](https://haleyparks329.github.io)

## Current content and route inventory

### Identity and discovery

- `/` — role, tagline, current work, project features, Field Log, writing, and About.
- `/about/` — biography, principles, interests, and contact surfaces.
- `/explore/`, `/explore/everything/`, `/explore/trails/` — discovery and
  cross-content browsing.
- `/search/` — search across published site content.

### Projects and evidence

- `/projects/` — collection-driven project index.
- `/projects/the-human-model/` and its architecture, data, experiments,
  journal, limitations, questions, and research routes.
- `/projects/qa-agents/` and its architecture, investigations, live evidence,
  sessions, and system routes.
- `/projects/bridget/`, `/projects/career-intelligence/`, and
  `/projects/this-website/`.
- No site entry or route currently exists for Wonderful Digital World.

### Editorial and memory

- `/writing/` and `/writing/[slug]/` — essays and project-linked writing.
- `/field-log/` and `/field-log/[slug]/` — dated desk, system, build,
  experiment, and decision notes.
- `/compost-heap/` — exploratory artifact surface.

## Public-work verification

| Work                    | Public state on 2026-08-14                                      | Site state                              | WP1 disposition                                       |
| ----------------------- | --------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------- |
| The Human Model         | Public repository; active flagship evidence                     | Deep project route and collection entry | Preserve and elevate                                  |
| Wonderful Digital World | Public architecture repository; active                          | Absent                                  | Add in WP2 as the second flagship                     |
| World View              | Public standalone viewer; active; GPL-3.0-or-later              | Absent                                  | Explain and link from WDW; never imitate decoratively |
| QA Agents               | Public repository and unusually strong live evidence surface    | Deep route and featured project         | Preserve as supporting evidence/experiment            |
| Bridget                 | Public architecture repository; active private V1 noted on site | Featured project                        | Preserve, demote from flagship tier                   |
| Career Intelligence     | Public repository; active                                       | Featured project                        | Preserve, demote from flagship tier                   |
| This Website            | Public repository and internal case study                       | Listed project                          | Preserve as meta-project, not flagship                |

## Classification

### Preserve

- Astro 7, TypeScript, Markdown content collections, plain CSS, and static
  GitHub Pages deployment.
- Existing project evidence routes, particularly The Human Model and QA Agents.
- Semantic token intent, 4px-derived spacing, reading-width constraints, focus
  visibility, and reduced-motion support.
- Search and exploratory routes as secondary discovery tools.
- Relationship fields between writing/notes and projects.
- Honest status labels and public repository links.

### Rework in WP2

- Homepage positioning from “portfolio/current desk” to an independent
  technology lab with visible current work and two flagships.
- Project hierarchy: The Human Model and Wonderful Digital World become the two
  flagships; Bridget, QA Agents, Career Intelligence, and this site become
  supporting work.
- “Field Log” language and information model toward “Memories,” without losing
  existing URLs during migration.
- Primary navigation to make the core editorial path clearer and move Explore
  and Search into secondary discovery.
- Giant display name (`3.5rem–6.8rem`) into a restrained identity statement.
- Repeated card grids, hover-lift surfaces, rounded metadata chips, and desk
  object metaphors into calmer editorial modules.
- Decorative graph callouts into honest text links and evidence-led diagrams.
- README and site metadata language that describes a lab/public interface, not
  merely a personal portfolio.

### Retire in WP2

- “Mini Me” and fake paper-note treatments as homepage identity devices unless
  a real, attributable agent capability earns a place in the content model.
- Decorative graph/node imagery that could be mistaken for World View.
- Rotation, tape/note, or object effects used without informational meaning.
- Blanket cardification and pill-shaped metadata as default organization.

### Unknown; decision needed

- Whether “Memories” replaces the visible Field Log label immediately or begins
  as a broader section while `/field-log/` remains canonical.
- Whether World View has a stable public deployment URL in addition to its
  repository.
- Whether the public identity line should retain “AI Product Engineer” as the
  primary role or make it supporting biographical copy.
- Whether `/explore/` remains a named destination or becomes an unlabelled
  discovery mechanism.
- Which secondary work deserves homepage presence once the two flagship modules
  are established.

## Terminology map

| Current term                 | WP1 decision                                             | Intended meaning                                                               |
| ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Personal website / portfolio | Replace in future editorial copy                         | Public interface to an independent, one-person technology lab                  |
| AI Product Engineer          | Preserve as Haley's role, not the whole product identity | Biographical/professional descriptor                                           |
| Projects                     | Preserve                                                 | Durable systems and focused experiments                                        |
| Featured project             | Narrow                                                   | Reserved for The Human Model and Wonderful Digital World at the flagship level |
| Field Log                    | Migrate carefully toward Memories                        | Dated observations, decisions, experiments, fragments, and milestones          |
| Writing                      | Preserve                                                 | Explanatory editorial work; it explains systems rather than simulating them    |
| Explore                      | Keep secondary                                           | Cross-cutting discovery, trails, search, and archives                          |
| World View                   | New, specific proper noun                                | Separate visual projection application for Wonderful Digital World             |
| Public graph                 | Retire as a site metaphor                                | Relationships should be communicated through content and factual diagrams      |
| Mini Me                      | Reassess                                                 | Only valid if attached to a concrete, transparent agent capability             |

## Design and content debt

1. The homepage hierarchy is name-first and object-metaphor-first instead of
   thesis-first and work-first.
2. The visual vocabulary mixes a promising editorial palette with cards,
   gradients, rounded panels, desk notes, and hover motion.
3. Project prominence follows the previous portfolio model and omits one of the
   two actual flagships.
4. World View has no defined boundary on the site, creating a risk that its
   visual language will be copied as decoration.
5. “Field Log,” “writing,” project journals, investigations, and archives have
   overlapping roles that need a progressive-disclosure model.
6. Current collection relationships use a single optional project slug and do
   not yet express typed, many-to-many relationships or publication provenance.
7. The project schema conflates editorial prominence (`featured`) with project
   kind and lifecycle (`status`).
8. External font loading is distributed through the layout and has no recorded
   typographic rationale.

## Audit gate

WP1 may proceed because the evidence is sufficient to define the product model,
information architecture, type direction, token contract, and future content
types without changing public page layouts. The unknowns above remain explicit
decisions for Haley rather than guessed requirements.
