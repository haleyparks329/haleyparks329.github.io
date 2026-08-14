export type ReportLink = { href: string; label: string; external?: boolean };
export type ReportStep = { title: string; text: string };
export type TechnicalGroup = { title: string; items: string[] };
export type StatusRow = {
  part: string;
  status: "Working" | "Prototype" | "Experimental" | "Planned" | "Withheld";
  does: string;
  inspect: ReportLink;
};
export type Learning = { title: string; text: string };
export type AppendixDetail = { summary: string; items: string[] };
export type ProjectDocumentData = {
  reportType: string;
  summary: string;
  links: ReportLink[];
  abstract: string[];
  why: string[];
  actuallyDoes: { intro: string; steps: string[] };
  howItWorks: { groups: TechnicalGroup[]; note: string };
  statusRows: StatusRow[];
  example: { title: string; steps: ReportStep[] };
  learnings: Learning[];
  notSolved: string[];
  appendix: { intro: string; details: AppendixDetail[]; links: ReportLink[] };
  currentDirection: string[];
};

const repositories = {
  human: {
    href: "https://github.com/haleyparks329/the-human-model",
    label: "Repository",
    external: true,
  },
  career: {
    href: "https://github.com/haleyparks329/career-intelligence",
    label: "Repository",
    external: true,
  },
  qa: {
    href: "https://github.com/haleyparks329/qa-agents",
    label: "Repository",
    external: true,
  },
};

export const projectDocuments: Record<string, ProjectDocumentData> = {
  "the-human-model": {
    reportType: "Personal research project",
    summary:
      "A longitudinal evidence and domain-model project connecting provenance, uncertainty, hypotheses, and outcomes.",
    links: [repositories.human],
    abstract: [
      "The Human Model asks how software can represent one changing person without flattening observations into isolated scores.",
      "It owns its domain evidence and evaluation. Interfaces may help capture or present context, but they do not own the model.",
      "The public work is an evidence layer: architecture, approved screenshots, research notes, and a deliberately simplified provenance example.",
    ],
    why: [
      "Human context is fragmented across records and moments.",
      "A useful model must preserve where evidence came from, what remains uncertain, and whether a hypothesis survived contact with later outcomes.",
    ],
    actuallyDoes: {
      intro:
        "The public project demonstrates an inspectable model loop without publishing the private machinery.",
      steps: [
        "Preserve observations and provenance.",
        "Keep uncertainty visible.",
        "Form reviewable hypotheses.",
        "Compare later outcomes.",
        "Let a human correct the model.",
      ],
    },
    howItWorks: {
      groups: [
        {
          title: "Public evidence",
          items: [
            "architecture",
            "approved screenshots",
            "movement prototype",
            "toy provenance example",
          ],
        },
        {
          title: "Withheld",
          items: [
            "production contracts",
            "schemas",
            "thresholds",
            "calibration",
            "runtime composition",
          ],
        },
      ],
      note: "Bridget is a separate bounded continuity interface, not the Human Model's database or orchestrator.",
    },
    statusRows: [
      {
        part: "Evidence and provenance",
        status: "Working",
        does: "Keeps the path from observation to interpretation reviewable.",
        inspect: repositories.human,
      },
      {
        part: "Movement-analysis prototype",
        status: "Experimental",
        does: "Shows one narrow review surface without claiming automated judgment.",
        inspect: repositories.human,
      },
      {
        part: "Production model machinery",
        status: "Withheld",
        does: "Private schemas, calibration, adapters, and runtime behavior are not public.",
        inspect: repositories.human,
      },
    ],
    example: {
      title: "A toy claim remains attached to its sources.",
      steps: [
        {
          title: "Observation",
          text: "Fictional evidence arrives with a source label.",
        },
        {
          title: "Review",
          text: "Support and missing evidence remain visible.",
        },
        {
          title: "Boundary",
          text: "The example produces no health or training recommendation.",
        },
      ],
    },
    learnings: [
      {
        title: "A model is more than a timeline.",
        text: "It should connect predictions, corrections, and outcomes.",
      },
      {
        title: "Interfaces should not absorb domain ownership.",
        text: "Presentation and continuity remain separate from evidence and evaluation.",
      },
    ],
    notSolved: [
      "This is not medical advice or a generalized model of people.",
      "Calibration and stronger evaluation remain ongoing research.",
    ],
    appendix: {
      intro: "The repository contains the public evidence map.",
      details: [
        {
          summary: "Boundary",
          items: [
            "No private data, prompts, schemas, thresholds, or repository maps.",
          ],
        },
      ],
      links: [repositories.human],
    },
    currentDirection: [
      "Improve public evaluation stories while keeping the implementation boundary defensible.",
    ],
  },
  "career-intelligence": {
    reportType: "Synthetic case study",
    summary:
      "An Andy Barks case study in source-backed claims, transferable capabilities, uncertainty, and honest gaps.",
    links: [repositories.career],
    abstract: [
      "Career Intelligence starts with what the evidence can support rather than rewriting a person to match a job description.",
      "The public repository follows a fictional librarian and educator through one transparent role comparison.",
      "It is a case study, not a reusable career engine.",
    ],
    why: [
      "A resume is a view over a career, not the source of truth.",
      "Reflection can guide questions but should not become an accomplishment or credential.",
    ],
    actuallyDoes: {
      intro: "The case study makes evidence and gaps inspectable.",
      steps: [
        "Read fictional evidence cards.",
        "Compare three opportunity needs.",
        "Label support as supported, partial, or unsupported.",
        "Keep environment considerations separate.",
        "Require human review.",
      ],
    },
    howItWorks: {
      groups: [
        {
          title: "Public",
          items: [
            "fictional evidence",
            "transparent comparison",
            "safety principles",
          ],
        },
        {
          title: "Withheld",
          items: [
            "complete person model",
            "ranking and scoring",
            "generation pipeline",
            "private career data",
          ],
        },
      ],
      note: "The labels describe one toy fixture and are not a decision policy.",
    },
    statusRows: [
      {
        part: "Andy Barks case study",
        status: "Working",
        does: "Shows one source-backed comparison with visible gaps.",
        inspect: repositories.career,
      },
      {
        part: "Reusable engine",
        status: "Withheld",
        does: "Schemas, configuration, selection, scoring, and generation remain private.",
        inspect: repositories.career,
      },
    ],
    example: {
      title: "One opportunity, three evidence states.",
      steps: [
        {
          title: "Supported",
          text: "Two fictional sources support curriculum material design.",
        },
        {
          title: "Partial",
          text: "One narrow note supports adaptation from feedback.",
        },
        {
          title: "Unsupported",
          text: "No source supports enterprise platform administration.",
        },
      ],
    },
    learnings: [
      {
        title: "Capability and environment fit differ.",
        text: "A person may be able to do a role without thriving in every environment.",
      },
      {
        title: "Gaps are useful output.",
        text: "An unsupported need should remain visible rather than becoming polished fiction.",
      },
    ],
    notSolved: [
      "The case study does not score people or generate resumes.",
      "A human remains responsible for public career claims.",
    ],
    appendix: {
      intro: "The public repository contains the full fictional case study.",
      details: [
        {
          summary: "Boundary",
          items: [
            "No production schema, ranking, prompts, or accumulated person knowledge.",
          ],
        },
      ],
      links: [repositories.career],
    },
    currentDirection: [
      "Keep the synthetic comparison clear enough to inspect without expanding it back into an engine.",
    ],
  },
  "qa-agents": {
    reportType: "Software-quality case study",
    summary:
      "A static Little Bytes investigation showing deterministic evidence before bounded agent action.",
    links: [
      { href: "/projects/qa-agents/demo/", label: "Little Bytes case study" },
      repositories.qa,
    ],
    abstract: [
      "QA Agents asks what evidence should exist before an agent investigates or acts.",
      "The public repository retains five bounded role concepts, acted/blocked/abstained outcomes, and a static Little Bytes artifact.",
      "It is not an installable operating substrate.",
    ],
    why: [
      "Passing tests may still leave changed behavior unexamined.",
      "A recommendation is more trustworthy when a reviewer can inspect the evidence and authority boundary.",
    ],
    actuallyDoes: {
      intro:
        "The case study separates evidence, investigation, proposed work, and human authority.",
      steps: [
        "Record the change at a high level.",
        "Inspect deterministic test evidence.",
        "Keep the missing regression evidence visible.",
        "Suggest a bounded next step.",
        "Leave approval and merge authority with a human.",
      ],
    },
    howItWorks: {
      groups: [
        {
          title: "Public",
          items: [
            "Little Bytes case study",
            "five responsibility labels",
            "acted / blocked / abstained",
          ],
        },
        {
          title: "Withheld",
          items: [
            "profiles and memory",
            "prompts and policies",
            "routing and fingerprints",
            "runtime and permissions",
          ],
        },
      ],
      note: "No agent, patch, test, pull request, or merge is automatically produced by the public demo.",
    },
    statusRows: [
      {
        part: "Little Bytes case study",
        status: "Working",
        does: "Shows a passing test run and a visible evidence gap.",
        inspect: { href: "/projects/qa-agents/demo/", label: "Case study" },
      },
      {
        part: "Five bounded roles",
        status: "Prototype",
        does: "Responsibility labels explain possible follow-up without publishing agent specifications.",
        inspect: repositories.qa,
      },
      {
        part: "Operating substrate",
        status: "Withheld",
        does: "Profiles, schemas, prompts, policies, routing, memory, and runtime composition are not public.",
        inspect: repositories.qa,
      },
    ],
    example: {
      title: "A pricing change passed tests but lacked direct evidence.",
      steps: [
        { title: "Evidence", text: "Configured tests passed." },
        {
          title: "Gap",
          text: "The changed combination had no focused regression example.",
        },
        { title: "Decision", text: "A human may approve the suggested test." },
      ],
    },
    learnings: [
      {
        title: "Evidence outranks agent confidence.",
        text: "The review should show what supports the conclusion.",
      },
      {
        title: "Abstention is a valid result.",
        text: "Missing evidence or authority should remain explicit.",
      },
    ],
    notSolved: [
      "The public demo does not expose agent runtime machinery.",
      "It does not claim autonomous browser repair or pull-request creation.",
    ],
    appendix: {
      intro: "The repository contains architecture and one sanitized artifact.",
      details: [
        {
          summary: "Boundary",
          items: [
            "No consumer contract, stable schema, policy, profile, prompt, or execution runner.",
          ],
        },
      ],
      links: [repositories.qa],
    },
    currentDirection: [
      "Improve evidence storytelling without rebuilding the public operating substrate.",
    ],
  },
};

export function projectDocumentForSlug(slug: string) {
  const document = projectDocuments[slug];
  if (!document) throw new Error(`Missing project document data for ${slug}`);
  return document;
}
