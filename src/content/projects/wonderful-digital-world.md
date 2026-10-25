---
title: "Wonderful Digital World"
slug: "wonderful-digital-world"
summary: "Four AI agents that run my life's operations on a Mac mini: a coach, a coordinator, a writing partner and an engineer. They share one knowledge base and one rule book, hand work to each other with receipts, and report to me every night."
longDescription: "Deterministic where possible, agentic where valuable: routing receipts, typed and append-only notes, pinned deploys and per-agent rules are ordinary code; the models do interpretation and judgment. The public repository has the architecture, the Command Center observability service and the pinned-deploy launcher."
coreQuestion: "What changes when the computer can handle the coordination work without taking over the human decisions?"
status: "Active · Running daily"
featured: true
accent: "blue"
tags:
  - "Persistent environments"
  - "Agent systems"
  - "Human authority"
  - "Observability"
topics:
  - "Agent Systems"
  - "Human-Centered Technology"
  - "Information Architecture"
repositoryUrl: "https://github.com/Wonderful-Digital-World/wonderful-digital-world"
order: 2
---

Bridget is my front door and routes each request to the right agent; a small routing service records the request, the delivery and the reply. The agents write typed notes (observations, hypotheses, decisions, work reports) to a shared Git-backed Library and leave each other addressed notes. Every night each agent reports its day, may message one teammate, and Bridget sorts my inbox into the Library and texts me what changed.

The public repository documents the architecture, runs Command Center, and publishes `canonical-exec`, the launcher that refuses to start a service unless its checkout is at the exact deployed commit. World View shows the agents in a pixel-art world, with their notes to each other as speech bubbles.
