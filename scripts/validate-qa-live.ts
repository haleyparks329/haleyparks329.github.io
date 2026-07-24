import { readFileSync } from "node:fs";
import { parseQaPublicArtifact } from "../src/data/qa-agents/artifact.ts";

const artifactUrl = new URL(
  "../src/data/qa-agents/latest.json",
  import.meta.url,
);
const artifact = parseQaPublicArtifact(
  JSON.parse(readFileSync(artifactUrl, "utf8")),
);
const serializedArtifact = JSON.stringify(artifact);
const production = process.env.QA_LIVE_PRODUCTION === "1";
const expectedRepository =
  process.env.GITHUB_REPOSITORY ?? "haleyparks329/haleyparks329.github.io";
const expectedCommit = process.env.GITHUB_SHA;

if (production && !expectedCommit)
  throw new Error("GITHUB_SHA is required for production QA validation");
if (artifact.target.repository !== expectedRepository)
  throw new Error(
    `QA artifact repository mismatch: expected ${expectedRepository}, received ${artifact.target.repository}`,
  );
if (production && artifact.run.commit !== expectedCommit)
  throw new Error(
    `QA artifact commit mismatch: expected ${expectedCommit}, received ${artifact.run.commit}`,
  );
if (
  production &&
  (!artifact.run.started_at ||
    !artifact.run.completed_at ||
    !Number.isFinite(Date.parse(artifact.run.started_at)) ||
    !Number.isFinite(Date.parse(artifact.run.completed_at)))
)
  throw new Error("Production QA artifact requires valid run timestamps");
if (
  artifact.commands.some(
    (command) => command.status !== "passed" || command.exit_code !== 0,
  )
)
  throw new Error("QA artifact contains non-passing command evidence");
if (artifact.producer.name !== "qa-agents" || !artifact.producer.version)
  throw new Error("QA artifact producer provenance is missing");
for (const forbidden of [
  "/Users/",
  "/home/",
  "stdout_summary",
  "stderr_summary",
  '"cwd"',
  '"command"',
  "QA_KB_PATH",
]) {
  if (serializedArtifact.includes(forbidden))
    throw new Error(
      `QA artifact contains forbidden private data: ${forbidden}`,
    );
}

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
