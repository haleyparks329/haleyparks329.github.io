# Progressive disclosure

## Principle

Each surface should answer the visitor's current question and offer one honest
step deeper. Summaries should not hide uncertainty, and depth should not be used
to bury status or provenance.

## Depth contract

| Depth            | Visitor question                                            | Include                                                                                                          | Exclude by default                                                                   |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| D0 Orientation   | Who is Haley, what is the lab doing, and where should I go? | Identity, current work, two flagships, primary navigation                                                        | Architecture vocabulary, repository maps, archive volume                             |
| D1 Understanding | What is this work and why does it matter?                   | Project summaries, selected writing, experiments, thoughts, demos, diagrams, Memories, About                     | Exhaustive implementation detail and internal process logs                           |
| D2 Evidence      | Is it real, how does it work, and what was learned?         | Architecture, evidence, repositories, investigations, implementation notes, documentation, failures, limitations | Private data, credentials, production secrets, speculative claims presented as facts |
| D3 World depth   | How does the broader environment behave and connect?        | World View, residents/agents, deep archives, histories, surprising relationships                                 | Canonical mutations, private lived state, or automated publishing without review     |

## Disclosure patterns

### Project

`plain-language premise → current status → evidence → architecture → repository`

Every project entry must surface its status before asking the reader to inspect
technical depth. The repository is evidence, not a substitute for a useful
summary.

### Writing

`claim or question → essay → related project → supporting evidence`

Writing may interpret systems, but it should label speculation and link back to
the canonical project source where appropriate.

### Memory

`dated observation → context → relationship → optional follow-up`

Memories are small, attributable records. They do not need to become polished
essays, but they do need a date, type, status, and honest connection to work.

### Wonderful Digital World and World View

`WDW explanation → viewer relationship → external World View experience`

The site explains the architectural idea. World View provides a separate
visual projection. A screenshot may later be used as clearly attributed
evidence; a decorative imitation may not.

### Agents

`visible attribution → provenance → human-review state → published artifact`

Agent-assisted content must remain distinguishable from Haley-authored content.
No automatic publication path is part of WP1.

## Navigation behavior

- D0 links should land on D1, not drop a new visitor into raw repositories.
- D1 pages may offer D2 evidence links close to the claims they support.
- D2 routes should link back to a readable project overview.
- D3 experiences must provide an exit back to their explanatory context.
- Topic trails and search can cross depths, but results should expose content
  type, project relationship, and date/status.

## Responsive and accessible disclosure

- DOM order defines the reading order; visual mosaics may not scramble it.
- Disclosure controls must be native links or buttons with visible focus.
- Essential status, provenance, and warnings may not exist only in hover states,
  color, animation, or imagery.
- Collapsed content must not conceal the only explanation of a link or action.
- Reduced-motion preferences apply to transitions between layers.

## WP2 acceptance tests

- A first-time reader can name both flagships after scanning the homepage.
- A reader can reach implementation evidence for either flagship in two or
  fewer intentional steps from its homepage module.
- Every World View link labels it as a separate application or repository.
- Every agent-assisted artifact states authorship and review provenance.
- A keyboard-only user can traverse every disclosure control in DOM order.
