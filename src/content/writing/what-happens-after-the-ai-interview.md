---
title: "What Happens After the AI Interview?"
slug: "what-happens-after-the-ai-interview"
description: "An independent exploration of how AI hiring conversations could become persistent, explainable career intelligence through knowledge graphs, provenance, and candidate control."
type: "case-study"
pubDate: 2026-07-17
status: "published"
tags:
  - "Career Intelligence"
  - "Knowledge Graphs"
  - "AI Hiring"
  - "Product Engineering"
  - "Human-Centered AI"
topics:
  - "Career Intelligence"
  - "Knowledge Graphs"
  - "Human-Centered Technology"
related:
  - "/projects/career-intelligence/"
  - "/projects/qa-agents/"
  - "/writing/attention-is-the-scarce-resource/"
relatedProject: "career-intelligence"
featured: true
draft: false
readingTime: "12 min"
subjectName: "Fika Jobs"
subjectUrl: "https://fikajobs.ai/"
disclaimer: "This is an independent product and technical exploration inspired by publicly available information about Fika Jobs. It is not affiliated with, endorsed by, or based on access to Fika's private systems."
---

<p class="exploration-kicker">Career Intelligence · Product Exploration</p>

Hiring is becoming increasingly automated on both sides.

Candidates use AI to generate applications. Companies use AI to screen them. The result is a system filled with polished documents but weaker signals about the actual person behind them.

[Fika Jobs](https://fikajobs.ai/) is taking a different approach.

Instead of asking candidates to compress themselves into a CV, Fika invites them into an AI-led conversation. The product reframes the interview as an interface for understanding a person's experience, motivations, ambitions, and potential.

That immediately caught my attention.

Not only because I agree with the problem they are trying to solve, but because I had already been exploring a related question through my own project, **Career Intelligence**:

> What would it look like to represent a career as a living system rather than a static document?

## What Fika Gets Right

A resume is a lossy representation of a person.

It reduces years of work, experimentation, learning, motivation, and change into a few pages of titles, dates, and optimized bullet points. Once AI can generate those documents at scale, their ability to distinguish one person from another becomes even weaker.

A conversation creates room for context.

A candidate can explain why a project mattered, how they approached an ambiguous problem, what they learned, where they struggled, and what kind of work they want next.

That makes the conversation a much richer input than a conventional application document.

It can surface:

- reasoning rather than keywords;
- motivation rather than title progression;
- communication rather than polished bullet points;
- ambition rather than only prior responsibilities;
- context that would otherwise be discarded.

The conversation becomes a new interface for candidate understanding.

But it also led me to another question.

## What Happens After the Conversation?

A conversation produces a richer snapshot than a resume.

But it is still a snapshot.

A person's career does not exist inside one interview.

It also exists across:

- the projects they repeatedly choose;
- the problems that hold their attention;
- the ideas connecting otherwise unrelated work;
- the environments in which they perform best;
- the skills they are actively developing;
- the work they abandon;
- the questions they keep returning to;
- the direction in which their interests are moving.

Those patterns emerge over time.

They require memory.

## Career Intelligence as a Persistent Layer

Career Intelligence is a system I originally built to make my own job search less fragmented.

I was tired of rewriting the same experience into slightly different resumes, cover letters, application forms, interview notes, and professional summaries.

So I began treating my career as structured knowledge.

My source material includes:

- work history;
- personal projects;
- technical experiments;
- writing;
- skills and technologies;
- project decisions;
- values;
- interests;
- career preferences;
- recurring themes.

That information is normalized into reusable data, represented as a knowledge graph, and published through an explorable Obsidian interface.

The result is not simply a prettier resume.

It is a persistent model of how my work connects.

A conventional profile might record:

```text
QA Agents
Playwright
Python
AI
Testing
```

The graph can preserve a deeper reasoning chain:

```text
QA Agents
    ->
Software investigations
    ->
Deterministic evidence
    ->
Human review
    ->
Trustworthy automation
    ->
Human-centered AI
```

The technologies still matter.

But the relationships explain why the work exists.

> Future visual placeholder: Add a full-width screenshot or linked preview of the public Obsidian career graph here. Suggested caption: "This is my own career represented as connected knowledge instead of isolated documents."

## The Proposed Extension

I would not replace Fika's conversation.

I would extend it with long-term career memory.

```text
Professional context
        ->
AI conversation
        ->
Recorded answers and transcript
        ->
Structured candidate profile
        ->
Career Intelligence Graph
        ->
Reasoning and explainable matching
```

Fika would remain the conversational interface.

Career Intelligence would become the persistent reasoning layer beneath it.

Each conversation could add evidence to an evolving model rather than creating an isolated profile from scratch.

## From Candidate Profile to Career Graph

During an interview, a candidate might say:

> I built a group of QA agents that investigate software changes and return evidence to a human reviewer.

A flat extraction might identify:

```json
{
  "projects": ["QA Agents"],
  "skills": ["Python", "Playwright", "AI systems"],
  "strengths": ["testing", "automation"]
}
```

A graph-oriented extraction could represent:

```text
Candidate
    BUILT
QA Agents

QA Agents
    USES
Playwright

QA Agents
    INVESTIGATES
Software changes

QA Agents
    PRESERVES
Human review

Human review
    SUPPORTS
Trustworthy automation
```

Over time, similar relationships might appear across several projects.

The system could then infer a recurring theme:

> The candidate repeatedly builds systems that increase automation without removing human judgment.

That is not merely a skill.

It is a pattern of thought.

## What This Could Unlock

### Explainable Matching

Most matching systems eventually collapse fit into a score.

```text
Candidate match: 87%
```

A graph-based reasoning layer could instead explain the evidence behind that score:

> This candidate repeatedly performs well in ambiguous, early-stage environments where they can work across product, engineering, and user discovery. Their strongest projects involve converting unclear human needs into working technical systems. This role emphasizes ownership, fast iteration, and direct product influence, making the alignment stronger than their job titles alone suggest.

The score becomes secondary.

The explanation becomes the product.

### Conditions for Thriving

Matching should consider more than whether someone can perform the listed responsibilities.

It should also consider the conditions under which that person does their best work.

For example:

```text
Candidate thrives with:
- ambiguous problems;
- visible ownership;
- direct contact with users;
- rapid experimentation;
- cross-functional work;
- room to create new systems.
```

And perhaps:

```text
Candidate loses energy with:
- repetitive ticket execution;
- narrow task ownership;
- low-context maintenance work;
- slow decision-making;
- limited access to users.
```

These signals may emerge from interviews, but they become more trustworthy when supported by repeated evidence across a person's career history.

### Trajectory, Not Only History

A resume primarily describes where someone has been.

A living career model could also reveal where they are going.

Imagine a candidate whose recent activity shows increasing connections among:

```text
Software engineering
    ->
AI systems
    ->
Human behavior
    ->
Knowledge graphs
    ->
Adaptive products
```

Their past job titles may not yet describe the role they are becoming qualified for.

The graph can reveal the trajectory before the resume catches up.

That could support:

- adjacent-role discovery;
- non-obvious job recommendations;
- emerging skill identification;
- future-positioning suggestions;
- career development conversations.

Instead of only asking:

> Which current job matches this person?

the system could ask:

> What kind of work is this person growing toward?

### Company Intelligence

Candidates are not the only side of hiring represented poorly.

A job description is also a lossy document.

It may list responsibilities and requirements, but it rarely captures:

- how decisions are actually made;
- what ownership looks like;
- how product and engineering work together;
- how quickly the company moves;
- what ambiguity feels like internally;
- how managers communicate;
- whether experimentation is encouraged;
- what behaviors are rewarded.

The same graph approach could be applied to companies.

```text
Company
    ->
Mission
Culture
Decision-making
Engineering practices
Product maturity
Management style
Ownership model
Communication norms
```

Matching could then become:

```text
Career system
        <->
Company system
```

rather than:

```text
Resume
        <->
Job description
```

The goal would not be to find the candidate with the highest keyword overlap.

It would be to identify whether two systems are likely to work well together.

## A Possible Technical Architecture

The extension could sit beside a conversation-first interview and matching workflow rather than requiring a replacement.

### Ingestion

```text
LinkedIn profile
Resumes
Portfolio
GitHub
Writing
Project descriptions
AI interview transcripts
Candidate corrections
        ->
Source ingestion pipeline
```

Each source should remain traceable so that any generated conclusion can point back to supporting evidence.

### Structured Extraction

An LLM-assisted extraction pipeline could identify:

```text
Entities
- projects
- companies
- roles
- technologies
- domains
- values
- goals
- working preferences
- behaviors

Relationships
- built
- used
- learned
- improved
- prefers
- avoids
- motivated_by
- contributed_to
- evolved_into
- supported_by
```

Every inferred relationship should include provenance:

```json
{
  "source": "interview_2026_07",
  "evidence": "candidate statement or source passage",
  "confidence": 0.88,
  "inference_type": "explicit | derived",
  "needs_review": false
}
```

This distinction matters.

The system should not silently turn an AI interpretation into a permanent statement about a person.

### Graph Storage

The prototype can begin with structured files and Markdown nodes, as Career Intelligence already does.

A production implementation could later use:

- PostgreSQL for canonical entities and provenance;
- `pgvector` or another vector index for semantic retrieval;
- a graph database when graph traversal becomes operationally useful;
- object storage for recordings, transcripts, and source artifacts;
- an event log for profile evolution over time.

The graph database should not become the source of truth merely because the product contains a graph.

The canonical data model and evidence trail matter more than the visualization technology.

### Reasoning Layer

The reasoning service could answer questions such as:

```text
What problems does this person repeatedly choose?

Which claims are supported by multiple independent sources?

What working conditions recur in their strongest experiences?

What interests have accelerated recently?

Which job requirements align with demonstrated patterns?

Where is the match weak or based only on inference?

What evidence would help confirm the match?
```

The output should contain both a conclusion and its path through the evidence.

```json
{
  "claim": "Strong fit for ambiguous early-stage product engineering",
  "confidence": 0.91,
  "supporting_paths": [
    ["candidate", "built", "career_intelligence"],
    ["career_intelligence", "originated_from", "ambiguous_personal_problem"],
    ["candidate", "independently_defined", "system_architecture"]
  ],
  "contradicting_evidence": [],
  "unknowns": ["experience operating this type of system at large scale"]
}
```

### Human Control

Because the model makes interpretations about a person, candidates should be able to:

- inspect the evidence used;
- correct factual errors;
- reject interpretations;
- mark information private;
- distinguish current preferences from historical ones;
- see when a conclusion is inferred rather than explicitly stated;
- remove sources and derived claims;
- decide which parts are visible to employers.

A persistent model needs stronger candidate control than a one-time generated summary.

The system should help a person explain themselves.

It should not define them without their participation.

## What I Already Built

This proposal is not entirely speculative.

Career Intelligence already includes much of the underlying foundation:

- immutable source ingestion;
- normalized career data;
- stable entities and relationships;
- project, experience, skill, and technology modeling;
- graph generation;
- reasoning-oriented commands;
- resume and interview-preparation outputs;
- a public Obsidian graph for exploration.

My graph is currently centered on one person: me.

That makes it an n=1 prototype rather than a production hiring product.

But it demonstrates the core idea:

> A career can be represented as connected, evolving evidence rather than a static collection of claims.

The next step would not be to build another hiring marketplace.

It would be to connect this existing model to a conversation-first interview workflow and demonstrate how one conversation updates the graph, changes a match explanation, and reveals something a traditional candidate profile would miss.

> Future visual placeholder: Add a second artifact here showing one selected graph node and its neighboring relationships. Good candidate nodes: Career Intelligence, QA Agents, Human-Centered Automation, or Systems Thinking.

## Prototype Scenario

For a focused proof of concept, I would use one recorded interview and one job description.

### Before the Interview

The system produces an initial match using the existing career graph.

```text
Product Engineer match

Strong evidence:
- end-to-end engineering;
- product discovery;
- AI systems;
- early-stage ownership;
- rapid prototyping.

Weak or unknown:
- direct marketplace experience;
- production video infrastructure;
- hiring-domain knowledge.
```

### During the Interview

The candidate explains:

- why they built Career Intelligence;
- how they work through ambiguous problems;
- what kinds of environments energize them;
- why human-centered hiring matters to them;
- how they would extend a conversation-first hiring product without replacing its core.

### After the Interview

The graph gains new nodes and edges:

```text
Career Intelligence
    INSPIRED_BY
Fragmented job-search workflows

Candidate
    VALUES
Human-centered hiring

Candidate
    PREFERS
Early product ownership

Candidate
    IDENTIFIED
Persistent career memory opportunity

Persistent career memory
    EXTENDS
AI interview profile
```

The match explanation is regenerated.

The result would show exactly what the interview added, which previous evidence it reinforced, and which questions remain unresolved.

That is the demo.

Not another dashboard.

Not a pretend product clone.

A visible before-and-after reasoning trace.

## The Larger Question

Fika is exploring how hiring can recover the actual person from a growing volume of optimized application documents.

Career Intelligence asks what happens when the system remembers that person over time.

Together, those ideas suggest a different hiring model:

```text
Conversation provides understanding.

Career intelligence provides continuity.

Evidence provides trust.

Human control preserves agency.
```

The resume does not need to disappear completely.

It simply stops being the entire model.

## Closing Thought

The most interesting future of AI hiring is not a better machine for ranking applicants.

It is a system that helps people express who they are, helps companies understand what they genuinely need, and makes the reasoning between them visible.

A conversation could be the beginning of that process.

A living career graph could help it remember what comes next.
