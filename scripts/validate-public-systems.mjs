import { readFile } from "node:fs/promises";

const file = new URL("../src/data/systems.json", import.meta.url);
const allowed = {
  root: [
    "schema",
    "generatedAt",
    "sourceObservedAt",
    "releaseDelayHours",
    "state",
    "residents",
    "intelligence",
  ],
  residents: ["total", "active", "needsAttention"],
  intelligence: [
    "thoughts",
    "candidates",
    "reviewed",
    "meanSimilarity",
    "precisionAtK",
    "precisionAtKState",
  ],
};
const forbiddenKey =
  /^(activity|activities|candidate_id|email|external_id|health|name|note|payload|resident_id|source_ref|url)$/i;
const forbiddenText =
  /(\/Users\/|\/home\/|[A-Z]:\\|file:\/\/|localhost|127\.0\.0\.1|work[-_ ]?item|resident[-_ ]?id|candidate[-_ ]?id)/i;
const errors = [];

const exactKeys = (value, keys, path) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    errors.push(`${path} must be an object`);
    return;
  }
  const unexpected = Object.keys(value).filter((key) => !keys.includes(key));
  const missing = keys.filter((key) => !(key in value));
  if (unexpected.length)
    errors.push(`${path} has non-allowlisted fields: ${unexpected.join(", ")}`);
  if (missing.length)
    errors.push(`${path} is missing fields: ${missing.join(", ")}`);
};

const inspect = (value, path = "root") => {
  if (Array.isArray(value))
    value.forEach((item, index) => inspect(item, `${path}[${index}]`));
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKey.test(key))
      errors.push(`${path}.${key} is a forbidden private field`);
    inspect(child, `${path}.${key}`);
  }
};

const nullableNumber = (value) =>
  value === null || (typeof value === "number" && Number.isFinite(value));
const nonnegativeInteger = (value) => Number.isInteger(value) && value >= 0;

let raw;
let data;
try {
  raw = await readFile(file, "utf8");
  data = JSON.parse(raw);
} catch (error) {
  console.error(`Systems projection could not be read: ${error.message}`);
  process.exit(1);
}

exactKeys(data, allowed.root, "root");
exactKeys(data.residents, allowed.residents, "residents");
exactKeys(data.intelligence, allowed.intelligence, "intelligence");
inspect(data);

if (forbiddenText.test(raw))
  errors.push(
    "projection contains a private path, local endpoint, or work-item identifier",
  );
if (data.schema !== "wdw.systems.v1")
  errors.push("schema must be wdw.systems.v1");
if (!Number.isFinite(Date.parse(data.generatedAt)))
  errors.push("generatedAt must be an ISO timestamp");
if (!Number.isFinite(Date.parse(data.sourceObservedAt)))
  errors.push("sourceObservedAt must be an ISO timestamp");
if (!Number.isFinite(data.releaseDelayHours) || data.releaseDelayHours < 24)
  errors.push("releaseDelayHours must be at least 24");
if (typeof data.state !== "string") errors.push("state must be a string");
for (const key of allowed.residents) {
  if (!nonnegativeInteger(data.residents?.[key]))
    errors.push(`residents.${key} must be a nonnegative integer`);
}
for (const key of [
  "thoughts",
  "candidates",
  "meanSimilarity",
  "precisionAtK",
]) {
  if (!nullableNumber(data.intelligence?.[key]))
    errors.push(`intelligence.${key} must be a number or null`);
}
if (!(
  data.intelligence?.reviewed === null ||
  nonnegativeInteger(data.intelligence?.reviewed)
)) {
  errors.push("intelligence.reviewed must be a nonnegative integer or null");
}
if (typeof data.intelligence?.precisionAtKState !== "string")
  errors.push("intelligence.precisionAtKState must be a string");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log("Public Systems projection passed schema and privacy validation.");
