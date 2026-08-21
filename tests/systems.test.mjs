import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { loadSystemsView } from "../src/data/systems.ts";

const root = resolve(import.meta.dirname, "..");

const valid = {
  schema: "wdw.systems.v1",
  generatedAt: "2026-08-16T12:00:00Z",
  sourceObservedAt: "2026-08-15T10:00:00Z",
  releaseDelayHours: 24,
  state: "partial",
  residents: { total: 4, active: 0, needsAttention: 0 },
  intelligence: {
    thoughts: null,
    candidates: null,
    reviewed: 0,
    meanSimilarity: null,
    precisionAtK: null,
    precisionAtKState: "insufficient-evidence",
  },
};

async function fixture(value) {
  const directory = await mkdtemp(join(tmpdir(), "systems-view-"));
  const filePath = join(directory, "systems.json");
  await writeFile(
    filePath,
    typeof value === "string" ? value : JSON.stringify(value),
  );
  return filePath;
}

test("loads a fresh public projection", async () => {
  const view = await loadSystemsView({
    filePath: await fixture(valid),
    now: new Date("2026-08-17T12:00:00Z"),
  });
  assert.equal(view.availability, "available");
  assert.equal(view.stale, false);
});

test("marks an old projection stale", async () => {
  const view = await loadSystemsView({
    filePath: await fixture(valid),
    now: new Date("2026-08-20T13:00:00Z"),
  });
  assert.equal(view.availability, "available");
  assert.equal(view.stale, true);
});

test("fails closed for missing or malformed projections", async () => {
  assert.equal(
    (await loadSystemsView({ filePath: "/definitely/missing/systems.json" }))
      .availability,
    "unavailable",
  );
  assert.equal(
    (await loadSystemsView({ filePath: await fixture("not json") }))
      .availability,
    "unavailable",
  );
});

test("ignores additive fields after publication validation", async () => {
  const view = await loadSystemsView({
    filePath: await fixture({ ...valid, futureField: "ignored" }),
  });
  assert.equal(view.availability, "available");
  assert.equal("futureField" in view.projection, false);
});

test("Systems page loads only the verified public release at build time", async () => {
  const page = await readFile(
    join(root, "src/pages/systems/index.astro"),
    "utf8",
  );

  assert.match(page, /const view = await loadSystemsView\(\)/);
  assert.doesNotMatch(page, /systems\.json/);
  assert.doesNotMatch(page, /systems-runtime/);
  assert.doesNotMatch(page, /data-systems-view/);
});

test("default loading fails closed when no verified release exists", async () => {
  const emptyRoot = await mkdtemp(join(tmpdir(), "systems-no-release-"));
  const view = await loadSystemsView({ root: emptyRoot });

  assert.equal(view.availability, "unavailable");
});
