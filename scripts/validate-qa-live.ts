import { readFileSync } from "node:fs";
import { parseQaPublicArtifact } from "../src/data/qa-agents/artifact.ts";

const artifactUrl = new URL(
  "../src/data/qa-agents/latest.json",
  import.meta.url,
);
const artifact = parseQaPublicArtifact(
  JSON.parse(readFileSync(artifactUrl, "utf8")),
);

if (
  artifact.run.status === "passed_with_gaps" &&
  !artifact.coverage_gaps.length
)
  throw new Error(
    "passed_with_gaps requires at least one visible coverage gap",
  );
if (
  !artifact.coverage_gaps.some((gap) => gap.type === "missing_browser_evidence")
)
  throw new Error("Expected missing browser evidence to remain visible");
if (artifact.policy.autonomous_code_changes !== false)
  throw new Error("Expected autonomous code changes to be disabled");

let invalidRejected = false;
try {
  parseQaPublicArtifact({ run: { status: "passed" } });
} catch {
  invalidRejected = true;
}
if (!invalidRejected) throw new Error("Invalid artifact was accepted");

console.log("QA live artifact contract and boundary assertions passed.");
