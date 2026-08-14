export type HomepageLink = {
  href: string;
  label: string;
};

export type HomepageCurrentWork = {
  title: string;
  summary: string;
  href: string;
};

export const homepageState = {
  featuredWork: {
    projectSlug: "qa-agents",
    label: "Featured Work",
    artifactTitle: "Little Bytes evidence case study",
    summary:
      "A static reconstruction showing what changed, what evidence existed, what remained missing, and which decision stayed human.",
    primaryAction: {
      href: "/projects/qa-agents/demo/",
      label: "View the case study",
    },
    secondaryAction: {
      href: "/projects/qa-agents/",
      label: "Project overview",
    },
  },
  currentDesk: [
    {
      title: "Designing adaptive navigation",
      summary:
        "Letting visitors search directly or wander through connected projects, notes, topics, and demos.",
      href: "/field-log/the-desk-as-workbench/",
    },
    {
      title: "Working on Human Model review layers",
      summary:
        "Keeping longitudinal evidence, model outputs, uncertainty, and human review connected without collapsing domain ownership.",
      href: "/projects/the-human-model/",
    },
  ] satisfies HomepageCurrentWork[],
  projectOrder: ["the-human-model", "bridget", "career-intelligence"],
  annotations: {
    fieldLog: "A current note from active work.",
  },
  miniMe: {
    label: "Mini Me",
    title: "Static note from the desk",
    body: "Mini Me is the small imagined companion for this site: part index card, part research assistant, part reminder that the useful version of AI should feel like it knows where the good notes are.",
    status: "Desk status: notes open, systems humming, iced matcha nearby.",
  },
} as const;
