# Haley Parks Personal Website

Production site: https://haleyparks329.github.io

Repository: https://github.com/haleyparks329/haleyparks329.github.io

This repository contains the public personal website and project portfolio for
Haley Parks. It owns site design, navigation, project summaries, public
storytelling, writing surfaces, and publishing.

## Deployment-time QA review

The website owns the complete live-review publication lifecycle:

```text
website merge
    ↓
website GitHub Actions
    ↓
pinned QA Agents invocation
    ↓
public-safe artifact in build workspace
    ↓
provenance validation
    ↓
Astro build
    ↓
GitHub Pages deployment
```

The Pages workflow checks out a pinned QA Agents commit, reviews the exact
website `GITHUB_SHA`, and generates
`src/data/qa-agents/latest.json` inside the ephemeral Actions workspace. The
artifact is not committed to `main`. Production validation requires schema
`1.1`, the expected repository and commit, valid timestamps, passing command
evidence, public-safety policy fields, and QA Agents producer provenance.

The checked-in `latest.json` is a development fixture for local rendering only.
Production CI always overwrites it and fails before upload if generation or
provenance validation fails. A failed deployment leaves the previously
successful GitHub Pages deployment online.

## Technology

- Astro
- TypeScript
- Markdown content collections
- Plain CSS and Astro component-scoped CSS
- GitHub Actions
- GitHub Pages
- npm

The site intentionally avoids React, Tailwind, UI libraries, a CMS, a database,
authentication, analytics, cookies, and backend code.

## Local Setup

Use Node 22 or newer. The repository includes `.nvmrc` for local guidance.

```bash
npm install
npm run dev
```

## Commands

```bash
npm run dev
npm run check
npm run build
npm run preview
npm run validate
```

`npm run validate` runs formatting checks, Astro type checking, a production
build, and internal-link validation against the generated `dist/` output.

## Project Structure

```text
src/site.config.ts          Typed central site metadata
src/content.config.ts       Content collection schemas
src/content/projects/       Manually maintained project summaries
src/content/writing/        Future writing collection entries
src/components/             Focused Astro components
src/layouts/BaseLayout.astro
src/pages/                  Static routes
src/styles/global.css       Global design system and layout styles
scripts/validate-links.mjs  Lightweight internal-link validation
.github/workflows/deploy.yml
```

## Edit Site Metadata

Edit `src/site.config.ts` for Haley's name, role, tagline, description,
production URL, GitHub information, location, availability, and placeholder
links for LinkedIn and resume.

The LinkedIn and resume URLs are intentionally labeled placeholders until real
public URLs are verified.

## Add a Project

Add a Markdown file to `src/content/projects/` with frontmatter matching the
project collection schema:

```yaml
title: "Project Name"
slug: "project-name"
summary: "Short public summary."
longDescription: "Longer public description."
status: "Active"
featured: true
accent: "rust"
tags:
  - "Tag"
repositoryUrl: "https://github.com/haleyparks329/project-name"
order: 4
```

Then add a route under `src/pages/projects/` if the project needs a dedicated
page beyond the project index card.

## Add a Writing Entry

The writing collection is prepared for:

- Research Notes
- Systems Thinking
- Human Model
- Personal Computing
- Build Notes

Add Markdown files under `src/content/writing/` once real public writing is
ready. Do not add placeholder posts as if they were published writing.

## GitHub Pages Deployment

Deployment runs from `.github/workflows/deploy.yml` on pushes to `main` and can
also be started manually from the Actions tab.

The workflow uses the official Astro GitHub Pages action, builds the static
site, uploads the Pages artifact, and deploys through GitHub Pages with minimal
permissions.

The repository is a GitHub Pages user site, so `astro.config.ts` sets:

```ts
site: "https://haleyparks329.github.io";
```

There is no `base` setting because this is not a project site.

Remaining GitHub setting to confirm:

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

## Content Ownership

```text
the-human-model
  Canonical Human Model code, experiments, technical documentation,
  architecture, research artifacts, and project history.

career-intelligence
  Canonical Career Intelligence code, documentation, and artifacts.

qa-agents
  Canonical QA Agents code and documentation.

haleyparks329.github.io
  Canonical public presentation of Haley, site design, navigation,
  project summaries, cross-project storytelling, and publishing.
```

Do not move project implementation code into this repository. Do not copy entire
repositories into this website.

## Future Repository Imports

Future automation may import selected Markdown and structured metadata from the
project repositories during the website build. That layer is deferred so the
first version stays simple and manually auditable.

## Known Deferred Features

- Mini Me as an interactive guide
- Interactive knowledge graphs
- Obsidian synchronization
- Cross-repository content synchronization
- API-backed features hosted separately from the static frontend
- Public demos beyond static project pages
- Contact form, newsletter, analytics, and account features
