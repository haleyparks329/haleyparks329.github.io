import { randomUUID } from "node:crypto";
import {
  access,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import {
  ARTIFACT_FILES,
  ContractError,
  VERSION,
  sha256,
  validateArtifacts,
  validateSource,
} from "./projection-contracts.mjs";

const RECEIPT_VERSION = VERSION;

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function generateArtifacts(source) {
  validateSource(source);
  const freshness = {
    status: source.world.status,
    sourceUpdatedAt: source.updatedAt,
  };
  const artifacts = {
    site: {
      schemaVersion: VERSION,
      siteId: source.site.siteId,
      generatedAt: source.updatedAt,
      freshness,
      identity: {
        name: source.site.name,
        canonicalUrl: source.site.canonicalUrl,
        description: source.site.description,
      },
      navigation: [
        { id: "nav-home", label: "Home", href: "/" },
        { id: "nav-projects", label: "Projects", href: "/projects/" },
        { id: "nav-writing", label: "Writing", href: "/writing/" },
      ],
      featuredProjectIds: [...source.site.featuredProjectIds],
    },
    projects: {
      schemaVersion: VERSION,
      generatedAt: source.updatedAt,
      freshness,
      projects: source.projects.map(
        ({ visibility: _visibility, ...project }) => project,
      ),
    },
    world: {
      schemaVersion: VERSION,
      generatedAt: source.updatedAt,
      ...source.world,
    },
  };
  validateArtifacts(artifacts);
  const releaseId = `release-${sha256(artifacts).slice(0, 16)}`;
  return { artifacts, releaseId };
}

export async function stageRelease({ root, sourcePath, stagingRoot }) {
  const source = await readJson(sourcePath);
  const release = generateArtifacts(source);
  const releaseDirectory = path.join(
    stagingRoot ?? path.join(root, ".wp6", "staging"),
    release.releaseId,
  );
  await rm(releaseDirectory, { recursive: true, force: true });
  await mkdir(releaseDirectory, { recursive: true });
  for (const [key, fileName] of Object.entries(ARTIFACT_FILES)) {
    await writeJson(
      path.join(releaseDirectory, fileName),
      release.artifacts[key],
    );
  }
  return { ...release, releaseDirectory };
}

export async function loadRelease(releaseDirectory) {
  const artifacts = {};
  for (const [key, fileName] of Object.entries(ARTIFACT_FILES)) {
    artifacts[key] = await readJson(path.join(releaseDirectory, fileName));
  }
  validateArtifacts(artifacts);
  return artifacts;
}

function validatePolicy(policy, { approved, automated = false }) {
  if (policy.schemaVersion !== VERSION)
    throw new ContractError(
      "UNSUPPORTED_POLICY_VERSION",
      "policy.schemaVersion",
    );
  if (
    policy.rules?.sensitiveDataMayPublish !== false ||
    policy.rules?.llmMayPublish !== false
  ) {
    throw new ContractError("UNSAFE_POLICY", "policy.rules");
  }
  if (automated && (!policy.enabled || policy.killSwitch)) {
    throw new ContractError("AUTOMATION_DISABLED", "policy.killSwitch");
  }
  if (policy.rules?.humanApprovalRequired && !approved) {
    throw new ContractError("HUMAN_APPROVAL_REQUIRED", "approval");
  }
}

function manifestFor(releaseId, artifacts, previousReleaseId, publishedAt) {
  return {
    schemaVersion: VERSION,
    projectionId: "wp6-public-projections",
    releaseId,
    previousReleaseId,
    publishedAt,
    artifacts: Object.entries(ARTIFACT_FILES).map(([key, fileName]) => ({
      kind: key,
      path: `/projections/releases/${releaseId}/${fileName}`,
      schemaVersion: artifacts[key].schemaVersion,
      sha256: sha256(artifacts[key]),
    })),
  };
}

export function validateManifest(manifest) {
  const keys = [
    "schemaVersion",
    "projectionId",
    "releaseId",
    "previousReleaseId",
    "publishedAt",
    "artifacts",
  ];
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest))
    throw new ContractError("EXPECTED_OBJECT", "manifest");
  if (
    Object.keys(manifest).some((key) => !keys.includes(key)) ||
    keys.some((key) => !(key in manifest))
  ) {
    throw new ContractError("INVALID_MANIFEST_FIELDS", "manifest");
  }
  if (manifest.schemaVersion !== VERSION)
    throw new ContractError("UNSUPPORTED_VERSION", "manifest.schemaVersion");
  if (manifest.projectionId !== "wp6-public-projections")
    throw new ContractError("INVALID_PROJECTION_ID", "manifest.projectionId");
  if (!/^release-[a-f0-9]{16}$/.test(manifest.releaseId))
    throw new ContractError("INVALID_RELEASE_ID", "manifest.releaseId");
  if (
    manifest.previousReleaseId !== null &&
    !/^release-[a-f0-9]{16}$/.test(manifest.previousReleaseId)
  ) {
    throw new ContractError("INVALID_RELEASE_ID", "manifest.previousReleaseId");
  }
  if (Number.isNaN(Date.parse(manifest.publishedAt)))
    throw new ContractError("INVALID_TIMESTAMP", "manifest.publishedAt");
  if (!Array.isArray(manifest.artifacts) || manifest.artifacts.length !== 3)
    throw new ContractError("INVALID_ARTIFACTS", "manifest.artifacts");
  const kinds = new Set();
  for (const [index, artifact] of manifest.artifacts.entries()) {
    const expected = ["kind", "path", "schemaVersion", "sha256"];
    if (
      !artifact ||
      Object.keys(artifact).some((key) => !expected.includes(key)) ||
      expected.some((key) => !(key in artifact))
    ) {
      throw new ContractError(
        "INVALID_ARTIFACT_FIELDS",
        `manifest.artifacts[${index}]`,
      );
    }
    if (
      !Object.hasOwn(ARTIFACT_FILES, artifact.kind) ||
      kinds.has(artifact.kind)
    )
      throw new ContractError(
        "INVALID_ARTIFACT_KIND",
        `manifest.artifacts[${index}].kind`,
      );
    kinds.add(artifact.kind);
    const expectedPath = `/projections/releases/${manifest.releaseId}/${ARTIFACT_FILES[artifact.kind]}`;
    if (artifact.path !== expectedPath)
      throw new ContractError(
        "INVALID_ARTIFACT_PATH",
        `manifest.artifacts[${index}].path`,
      );
    if (artifact.schemaVersion !== VERSION)
      throw new ContractError(
        "UNSUPPORTED_VERSION",
        `manifest.artifacts[${index}].schemaVersion`,
      );
    if (!/^[a-f0-9]{64}$/.test(artifact.sha256))
      throw new ContractError(
        "INVALID_CHECKSUM",
        `manifest.artifacts[${index}].sha256`,
      );
  }
  return manifest;
}

async function currentManifest(publicRoot) {
  try {
    return validateManifest(
      await readJson(path.join(publicRoot, "manifest.v1.json")),
    );
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function atomicManifest(publicRoot, manifest) {
  const finalPath = path.join(publicRoot, "manifest.v1.json");
  const temporaryPath = path.join(publicRoot, `.manifest-${randomUUID()}.json`);
  await writeJson(temporaryPath, manifest);
  await rename(temporaryPath, finalPath);
}

async function receipt(root, operation, status, releaseId, details = {}) {
  const recordedAt = new Date().toISOString();
  const value = {
    schemaVersion: RECEIPT_VERSION,
    receiptId: `receipt-${randomUUID()}`,
    operation,
    status,
    releaseId: releaseId ?? null,
    recordedAt,
    details,
  };
  validateReceipt(value);
  const safeTimestamp = recordedAt.replaceAll(":", "-");
  await writeJson(
    path.join(
      root,
      ".wp6",
      "receipts",
      `${safeTimestamp}-${value.receiptId}.json`,
    ),
    value,
  );
  return value;
}

export function validateReceipt(value) {
  const keys = [
    "schemaVersion",
    "receiptId",
    "operation",
    "status",
    "releaseId",
    "recordedAt",
    "details",
  ];
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new ContractError("EXPECTED_OBJECT", "receipt");
  if (
    Object.keys(value).some((key) => !keys.includes(key)) ||
    keys.some((key) => !(key in value))
  ) {
    throw new ContractError("INVALID_RECEIPT_FIELDS", "receipt");
  }
  if (value.schemaVersion !== VERSION)
    throw new ContractError("UNSUPPORTED_VERSION", "receipt.schemaVersion");
  if (!/^receipt-[0-9a-f-]{36}$/.test(value.receiptId))
    throw new ContractError("INVALID_RECEIPT_ID", "receipt.receiptId");
  if (!["publish", "rollback"].includes(value.operation))
    throw new ContractError("INVALID_OPERATION", "receipt.operation");
  if (!["succeeded", "blocked", "noop"].includes(value.status))
    throw new ContractError("INVALID_STATUS", "receipt.status");
  if (
    value.releaseId !== null &&
    !/^release-[a-f0-9]{16}$/.test(value.releaseId)
  )
    throw new ContractError("INVALID_RELEASE_ID", "receipt.releaseId");
  if (Number.isNaN(Date.parse(value.recordedAt)))
    throw new ContractError("INVALID_TIMESTAMP", "receipt.recordedAt");
  if (
    !value.details ||
    typeof value.details !== "object" ||
    Array.isArray(value.details)
  )
    throw new ContractError("EXPECTED_OBJECT", "receipt.details");
  return value;
}

export async function publishRelease({
  root,
  releaseDirectory,
  approved = false,
  automated = false,
  now = () => new Date(),
}) {
  const publicRoot = path.join(root, "public", "projections");
  let releaseId = path.basename(releaseDirectory);
  try {
    const policy = await readJson(
      path.join(root, "config", "publication-policy.v1.json"),
    );
    validatePolicy(policy, { approved, automated });
    const artifacts = await loadRelease(releaseDirectory);
    const expectedReleaseId = `release-${sha256(artifacts).slice(0, 16)}`;
    if (releaseId !== expectedReleaseId)
      throw new ContractError("RELEASE_CONTENT_MISMATCH", "releaseId");
    const previous = await currentManifest(publicRoot);
    if (previous?.releaseId === releaseId) {
      await validatePublished(root);
      return {
        manifest: previous,
        receipt: await receipt(root, "publish", "noop", releaseId, {
          reason: "already_current",
        }),
      };
    }
    const releasesRoot = path.join(publicRoot, "releases");
    const finalDirectory = path.join(releasesRoot, releaseId);
    await mkdir(releasesRoot, { recursive: true });
    try {
      await access(finalDirectory);
      const existing = await loadRelease(finalDirectory);
      if (sha256(existing) !== sha256(artifacts))
        throw new ContractError("RELEASE_COLLISION", "releaseId");
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
      const temporaryDirectory = path.join(
        releasesRoot,
        `.${releaseId}-${randomUUID()}`,
      );
      await mkdir(temporaryDirectory, { recursive: true });
      try {
        for (const [key, fileName] of Object.entries(ARTIFACT_FILES))
          await writeJson(
            path.join(temporaryDirectory, fileName),
            artifacts[key],
          );
        await rename(temporaryDirectory, finalDirectory);
      } catch (error) {
        await rm(temporaryDirectory, { recursive: true, force: true });
        throw error;
      }
    }
    const manifest = manifestFor(
      releaseId,
      artifacts,
      previous?.releaseId ?? null,
      now().toISOString(),
    );
    validateManifest(manifest);
    await atomicManifest(publicRoot, manifest);
    await validatePublished(root);
    return {
      manifest,
      receipt: await receipt(root, "publish", "succeeded", releaseId, {
        previousReleaseId: manifest.previousReleaseId,
      }),
    };
  } catch (error) {
    await receipt(root, "publish", "blocked", releaseId, {
      code: error.code ?? "PUBLISH_FAILED",
    });
    throw error;
  }
}

export async function validatePublished(root) {
  const publicRoot = path.join(root, "public", "projections");
  const manifest = validateManifest(
    await readJson(path.join(publicRoot, "manifest.v1.json")),
  );
  const releaseDirectory = path.join(
    publicRoot,
    "releases",
    manifest.releaseId,
  );
  const artifacts = await loadRelease(releaseDirectory);
  for (const entry of manifest.artifacts) {
    if (sha256(artifacts[entry.kind]) !== entry.sha256)
      throw new ContractError(
        "CHECKSUM_MISMATCH",
        `manifest.artifacts.${entry.kind}`,
      );
  }
  return { manifest, artifacts };
}

export async function rollbackRelease({
  root,
  targetReleaseId,
  approved = false,
  now = () => new Date(),
}) {
  const publicRoot = path.join(root, "public", "projections");
  try {
    const policy = await readJson(
      path.join(root, "config", "publication-policy.v1.json"),
    );
    validatePolicy(policy, { approved, automated: false });
    const current = await currentManifest(publicRoot);
    if (!current) throw new ContractError("NO_CURRENT_RELEASE", "manifest");
    const releaseId = targetReleaseId ?? current.previousReleaseId;
    if (!releaseId)
      throw new ContractError(
        "NO_ROLLBACK_TARGET",
        "manifest.previousReleaseId",
      );
    const artifacts = await loadRelease(
      path.join(publicRoot, "releases", releaseId),
    );
    const manifest = manifestFor(
      releaseId,
      artifacts,
      current.releaseId,
      now().toISOString(),
    );
    await atomicManifest(publicRoot, manifest);
    await validatePublished(root);
    return {
      manifest,
      receipt: await receipt(root, "rollback", "succeeded", releaseId, {
        replacedReleaseId: current.releaseId,
      }),
    };
  } catch (error) {
    await receipt(root, "rollback", "blocked", targetReleaseId ?? null, {
      code: error.code ?? "ROLLBACK_FAILED",
    });
    throw error;
  }
}
