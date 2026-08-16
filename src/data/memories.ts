import projection from "./public-memories.v1.json";

export type MemoryLink = { label: string; href: string };
export type PublicMemory = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  significance: string;
  occurredAt: string;
  publishedAt: string;
  kind: string;
  weight: string;
  sourceLabel: string;
  sourceType: string;
  publicationMode: string;
  publicEvidence: MemoryLink[];
  relatedProjects: MemoryLink[];
};

type MemoryProjection = {
  schemaVersion: string;
  generatedAt: string;
  memories: PublicMemory[];
};

const publicProjection = projection as MemoryProjection;

export const memories = [...publicProjection.memories].sort(
  (a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt),
);
export const latestMemory = memories[0];
export const memoryGeneratedAt = new Date(publicProjection.generatedAt);

export type MemoryGroup = { label: string; memories: PublicMemory[] };

export function groupMemories(): MemoryGroup[] {
  const groups = new Map<string, PublicMemory[]>();
  const weekAgo = new Date(memoryGeneratedAt);
  weekAgo.setUTCDate(weekAgo.getUTCDate() - 7);

  for (const memory of memories) {
    const date = new Date(memory.occurredAt);
    let label: string;
    if (date >= weekAgo) {
      label = "This week";
    } else if (
      date.getUTCFullYear() === memoryGeneratedAt.getUTCFullYear() &&
      date.getUTCMonth() === memoryGeneratedAt.getUTCMonth()
    ) {
      label = "Earlier this month";
    } else if (date.getUTCFullYear() === memoryGeneratedAt.getUTCFullYear()) {
      label = date.toLocaleDateString("en", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
    } else {
      label = "Older";
    }
    groups.set(label, [...(groups.get(label) ?? []), memory]);
  }

  return [...groups].map(([label, groupedMemories]) => ({
    label,
    memories: groupedMemories,
  }));
}
