export type ContentLink = {
  href: string;
  label: string;
  type: string;
  summary: string;
  topics: string[];
};

export const contentTypes = [
  {
    href: "/projects/",
    label: "Projects",
    description: "Active systems and project reports.",
  },
  {
    href: "/writing/",
    label: "Writing",
    description: "Case studies, essays, and quick notes.",
  },
  {
    href: "/field-log/",
    label: "Field Log",
    description: "Build updates and working notes.",
  },
  {
    href: "/projects/qa-agents/demo/",
    label: "Demos",
    description: "Interactive evidence and public examples.",
  },
  {
    href: "/compost-heap/",
    label: "Compost Heap",
    description: "Loose fragments and future seeds.",
  },
];

export const topicPaths = [
  {
    label: "Agent Systems",
    href: "/projects/qa-agents/",
    description: "QA workflows, evidence routing, and human review boundaries.",
  },
  {
    label: "Human Model",
    href: "/projects/the-human-model/",
    description: "Performance, recovery, movement, and adaptive personal data.",
  },
  {
    label: "Adaptive UI",
    href: "/writing/the-desk-as-workbench/",
    description:
      "Interfaces that change around context without becoming opaque.",
  },
  {
    label: "Career Intelligence",
    href: "/projects/career-intelligence/",
    description: "Source-backed career reasoning and evidence graphs.",
  },
  {
    label: "Software Quality",
    href: "/projects/qa-agents/demo/",
    description: "Recorded QA investigations and replayable evidence.",
  },
  {
    label: "Human Performance",
    href: "/projects/the-human-model/",
    description: "Training, recovery, biomechanics, and decision support.",
  },
  {
    label: "Human-Centered Technology",
    href: "/writing/attention-is-the-scarce-resource/",
    description:
      "Systems that give attention back instead of creating more overhead.",
  },
];

export const guidedPaths = [
  {
    label: "New here?",
    href: "/projects/",
    description:
      "Start with the three active systems, then follow the demos or build notes.",
  },
  {
    label: "Interested in AI?",
    href: "/writing/attention-is-the-scarce-resource/",
    description:
      "Begin with the attention argument, then inspect QA Agents or The Human Model.",
  },
  {
    label: "Interested in UX?",
    href: "/writing/the-desk-as-workbench/",
    description:
      "Start with the desk metaphor, then browse Explore by content type.",
  },
  {
    label: "Interested in Human Performance?",
    href: "/projects/the-human-model/",
    description:
      "Open The Human Model, then continue into related build notes.",
  },
];

export const surpriseLink = {
  href: "/compost-heap/",
  label: "The Compost Heap",
  description:
    "A stranger shelf for fragments, half-formed ideas, and useful sparks.",
};

export function typeLabel(type: string) {
  const labels: Record<string, string> = {
    project: "Case Study",
    "case-study": "Case Study",
    essay: "Essay",
    "quick-note": "Quick Note",
    "field-log": "Build Log",
    demo: "Demo",
  };

  return labels[type] ?? type;
}
