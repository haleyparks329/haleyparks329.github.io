# Navigation & Information Architecture Redesign

## Project: Haley Parks Personal Website

## Goal

The visual identity of the website is now largely established.

The next phase is not a visual redesign.

The goal is to improve discoverability, navigation, and exploration while preserving the handcrafted "research desk" feeling.

Visitors should be able to use the website in two fundamentally different ways:

1. Efficiently find exactly what they need.
2. Wander through ideas naturally and discover unexpected connections.

These two navigation styles should coexist without feeling like two different websites.

## Primary Design Principle

> Every page should whisper where to go next.

The website should never feel like a collection of dead-end pages.

Every significant page should naturally lead visitors toward related projects, writing, demos, experiments, or ideas.

Navigation should feel like exploring a person's mind rather than navigating folders.

## Design Philosophy

Do not redesign the website into a traditional portfolio.

Do not introduce dashboard UI.

Do not flatten everything into lists.

The website should continue feeling like:

- a research desk
- an independent bookstore
- an archive
- a notebook
- a curated workspace

The interface should reward curiosity.

## Replay-Inspired Visual Language

Borrow selected visual cues from the QA replay workstation, but apply them very lightly.

The project workspaces should not look like terminals, dashboards, or desktop applications.

Use only restrained elements such as:

- thin outlined content frames
- quiet inset surfaces
- small monospace metadata labels
- compact status markers
- subtle tab-like section labels
- simple directional arrows
- occasional "case note," "system note," or "current state" annotations
- very light accent-color blocks
- understated dividers and panel headers

The visual hierarchy must remain:

1. content
2. navigation and structure
3. whimsy

Do not add:

- fake browser or terminal chrome
- command-line motifs
- dense toolbars
- replay controls
- multiple nested panels
- unnecessary pills, switches, or badges
- anything that makes the workspace feel like a product dashboard

The workspace should feel like a carefully organized project file with a few playful technical details, not a simulated operating system.

Use playful elements sparingly, approximately 5% of the visual surface. Most of the page should remain calm, readable, and editorial.

Suggested applications:

- a small monospace project-status label above the title
- quiet framed sections for technical content
- subtle "current state" or "system note" callouts
- sidebar section headings styled like case-file labels
- a restrained arrow or continuation cue at the end of a section
- one or two project-specific whimsical details per page

Content readability must always take priority over decorative treatment.

## Success Criteria

A recruiter should reach a GitHub repository in under 20 seconds.

An engineer should be able to jump directly to architecture, demos, and implementation.

A curious visitor should naturally fall into multiple "rabbit holes" without returning to the homepage.

Returning visitors should immediately understand what has changed since their last visit.

## Phase 1 - Improve Navigation

Keep global navigation.

Expand it to include:

- Home
- Explore
- Projects
- Writing
- Field Log
- About
- Search

Search may initially be implemented as a normal page if a command palette is excessive.

## Phase 2 - Standardize Language

Current labels are inconsistent.

Replace variations such as:

- Project Notes
- Public Notes
- Open Project
- Read More

With a consistent vocabulary.

Preferred terminology:

- Case Study
- Demo
- Repository
- Build Log
- Essay
- Quick Note

Every project should expose the same language.

Example:

- Case Study
- Demo
- Repository

## Phase 3 - Interactive Object Rules

Not every desk object should behave the same.

Introduce three interaction categories.

### Clickable Object

Entire object opens one destination.

Examples:

- About note
- Writing note
- Latest Field Log

Should have:

- pointer cursor
- hover state
- keyboard focus
- obvious action

### Multi-Action Object

Contains several destinations.

Examples:

- Projects

Should expose visible actions like:

- Case Study
- Demo
- Repository

Do not make the entire object clickable if multiple destinations exist.

### Decorative Object

Examples:

- Matcha
- Tape
- Illustrations
- Plants

These should not behave like interactive cards.

Reduce hover movement on decorative objects to avoid misleading users.

## Phase 4 - Homepage Improvements

The homepage currently repeats project information.

Instead, each section should have a unique responsibility.

### Hero

Purpose:

Introduce Haley.

Primary actions:

- View Projects
- Explore

### Current Desk

Replace repeated project summaries.

Instead show current activity.

Examples:

- Currently improving QA replay UX
- Designing adaptive website navigation
- Working on Airtable integration

Each entry links to the relevant project or Field Log.

### Featured Projects

Stable introductions to major systems.

Each project should expose:

- Case Study
- Demo, if available
- Repository

### Latest Writing

Highlight recent long-form work.

### Unexpected Connection

One intentionally surprising link.

Examples:

- Why my adaptive UI is a spreadsheet
- Meet Mini Me
- The Compost Heap

Purpose:

Reward curiosity.

### Explore Everything

Visible entry point to the Explore page.

## Phase 5 - New Explore Page

Create `/explore/`.

Purpose:

Provide multiple ways into the same content.

Not another project list.

Suggested sections:

### Start Here

Guided paths.

Examples:

- New Here?
- Interested in AI?
- Interested in UX?
- Interested in Human Performance?

### Browse by Type

- Projects
- Case Studies
- Writing
- Field Log
- Demos
- Characters, future
- Archive, future

### Browse by Topic

Initially use a manually curated list.

Examples:

- Agent Systems
- Human Model
- Adaptive UI
- Career Intelligence
- Software Quality
- Human Performance
- Human-Centered Technology

### Recently Updated

- Latest writing
- Latest Field Log
- Latest project changes

### Surprise Me

Single link to a manually curated interesting page.

Does not need true randomness.

## Phase 6 - Related Content

Extend content collections with relationship metadata.

Examples:

- topics
- related
- project

Use these relationships to build reusable "Continue Exploring" components.

Every major page should end with something like:

- Continue Exploring
- Related Project
- Related Writing
- Latest Update
- Unexpected Connection

The goal is to eliminate dead ends.

## Phase 7 - Project Navigation

Near the top of every project page add a lightweight project navigation.

Example:

- Overview
- Demo
- Repository
- Build Log
- Related Writing

Only display links that exist.

For long pages add an "On This Page" table of contents.

## Phase 8 - Search

Implement a lightweight static search.

Do not introduce a backend.

Use build-generated JSON.

Search should include:

- Projects
- Writing
- Field Log
- Page summaries
- Topics

Results should clearly indicate content type.

Example:

- QA Agents - Project
- Replay Investigation - Demo
- Why Deterministic Routing Matters - Quick Note

## Accessibility Requirements

Maintain and improve accessibility.

Requirements:

- Preserve skip navigation.
- Preserve reduced motion support.
- Maintain visible keyboard focus.
- Minimum comfortable click targets.
- Decorative objects should not appear clickable.
- Hover-only information should never contain essential content.
- Every relationship exposed visually should also exist as ordinary links.

## Non-Goals

Do not migrate away from Astro.

Do not introduce React-heavy architecture.

Do not add AI-generated navigation.

Do not replace traditional navigation with Mini Me.

Do not redesign the visual identity.

This phase is purely about improving information architecture and navigation.

## Future Compatibility

The navigation system should be designed so it naturally supports future additions without requiring redesign.

Future systems include:

- Mini Me
- Bridget
- Search Assistant
- Knowledge Graph
- Compost Heap
- Cast of Characters
- Public Obsidian synchronization

These should extend the navigation rather than replace it.

## Definition of Done

The redesign is complete when:

- Visitors can immediately understand what content exists.
- Projects expose consistent destinations.
- Every major page links naturally to related work.
- Visitors can browse by topic or by content type.
- There are no dead-end pages.
- Decorative elements are visually distinct from interactive elements.
- Search exists as a fast path for users who know what they want.
- Curious visitors are rewarded with meaningful rabbit holes.

The website should feel like exploring a living body of work rather than browsing isolated pages.
