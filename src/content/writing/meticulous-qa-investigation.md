---
title: "Extending deterministic replay with QA Agents"
slug: "meticulous-qa-investigation"
description: "An independent case study on what a QA investigation layer can do after deterministic replay produces inspectable evidence."
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
  - "/projects/qa-agents/demo/"
  - "/field-log/evidence-before-claims/"
relatedProject: "qa-agents"
featured: true
draft: false
readingTime: "8 min"
subjectName: "Meticulous"
subjectUrl: "https://www.meticulous.ai/"
disclaimer: "Independent exploration using simulated data. Not an official Meticulous integration and not built with private APIs or data."
repositoryUrl: "https://github.com/haleyparks329/qa-agents"
demoUrl: "https://haleyparks329.github.io/projects/qa-agents/meticulous/"
---

## Context

Meticulous is a software testing platform built around deterministic replay. It records real user interactions, selects sessions relevant to a code change, replays those sessions against base and head versions, and surfaces visual or functional differences before deployment.

The important engineering constraint is repeatability. Session capture, network-response replay, and deterministic execution make the evidence inspectable before anyone interprets it.

## Why I looked at it

I was working on QA Agents, a project about software-quality workflows that preserve evidence and human review. Meticulous was useful to examine because deterministic replay solves a different part of the problem than agents do.

My first instinct was to ask how AI agents might replace more of the testing workflow. The more I read, the less that made sense. Replay is valuable because it is deterministic, reproducible, and inspectable.

## What I examined

The scope was narrow: what could a downstream QA investigation layer do after replay evidence already exists?

I did not try to reproduce Meticulous internals, call private APIs, or claim an official integration. The QA Agents example uses simulated replay evidence, a strategy configuration, and a generated investigation artifact.

## Findings

### Finding 1: Deterministic evidence should remain the source of truth

**Observation**

Replay is strongest when it produces stable evidence before interpretation starts.

**Evidence**

The QA Agents strategy keeps raw sessions, differences, branch information, and coverage records as the evidence package. The agent layer clusters, classifies, audits, and recommends after that package exists.

**Interpretation**

The agent should not sit inside replay execution or rewrite replay output. It should operate downstream where its work can be checked against the evidence.

**Why it matters**

This keeps the probabilistic part of the system from weakening the deterministic part.

### Finding 2: Sessions, workflows, and issues are not the same thing

**Observation**

Many affected sessions can point to a smaller number of product workflows or issues.

**Evidence**

The simulated investigation evaluates replay sessions, selects affected sessions, groups them into product workflows, separates expected differences from regressions, and records a coverage gap.

**Interpretation**

A useful QA layer should reduce noisy replay output into traceable findings, not turn every affected session into a separate bug report.

**Why it matters**

Reviewers need fewer, clearer decisions. They still need to trace each decision back to source evidence.

### Finding 3: Recommendations need policy boundaries

**Observation**

The strategy produces a recommendation only after applying an explicit decision policy.

**Evidence**

The example records a hold recommendation when a confirmed regression and a coverage gap remain.

**Interpretation**

The system is not deciding to merge or approve. It is preparing a bounded recommendation for a human reviewer.

**Why it matters**

Policy makes the handoff more trustworthy because it separates evidence, recommendation, and authority.

## What I would change

1. Keep replay evidence immutable and inspectable.
2. Make the investigation layer explicitly downstream from replay.
3. Model workflow clusters, findings, coverage gaps, and policy decisions as separate objects.
4. Treat recommendations as review prompts, not as authority.
5. Make invalid evidence fail with actionable errors.

## What I would preserve

I would preserve the deterministic replay boundary. Replay should capture, select, replay, and compare. QA Agents should interpret the evidence after that point.

I would also preserve the human decision boundary. The useful output is not “the agent fixed it.” The useful output is “here is the evidence, here is the remaining risk, and here is the next review step.”

## Open questions

- One implemented strategy does not prove every future strategy will fit the same model.
- Runtime validation is still narrower than the strategy directory shape suggests.
- The example is simulated and does not prove behavior on a production replay system.
- This is not a live Meticulous integration.

## Final perspective

The product lesson is that AI is more useful when it respects the evidence layer it depends on. Replay finds what changed. QA Agents investigate what it may mean. Policy constrains the recommendation. A human decides.

## Related material

- [Interactive strategy replay](/projects/qa-agents/meticulous/)
- [QA Agents project report](/projects/qa-agents/)
- [QA Agents repository](https://github.com/haleyparks329/qa-agents)
- [Meticulous](https://www.meticulous.ai/)
