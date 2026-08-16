export const wonderfulDigitalWorld = {
  premise:
    "A persistent computational environment should carry context forward, make bounded work inspectable, and return judgment to the human at the right moment.",
  abstract: [
    "Most software waits for a person to reopen the right tool, reconstruct the context, move information between systems, and decide what should happen next. Wonderful Digital World asks what belongs in a durable computational environment instead.",
    "The public architecture keeps a deliberate boundary: machines may preserve state, reconcile evidence, prepare work, and propose actions; authority over intent, consent, preferences, priorities, corrections, and meaning remains human.",
  ],
  loop: [
    "A persistent world retains public-safe state.",
    "New artifacts and evidence are observed with provenance.",
    "Interpretations preserve uncertainty rather than replacing the source.",
    "Work is reconciled against current state and explicit authority.",
    "Bounded actions may be proposed or performed when capability permits.",
    "Outcomes are recorded so the world can continue from evidence.",
  ],
  objects: [
    {
      term: "Artifact / Evidence",
      meaning: "A source object and the trace that says where it came from.",
    },
    {
      term: "Interpretation",
      meaning: "A derived reading that remains separate from source evidence.",
    },
    {
      term: "Work item",
      meaning: "A durable unit of attention that can be routed and resolved.",
    },
    {
      term: "Proposed action",
      meaning: "A possible change awaiting the authority its scope requires.",
    },
    {
      term: "Outcome",
      meaning: "The recorded result of work, including failure or abstention.",
    },
    {
      term: "Projection",
      meaning: "A versioned, viewer-bounded view of world state.",
    },
    {
      term: "Authority",
      meaning:
        "The explicit capability and human judgment boundary around action.",
    },
  ],
  evidence: [
    {
      part: "Reference seam",
      status: "Implemented and tested",
      detail:
        "Provenance, digest identity, persist-before-route behavior, work outcomes, capability checks, and viewer-bounded projections are covered by public tests.",
      inspect:
        "https://github.com/Wonderful-Digital-World/wonderful-digital-world/tree/main/tests",
    },
    {
      part: "Architecture and contracts",
      status: "Published",
      detail:
        "The repository defines vocabulary, invariants, authority boundaries, synthetic examples, and reference code.",
      inspect:
        "https://github.com/Wonderful-Digital-World/wonderful-digital-world/tree/main/docs",
    },
    {
      part: "Public projection contracts",
      status: "Implemented and tested",
      detail:
        "Versioned, viewer-bounded projection contracts keep public state separate from private or operational state.",
      inspect:
        "https://github.com/Wonderful-Digital-World/wonderful-digital-world/tree/main/docs",
    },
    {
      part: "Production environment",
      status: "Planned",
      detail:
        "A database adapter, production connectors and tools, and a live projection adapter are not present in the public implementation.",
      inspect:
        "https://github.com/Wonderful-Digital-World/wonderful-digital-world",
    },
  ],
  residents: [
    {
      name: "Bridget",
      status: "Independent experimental integration",
      note: "Public materials explore an optional boundary with Bridget; Bridget is not required as the world interpreter or owner.",
    },
  ],
  limitations: [
    "The reference inbox is in memory; it is not a production persistence layer.",
    "No production connectors, external tool execution, or live projection adapter are included.",
    "The viewer fixture does not yet prove sanitization, authentication, delay handling, identity policy, or a canonical activity taxonomy.",
    "Resident memory, private prompts, lived data, credentials, and production integrations are intentionally outside the public repository.",
    "The public code demonstrates a bounded seam, not a deployable personal world or general autonomy.",
  ],
} as const;

export const flagshipRelationship =
  "The Human Model studies how evidence about one changing person can remain structured and accountable. Wonderful Digital World studies how a wider computational environment can retain context and coordinate bounded work. Each keeps its own state and authority boundaries.";
