import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const PUBLIC_RELEASE_SCHEMA = "wdw.public-release-manifest.v1";
export const PUBLIC_RELEASE_DELAY_HOURS = 24;

type ArtifactName = "world.v1.json" | "systems.v1.json";

type ArtifactMetadata = {
  path: string;
  sha256: string;
  bytes: number;
};

type PublicReleaseManifest = {
  schema: string;
  releaseId: string;
  candidateId: string;
  releasedAt: string;
  sourceObservedAt: string;
  releaseDelayHours: number;
  artifacts: Record<ArtifactName, ArtifactMetadata>;
};

export type PublicRelease = {
  manifest: PublicReleaseManifest;
  artifacts: { world: unknown; systems: unknown };
};

const ARTIFACT_NAMES: ArtifactName[] = ["world.v1.json", "systems.v1.json"];
const ID_PATTERN = /^(candidate|release)-[a-f0-9]{20}$/;
const HASH_PATTERN = /^[a-f0-9]{64}$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasExactKeys = (value: Record<string, unknown>, expected: string[]) =>
  Object.keys(value).length === expected.length &&
  expected.every((key) => Object.hasOwn(value, key));

function parseManifest(value: unknown): PublicReleaseManifest {
  const keys = [
    "schema",
    "releaseId",
    "candidateId",
    "releasedAt",
    "sourceObservedAt",
    "releaseDelayHours",
    "artifacts",
  ];
  if (
    !isRecord(value) ||
    !hasExactKeys(value, keys) ||
    !isRecord(value.artifacts)
  ) {
    throw new Error("Invalid public release manifest");
  }
  if (
    value.schema !== PUBLIC_RELEASE_SCHEMA ||
    typeof value.releaseId !== "string" ||
    typeof value.candidateId !== "string" ||
    !ID_PATTERN.test(value.releaseId) ||
    !ID_PATTERN.test(value.candidateId) ||
    !value.releaseId.startsWith("release-") ||
    !value.candidateId.startsWith("candidate-") ||
    typeof value.releasedAt !== "string" ||
    typeof value.sourceObservedAt !== "string" ||
    value.releaseDelayHours !== PUBLIC_RELEASE_DELAY_HOURS ||
    !Number.isFinite(Date.parse(value.releasedAt)) ||
    !Number.isFinite(Date.parse(value.sourceObservedAt)) ||
    !hasExactKeys(value.artifacts, ARTIFACT_NAMES)
  ) {
    throw new Error("Unsupported public release manifest");
  }

  for (const name of ARTIFACT_NAMES) {
    const artifact = value.artifacts[name];
    const expectedPath = `releases/${value.releaseId}/${name}`;
    if (
      !isRecord(artifact) ||
      !hasExactKeys(artifact, ["path", "sha256", "bytes"]) ||
      artifact.path !== expectedPath ||
      typeof artifact.sha256 !== "string" ||
      !HASH_PATTERN.test(artifact.sha256) ||
      !Number.isSafeInteger(artifact.bytes) ||
      (artifact.bytes as number) < 1
    ) {
      throw new Error(`Invalid public release metadata for ${name}`);
    }
  }

  return value as PublicReleaseManifest;
}

export async function loadPublicRelease(
  root = process.cwd(),
  now = new Date(),
): Promise<PublicRelease> {
  const publicationRoot = resolve(root, "public/projections/wdw");
  const manifest = parseManifest(
    JSON.parse(
      await readFile(resolve(publicationRoot, "manifest.v1.json"), "utf8"),
    ),
  );

  const loaded = await Promise.all(
    ARTIFACT_NAMES.map(async (name) => {
      const metadata = manifest.artifacts[name];
      const payload = await readFile(resolve(publicationRoot, metadata.path));
      if (
        payload.byteLength !== metadata.bytes ||
        createHash("sha256").update(payload).digest("hex") !== metadata.sha256
      ) {
        throw new Error(`Public release integrity check failed for ${name}`);
      }
      return [name, JSON.parse(payload.toString("utf8"))] as const;
    }),
  );
  const artifacts = Object.fromEntries(loaded) as Record<ArtifactName, unknown>;
  const world = artifacts["world.v1.json"];
  const systems = artifacts["systems.v1.json"];
  if (!isRecord(world) || !isRecord(systems)) {
    throw new Error("Invalid public release artifacts");
  }

  const generatedAt = Date.parse(String(systems.generatedAt));
  const releasedAt = Date.parse(manifest.releasedAt);
  if (
    systems.schema !== "wdw.systems.v1" ||
    world.schema !== "wdw.world.v1" ||
    systems.releaseDelayHours !== PUBLIC_RELEASE_DELAY_HOURS ||
    systems.generatedAt !== world.generatedAt ||
    systems.sourceObservedAt !== manifest.sourceObservedAt ||
    !Number.isFinite(generatedAt) ||
    releasedAt < generatedAt + PUBLIC_RELEASE_DELAY_HOURS * 3_600_000 ||
    releasedAt > now.getTime()
  ) {
    throw new Error("Public release delay metadata is inconsistent");
  }

  return { manifest, artifacts: { world, systems } };
}
