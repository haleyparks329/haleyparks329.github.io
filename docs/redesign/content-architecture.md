# Content architecture

> **Historical snapshot — superseded by WP6.2.** Field Log references below describe prior state and are not current information architecture or routes.

## Purpose

The content model should let a reader move among projects, writing, memories, evidence, and the systems they describe without pretending that every connection is an automatically generated knowledge graph.

WP1 defines the target model and adds compile-time reference types in [`../../src/data/redesign-content-model.ts`](../../src/data/redesign-content-model.ts). It does not migrate existing Astro collections or alter public routes.

## Shared publication fields

Every future public record needs:

- a stable `id`, title, summary, and canonical path;
- lifecycle state: draft, review, published, or archived;
- created and updated dates;
- disclosure depth from D0 through D3;
- topics and explicit relationships;
- authorship provenance that distinguishes human work from agent-assisted work.

Agent-assisted publication records require the agent name, human reviewer, and source revision. That information belongs in the content record, not in a decorative badge.

## Project schema

Projects represent built systems and investigations, not just repositories.

Required concepts:

- `kind`: flagship, system, experiment, or infrastructure;
- `stage`: active, maintained, paused, complete, or archived;
- `premise`: the question or commitment that makes the work legible;
- `evidence`: repository, demo, document, dataset, image, or validation artifact;
- `relationships`: curated links to writing, memories, other projects, and external systems.

The Human Model and Wonderful Digital World are flagship projects. World View is an external-system relationship owned by Wonderful Digital World, not a child route to be copied into this site.

## Writing schema

Writing is editorial material with a declared format—essay, note, field report, investigation, or documentation. A writing record may explain a project, record an implementation decision, or stand alone. `relatedProject` in the current collection becomes an explicit relationship rather than a privileged one-off field.

Draft and review records must not enter public collection queries. Route-backed legacy essays can migrate incrementally after their canonical paths are mapped.

## Memory schema

Memories are durable observations with a source context, captured date, optional place, privacy classification, and explicit project or writing relationships. They are not testimonials, social updates, or a raw personal-data feed.

Only `public` memories can be rendered by the site. `private` and `restricted` values exist so import and publishing tools fail closed instead of treating absence of a flag as consent.

## Relationships

Relationships are authored records with a predicate and optional note:

```text
source -> explains | demonstrates | informed-by | continues | related-to | remembers -> target
```

The site may use them for contextual links and trails. It must not infer hidden relationships, publish a graph automatically, or make every record mutually linked. Broken targets should fail validation; external targets should remain explicit URLs.

## Current-to-target mapping

| Current structure           | Target treatment                                                                             |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| `projects` collection       | Preserve; add premise, kind, stage, evidence, provenance, and relationships during migration |
| `writing` collection        | Preserve; normalize format and replace singular project linkage with relationships           |
| `fieldLog` collection       | Rework into writing formats or memories based on editorial intent                            |
| Hand-authored project pages | Preserve canonical paths; progressively source shared facts from collection data             |
| Homepage data module        | Retire as a second content source once the new project index can query canonical records     |
| Decorative topic graph      | Retire; replace with curated textual trails and relationship evidence                        |

## Publishing contract

1. Content enters as a draft with provenance and a stable identifier.
2. Schema validation confirms required fields, privacy state, and relationship syntax.
3. A human reviews language, evidence, rights, and intended disclosure depth.
4. Publication status is changed explicitly and committed through the normal repository workflow.
5. Build-time checks reject broken internal targets and unpublished dependencies.

There is no automatic agent publishing in WP1.
