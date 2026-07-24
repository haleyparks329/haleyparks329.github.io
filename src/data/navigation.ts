export type DestinationType =
  "page" | "project" | "writing" | "field-log" | "demo" | "place" | "trail";

export type Destination = {
  id: string;
  href: string;
  label: string;
  type: DestinationType;
  summary: string;
  topics: string[];
  project?: string;
  trails?: string[];
};

export type RelationshipType =
  "related" | "part-of" | "evidence-for" | "evolved-from" | "continued-in";

export type Relationship = {
  from: string;
  to: string;
  type: RelationshipType;
  label: string;
  reason: string;
};

export type TrailStop = {
  destinationId: string;
  reason: string;
};

export type Trail = {
  id: string;
  slug: string;
  label: string;
  summary: string;
  stops: TrailStop[];
};

export type ContentLink = {
  href: string;
  label: string;
  type: string;
  summary: string;
  topics: string[];
  relationshipLabel?: string;
  relationshipReason?: string;
  project?: string;
  trails?: string[];
};

export const trails: Trail[] = [
  {
    id: "meet-haley",
    slug: "meet-haley",
    label: "Meet Haley",
    summary:
      "A short route from the homepage into Haley's background, active systems, and longer-form thinking.",
    stops: [
      {
        destinationId: "home",
        reason: "Start at the desk surface where the whole site is oriented.",
      },
      {
        destinationId: "about",
        reason: "Meet the person behind the systems before opening the work.",
      },
      {
        destinationId: "projects",
        reason:
          "See the active project shelf and the public implementation paths.",
      },
      {
        destinationId: "writing",
        reason:
          "Move from project objects into the arguments and case studies around them.",
      },
    ],
  },
  {
    id: "ai-systems",
    slug: "ai-systems",
    label: "AI Systems",
    summary:
      "A route through attention, evidence, QA handoff, and personal context systems.",
    stops: [
      {
        destinationId: "field-log-attention-is-the-scarce-resource",
        reason:
          "Begin with the shared working principle behind the AI work: attention is the scarce resource.",
      },
      {
        destinationId: "project-qa-agents",
        reason:
          "QA Agents turns that principle into a software-quality evidence loop.",
      },
      {
        destinationId: "demo-qa-agents-little-bytes",
        reason:
          "The replay shows the QA evidence trail as an inspectable public demo.",
      },
      {
        destinationId: "project-bridget",
        reason:
          "Bridget shows how personal context can be maintained before any autonomous layer is added.",
      },
      {
        destinationId: "project-the-human-model",
        reason:
          "The Human Model applies similar context-preserving ideas to personal performance data.",
      },
    ],
  },
  {
    id: "how-i-build",
    slug: "how-i-build",
    label: "How I Build",
    summary:
      "A route through current work, build notes, QA boundaries, and inspectable evidence.",
    stops: [
      {
        destinationId: "home",
        reason: "The Current Desk section shows what is open right now.",
      },
      {
        destinationId: "field-log",
        reason:
          "The Field Log keeps active build decisions visible while the work moves.",
      },
      {
        destinationId: "field-log-evidence-before-claims",
        reason:
          "This note states the public rule that claims should stay attached to artifacts.",
      },
      {
        destinationId: "project-qa-agents",
        reason:
          "QA Agents is the clearest case study for evidence-first implementation boundaries.",
      },
      {
        destinationId: "demo-qa-agents-meticulous",
        reason:
          "The strategy replay shows how recorded evidence can become a reviewable recommendation.",
      },
    ],
  },
  {
    id: "adaptive-interfaces",
    slug: "adaptive-interfaces",
    label: "Adaptive Interfaces",
    summary:
      "A route through the desk metaphor, evidence-based reasoning, and context-aware personal systems.",
    stops: [
      {
        destinationId: "project-this-website",
        reason:
          "Start with the project that treats the site as a navigable public work surface.",
      },
      {
        destinationId: "field-log-the-desk-as-workbench",
        reason:
          "The Field Log shows how the desk metaphor became a navigation surface.",
      },
      {
        destinationId: "project-career-intelligence",
        reason:
          "Career Intelligence shows interface pressure around evidence, fit, and judgment.",
      },
      {
        destinationId: "project-the-human-model",
        reason:
          "The Human Model extends adaptive interface questions into personal review layers.",
      },
    ],
  },
  {
    id: "human-performance",
    slug: "human-performance",
    label: "Human Performance",
    summary:
      "A route through The Human Model, related attention principles, and public examples.",
    stops: [
      {
        destinationId: "project-the-human-model",
        reason:
          "Start with the main public case study for training, recovery, and movement context.",
      },
      {
        destinationId: "field-log-attention-is-the-scarce-resource",
        reason:
          "This build note connects performance work to memory, coordination, and context.",
      },
      {
        destinationId: "project-career-intelligence",
        reason:
          "A sibling person-modeling system shows the same evidence-first pattern in another domain.",
      },
      {
        destinationId: "writing-why-fika-jobs-felt-familiar",
        reason:
          "The career investigation connects Fika Jobs to the same evidence-first pressure in another domain.",
      },
    ],
  },
];

export const destinations: Destination[] = [
  {
    id: "home",
    href: "/",
    label: "Home",
    type: "page",
    summary: "The desk surface and starting point for the public site.",
    topics: ["Navigation", "Human-Centered Technology"],
    trails: ["meet-haley", "how-i-build"],
  },
  {
    id: "explore",
    href: "/explore/",
    label: "Explore",
    type: "page",
    summary:
      "A guide to the projects, writing, demos, trails, and ideas collected on the site.",
    topics: ["Navigation"],
  },
  {
    id: "search",
    href: "/search/",
    label: "Search",
    type: "page",
    summary:
      "Fast static search across public projects, writing, demos, and Field Log entries.",
    topics: ["Navigation"],
  },
  {
    id: "about",
    href: "/about/",
    label: "About",
    type: "page",
    summary:
      "A short introduction to Haley Parks and the work behind the site.",
    topics: ["Human-Centered Technology"],
    trails: ["meet-haley"],
  },
  {
    id: "projects",
    href: "/projects/",
    label: "Projects",
    type: "page",
    summary: "The active systems shelf for public project case studies.",
    topics: ["Navigation"],
    trails: ["meet-haley"],
  },
  {
    id: "writing",
    href: "/writing/",
    label: "Writing",
    type: "page",
    summary: "Case studies, essays, and quick notes from active work.",
    topics: ["Navigation", "Human-Centered Technology"],
    trails: ["meet-haley"],
  },
  {
    id: "field-log",
    href: "/field-log/",
    label: "Field Log",
    type: "page",
    summary:
      "Build notes and working observations from the edge of the projects.",
    topics: ["Navigation"],
    trails: ["how-i-build"],
  },
  {
    id: "compost-heap",
    href: "/compost-heap/",
    label: "The Compost Heap",
    type: "place",
    summary: "Loose fragments, half-formed ideas, and useful sparks.",
    topics: ["Adaptive UI", "Human-Centered Technology"],
  },
  {
    id: "project-bridget",
    href: "/projects/bridget/",
    label: "Bridget",
    type: "project",
    summary:
      "A deterministic personal orchestration system that preserves continuity without replacing human judgment.",
    topics: [
      "Agent Systems",
      "Human-Centered Technology",
      "Information Architecture",
    ],
    project: "bridget",
    trails: ["ai-systems"],
  },
  {
    id: "project-the-human-model",
    href: "/projects/the-human-model/",
    label: "The Human Model",
    type: "project",
    summary:
      "A personal research system for training, health, movement, and conversational context.",
    topics: ["Human Model", "Human Performance", "Human-Centered Technology"],
    project: "the-human-model",
    trails: ["ai-systems", "adaptive-interfaces", "human-performance"],
  },
  {
    id: "project-the-human-model-current",
    href: "/projects/the-human-model/current/",
    label: "The Human Model current project",
    type: "project",
    summary:
      "Current status, active work, limits, and next direction for The Human Model.",
    topics: ["Human Model", "Human Performance"],
    project: "the-human-model",
  },
  {
    id: "project-the-human-model-system",
    href: "/projects/the-human-model/system/",
    label: "The Human Model system",
    type: "project",
    summary:
      "Inputs, processing, outputs, storage notes, and technical structure for The Human Model.",
    topics: ["Human Model", "Human Performance"],
    project: "the-human-model",
  },
  {
    id: "project-the-human-model-research",
    href: "/projects/the-human-model/research/",
    label: "The Human Model research",
    type: "project",
    summary:
      "Examples, lessons, and current research limits for The Human Model.",
    topics: ["Human Model", "Human Performance"],
    project: "the-human-model",
  },
  {
    id: "project-career-intelligence",
    href: "/projects/career-intelligence/",
    label: "Career Intelligence",
    type: "project",
    summary:
      "A source-backed career reasoning system built around evidence, fit, and boundaries.",
    topics: ["Career Intelligence", "Human-Centered Technology"],
    project: "career-intelligence",
    trails: ["adaptive-interfaces", "human-performance"],
  },
  {
    id: "project-career-intelligence-system",
    href: "/projects/career-intelligence/system/",
    label: "Career Intelligence system",
    type: "project",
    summary:
      "Inputs, processing, outputs, and status for the source-backed career reasoning system.",
    topics: ["Career Intelligence", "Human-Centered Technology"],
    project: "career-intelligence",
  },
  {
    id: "project-career-intelligence-research",
    href: "/projects/career-intelligence/research/",
    label: "Career Intelligence deep dives",
    type: "project",
    summary:
      "Examples, lessons, and limits from source-backed career reasoning.",
    topics: ["Career Intelligence", "Human-Centered Technology"],
    project: "career-intelligence",
  },
  {
    id: "project-qa-agents",
    href: "/projects/qa-agents/",
    label: "QA Agents",
    type: "project",
    summary:
      "An experimental software-quality system focused on evidence, routing, and human review.",
    topics: ["Agent Systems", "Software Quality", "Human-Centered Technology"],
    project: "qa-agents",
    trails: ["ai-systems", "how-i-build"],
  },
  {
    id: "project-qa-agents-system",
    href: "/projects/qa-agents/system/",
    label: "QA Agents system",
    type: "project",
    summary:
      "Agent responsibilities, evidence routing, status, and human-review boundaries.",
    topics: ["Agent Systems", "Software Quality"],
    project: "qa-agents",
  },
  {
    id: "project-qa-agents-live",
    href: "/projects/qa-agents/live/",
    label: "QA Agents live system review",
    type: "demo",
    summary:
      "The latest public-safe deterministic evidence exported after QA Agents reviewed this website.",
    topics: ["Agent Systems", "Software Quality"],
    project: "qa-agents",
  },
  {
    id: "project-qa-agents-case-studies",
    href: "/projects/qa-agents/case-studies/",
    label: "QA Agents case studies",
    type: "project",
    summary:
      "Recorded investigation examples, learnings, and public project limits.",
    topics: ["Agent Systems", "Software Quality"],
    project: "qa-agents",
  },
  {
    id: "project-this-website",
    href: "/projects/this-website/",
    label: "This Website",
    type: "project",
    summary:
      "A human-centered knowledge environment for projects, writing, experiments, and the systems connecting them.",
    topics: [
      "Adaptive UI",
      "Information Architecture",
      "Human-Centered Technology",
    ],
    project: "this-website",
  },
  {
    id: "project-this-website-design",
    href: "/projects/this-website/design/",
    label: "This Website design",
    type: "project",
    summary:
      "The design philosophy, information architecture, visual language, interaction patterns, and implementation choices behind the site.",
    topics: ["Adaptive UI", "Information Architecture", "Design Systems"],
    project: "this-website",
  },
  {
    id: "project-this-website-evolution",
    href: "/projects/this-website/evolution/",
    label: "This Website evolution",
    type: "project",
    summary:
      "A design-reasoning archive for how the website changed over time and why.",
    topics: ["Adaptive UI", "Information Architecture", "Design Systems"],
    project: "this-website",
  },
  {
    id: "demo-qa-agents-little-bytes",
    href: "/projects/qa-agents/demo/",
    label: "Little Bytes evidence replay",
    type: "demo",
    summary: "A recorded pricing investigation replayed from source evidence.",
    topics: ["Software Quality", "Agent Systems"],
    project: "qa-agents",
    trails: ["ai-systems"],
  },
  {
    id: "demo-qa-agents-meticulous",
    href: "/projects/qa-agents/meticulous/",
    label: "Extending Deterministic Replay with an Investigation Layer",
    type: "writing",
    summary:
      "How deterministic replay evidence can enter QA Agents through a configurable investigation layer.",
    topics: ["Software Quality", "Agent Systems"],
    project: "qa-agents",
    trails: ["how-i-build"],
  },
  {
    id: "demo-qa-agents-meticulous-replay",
    href: "/projects/qa-agents/meticulous/replay/",
    label: "Meticulous replay workstation",
    type: "demo",
    summary:
      "The focused replay route for the Meticulous-inspired QA investigation.",
    topics: ["Software Quality", "Agent Systems"],
    project: "qa-agents",
  },
  {
    id: "writing-i-did-not-want-another-app",
    href: "/writing/i-did-not-want-another-app/",
    label: "I Did Not Want Another App",
    type: "writing",
    summary:
      "How an AI coaching idea grew into a broader personal orchestration system.",
    topics: ["Agent Systems", "Human-Centered Technology"],
    project: "bridget",
    trails: ["ai-systems"],
  },
  {
    id: "writing-what-i-built-instead-of-an-agent",
    href: "/writing/what-i-built-instead-of-an-agent/",
    label: "What I Built Instead of an Agent",
    type: "writing",
    summary:
      "Why Bridget uses deterministic state, visible uncertainty, and human reconciliation before autonomy.",
    topics: ["Agent Systems", "Human-Centered Technology"],
    project: "bridget",
    trails: ["ai-systems"],
  },
  {
    id: "writing-why-fika-jobs-felt-familiar",
    href: "/writing/why-fika-jobs-felt-familiar/",
    label: "Why Fika Jobs Felt Familiar",
    type: "writing",
    summary:
      "A product investigation into Fika Jobs and private career knowledge graphs.",
    topics: ["Career Intelligence", "Human-Centered Technology"],
    project: "career-intelligence",
    trails: ["human-performance"],
  },
  {
    id: "field-log-attention-is-the-scarce-resource",
    href: "/field-log/attention-is-the-scarce-resource/",
    label: "Attention Is the Scarce Resource",
    type: "field-log",
    summary: "The working principle behind memory, coordination, and context.",
    topics: ["Human-Centered Technology"],
    project: "qa-agents",
    trails: ["human-performance"],
  },
  {
    id: "field-log-evidence-before-claims",
    href: "/field-log/evidence-before-claims/",
    label: "Evidence Before Claims",
    type: "field-log",
    summary: "A public writing rule for AI work that needs visible boundaries.",
    topics: ["Human-Centered Technology", "Software Quality"],
    project: "qa-agents",
    trails: ["how-i-build"],
  },
  {
    id: "field-log-the-desk-as-workbench",
    href: "/field-log/the-desk-as-workbench/",
    label: "The Desk as Workbench",
    type: "field-log",
    summary: "How the homepage desk became a discovery layer for public work.",
    topics: ["Adaptive UI", "Human-Centered Technology"],
    project: "website",
    trails: ["adaptive-interfaces"],
  },
];

export const relationships: Relationship[] = [
  {
    from: "writing-i-did-not-want-another-app",
    to: "project-bridget",
    type: "continued-in",
    label: "Continued in",
    reason:
      "The origin story continues in Bridget's project workspace and public architecture.",
  },
  {
    from: "writing-i-did-not-want-another-app",
    to: "writing-what-i-built-instead-of-an-agent",
    type: "continued-in",
    label: "Continued in",
    reason:
      "The engineering account continues the origin story with Bridget's deterministic architecture.",
  },
  {
    from: "writing-what-i-built-instead-of-an-agent",
    to: "project-bridget",
    type: "part-of",
    label: "Part of",
    reason:
      "This case study documents Bridget's public architecture and autonomy boundary.",
  },
  {
    from: "project-bridget",
    to: "project-the-human-model",
    type: "related",
    label: "Related system",
    reason:
      "Bridget coordinates continuity; The Human Model interprets performance evidence.",
  },
  {
    from: "project-qa-agents",
    to: "demo-qa-agents-meticulous",
    type: "related",
    label: "Related investigation",
    reason:
      "This case study explains how replay evidence can hand off into the QA Agents layer.",
  },
  {
    from: "project-qa-agents",
    to: "demo-qa-agents-little-bytes",
    type: "evidence-for",
    label: "Evidence",
    reason:
      "The replay is the public evidence loop behind the QA Agents case study.",
  },
  {
    from: "project-qa-agents",
    to: "project-qa-agents-live",
    type: "evidence-for",
    label: "Current evidence",
    reason:
      "The live review exposes the latest validated public-safe evidence from the system.",
  },
  {
    from: "project-qa-agents",
    to: "field-log-evidence-before-claims",
    type: "evolved-from",
    label: "Evolved from",
    reason:
      "The note states the boundary rule that keeps the project honest in public.",
  },
  {
    from: "demo-qa-agents-meticulous-replay",
    to: "demo-qa-agents-meticulous",
    type: "evidence-for",
    label: "Evidence for",
    reason:
      "The replay workstation makes the investigation's evidence and decision boundary inspectable.",
  },
  {
    from: "project-qa-agents-system",
    to: "project-qa-agents",
    type: "part-of",
    label: "Part of",
    reason: "The system document explains the structure of QA Agents.",
  },
  {
    from: "project-qa-agents-system",
    to: "project-qa-agents-case-studies",
    type: "continued-in",
    label: "Continued in",
    reason:
      "The case-study shelf shows how the system boundaries behave in recorded investigations.",
  },
  {
    from: "project-qa-agents-case-studies",
    to: "project-qa-agents",
    type: "part-of",
    label: "Part of",
    reason:
      "The case-study shelf collects QA Agents investigations and their limits.",
  },
  {
    from: "project-the-human-model",
    to: "field-log-attention-is-the-scarce-resource",
    type: "related",
    label: "Related principle",
    reason:
      "The build note keeps the attention principle close to active Human Model review work.",
  },
  {
    from: "project-the-human-model",
    to: "project-career-intelligence",
    type: "related",
    label: "Related system",
    reason:
      "Both systems preserve evidence around a person instead of flattening them into a score.",
  },
  {
    from: "writing-why-fika-jobs-felt-familiar",
    to: "project-career-intelligence",
    type: "part-of",
    label: "Part of",
    reason:
      "The investigation connects Career Intelligence to a broader product philosophy.",
  },
  {
    from: "project-career-intelligence",
    to: "field-log-evidence-before-claims",
    type: "related",
    label: "Related principle",
    reason:
      "The public claim boundary matters especially for source-backed career materials.",
  },
  {
    from: "project-the-human-model-current",
    to: "project-the-human-model-system",
    type: "continued-in",
    label: "Continued in",
    reason:
      "The system document explains the structure behind the current work.",
  },
  {
    from: "project-the-human-model-system",
    to: "project-the-human-model-research",
    type: "continued-in",
    label: "Continued in",
    reason:
      "The research document shows what the system has taught and where its limits remain.",
  },
  {
    from: "project-the-human-model-research",
    to: "field-log-attention-is-the-scarce-resource",
    type: "related",
    label: "Related principle",
    reason: "The note connects the research to attention, memory, and context.",
  },
  {
    from: "project-career-intelligence-system",
    to: "project-career-intelligence-research",
    type: "continued-in",
    label: "Continued in",
    reason:
      "The deep dives show how the source-backed system behaves in concrete cases.",
  },
  {
    from: "project-career-intelligence-research",
    to: "writing-why-fika-jobs-felt-familiar",
    type: "related",
    label: "Related investigation",
    reason:
      "The writing examines the product philosophy behind the career reasoning work.",
  },
  {
    from: "project-this-website-design",
    to: "project-this-website",
    type: "part-of",
    label: "Part of",
    reason:
      "The design file records the principles behind the website project.",
  },
  {
    from: "project-this-website-evolution",
    to: "project-this-website",
    type: "part-of",
    label: "Part of",
    reason:
      "The evolution file records how the website project changed over time.",
  },
  {
    from: "project-this-website",
    to: "field-log-the-desk-as-workbench",
    type: "evolved-from",
    label: "Evolved from",
    reason:
      "The note captures the workbench idea that shaped the site's navigation language.",
  },
  {
    from: "field-log-the-desk-as-workbench",
    to: "explore",
    type: "continued-in",
    label: "Continued in",
    reason:
      "Explore is the site guide that grew from the desk navigation idea.",
  },
  {
    from: "compost-heap",
    to: "field-log-the-desk-as-workbench",
    type: "related",
    label: "Related idea",
    reason:
      "Both pages keep unfinished or exploratory work visible without turning it into polish.",
  },
];

const typeLabels: Record<string, string> = {
  page: "Page",
  place: "Place",
  project: "Case Study",
  "case-study": "Case Study",
  writing: "Writing",
  essay: "Essay",
  "quick-note": "Quick Note",
  "field-log": "Build Log",
  demo: "Demo",
  trail: "Trail",
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
    description: "Investigations and case studies from active work.",
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
    href: "/field-log/the-desk-as-workbench/",
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
    href: "/field-log/attention-is-the-scarce-resource/",
    description:
      "Systems that give attention back instead of creating more overhead.",
  },
];

export const guidedPaths = trails.map((trail) => ({
  label: trail.label,
  href: `/explore/trails/${trail.slug}/`,
  description: trail.summary,
  stopCount: trail.stops.length,
}));

export const surpriseLink = {
  href: "/compost-heap/",
  label: "The Compost Heap",
  description:
    "A stranger shelf for fragments, half-formed ideas, and useful sparks.",
};

export function typeLabel(type: string) {
  return typeLabels[type] ?? type;
}

export function destinationToContentLink(
  destination: Destination,
  relationship?: Relationship,
): ContentLink {
  return {
    href: destination.href,
    label: destination.label,
    type: typeLabel(destination.type),
    summary: destination.summary,
    topics: destination.topics,
    project: destination.project,
    trails: destination.trails,
    relationshipLabel: relationship?.label,
    relationshipReason: relationship?.reason,
  };
}

export function destinationById(id: string) {
  return destinations.find((destination) => destination.id === id);
}

export function destinationByHref(href: string) {
  return destinations.find((destination) => destination.href === href);
}

export function trailBySlug(slug: string) {
  return trails.find((trail) => trail.slug === slug);
}

export function trailsForDestination(destinationId: string) {
  return trails.filter((trail) =>
    trail.stops.some((stop) => stop.destinationId === destinationId),
  );
}

export function trailsForHref(href: string) {
  const destination = destinationByHref(href);
  return destination ? trailsForDestination(destination.id) : [];
}

export function connectedDestinations(destinationId: string) {
  const outgoing = relationships
    .filter((relationship) => relationship.from === destinationId)
    .map((relationship) => {
      const destination = destinationById(relationship.to);
      return destination
        ? destinationToContentLink(destination, relationship)
        : undefined;
    })
    .filter((link): link is ContentLink => Boolean(link));
  const outgoingHrefs = new Set(outgoing.map((link) => link.href));
  const inverseLabels: Record<RelationshipType, string> = {
    related: "Related",
    "part-of": "Contains",
    "evidence-for": "Evidence for",
    "evolved-from": "Became",
    "continued-in": "Continues from",
  };
  const incoming = relationships
    .filter((relationship) => relationship.to === destinationId)
    .map((relationship) => {
      const destination = destinationById(relationship.from);
      if (!destination || outgoingHrefs.has(destination.href)) return undefined;
      return destinationToContentLink(destination, {
        ...relationship,
        label: inverseLabels[relationship.type],
      });
    })
    .filter((link): link is ContentLink => Boolean(link))
    .sort((a, b) => a.label.localeCompare(b.label));

  return [...outgoing, ...incoming];
}

export function destinationsByType(type: DestinationType) {
  return destinations.filter((destination) => destination.type === type);
}

export function destinationsForProject(project: string) {
  return destinations.filter((destination) => destination.project === project);
}

export function trailDestination(trail: Trail): Destination {
  return {
    id: `trail-${trail.id}`,
    href: `/explore/trails/${trail.slug}/`,
    label: trail.label,
    type: "trail",
    summary: trail.summary,
    topics: ["Navigation"],
  };
}

export const trailDestinations = trails.map(trailDestination);
export const allDestinations = [...destinations, ...trailDestinations];

export function validateNavigationGraph() {
  const ids = new Set<string>();
  for (const destination of destinations) {
    if (ids.has(destination.id)) {
      throw new Error(`Duplicate destination id: ${destination.id}`);
    }
    ids.add(destination.id);

    const validHref =
      destination.href === "/" ||
      destination.href.startsWith("https://") ||
      (destination.href.startsWith("/") && destination.href.endsWith("/"));
    if (!validHref) {
      throw new Error(`Invalid destination href: ${destination.href}`);
    }
  }

  const slugs = new Set<string>();
  for (const trail of trails) {
    if (slugs.has(trail.slug)) {
      throw new Error(`Duplicate trail slug: ${trail.slug}`);
    }
    slugs.add(trail.slug);

    for (const stop of trail.stops) {
      if (!ids.has(stop.destinationId)) {
        throw new Error(
          `Trail ${trail.id} references missing destination ${stop.destinationId}`,
        );
      }
    }
  }

  const relationshipPairs = new Set<string>();
  for (const relationship of relationships) {
    if (!ids.has(relationship.from)) {
      throw new Error(
        `Relationship references missing source ${relationship.from}`,
      );
    }
    if (!ids.has(relationship.to)) {
      throw new Error(
        `Relationship references missing destination ${relationship.to}`,
      );
    }
    if (relationship.from === relationship.to) {
      throw new Error(
        `Relationship cannot reference itself: ${relationship.from}`,
      );
    }
    if (!relationship.reason.trim()) {
      throw new Error(
        `Relationship ${relationship.from} -> ${relationship.to} needs a reason`,
      );
    }
    const pairKey = [relationship.from, relationship.to].sort().join("::");
    if (relationshipPairs.has(pairKey)) {
      throw new Error(
        `Relationship pair is authored more than once: ${pairKey}`,
      );
    }
    relationshipPairs.add(pairKey);
  }
}

validateNavigationGraph();
