export const wonderfulDigitalWorld = {
  premise:
    "A persistent computational environment should carry context forward, make bounded work inspectable, and return judgment to the human at the right moment.",
  abstract: [
    "Most software waits for a person to reopen the right tool, reconstruct the context, move information between systems, and decide what should happen next. Wonderful Digital World asks what belongs in a durable computational environment instead.",
    "The public architecture keeps a deliberate boundary: machines may preserve state, reconcile evidence, prepare work, and propose actions; authority over intent, consent, preferences, priorities, corrections, and meaning remains human.",
  ],
  loop: [
    "Outside-world input becomes a durable receipt or evidence record.",
    "Communication and work routing turn that durable record into inspectable coordination.",
    "A bounded resident receives only the context and authority needed for its work.",
    "The owning domain evaluates any proposed state change against canonical domain state.",
    "A change is proposed or confirmed, or the unknown remains safely unresolved.",
    "Durable evidence and work survive the worker that handled them.",
  ],
  objects: [
    {
      term: "Durable receipt / Evidence",
      meaning:
        "A persistent source record and the trace that says where it came from.",
    },
    {
      term: "Communication",
      meaning:
        "An inspectable message that carries a reference without becoming canonical state.",
    },
    {
      term: "Work item",
      meaning: "A durable unit of attention that can be routed and resolved.",
    },
    {
      term: "Resident",
      meaning: "A bounded reasoner with explicit context and authority limits.",
    },
    {
      term: "Domain state",
      meaning:
        "Canonical state owned and interpreted by the responsible domain.",
    },
    {
      term: "Place",
      meaning:
        "A high-level context for presence, attention, and authorized activity.",
    },
    {
      term: "Proposed / confirmed change",
      meaning:
        "A reviewable transition whose authority and confirmation remain explicit.",
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
      status: "Publicly tested",
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
      part: "Public projection",
      status: "Publicly tested",
      detail:
        "Versioned, viewer-bounded projection contracts keep public state separate from private or operational state.",
      inspect:
        "https://github.com/Wonderful-Digital-World/wonderful-digital-world/tree/main/docs",
    },
    {
      part: "Private or production runtime",
      status: "Outside public evidence",
      detail:
        "The public repository does not establish the contents, architecture, or maturity of any private or production runtime.",
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
    "The public reference inbox is in memory; it demonstrates a contract rather than durable production persistence.",
    "The public repository includes no production connectors, external tool execution, or live projection adapter.",
    "The viewer fixture does not yet prove sanitization, authentication, delay handling, identity policy, or a canonical activity taxonomy.",
    "Resident memory, private prompts, lived data, credentials, and production integrations are outside the public evidence set.",
    "The public code demonstrates a bounded seam, not a deployable personal world or general autonomy.",
  ],
} as const;

export const flagshipRelationship =
  "The Human Model studies how evidence about one changing person can remain structured and accountable. Wonderful Digital World studies how a wider computational environment can retain context and coordinate bounded work. Each keeps its own state and authority boundaries.";
