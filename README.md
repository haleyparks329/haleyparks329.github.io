# Haley Parks Personal Website

Production site: https://haleyparks329.github.io

This repository owns the public presentation of Haley's projects: site design, navigation, curated project stories, screenshots, demos, outcomes, writing, and publishing.

It does not own project implementation, private repository topology, production contracts, schemas, prompts, policies, or runtime orchestration.

## Technology

- Astro and TypeScript
- Markdown content collections
- plain CSS and component-scoped styles
- GitHub Pages

The site intentionally avoids a CMS, database, authentication, analytics, cookies, and backend code.

## Local development

Use Node 22 or newer.

```bash
npm install
npm run dev
```

Run the complete local validation suite:

```bash
npm run validate
```

Validation checks formatting, content relationships, Astro types, the static build, and internal links. Deployment performs the same repository-local validation before publishing the Pages artifact.

## Content ownership

- Project repositories own their public architecture, evidence, and curated case-study artifacts.
- This website owns summaries, navigation, presentation, and cross-project storytelling.
- Private implementations remain private and are not imported into the site.
- QA demonstrations on the site are static case studies, not live agent execution or cross-repository runtime contracts.

## Project structure

```text
src/content/projects/   Project summaries
src/content/writing/    Essays and research notes
src/pages/projects/     Curated project pages
src/data/               Presentation data and static artifacts
src/components/         Site components
scripts/                Local validation helpers
.github/workflows/      Static-site deployment
```

## Deployment

Pushes to `main` run `npm ci` and `npm run validate`, upload the generated `dist/` directory, and deploy it with the standard GitHub Pages actions. No external project runtime is installed or invoked.
