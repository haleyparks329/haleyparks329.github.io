export type CompostArtifact = {
  id: string;
  title: string;
  period: string;
  kind: string;
  preview: string;
  whatItWas: string;
  whyItMattered: string;
  whatILearned: string;
  eventuallyBecame: string;
  thread: "attention" | "career" | "quality" | "site";
  state: "still-decomposing" | "feeding-current-work" | "resting";
  size: "small" | "wide" | "tall";
  tilt: "left" | "right" | "none";
  offset: "low" | "high" | "none";
  thumbnail: "note" | "screen" | "map" | "stack";
};

export const compostArtifacts: CompostArtifact[] = [
  {
    id: "desk-map-v0",
    title: "Desk map, first pass",
    period: "Early 2025",
    kind: "site sketch",
    preview: "A rough map for making the homepage feel like a workbench.",
    whatItWas:
      "A small layout experiment that treated projects, notes, and personal context as objects on a desk instead of links in a tidy menu.",
    whyItMattered:
      "It gave the site a spatial vocabulary before the final homepage had one.",
    whatILearned:
      "The metaphor worked best when it stayed useful. Visitors needed orientation first, charm second.",
    eventuallyBecame:
      "The current desk-shaped homepage and the rule that public project pages should feel like things you can pick up.",
    thread: "site",
    state: "feeding-current-work",
    size: "wide",
    tilt: "left",
    offset: "none",
    thumbnail: "map",
  },
  {
    id: "career-fit-cards",
    title: "Career fit cards",
    period: "Mid 2025",
    kind: "reasoning prototype",
    preview:
      "A card sort for comparing roles without flattening them into keywords.",
    whatItWas:
      "A paper-like interface for weighing role evidence, energy cost, growth paths, and practical constraints.",
    whyItMattered:
      "It shifted the question from whether a job matched a resume to whether a role matched a person in motion.",
    whatILearned:
      "Career reasoning needs evidence, but it also needs room for preference, timing, and the small frictions that decide whether something is livable.",
    eventuallyBecame:
      "The Career Intelligence project and its emphasis on fit, boundaries, and evidence.",
    thread: "career",
    state: "feeding-current-work",
    size: "small",
    tilt: "right",
    offset: "low",
    thumbnail: "stack",
  },
  {
    id: "qa-replay-notebook",
    title: "QA replay notebook",
    period: "Late 2025",
    kind: "investigation notes",
    preview: "A loose replay of how an agent might inspect a pricing bug.",
    whatItWas:
      "A note sequence that followed observations, hypotheses, checks, and uncertainty through a small quality investigation.",
    whyItMattered:
      "It made the review trace more important than the agent performance demo.",
    whatILearned:
      "Useful agent work is legible agent work. A human reviewer should be able to see the path, not just the answer.",
    eventuallyBecame:
      "The QA Agents case study and the replay-oriented demo path.",
    thread: "quality",
    state: "feeding-current-work",
    size: "tall",
    tilt: "none",
    offset: "high",
    thumbnail: "note",
  },
  {
    id: "attention-ledger",
    title: "Attention ledger",
    period: "Winter 2025",
    kind: "personal system",
    preview: "A tiny ledger for noticing what made deep work easier or harder.",
    whatItWas:
      "A private tracking idea for logging context, interruptions, recovery time, and the conditions around useful focus.",
    whyItMattered:
      "It treated attention as an environment to understand rather than a moral trait to optimize.",
    whatILearned:
      "The most useful records are often small enough to keep using when energy is low.",
    eventuallyBecame:
      "Field Log notes about attention, evidence, and the desk as a workbench.",
    thread: "attention",
    state: "still-decomposing",
    size: "small",
    tilt: "left",
    offset: "none",
    thumbnail: "screen",
  },
  {
    id: "human-model-scratchpad",
    title: "Human model scratchpad",
    period: "Spring 2026",
    kind: "modeling notes",
    preview:
      "Early questions about how a personal model should remember change.",
    whatItWas:
      "A scratchpad for connecting wearable data, training logs, movement notes, and conversational context without pretending they all meant the same thing.",
    whyItMattered:
      "It kept the human context in view while the system ideas were still abstract.",
    whatILearned:
      "Adaptation is not a single signal. The model needs to hold contradictions long enough for patterns to emerge.",
    eventuallyBecame:
      "The Human Model project and its focus on evidence objects, uncertainty, and change over time.",
    thread: "attention",
    state: "feeding-current-work",
    size: "wide",
    tilt: "right",
    offset: "low",
    thumbnail: "map",
  },
  {
    id: "writing-shelf",
    title: "Writing shelf stub",
    period: "Still open",
    kind: "content shape",
    preview:
      "A placeholder for the longer trail of thinking that has not settled yet.",
    whatItWas:
      "A simple holding place for essays, notes, and fragments that were too long for the Field Log but not ready to become formal projects.",
    whyItMattered:
      "It made unfinished thinking visible without forcing it into a finished shape.",
    whatILearned:
      "Some pages need to be honest about being containers before they can become destinations.",
    eventuallyBecame:
      "A future writing structure that can sit beside projects without pretending to be one.",
    thread: "site",
    state: "resting",
    size: "small",
    tilt: "none",
    offset: "high",
    thumbnail: "stack",
  },
];
