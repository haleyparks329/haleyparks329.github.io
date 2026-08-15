import { readFile } from "node:fs/promises";

const path = new URL("../src/data/public-memories.v1.json", import.meta.url);
const projection = JSON.parse(await readFile(path, "utf8"));
const requiredRoot = ["schemaVersion", "generatedAt", "memories"];
const requiredMemory = [
  "id",
  "slug",
  "title",
  "excerpt",
  "significance",
  "occurredAt",
  "publishedAt",
  "kind",
  "weight",
  "sourceLabel",
  "sourceType",
  "publicationMode",
  "publicEvidence",
  "relatedProjects",
];
const forbiddenKeys =
  /(?:raw|prompt|message|secret|token|health|body|candidate|private)/i;

function exactKeys(value, expected, label) {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (JSON.stringify(actual) !== JSON.stringify(wanted))
    throw new Error(`${label} has an invalid public shape`);
}

exactKeys(projection, requiredRoot, "projection");
if (
  projection.schemaVersion !== "1.0" ||
  Number.isNaN(Date.parse(projection.generatedAt))
)
  throw new Error("Unsupported memory projection version");
if (!Array.isArray(projection.memories))
  throw new Error("memories must be an array");

const ids = new Set();
for (const memory of projection.memories) {
  exactKeys(memory, requiredMemory, memory.id ?? "memory");
  if (!/^mem_[a-f0-9]{16}$/.test(memory.id) || ids.has(memory.id))
    throw new Error(`Invalid or duplicate memory id: ${memory.id}`);
  ids.add(memory.id);
  if (memory.publicationMode !== "manual")
    throw new Error(`${memory.id} was not manually approved`);
  if (!memory.publicEvidence.length)
    throw new Error(`${memory.id} has no public evidence`);
  for (const link of [...memory.publicEvidence, ...memory.relatedProjects]) {
    exactKeys(link, ["label", "href"], `${memory.id} link`);
    if (
      !link.href.startsWith("/") ||
      link.href.startsWith("//") ||
      /^\/(private|admin)(\/|$)/.test(link.href)
    )
      throw new Error(`${memory.id} contains a non-public link`);
  }
  for (const key of Object.keys(memory))
    if (forbiddenKeys.test(key))
      throw new Error(`${memory.id} contains forbidden field ${key}`);
}

console.log(
  `Validated ${projection.memories.length} manually approved public memories.`,
);
