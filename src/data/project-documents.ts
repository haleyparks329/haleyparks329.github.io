export type ReportLink = { href: string; label: string; external?: boolean };
export type OpeningSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  pullquote?: string;
  steps?: string[];
  links?: ReportLink[];
};
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
  openingSections?: OpeningSection[];
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
    openingSections: [
      {
        id: "research-question",
        heading:
          "How do you represent a person in software when the person keeps changing?",
        paragraphs: [
          "People are not static profiles. Preferences change. Bodies change. Plans change. New evidence can make an old conclusion wrong. A useful human model has to preserve that history instead of constantly replacing it with the latest summary.",
          "That means treating human context as longitudinal, provenance-aware, reviewable state: what was observed, what was inferred, what was confirmed, what changed, and why.",
        ],
      },
      {
        id: "abstract",
        heading: "I am not a Markdown file.",
        paragraphs: [
          "That line started as a rant about agent memory. If everything important about a person lives in one Markdown file, it gets stale, grows into a mess, and quietly turns old assumptions into current truth. I wanted something that could change with the person while still remembering how it got there.",
          "The Human Model is my attempt to build that representation. It connects source-backed observations with interpretations, claims, corrections, interventions, and later outcomes. Important state stays reviewable, uncertainty stays visible, and a new conclusion does not have to erase the path that produced the old one.",
          "I started with bodybuilding because I already had the problem in front of me: training, nutrition, recovery, measurements, plans, wearable data, and my own observations all described parts of the same changing system. The architecture grew from trying to reason across those parts without pretending any one signal was the whole person.",
        ],
      },
      {
        id: "origin",
        heading: "Bodybuilding made the context problem impossible to ignore.",
        pullquote:
          "I started by trying to model my training. Somewhere along the way, the harder question became: what does it mean to model a person at all?",
        paragraphs: [
          "My data was already scattered across workout logs, nutrition apps, Apple Health, coaching notes, measurements, screenshots, and whatever I happened to notice that week. Each source was useful on its own. The problem was keeping the relationships between them.",
          "If a training block went badly, I did not only care about the final number. I cared what the plan was, what actually happened, what else was going on, what I believed at the time, and whether that belief survived contact with the outcome. That pushed the project away from “personal dashboard” and toward a domain model built around provenance, longitudinal state, corrections, and uncertainty.",
        ],
      },
      {
        id: "what-it-does",
        heading: "A review loop, not a machine for declaring truth.",
        paragraphs: [
          "The Human Model separates evidence from interpretation and interpretation from accepted state. A source can report something without making it true forever, and a model can make a useful inference without being allowed to silently promote that inference into fact.",
        ],
        steps: [
          "Capture an observation with its source and time.",
          "Preserve the evidence and its provenance.",
          "Interpret it without hiding uncertainty.",
          "Form reviewable claims, hypotheses, or predictions.",
          "Compare those ideas with later outcomes.",
          "Let corrections and new evidence change future state without erasing history.",
        ],
      },
      {
        id: "motif",
        heading: "“I am not a Markdown file” became bigger than this project.",
        paragraphs: [
          "The same idea now shows up across several of my systems. A resume is not the person. A chat transcript is not the world. A dashboard is not the underlying state. A projection is not the source of truth.",
          "Summaries are useful interfaces. They just should not quietly become the thing they summarize.",
        ],
        links: [
          {
            href: "/projects/career-intelligence/",
            label: "Career Intelligence",
          },
          {
            href: "/projects/wonderful-digital-world/",
            label: "Wonderful Digital World",
          },
          { href: "/projects/bridget/", label: "Bridget" },
        ],
      },
    ],
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
    openingSections: [
      {
        id: "core-question",
        heading: "A resume is a view of a person. What gets lost in the view?",
        paragraphs: [
          "Career Intelligence started as a practical job-search problem: I wanted help adapting career materials without one-shotting prompts or rewriting myself into whatever a job description happened to ask for.",
          "That quickly became a representation problem. Job titles are incomplete. Resumes are compressed. Transferable skills cross role boundaries. Reflection can be useful without being evidence. And being capable of doing a job is not the same question as whether the environment is a good fit.",
        ],
      },
      {
        id: "what-it-does",
        heading: "Evidence before language.",
        paragraphs: [
          "Career Intelligence separates what the evidence supports from how that evidence is eventually described. Source-backed facts stay distinct from wording, gaps remain visible, and claims can be supported, partial, or unsupported instead of being polished into certainty.",
          "The public project demonstrates those ideas with a fictional person and a small, inspectable role comparison. The deeper system is about reasoning from a career history without treating the resume as the canonical person model.",
        ],
      },
      {
        id: "why-built",
        heading:
          "I wanted the story to be truthful before I made it persuasive.",
        paragraphs: [
          "Good positioning should help someone see the shape that is already there. It should not invent experience to make the shape fit.",
          "That means reasoning about capabilities, evidence, uncertainty, environment, and honest gaps before generating the sentence that goes on the page.",
        ],
      },
      {
        id: "human-model-bridge",
        heading: "Another reason I am not a Markdown file.",
        paragraphs: [
          "The Human Model asks how software can represent a changing person without flattening them into one static summary. Career Intelligence applies the same instinct to a narrower problem: a resume is useful, but it is still only a projection of a much larger history.",
        ],
        links: [
          { href: "/projects/the-human-model/", label: "The Human Model" },
        ],
      },
    ],
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
    openingSections: [
      {
        id: "core-question",
        heading:
          "What should happen after software changes, but before an agent acts?",
        paragraphs: [
          "QA Agents started when I was the only QA person on a team and realized that a lot of my time was going into investigation a computer could perform faster than I could.",
          "The interesting part was not “can I make an agent debug something?” It was deciding what the agent should have to know before it acted, where its responsibility ended, and what should come back to the human for judgment.",
        ],
      },
      {
        id: "what-it-does",
        heading: "Evidence first. Action second.",
        paragraphs: [
          "QA Agents is a case study in bounded software investigation. Deterministic evidence is established before agent reasoning, missing evidence stays visible, and each role has a specific responsibility rather than broad permission to “fix the problem.”",
          "An investigation can end in three useful ways: acted, blocked, or abstained. Acting means the evidence and authority were sufficient for the bounded task. Blocked means something required is missing. Abstained means the work is outside the role’s authority.",
          "Sometimes the trustworthy behavior is doing nothing and explaining why.",
        ],
      },
      {
        id: "why-built",
        heading:
          "I would rather review a good investigation than manually trace every bug.",
        paragraphs: [
          "The human value in QA is not typing every command or personally collecting every artifact. It is understanding expected behavior, judging risk, spotting when the evidence does not support the conclusion, and deciding what should happen next.",
          "QA Agents explores how much of the investigative bookkeeping can move into software while keeping that judgment legible and human-reviewed.",
        ],
      },
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
