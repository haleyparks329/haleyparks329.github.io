---
title: "Extending Deterministic Replay with an Investigation Layer"
slug: "meticulous-qa-investigation"
description: "An independent engineering exploration inspired by Meticulous, showing how QA Agents can interpret deterministic replay evidence through quality strategies, workflow clustering, traceable findings, explicit policy, and human review."
type: "case-study"
pubDate: 2026-07-16
status: "published"
tags:
  - "QA"
  - "Replay testing"
  - "Product analysis"
topics:
  - "Agent Systems"
  - "Software Quality"
related:
  - "/projects/qa-agents/"
  - "/projects/qa-agents/meticulous/"
  - "/projects/qa-agents/demo/"
  - "/field-log/evidence-before-claims/"
relatedProject: "qa-agents"
featured: true
draft: false
readingTime: "10 min"
subjectName: "Meticulous"
subjectUrl: "https://www.meticulous.ai/"
disclaimer: "Independent exploration · Not affiliated with Meticulous"
repositoryUrl: "https://github.com/haleyparks329/qa-agents"
demoUrl: "https://haleyparks329.github.io/projects/qa-agents/meticulous/replay/"
---

<p class="exploration-kicker">QA Agents · Engineering Exploration</p>

An independent technical exploration inspired by Meticulous, asking what happens when deterministic replay becomes the evidence source for an existing investigation system.

<details class="exploration-summary">
  <summary>Read the 30-second summary</summary>
  <div>
    <h2>Executive Summary</h2>
    <p>I built QA Agents before discovering Meticulous. After learning how deterministic replay works, I wondered what would happen if replay became the evidence source for an existing investigation system.</p>
    <p>Instead of adding Meticulous-specific behavior directly to QA Agents, I introduced a <strong>Quality Strategy</strong> abstraction that separates two concerns:</p>
    <ul>
      <li><strong>Profiles</strong> describe what system is being investigated.</li>
      <li><strong>Quality Strategies</strong> define how evidence should be interpreted.</li>
    </ul>
    <p>The Meticulous-inspired strategy validates and normalizes synthetic replay evidence, groups sessions into workflows, classifies differences, audits coverage, and applies explicit decision policy.</p>
    <p>The result preserves a clear boundary:</p>
    <ul>
      <li>Deterministic replay establishes facts.</li>
      <li>Investigation systems organize those facts.</li>
      <li>Humans retain authority over the final decision.</li>
    </ul>
    <nav class="exploration-actions" aria-label="Summary actions">
      <a class="button-link" href="#full-exploration">Read the full exploration</a>
      <a class="button-link button-secondary" href="/projects/qa-agents/meticulous/replay/">Open the replay</a>
      <a class="button-link button-secondary" href="https://github.com/haleyparks329/qa-agents">Browse the repository</a>
    </nav>
  </div>
</details>

<section class="status-panel" aria-labelledby="implementation-status">
  <h2 id="implementation-status">Implementation Status</h2>
  <div class="status-grid">
    <div>
      <h3>Implemented</h3>
      <ul>
        <li>QA Agents investigation pipeline</li>
        <li>Quality Strategy architecture</li>
        <li>Meticulous-inspired deterministic evidence strategy</li>
        <li>Workflow clustering</li>
        <li>Typed investigation findings</li>
        <li>Explicit policy evaluation</li>
        <li>Synthetic Little Bytes replay artifact</li>
        <li>Interactive replay presentation</li>
      </ul>
    </div>
    <div>
      <h3>Not Implemented</h3>
      <ul>
        <li>Official Meticulous integration</li>
        <li>Meticulous private APIs</li>
        <li>A browser replay engine</li>
        <li>Production deployment</li>
      </ul>
    </div>
  </div>
</section>

## Scope

This is an independent technical exploration based on public concepts associated with deterministic browser replay.

It includes:

- investigation architecture
- quality strategies
- workflow clustering
- deterministic evidence processing
- synthetic replay evidence
- traceable findings and policy decisions

It does not include:

- an official Meticulous integration
- private Meticulous APIs or infrastructure
- a browser replay implementation
- claims about Meticulous's internal architecture

<div id="full-exploration"></div>

## Context

QA Agents began as an exploration into AI-assisted software investigations. The goal wasn't to build another testing framework, but to explore how a team of specialized QA roles could investigate software changes, organize evidence, evaluate quality, and produce structured recommendations for a human reviewer.

While researching the broader QA tooling landscape, I came across Meticulous. What immediately stood out wasn't the AI itself, but the deterministic replay system underneath it.

Replay solves a fundamentally different problem than QA Agents.

Instead of asking a model to infer what happened during a test run, deterministic replay records what actually happened. The resulting replay artifacts become reproducible evidence that engineers can inspect, replay, and verify later.

That raised an architectural question for me:

> If deterministic replay already provides trustworthy evidence, how would QA Agents change if replay became its source of evidence?

This exploration follows that question.

## Understanding Deterministic Replay

Looking at Meticulous as a system rather than only as a product, deterministic replay has a well-defined responsibility.

Its purpose is to observe software execution, faithfully reproduce it, and preserve that replay as deterministic evidence.

Replay does not need to decide whether a change is important.

Replay does not need to evaluate engineering policy.

Replay does not need to determine whether additional testing is required.

Replay establishes one thing:

**What happened.**

That is exactly what a deterministic system should do.

## The Integration Opportunity

Once replay establishes what happened, another question follows:

**Now what?**

A replay run may show that dozens of sessions changed.

It does not necessarily explain which sessions belong to the same user workflow.

It does not inherently separate expected product changes from regressions.

It does not determine whether an important branch remains uncovered.

It does not tell a reviewer whether an investigation is complete.

Those are not replay problems.

They are investigation problems.

That is where QA Agents and deterministic replay became complementary rather than overlapping.

Replay establishes facts.

Investigation interprets facts.

Humans decide.

## The Integration Problem

My first instinct was to wire replay artifacts directly into QA Agents.

Technically, that would have worked.

Architecturally, it would have been a mistake.

It would have coupled the investigation pipeline to one evidence source. Browser replay happened to be the current input, but another organization might investigate API contract tests, production traces, accessibility audits, or static analysis instead.

The investigation pipeline should not need to change simply because the evidence changes.

That realization led to the Quality Strategy abstraction.

## Introducing Quality Strategies

The solution was to introduce a **Quality Strategy** layer.

QA Agents already had profiles.

Profiles describe the system being investigated, including repository conventions, application routes, test layout, integrations, and tracker configuration.

But profiles do not answer another category of questions:

- Which evidence is authoritative?
- How should that evidence be normalized?
- How should sessions be grouped?
- How should differences be classified?
- Which coverage rules apply?
- How should recommendations be derived?

Those questions belong to a separate abstraction.

A **Quality Strategy** defines how evidence should be interpreted without changing the investigation pipeline itself.

Quality Strategy became the extension point.

The investigation pipeline no longer cares whether evidence originates from deterministic replay, API testing, accessibility tooling, or another future source. Each strategy answers the same question:

> Given this evidence, how should it be interpreted?

This creates two independent concepts:

### Profile

> What system is being investigated?

### Quality Strategy

> How should evidence from that system be interpreted?

Separating those responsibilities allows QA Agents to support different evidence models without embedding vendor-specific logic throughout the investigation pipeline.

## The Meticulous-Inspired Strategy

With that separation in place, deterministic replay becomes one possible evidence source.

The Meticulous-inspired strategy defines:

- accepted replay evidence
- evidence validation
- normalization rules
- workflow clustering
- finding classification
- coverage evaluation
- decision policy
- result serialization

The command-line interface remains intentionally thin.

It loads the evidence, selects the configured strategy, runs the investigation pipeline, and serializes the result.

Conceptually, the system becomes:

```text
Profile
    ↓
Quality Strategy

Raw replay evidence
    ↓
Validation
    ↓
Normalization
    ↓
Workflow clustering
    ↓
Classification
    ↓
Coverage audit
    ↓
Policy evaluation
    ↓
InvestigationResult
    ↓
JSON
    ↓
Human review
```

Replay produces deterministic evidence.

The strategy defines how that evidence should be interpreted.

QA Agents executes the investigation.

## A Concrete Investigation

To test this architecture, I built a synthetic replay investigation around a pricing change.

The evidence contains seventeen affected replay sessions.

Those sessions are first grouped into workflow clusters rather than reviewed individually.

Configured classification rules then distinguish expected product changes from confirmed regressions.

Coverage evaluation identifies affected behavior that still lacks sufficient test coverage.

Finally, explicit policy rules produce a bounded recommendation for the reviewer.

The resulting investigation is reduced from:

```text
17 affected sessions
```

to:

```text
3 workflow clusters
1 expected change
1 confirmed regression
1 uncovered branch
Recommendation: Hold
```

Importantly, none of those conclusions modify the replay evidence itself.

Every finding remains traceable to the underlying sessions.

<section class="replay-card" aria-labelledby="explore-investigation">
  <p class="card-label">Recorded investigation replay</p>
  <h2 id="explore-investigation">Explore the Investigation</h2>
  <p>The article describes the architecture. The interactive replay shows how the synthetic pricing-change investigation was reconstructed for review.</p>
  <p>Step through the evidence, workflow clusters, findings, and final policy decision without needing to read terminal output.</p>
  <p class="replay-metric">17 sessions → 3 workflows → Hold</p>
  <a class="button-link" href="/projects/qa-agents/meticulous/replay/">Open the interactive replay</a>
</section>

## Workflow Clustering as an Investigation Stage

Workflow clustering groups affected sessions into product workflows.

In the current implementation this is performed by the Quality Strategy pipeline.

Longer term, Beacon becomes the natural owner of this responsibility.

A replay system may generate many individual sessions for what is effectively one user journey.

Reviewing each session independently creates noise and makes it harder to understand the behavioral impact of a change.

The strategy therefore groups related sessions before producing findings.

This turns a collection of replay artifacts into a smaller set of recognizable workflows that can be investigated as units.

The architecture does not discard the underlying sessions.

Each cluster preserves references back to the evidence from which it was derived.

## Typed Investigation Results

The implementation models each stage of the investigation with explicit domain objects, including:

- `WorkflowCluster`
- `DifferenceFinding`
- `CoverageFinding`
- `PolicyDecision`
- `InvestigationResult`

These objects are separate because they represent different claims.

A workflow cluster says which sessions appear to describe the same user journey.

A difference finding describes how observed behavior should be classified.

A coverage finding identifies behavior that lacks sufficient test evidence.

A policy decision applies explicit rules to the accumulated findings.

The investigation pipeline classifies deterministic differences using explicit rules. That stage naturally maps to Inspector as the investigation system expands.

Keeping those stages separate makes the investigation inspectable and traceable.

## What the Implementation Preserves

Several architectural decisions remained constant throughout the implementation.

Replay artifacts remain immutable.

Investigation objects reference evidence rather than replacing it.

Workflow clusters, findings, coverage evaluations, and policy decisions remain separate domain objects.

Recommendations are bounded by explicit policy.

Human reviewers retain authority over the final decision.

If a reviewer disagrees with a recommendation, they can trace it backward through:

```text
Policy decision
↓
Coverage and difference findings
↓
Workflow clusters
↓
Replay sessions
```

That traceability is essential when an investigation system is interpreting evidence produced elsewhere.

## Deterministic Processing Before Probabilistic Reasoning

Although QA Agents explores AI-assisted software investigation more broadly, the current Meticulous-inspired strategy intentionally keeps replay evidence processing deterministic.

The investigation pipeline answers its questions through:

- configured validation
- deterministic normalization
- workflow clustering
- explicit classification rules
- coverage analysis
- policy evaluation

This is deliberate.

The system does not need a model to invent facts that already exist in replay evidence.

Probabilistic reasoning may eventually help explain ambiguous evidence, summarize investigations, or support a reviewer.

It should not replace deterministic evidence processing.

The intended boundary is:

> Deterministic systems produce evidence.  
> Probabilistic systems interpret evidence.  
> Humans retain authority.

## Current Limitations

This strategy is a technical exploration rather than an official integration.

The replay evidence is synthetic.

It does not use private Meticulous APIs or infrastructure.

The current investigation pipeline is deterministic rather than an autonomous multi-agent browser system.

The interactive replay is a reconstructed presentation of a recorded investigation artifact, not a live agent or browser run.

Those limitations are intentional and should remain explicit.

## Why This Separation Matters

This exploration began with deterministic browser replay, but the pattern extends beyond QA.

Engineering organizations already generate large amounts of deterministic evidence:

- browser replay
- logs
- traces
- coverage reports
- mutation testing results
- static analysis
- contract testing
- production telemetry

The challenge often is not collecting more evidence.

It is helping humans organize that evidence into coherent investigations.

That is the architectural insight I found most interesting.

Deterministic systems establish facts.

Quality strategies define how those facts should be interpreted.

Investigation systems organize them into structured findings.

Humans remain responsible for the final decision.

Rather than replacing deterministic replay, systems like QA Agents become more useful when they treat replay as the foundation on which an investigation is built.

## Inspect the Implementation

<section class="implementation-panel" aria-label="Implementation links">
  <p>The repository contains the Quality Strategy architecture, the Meticulous-inspired strategy, the synthetic Little Bytes evidence artifact, the deterministic investigation runner, tests, and architecture documentation.</p>
  <ul>
    <li><code>docs/strategy-architecture.md</code></li>
    <li><code>strategies/meticulous/README.md</code></li>
    <li>synthetic Little Bytes replay artifact</li>
    <li>investigation CLI</li>
  </ul>
  <a class="button-link" href="https://github.com/haleyparks329/qa-agents">Browse QA Agents on GitHub</a>
</section>

## Keep Exploring

- [QA Agents project overview](/projects/qa-agents/)
- [Interactive replay](/projects/qa-agents/meticulous/replay/)
- [Meticulous-inspired strategy page](/projects/qa-agents/meticulous/)
- [Evidence Before Claims](/field-log/evidence-before-claims/)
