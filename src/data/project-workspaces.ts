export type ProjectWorkspaceLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectWorkspaceGroup = {
  label: string;
  links: ProjectWorkspaceLink[];
};

export type ProjectWorkspaceConfig = {
  slug:
    | "the-human-model"
    | "bridget"
    | "career-intelligence"
    | "qa-agents"
    | "this-website";
  cardLabel: string;
  cardMicrocopy?: string;
  projectType: string;
  headerSummary: string;
  currentNote: string;
  annotation: string;
  primaryLinks?: ProjectWorkspaceLink[];
  groups: ProjectWorkspaceGroup[];
};

export const projectWorkspaces: Record<string, ProjectWorkspaceConfig> = {
  bridget: {
    slug: "bridget",
    cardLabel: "Personal orchestration",
    cardMicrocopy: "replaces remembering, not thinking",
    projectType: "Personal orchestration system",
    headerSummary:
      "A private, deterministic system that turns scattered inputs into durable, inspectable context without replacing human judgment.",
    currentNote:
      "Using the private V1 system while documenting its architecture and design boundaries in public.",
    annotation: "threads in; coherent context out; uncertainty stays visible",
    primaryLinks: [
      {
        label: "Writing",
        href: "/writing/",
      },
      {
        label: "Architecture repository",
        href: "https://github.com/haleyparks329/bridget-architecture",
        external: true,
      },
    ],
    groups: [
      {
        label: "Project",
        links: [{ label: "Overview", href: "/projects/bridget/" }],
      },
      {
        label: "Writing",
        links: [{ label: "Current writing", href: "/writing/" }],
      },
      {
        label: "Related system",
        links: [
          {
            label: "The Human Model",
            href: "/projects/the-human-model/",
          },
        ],
      },
      {
        label: "External",
        links: [
          {
            label: "Architecture repository",
            href: "https://github.com/haleyparks329/bridget-architecture",
            external: true,
          },
        ],
      },
    ],
  },
  "the-human-model": {
    slug: "the-human-model",
    cardLabel: "Personal research",
    projectType: "Personal research",
    headerSummary:
      "A living experiment in understanding how training, health, movement, and context change over time.",
    currentNote:
      "Cleaning up the path from workout records and recovery context to a reviewable next-session prediction.",
    annotation:
      "growing system; still deciding where all the data wants to live",
    primaryLinks: [
      {
        label: "Current work",
        href: "/projects/the-human-model/current/",
      },
      {
        label: "System overview",
        href: "/projects/the-human-model/system/",
      },
      {
        label: "Repository",
        href: "https://github.com/haleyparks329/the-human-model",
        external: true,
      },
    ],
    groups: [
      {
        label: "Project",
        links: [
          { label: "Overview", href: "/projects/the-human-model/" },
          {
            label: "Current Project",
            href: "/projects/the-human-model/current/",
          },
        ],
      },
      {
        label: "System",
        links: [
          {
            label: "System Overview",
            href: "/projects/the-human-model/system/",
          },
        ],
      },
      {
        label: "Research",
        links: [
          {
            label: "Research Overview",
            href: "/projects/the-human-model/research/",
          },
        ],
      },
      {
        label: "External",
        links: [
          {
            label: "Repository",
            href: "https://github.com/haleyparks329/the-human-model",
            external: true,
          },
          {
            label: "Public Examples",
            href: "https://github.com/haleyparks329/the-human-model/tree/main/examples",
            external: true,
          },
        ],
      },
    ],
  },
  "career-intelligence": {
    slug: "career-intelligence",
    cardLabel: "Career exploration",
    projectType: "Career exploration",
    headerSummary:
      "A source-backed way to reason about roles, evidence, preferences, and opportunity shape.",
    currentNote:
      "Keeping the reasoning layer source-backed while making synthetic public examples easier to inspect.",
    annotation: "following the evidence; careers are not lists, unfortunately",
    primaryLinks: [
      {
        label: "Public knowledge graph",
        href: "https://publish.obsidian.md/career-knowledge-graph/Career+Knowledge+Graph",
        external: true,
      },
      {
        label: "System",
        href: "/projects/career-intelligence/system/",
      },
      {
        label: "Repository",
        href: "https://github.com/haleyparks329/career-intelligence",
        external: true,
      },
    ],
    groups: [
      {
        label: "Project",
        links: [
          { label: "Overview", href: "/projects/career-intelligence/" },
          { label: "System", href: "/projects/career-intelligence/system/" },
        ],
      },
      {
        label: "Research",
        links: [
          {
            label: "Deep Dives",
            href: "/projects/career-intelligence/research/",
          },
          {
            label: "Related Writing",
            href: "/writing/",
          },
        ],
      },
      {
        label: "External",
        links: [
          {
            label: "Repository",
            href: "https://github.com/haleyparks329/career-intelligence",
            external: true,
          },
          {
            label: "Andy Barks Case Study",
            href: "https://github.com/haleyparks329/career-intelligence/blob/main/examples/andy-barks/case-study.md",
            external: true,
          },
        ],
      },
    ],
  },
  "qa-agents": {
    slug: "qa-agents",
    cardLabel: "Software investigation",
    projectType: "Software investigation",
    headerSummary:
      "A static case study showing deterministic evidence, missing coverage, bounded roles, and a human-reviewed next step.",
    currentNote:
      "Preserving the evidence and decision boundary without publishing the operating substrate.",
    annotation:
      "investigating the investigation; no autonomous crimes committed",
    primaryLinks: [
      {
        label: "Little Bytes case study",
        href: "/projects/qa-agents/demo/",
      },
      {
        label: "Public boundary",
        href: "/projects/qa-agents/live/",
      },
      {
        label: "Repository",
        href: "https://github.com/haleyparks329/qa-agents",
        external: true,
      },
    ],
    groups: [
      {
        label: "Project",
        links: [
          { label: "Overview", href: "/projects/qa-agents/" },
          { label: "System", href: "/projects/qa-agents/system/" },
        ],
      },
      {
        label: "Evidence",
        links: [
          {
            label: "Static Evidence Boundary",
            href: "/projects/qa-agents/live/",
          },
          { label: "Case Studies", href: "/projects/qa-agents/case-studies/" },
          {
            label: "Little Bytes Case Study",
            href: "/projects/qa-agents/demo/",
          },
          {
            label: "Extending Deterministic Replay with an Investigation Layer",
            href: "/projects/qa-agents/meticulous/",
          },
        ],
      },
      {
        label: "External",
        links: [
          {
            label: "Repository",
            href: "https://github.com/haleyparks329/qa-agents",
            external: true,
          },
        ],
      },
    ],
  },
  "this-website": {
    slug: "this-website",
    cardLabel: "Personal publishing system",
    cardMicrocopy: "building the room while already inviting people in",
    projectType: "Personal publishing system",
    headerSummary:
      "A human-centered knowledge environment for projects, writing, experiments, and the systems connecting them.",
    currentNote:
      "Turning the site from a collection of pages into a navigable public knowledge environment.",
    annotation: "room in progress; paths kept visible",
    primaryLinks: [
      {
        label: "Design",
        href: "/projects/this-website/design/",
      },
      {
        label: "Evolution",
        href: "/projects/this-website/evolution/",
      },
      {
        label: "Repository",
        href: "https://github.com/haleyparks329/haleyparks329.github.io",
        external: true,
      },
    ],
    groups: [
      {
        label: "Project",
        links: [{ label: "Overview", href: "/projects/this-website/" }],
      },
      {
        label: "Design",
        links: [
          { label: "Design", href: "/projects/this-website/design/" },
          { label: "Evolution", href: "/projects/this-website/evolution/" },
        ],
      },
      {
        label: "External",
        links: [
          {
            label: "Repository",
            href: "https://github.com/haleyparks329/haleyparks329.github.io",
            external: true,
          },
          {
            label: "Live Website",
            href: "https://haleyparks329.github.io/",
            external: true,
          },
        ],
      },
    ],
  },
};

export function workspaceForSlug(slug: string) {
  const workspace = projectWorkspaces[slug];

  if (!workspace) {
    throw new Error(`Missing project workspace config for ${slug}`);
  }

  return workspace;
}
