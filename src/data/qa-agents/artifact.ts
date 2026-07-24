export type QaCommand = {
  duration_ms: number;
  exit_code: number;
  name: string;
  status: string;
};

export type QaCoverageGap = { summary: string; type: string };
export type QaFinding = Record<string, unknown>;

export type QaPublicArtifact = {
  schema_version: string;
  producer: { name: string; version: string };
  target: { profile: string; repository: string };
  run: {
    base: string;
    commit: string;
    completed_at: string | null;
    head: string;
    started_at: string | null;
    status: string;
  };
  commands: QaCommand[];
  findings: QaFinding[];
  coverage_gaps: QaCoverageGap[];
  policy: {
    action: string;
    autonomous_code_changes: boolean;
    outcome: string;
  };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export function parseQaPublicArtifact(value: unknown): QaPublicArtifact {
  const errors: string[] = [];
  if (!isRecord(value)) throw new Error("QA artifact must be an object");

  const target = value.target;
  const producer = value.producer;
  const run = value.run;
  const policy = value.policy;
  const commands = value.commands;
  const gaps = value.coverage_gaps;

  if (value.schema_version !== "1.1") errors.push("schema_version");
  if (
    !isRecord(producer) ||
    producer.name !== "qa-agents" ||
    typeof producer.version !== "string" ||
    !producer.version
  )
    errors.push("producer");
  if (
    !isRecord(target) ||
    typeof target.profile !== "string" ||
    typeof target.repository !== "string"
  )
    errors.push("target");
  if (
    !isRecord(run) ||
    typeof run.base !== "string" ||
    typeof run.commit !== "string" ||
    typeof run.head !== "string" ||
    typeof run.status !== "string" ||
    !(typeof run.started_at === "string" || run.started_at === null) ||
    !(typeof run.completed_at === "string" || run.completed_at === null)
  )
    errors.push("run");
  if (
    !Array.isArray(commands) ||
    commands.length === 0 ||
    commands.some(
      (command) =>
        !isRecord(command) ||
        typeof command.name !== "string" ||
        typeof command.status !== "string" ||
        typeof command.exit_code !== "number" ||
        typeof command.duration_ms !== "number",
    )
  )
    errors.push("commands");
  if (!Array.isArray(value.findings)) errors.push("findings");
  if (
    !Array.isArray(gaps) ||
    gaps.some(
      (gap) =>
        !isRecord(gap) ||
        typeof gap.type !== "string" ||
        typeof gap.summary !== "string",
    )
  )
    errors.push("coverage_gaps");
  if (
    !isRecord(policy) ||
    typeof policy.action !== "string" ||
    typeof policy.outcome !== "string" ||
    typeof policy.autonomous_code_changes !== "boolean"
  )
    errors.push("policy");

  if (errors.length)
    throw new Error(`Invalid public QA artifact fields: ${errors.join(", ")}`);
  return value as QaPublicArtifact;
}
