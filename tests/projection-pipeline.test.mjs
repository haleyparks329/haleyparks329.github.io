import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  publishRelease,
  readJson,
  rollbackRelease,
  stageRelease,
  validatePublished,
} from "../scripts/lib/projection-pipeline.mjs";
import { createWorldProjectionProvider } from "../src/data/public-projections.mjs";

const repositoryRoot = process.cwd();

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "wp6-projections-"));
  await mkdir(path.join(root, "config"), { recursive: true });
  await mkdir(path.join(root, "projection-sources"), { recursive: true });
  for (const file of [
    ["config/publication-policy.v1.json", "config/publication-policy.v1.json"],
    [
      "projection-sources/public-state.v1.json",
      "projection-sources/public-state.v1.json",
    ],
  ]) {
    await writeFile(
      path.join(root, file[0]),
      await readFile(path.join(repositoryRoot, file[1]), "utf8"),
    );
  }
  return root;
}

async function stage(
  root,
  sourcePath = path.join(root, "projection-sources", "public-state.v1.json"),
) {
  return stageRelease({ root, sourcePath });
}

test("publishes and validates the required public projection contracts", async () => {
  const root = await fixture();
  const staged = await stage(root);
  const result = await publishRelease({
    root,
    releaseDirectory: staged.releaseDirectory,
    approved: true,
    now: () => new Date("2026-08-16T12:00:00.000Z"),
  });
  const { artifacts } = await validatePublished(root);

  assert.equal(result.receipt.status, "succeeded");
  assert.deepEqual(
    artifacts.projects.projects.map(({ projectId }) => projectId),
    [
      "project-the-human-model",
      "project-wonderful-digital-world",
      "project-bridget",
      "project-qa-agents",
      "project-career-intelligence",
    ],
  );
  assert.equal(artifacts.world.status, "partial");
  assert.ok(artifacts.world.attention.length > 0);
});

test("requires explicit human approval and keeps the manifest absent", async () => {
  const root = await fixture();
  const staged = await stage(root);

  await assert.rejects(
    publishRelease({ root, releaseDirectory: staged.releaseDirectory }),
    { code: "HUMAN_APPROVAL_REQUIRED" },
  );
  await assert.rejects(
    readJson(path.join(root, "public", "projections", "manifest.v1.json")),
    { code: "ENOENT" },
  );
});

test("invalid and private input cannot replace a known-good release", async () => {
  const root = await fixture();
  const first = await stage(root);
  await publishRelease({
    root,
    releaseDirectory: first.releaseDirectory,
    approved: true,
  });
  const manifestPath = path.join(
    root,
    "public",
    "projections",
    "manifest.v1.json",
  );
  const knownGood = await readJson(manifestPath);
  const original = await readJson(
    path.join(root, "projection-sources", "public-state.v1.json"),
  );

  for (const mutation of [
    (source) => {
      source.visibility = "private";
    },
    (source) => {
      source.site.apiToken = "must-never-publish";
    },
  ]) {
    const source = structuredClone(original);
    mutation(source);
    const candidatePath = path.join(root, "projection-sources", "blocked.json");
    await writeFile(candidatePath, `${JSON.stringify(source)}\n`);
    await assert.rejects(stage(root, candidatePath));
    assert.deepEqual(await readJson(manifestPath), knownGood);
  }
});

test("a repeated publication is idempotent", async () => {
  const root = await fixture();
  const staged = await stage(root);
  const first = await publishRelease({
    root,
    releaseDirectory: staged.releaseDirectory,
    approved: true,
  });
  const second = await publishRelease({
    root,
    releaseDirectory: staged.releaseDirectory,
    approved: true,
  });

  assert.equal(second.receipt.status, "noop");
  assert.deepEqual(second.manifest, first.manifest);
});

test("rolls the manifest back to a validated previous release", async () => {
  const root = await fixture();
  const first = await stage(root);
  const firstPublished = await publishRelease({
    root,
    releaseDirectory: first.releaseDirectory,
    approved: true,
  });
  const sourcePath = path.join(
    root,
    "projection-sources",
    "public-state.v1.json",
  );
  const source = await readJson(sourcePath);
  source.updatedAt = "2026-08-16T01:00:00.000Z";
  source.projects[0].summary += " Verified second release.";
  await writeFile(sourcePath, `${JSON.stringify(source, null, 2)}\n`);
  const second = await stage(root);
  const secondPublished = await publishRelease({
    root,
    releaseDirectory: second.releaseDirectory,
    approved: true,
  });

  assert.notEqual(
    secondPublished.manifest.releaseId,
    firstPublished.manifest.releaseId,
  );
  const rolledBack = await rollbackRelease({ root, approved: true });
  assert.equal(
    rolledBack.manifest.releaseId,
    firstPublished.manifest.releaseId,
  );
  assert.equal(
    rolledBack.manifest.previousReleaseId,
    secondPublished.manifest.releaseId,
  );
  await validatePublished(root);
});

test("consumer exposes current failure and freshness states without UI assumptions", async () => {
  const root = await fixture();
  const staged = await stage(root);
  await publishRelease({
    root,
    releaseDirectory: staged.releaseDirectory,
    approved: true,
  });
  const { manifest, artifacts } = await validatePublished(root);
  const responses = new Map([
    [
      "/projections/manifest.v1.json",
      { ok: true, status: 200, json: async () => manifest },
    ],
    [
      manifest.artifacts.find(({ kind }) => kind === "world").path,
      { ok: true, status: 200, json: async () => artifacts.world },
    ],
  ]);
  const fetchImpl = async (url) =>
    responses.get(url) ?? { ok: false, status: 404 };

  assert.equal(
    (await createWorldProjectionProvider({ fetchImpl })).state,
    "partial",
  );
  assert.equal(
    (
      await createWorldProjectionProvider({
        fetchImpl: async () => ({ ok: false, status: 403 }),
      })
    ).state,
    "unauthorized",
  );
  assert.equal(
    (
      await createWorldProjectionProvider({
        fetchImpl: async () => ({ ok: false, status: 503 }),
      })
    ).state,
    "unavailable",
  );
  assert.equal(
    (
      await createWorldProjectionProvider({
        fetchImpl: async () => ({
          ok: true,
          status: 200,
          json: async () => ({}),
        }),
      })
    ).state,
    "invalid",
  );
});
