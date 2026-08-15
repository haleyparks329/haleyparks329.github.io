import projection from "./public-memories.v1.json";

export type MemoryLink = { label: string; href: string };
export type PublicMemory = (typeof projection.memories)[number];

export const memories = [...projection.memories].sort(
  (a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt),
);
export const latestMemory = memories[0];
export const memoryGeneratedAt = new Date(projection.generatedAt);

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
