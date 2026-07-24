---
title: "Why Fika Jobs Felt Familiar"
slug: "why-fika-jobs-felt-familiar"
description: "A product investigation into the shared philosophy behind Fika Jobs and a private Career Intelligence knowledge graph built to understand experience, decisions, and career direction beyond the CV."
type: "case-study"
pubDate: 2026-07-17
status: "published"
tags:
  - "career intelligence"
  - "product engineering"
  - "knowledge graphs"
  - "AI hiring"
  - "Fika Jobs"
topics:
  - "Career Intelligence"
  - "Knowledge Graphs"
  - "Human-Centered Technology"
relatedProject: "career-intelligence"
featured: true
draft: false
readingTime: "7 min"
subjectName: "Fika Jobs"
subjectUrl: "https://fikajobs.ai/"
disclaimer: "This is an independent product and technical exploration inspired by publicly available information about Fika Jobs. It is not affiliated with, endorsed by, or based on access to Fika's private systems."
---

<p class="exploration-kicker">Career Intelligence · Product Investigation</p>

## Overview

While browsing LinkedIn, I came across a Product Engineer role at Fika Jobs. As I read through the job description, one part stood out:

> "Instead of reducing people to CVs, cover letters and keywords, Fika lets candidates tell their story through an AI conversation..."

The Fika Jobs Product Engineer job description went on to describe candidates explaining what they had built, what they were good at, what motivated them, and what they wanted to do next. That resonated with me because I had been exploring a similar problem from a completely different direction. Over the past few months, I had been building a private Career Intelligence project that started as a way to stop rewriting my CV for every application. As the project evolved, it became less about generating application materials and more about understanding how my own career had developed over time.

Fika Jobs approaches that problem through hiring. Career Intelligence approaches it through personal knowledge management. The implementations are different, but they appear to share an underlying belief that a person's career cannot be represented by a collection of disconnected documents.

Reading the job description made me curious about the product itself. I wanted to understand whether its product philosophy aligned with the ideas I had already been exploring. This article is the result of that investigation.

## Where Career Intelligence Started

Career Intelligence began with a practical problem.

Every time I applied for a new role, I found myself rewriting the same information. My projects lived on GitHub, my writing lived in different places, my CV captured only a small subset of my experience, and every application required rearranging those pieces into a new narrative.

My original goal was to map my experience once so I could reuse that understanding instead of reconstructing it every time I applied for a job.

As I continued building the project, I noticed that the graph was becoming useful for questions I had not originally intended it to answer. Instead of asking only how to describe my experience, I started asking why my career had developed the way it had. I wanted to understand which projects had influenced later decisions, which technologies and themes kept reappearing, how my interests had changed over time, and what kinds of work consistently held my attention.

That shifted the project from documentation to understanding.

The knowledge graph gradually became less like a database of career artifacts and more like a map of relationships. Projects connected to technologies. Technologies connected to ideas. Ideas connected to writing. Decisions connected to later opportunities. Preferences, frustrations, and recurring patterns added context to the paths I had taken.

Instead of storing isolated facts, the graph preserved the context around those facts and the relationships between them.

Today, the project helps me answer questions that a CV cannot. It explains not only what I have done, but how I arrived there, what patterns have emerged over time, what kinds of work I am likely to enjoy, and where those patterns appear to be leading.

## Career Intelligence Graph

<aside class="public-graph-callout public-graph-callout--writing" aria-labelledby="fika-public-graph-title">
  <div class="public-graph-copy">
    <p class="public-graph-status">Live artifact</p>
    <h3 id="fika-public-graph-title">Explore my Career Knowledge Graph</h3>
    <p>
      This curated public graph shows how projects, technologies, ideas,
      decisions, and recurring interests connect across my work.
    </p>
    <a class="public-graph-link" href="https://publish.obsidian.md/career-knowledge-graph/Career+Knowledge+Graph" target="_blank" rel="noopener noreferrer" aria-label="Open the public Career Knowledge Graph in Obsidian">
      <span>Open the public graph</span>
      <span aria-hidden="true">-&gt;</span>
    </a>
  </div>
  <div class="public-graph-preview" aria-hidden="true">
    <span class="graph-node graph-node--one"></span>
    <span class="graph-node graph-node--two"></span>
    <span class="graph-node graph-node--three"></span>
    <span class="graph-node graph-node--four"></span>
    <span class="graph-line graph-line--one"></span>
    <span class="graph-line graph-line--two"></span>
    <span class="graph-line graph-line--three"></span>
  </div>
  <p class="sr-only">
    Decorative network preview only. Open the link to view the live public
    Career Knowledge Graph in Obsidian.
  </p>
  <p class="public-graph-caption">
    The public vault contains a curated subset of the private Career
    Intelligence system. Sensitive personal records and unsupported private
    interpretations remain excluded.
  </p>
</aside>

## Investigating Fika Jobs

With that background in mind, I started looking more closely at Fika Jobs. I was not trying to compare feature lists or argue that the products were the same. I wanted to understand the assumptions behind the product.

The job description and public material consistently emphasized conversation, context, and understanding the person behind the CV. Rather than treating a career as a static document, Fika appears to treat it as something better understood through discussion than through keyword matching alone.

That felt familiar, not because Career Intelligence solves the same problem, but because both projects begin by questioning whether traditional career documents are sufficient representations of a person.

## Where Our Thinking Overlaps

The strongest overlap is philosophical rather than technical.

Career Intelligence tries to preserve the relationships that exist across years of work instead of flattening them into a single document. Fika Jobs appears to use conversation to recover much of the context that static application materials leave out.

Those are different implementations, but they reject the same assumption: that a person's career can be accurately represented by a CV alone.

Both approaches treat context as valuable. Both recognize that relationships between experiences matter. Both acknowledge that understanding someone's career requires more than extracting keywords from a document.

## Where We Differ

The projects diverge in both audience and purpose.

Career Intelligence is a personal system designed to help one person understand their own career over time. It focuses on continuity, provenance, explainability, and preserving the reasoning behind connections within the graph. It is not a hiring marketplace, and the private system contains personal information that should not be exposed directly in public.

Fika Jobs is a hiring platform. Its goal is to help candidates communicate who they are and help companies understand them well enough to make better hiring decisions. Conversation becomes the mechanism for building context rather than a persistent personal knowledge graph.

Those different goals naturally lead to different product decisions, even when they begin from similar assumptions about how careers should be represented.

## Reflection

The reason I found Fika Jobs interesting was not that it resembled my implementation. It was that it challenged the same simplification from a different direction.

Career Intelligence grew from a practical attempt to stop rewriting my CV into a system for understanding how my career has evolved. Fika Jobs starts with hiring, but it also asks whether reducing people to documents and keywords loses something important.

These projects do not converge simply because they use AI. They converge because they both begin with the same observation: careers are collections of experiences, relationships, decisions, and motivations. A CV captures only a small part of that picture.
