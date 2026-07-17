export type ReportLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type ReportStep = {
  title: string;
  text: string;
};

export type TechnicalGroup = {
  title: string;
  items: string[];
};

export type StatusRow = {
  part: string;
  status:
    | "Working"
    | "Partial"
    | "Prototype"
    | "Experimental"
    | "Planned"
    | "Archived"
    | "Not built";
  does: string;
  inspect: ReportLink;
};

export type Learning = {
  title: string;
  text: string;
};

export type AppendixDetail = {
  summary: string;
  items: string[];
};

export type ProjectDocumentData = {
  reportType: string;
  summary: string;
  links: ReportLink[];
  abstract: string[];
  why: string[];
  actuallyDoes: {
    intro: string;
    steps: string[];
  };
  howItWorks: {
    groups: TechnicalGroup[];
    note: string;
  };
  statusRows: StatusRow[];
  example: {
    title: string;
    steps: ReportStep[];
  };
  learnings: Learning[];
  notSolved: string[];
  appendix: {
    intro: string;
    details: AppendixDetail[];
    links: ReportLink[];
  };
  currentDirection: string[];
};

const humanModelRepository = {
  href: "https://github.com/haleyparks329/the-human-model",
  label: "View repository",
  external: true,
};

const humanModelExamples = {
  href: "https://github.com/haleyparks329/the-human-model/tree/main/examples",
  label: "View public examples",
  external: true,
};

const careerRepository = {
  href: "https://github.com/haleyparks329/career-intelligence",
  label: "View repository",
  external: true,
};

const careerDemo = {
  href: "https://github.com/haleyparks329/career-intelligence/tree/main/examples/andy-barks/generated",
  label: "View synthetic demo outputs",
  external: true,
};

const qaRepository = {
  href: "https://github.com/haleyparks329/qa-agents",
  label: "View repository",
  external: true,
};

const qaReplay = {
  href: "/projects/qa-agents/demo/",
  label: "Open evidence replay",
};

const qaStrategyReplay = {
  href: "/projects/qa-agents/meticulous/",
  label: "View strategy replay",
};

export const projectDocuments: Record<string, ProjectDocumentData> = {
  "the-human-model": {
    reportType: "Personal research project",
    summary:
      "A system that combines training, health, movement, and conversational data so I can reason about how I change over time.",
    links: [humanModelRepository, humanModelExamples],
    abstract: [
      "The Human Model is an ongoing personal research project exploring whether wearable data, training history, conversational context, and movement analysis can be combined into a continuously updated record of human performance.",
      "The current implementation includes health-data ingestion, workout logging, predictive performance models, dashboard experiments, Bridget as a conversational memory layer, and exploratory movement analysis from video. These parts are used to preserve context across training sessions instead of treating each measurement as an isolated signal.",
      "The longer-term direction is better personal decision support through accumulated evidence. It is an n=1 research system, not a finished coaching product or a generalized model of human performance.",
    ],
    why: [
      "My training history, health data, workout notes, and observations were spread across several apps and files. Each tool could show one part of the story, but none of them preserved enough context to explain why something changed.",
      "I started this project because I wanted those records to become useful together. A weaker workout, a recovery change, or a movement problem should be reviewed alongside the surrounding week instead of being trapped in separate dashboards.",
      "I also wanted a system that could remember the messy human parts: intent, stress, soreness, experiments, and the notes that usually disappear after a workout is logged.",
    ],
    actuallyDoes: {
      intro:
        "The system collects information from several sources, converts it into structured records, compares current performance with previous patterns, and keeps the result available for future decisions.",
      steps: [
        "A workout, check-in, measurement, or observation is recorded.",
        "Relevant health and recovery data is imported or connected to the same period.",
        "The new session is compared with previous sessions and known context.",
        "Models, rules, or review screens identify useful differences.",
        "The context is preserved so the next session starts with more memory than the last one.",
      ],
    },
    howItWorks: {
      groups: [
        {
          title: "Inputs",
          items: [
            "Apple Health and wearable exports",
            "workout logs and performance history",
            "Bridget conversations and check-ins",
            "body measurements and recovery notes",
            "movement video for technique review",
          ],
        },
        {
          title: "Processing",
          items: [
            "ingestion and normalization scripts",
            "structured records for training and health signals",
            "feature generation for prediction experiments",
            "movement-analysis prototypes",
            "dashboard and Bridget review flows",
          ],
        },
        {
          title: "Outputs",
          items: [
            "session predictions and model diagnostics",
            "review notes and next-session context",
            "dashboard views for human inspection",
            "movement-analysis summaries",
            "public examples that explain the workflow safely",
          ],
        },
      ],
      note: "The technical structure matters because the system is only useful if the data, model output, and human interpretation stay connected. Bridget is the conversational memory layer; dashboards and reports are review layers; model output is treated as a hypothesis to inspect.",
    },
    statusRows: [
      {
        part: "Health-data ingestion",
        status: "Partial",
        does: "Connects health and recovery signals to the wider personal-data record.",
        inspect: humanModelRepository,
      },
      {
        part: "Workout logging",
        status: "Working",
        does: "Preserves training sessions so performance can be compared across time.",
        inspect: humanModelRepository,
      },
      {
        part: "Bridget memory layer",
        status: "Working",
        does: "Captures conversational context, observations, and check-ins that numbers alone miss.",
        inspect: humanModelRepository,
      },
      {
        part: "Performance prediction model",
        status: "Experimental",
        does: "Uses prior training and readiness context to create next-session hypotheses.",
        inspect: humanModelExamples,
      },
      {
        part: "Movement-video analysis",
        status: "Prototype",
        does: "Extracts movement signals from video so technique questions can be reviewed more concretely.",
        inspect: humanModelExamples,
      },
      {
        part: "Generalized coaching product",
        status: "Not built",
        does: "The project does not claim to coach other people or replace expert judgment.",
        inspect: humanModelRepository,
      },
    ],
    example: {
      title: "Why was one workout worse than expected?",
      steps: [
        {
          title: "Starting situation",
          text: "A workout underperforms compared with the planned load, reps, or effort level.",
        },
        {
          title: "Input",
          text: "The session is reviewed beside recent training history, recovery signals, soreness notes, and any Bridget check-ins from the same period.",
        },
        {
          title: "Processing",
          text: "The system compares the session with prior patterns and looks for surrounding changes that may explain the result.",
        },
        {
          title: "Result",
          text: "The output is a clearer reason to adjust, repeat, rest, or collect more evidence before changing the plan.",
        },
        {
          title: "Human interpretation",
          text: "I still decide what the result means. The system helps me ask a better question instead of pretending the answer is automatic.",
        },
      ],
    },
    learnings: [
      {
        title: "More data did not automatically create more understanding.",
        text: "The project became clearer when raw metrics were treated as evidence that needed context, not as answers by themselves.",
      },
      {
        title: "The notes mattered.",
        text: "A short note about soreness, stress, or intent could explain a session better than another isolated metric.",
      },
      {
        title: "The review loop was the useful part.",
        text: "The valuable pattern is collecting evidence, reviewing it, acting, and learning from the next session.",
      },
    ],
    notSolved: [
      "The system is built around one person, so it should not be treated as a generalized coaching model.",
      "Some data still requires manual cleanup or interpretation.",
      "Movement analysis is useful for review, not a final judgment about technique.",
      "Private health and training data limits what can be shown publicly.",
      "Storage boundaries are still evolving; Airtable, local files, and Postgres each appear in different stages of the work.",
    ],
    appendix: {
      intro:
        "The sections above explain the project as a system. The repository contains the implementation details, scripts, and public-safe examples.",
      details: [
        {
          summary: "Technology and storage",
          items: [
            "R and Python scripts support analysis and modeling work.",
            "Training logs, health exports, and model outputs are handled as structured local records.",
            "Airtable has been useful for lightweight review and organization; Postgres work is part of the more durable local data direction.",
          ],
        },
        {
          summary: "Models and outputs",
          items: [
            "Training-load models are treated as hypotheses for review.",
            "Movement-analysis work uses video-derived signals for inspection.",
            "Dashboard and Bridget-facing outputs are review aids, not automated decisions.",
          ],
        },
      ],
      links: [humanModelRepository, humanModelExamples],
    },
    currentDirection: [
      "The current work is to make the data pipeline and review layers more coherent without overstating what the models know. The next useful milestone is a cleaner path from recorded training and recovery context to a reviewable next-session hypothesis.",
      "The open question is how much personal evidence is enough to support better decisions while still keeping the system honest about uncertainty.",
    ],
  },
  "career-intelligence": {
    reportType: "Career reasoning project",
    summary:
      "A source-backed career reasoning system that compares roles against evidence, preferences, capabilities, and boundaries instead of keywords alone.",
    links: [careerRepository, careerDemo],
    abstract: [
      "Career Intelligence is a project about making career reasoning more evidence-based. It explores how a person's work history, skills, preferences, and goals can be represented as structured source material instead of flattened into resume keywords.",
      "The current public implementation includes validated synthetic career data, evidence ranking, role matching, positioning outputs, interview-prep outputs, and generated demo artifacts. The public example uses synthetic data so the workflow can be inspected without exposing private career history.",
      "The longer-term direction is a system that supports career judgment without pretending to decide a person's future automatically. It should help compare opportunities, explain fit, and preserve the evidence behind each claim.",
    ],
    why: [
      "Resumes and job boards often reduce a person to the words that fit neatly into a posting. That misses transferable work, preferences, constraints, and the difference between being qualified for something and actually wanting the shape of the job.",
      "I built this because I wanted career materials to start from evidence instead of from whatever phrasing sounded strongest. A system should be able to explain why a role fits, where the match is weak, and which claims are safe to use.",
      "I also wanted the private reflection layer to stay separate from public claims. Preferences and boundaries can guide reasoning, but they should not become unsupported resume language.",
    ],
    actuallyDoes: {
      intro:
        "The system turns career history and job information into structured records, compares them, and produces conservative outputs that stay attached to the evidence behind them.",
      steps: [
        "A person record describes work history, skills, preferences, goals, and boundaries.",
        "A job description is parsed into requirements, responsibilities, and signals.",
        "The system compares the role against source-backed evidence.",
        "Fit, gaps, positioning, and preparation notes are generated from the supported evidence.",
        "The human reader reviews the output before using it in any real career decision.",
      ],
    },
    howItWorks: {
      groups: [
        {
          title: "Inputs",
          items: [
            "structured career records",
            "skills and work-history evidence",
            "preferences, goals, and boundaries",
            "job descriptions",
            "synthetic public demo data",
          ],
        },
        {
          title: "Processing",
          items: [
            "/match compares a role with the evidence record",
            "/position turns supported evidence into positioning notes",
            "/prep creates interview-prep material from the match",
            "evidence ranking keeps claims tied to source records",
            "graph or atlas views represent relationships across roles, skills, and evidence",
          ],
        },
        {
          title: "Outputs",
          items: [
            "role match reports",
            "positioning notes",
            "interview-prep notes",
            "public synthetic demo artifacts",
            "inspectable source-backed examples",
          ],
        },
      ],
      note: "The system separates fit, preferences, capabilities, and boundaries because they are different kinds of information. A role can be technically possible and still be a poor fit; a preference can shape judgment without becoming a public claim.",
    },
    statusRows: [
      {
        part: "Synthetic career dataset",
        status: "Working",
        does: "Provides public-safe source records for inspecting the workflow without private career data.",
        inspect: careerDemo,
      },
      {
        part: "/match workflow",
        status: "Prototype",
        does: "Compares job requirements against structured career evidence and returns fit signals.",
        inspect: careerRepository,
      },
      {
        part: "/position workflow",
        status: "Prototype",
        does: "Turns supported evidence into role-specific positioning notes.",
        inspect: careerDemo,
      },
      {
        part: "/prep workflow",
        status: "Prototype",
        does: "Generates interview-prep notes from the role match and source evidence.",
        inspect: careerDemo,
      },
      {
        part: "Evidence graph or atlas",
        status: "Experimental",
        does: "Represents relationships among roles, skills, claims, and source evidence.",
        inspect: careerRepository,
      },
      {
        part: "Automated career decisions",
        status: "Not built",
        does: "The system does not decide where someone should work or submit applications for them.",
        inspect: careerRepository,
      },
    ],
    example: {
      title: "Why did one job appear to fit better than another?",
      steps: [
        {
          title: "Starting situation",
          text: "Two job descriptions look similar because they share many keywords.",
        },
        {
          title: "Input",
          text: "The system receives the structured career record and each job description.",
        },
        {
          title: "Processing",
          text: "It compares responsibilities, required skills, preferred experience, constraints, and evidence from past work.",
        },
        {
          title: "Result",
          text: "One role may have stronger source-backed fit, while the other may rely on unsupported claims or conflict with stated boundaries.",
        },
        {
          title: "Human interpretation",
          text: "The output gives the person a clearer basis for judgment. It does not make the career decision for them.",
        },
      ],
    },
    learnings: [
      {
        title: "Fit is not the same as eligibility.",
        text: "A person can meet baseline requirements while still being mismatched on work style, goals, or constraints.",
      },
      {
        title: "Claims are safer when they stay attached to evidence.",
        text: "The system is most useful when every generated point can be traced back to a source record.",
      },
      {
        title: "Generated writing should come after reasoning.",
        text: "Positioning and prep outputs are less likely to overclaim when analysis happens first.",
      },
    ],
    notSolved: [
      "The public example is synthetic and does not prove performance on a broad real-world dataset.",
      "No production users or outcome metrics are claimed.",
      "Manual judgment is still required to decide whether a role is worth pursuing.",
      "Reflection-only signals cannot become resume claims unless they are supported by source evidence.",
      "Vague job descriptions can still produce uncertain or incomplete match results.",
    ],
    appendix: {
      intro:
        "The sections above explain the project as a system. The repository contains the implementation details and public synthetic examples.",
      details: [
        {
          summary: "Core routes",
          items: [
            "/match compares structured career evidence with a job description.",
            "/position creates role-specific positioning material from supported claims.",
            "/prep creates interview-prep material from the same evidence trail.",
          ],
        },
        {
          summary: "Data and artifacts",
          items: [
            "Structured Markdown and schema-validated records describe the public synthetic person.",
            "Generated demo outputs show the workflow without exposing private data.",
            "Graph or atlas work explores how evidence, skills, roles, and claims relate.",
          ],
        },
      ],
      links: [careerRepository, careerDemo],
    },
    currentDirection: [
      "The current work is to keep the reasoning layer source-backed while making the public example easier to inspect. The next meaningful milestone is clearer comparison output that shows fit, gaps, and boundaries without collapsing them into one score.",
      "The open question is how much structure is needed before career reasoning becomes helpful rather than just another polished generator.",
    ],
  },
  "qa-agents": {
    reportType: "Software-quality research project",
    summary:
      "A recorded evidence loop that reconstructs a QA investigation so a human can see what changed, what passed, what remains uncertain, and what should happen next.",
    links: [qaReplay, qaRepository],
    abstract: [
      "QA Agents explores which parts of software-quality work can be supported by agents and which parts still need direct human review. The project focuses on preserving evidence: what changed, what tests ran, what gaps remained, and why a next action was recommended.",
      "The current public implementation includes a recorded Little Bytes pricing replay, local knowledge-base foundations, agent role definitions, deterministic planning prototypes, and a secondary strategy replay. The demo is a reconstruction of a completed investigation, not a hidden live browser run.",
      "The longer-term direction is better QA handoff: detection should lead to routing, routing may lead to repair, and repair still needs review. No autonomous changes are hidden from human judgment.",
    ],
    why: [
      "A software change can pass tests and still leave an important question unanswered. That is the gap this project explores.",
      "I built QA Agents because test output often loses the surrounding story. A human reviewer needs to know what changed, what evidence exists, what is missing, and which decision is still theirs to make.",
      "The project is also a boundary exercise. It is tempting to describe agents as if they completed the whole workflow. This page keeps the distinction between detection, routing, repair, and review visible.",
    ],
    actuallyDoes: {
      intro:
        "The system records a QA investigation as a sequence of evidence, then uses that evidence to route attention to the next useful step.",
      steps: [
        "A software change is identified.",
        "The available tests and coverage evidence are reviewed.",
        "Any missing coverage or risky behavior is recorded as a gap.",
        "The gap is routed to the workflow or agent role most suited to address it.",
        "A human reviews the recommendation before any real change is accepted.",
      ],
    },
    howItWorks: {
      groups: [
        {
          title: "Inputs",
          items: [
            "software changes or feature requests",
            "test output and coverage evidence",
            "application profiles",
            "known gaps and fingerprints",
            "recorded replay artifacts",
          ],
        },
        {
          title: "Processing",
          items: [
            "Lookout represents exploration and detection work",
            "Beacon scopes QA plans and test strategy",
            "Inspector reviews coverage gaps and system behavior",
            "Scribe represents test-authoring handoff",
            "Patch is planned for repair workflows, not claimed as complete",
          ],
        },
        {
          title: "Outputs",
          items: [
            "recorded evidence replay",
            "persisted gap records",
            "agent or workflow recommendations",
            "strategy replay summaries",
            "human-review prompts",
          ],
        },
      ],
      note: "Detection means finding or suspecting a problem. Routing means choosing the next responsible workflow. Repair means changing code or tests. Review means a human checks the evidence and decides what to accept. QA Agents is strongest when those steps are not blurred together.",
    },
    statusRows: [
      {
        part: "Little Bytes evidence replay",
        status: "Working",
        does: "Reconstructs one pricing-change investigation from vendored evidence.",
        inspect: qaReplay,
      },
      {
        part: "Replay evidence artifact",
        status: "Working",
        does: "Stores the recorded change, test result, coverage gap, and recommendation used by the replay.",
        inspect: qaReplay,
      },
      {
        part: "Agent role definitions",
        status: "Prototype",
        does: "Separates exploration, planning, inspection, writing, and repair responsibilities.",
        inspect: qaRepository,
      },
      {
        part: "SQLite knowledge base",
        status: "Prototype",
        does: "Persists fingerprints, gaps, and handoff debt locally for inspection.",
        inspect: qaRepository,
      },
      {
        part: "Meticulous-inspired strategy replay",
        status: "Prototype",
        does: "Shows how deterministic replay evidence can become workflow clusters, findings, and a policy-constrained recommendation.",
        inspect: qaStrategyReplay,
      },
      {
        part: "Autonomous browser repair and PR creation",
        status: "Not built",
        does: "The public project does not claim hidden autonomous patching, live browser repair, or automatic pull requests.",
        inspect: qaRepository,
      },
    ],
    example: {
      title: "A software change passed tests but still left an evidence gap.",
      steps: [
        {
          title: "Starting situation",
          text: "A pricing path in the Little Bytes example changed.",
        },
        {
          title: "Input",
          text: "The replay records the change, the passing test run, and the available coverage evidence.",
        },
        {
          title: "Processing",
          text: "The investigation checks whether the changed path was directly covered or whether a gap remained.",
        },
        {
          title: "Result",
          text: "The artifact records a coverage gap and recommends Scribe as the next workflow because test-writing is the missing step.",
        },
        {
          title: "Human interpretation",
          text: "The recommendation routes attention. It does not claim that an agent wrote the test, changed the code, or approved the merge.",
        },
      ],
    },
    learnings: [
      {
        title: "Passing tests are not the whole story.",
        text: "The useful question is whether the changed behavior was actually examined.",
      },
      {
        title: "Evidence is more trustworthy than agent confidence.",
        text: "A recommendation matters only when the reader can inspect why it was made.",
      },
      {
        title: "Human review is part of the design.",
        text: "The project is clearer when it treats human judgment as a required step rather than a fallback.",
      },
      {
        title: "Agent names work best as responsibility labels.",
        text: "They help separate kinds of QA work without implying every role is fully autonomous today.",
      },
    ],
    notSolved: [
      "The demo is a recorded reconstruction, not a live autonomous browser run.",
      "Selector healing, browser repair, live dashboards, and PR creation remain planned unless the repository shows otherwise.",
      "Patch is not presented as a completed autonomous repair system.",
      "Recommendations route attention; they do not complete the handoff.",
      "The system is advisory and local-first, and human review remains required.",
    ],
    appendix: {
      intro:
        "The sections above explain the project as a QA system. The repository and demos contain the implementation details and evidence artifacts.",
      details: [
        {
          summary: "Agent and workflow roles",
          items: [
            "Lookout: exploration and detection.",
            "Beacon: QA planning and scope.",
            "Inspector: coverage and behavior review.",
            "Scribe: test-authoring handoff.",
            "Patch: planned repair workflow, not a completed autonomous claim.",
          ],
        },
        {
          summary: "Evidence and demos",
          items: [
            "The Little Bytes replay is static and GitHub Pages-friendly.",
            "Vendored JSON evidence keeps the replay inspectable without runtime GitHub fetches.",
            "The strategy replay is secondary and shows a planning-style investigation.",
          ],
        },
      ],
      links: [qaReplay, qaStrategyReplay, qaRepository],
    },
    currentDirection: [
      "The current work is to make QA handoff evidence clearer: what changed, what was tested, what was not covered, and who should review the next step. The next meaningful milestone is a stronger connection between recorded gaps and the workflow that handles them.",
      "The open question is how much assistance can be added before the system starts hiding the human decision boundary it was built to preserve.",
    ],
  },
};

export function projectDocumentForSlug(slug: string) {
  const document = projectDocuments[slug];

  if (!document) {
    throw new Error(`Missing project document data for ${slug}`);
  }

  return document;
}
