import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { cutawayScene } from "../src/data/world-cutaway.ts";
import { loadWorldView, toWorldViewState } from "../src/data/world-view.ts";
import { withBasePath } from "../src/utils/site-path.ts";

const root = path.resolve(import.meta.dirname, "..");

test("world consumer returns the validated projection without inventing entities", async () => {
  // Read the manual publication only. Daily WDW releases under
  // public/projections/wdw/ take precedence on the live site.
  const manualRoot = await mkdtemp(path.join(os.tmpdir(), "world-manual-"));
  await cp(
    path.join(root, "public/projections"),
    path.join(manualRoot, "public/projections"),
    { recursive: true, filter: (source) => !source.includes("/wdw") },
  );
  const state = await loadWorldView(manualRoot);
  await rm(manualRoot, { recursive: true, force: true });

  assert.equal(state.state, "partial");
  assert.notEqual(state.state, "unavailable");
  if (state.state === "unavailable") return;

  assert.deepEqual(
    state.projection.places.map(({ placeId }) => placeId),
    ["workshop", "lab", "outside"],
  );
  assert.deepEqual(
    state.projection.residents.map(({ residentId }) => residentId),
    ["resident-bridget"],
  );
  assert.deepEqual(
    state.projection.activities.map(({ activityId }) => activityId),
    ["activity-wp6-projection"],
  );
  assert.deepEqual(
    state.projection.attention.map(({ attentionId }) => attentionId),
    ["attention-live-world-source"],
  );
});

test("World View retains the global view switch and ships no client script", async () => {
  const [header, page] = await Promise.all([
    readFile(
      path.join(root, "src/components/redesign/EditorialHeader.astro"),
      "utf8",
    ),
    readFile(path.join(root, "src/pages/world/index.astro"), "utf8"),
  ]);

  assert.match(header, /class="maria-view-switch" aria-label="Site view"/);
  assert.match(header, />\s*Regular View\s*</);
  assert.match(header, />\s*Digital World\s*</);
  assert.doesNotMatch(page, /<script/);
});

test("active public World View vocabulary is limited to canonical rooms", async () => {
  const manifest = JSON.parse(
    await readFile(
      path.join(root, "public/projections/manifest.v1.json"),
      "utf8",
    ),
  );
  const activeWorld = await readFile(
    path.join(
      root,
      "public/projections/releases",
      manifest.releaseId,
      "world.v1.json",
    ),
    "utf8",
  );

  assert.doesNotMatch(
    activeWorld,
    /\b(?:poker|court|office|home|workbench|public archive)\b/i,
  );
});

test("world consumer maps every published availability state", () => {
  const projection = {
    schemaVersion: "1.0",
    projectionId: "world-test",
    generatedAt: "2026-08-16T00:00:00.000Z",
    status: "current",
    places: [],
    residents: [],
    activities: [],
    attention: [],
  };

  assert.equal(toWorldViewState(projection).state, "fresh");
  assert.equal(
    toWorldViewState({ ...projection, status: "partial" }).state,
    "partial",
  );
  assert.equal(
    toWorldViewState({ ...projection, status: "stale" }).state,
    "stale",
  );
});

test("world consumer fails closed when no verified release is available", async () => {
  const state = await loadWorldView(path.join(root, "missing-world-view-root"));

  assert.deepEqual(state, {
    state: "unavailable",
    reason: "The reviewed public projection could not be verified.",
  });
});

test("world projection relationships and hrefs remain public and resolvable", async () => {
  const state = await loadWorldView(root);
  assert.notEqual(state.state, "unavailable");
  if (state.state === "unavailable") return;

  const placeIds = new Set(
    state.projection.places.map(({ placeId }) => placeId),
  );
  for (const place of state.projection.places) {
    assert.match(place.href, /^\/(?!\/)/);
  }
  for (const item of [
    ...state.projection.residents,
    ...state.projection.activities,
    ...state.projection.attention,
  ]) {
    assert.ok(placeIds.has(item.placeId));
  }
});

test("World View routes and projection links honor a deployment base path", async () => {
  assert.equal(withBasePath("/world/", "/portfolio/"), "/portfolio/world/");
  assert.equal(withBasePath("/", "/portfolio/"), "/portfolio/");
  assert.equal(
    withBasePath("/portfolio/world/", "/portfolio/"),
    "/portfolio/world/",
  );
  assert.equal(
    withBasePath("https://example.com", "/portfolio/"),
    "https://example.com",
  );

  const page = await readFile(
    path.join(root, "src/pages/world/index.astro"),
    "utf8",
  );
  assert.match(page, /canonicalPath="\/world\/"/);
  assert.match(page, /loadWorldView\(\)/);
  assert.doesNotMatch(page, /data-manifest-url/);
});

test("cutaway scene poses residents by their published status", () => {
  const resident = (residentId, placeId, status) => ({
    residentId,
    name: residentId,
    role: "resident",
    placeId,
    status,
  });
  const scene = cutawayScene({
    schemaVersion: "1.0.0",
    projectionId: "wdw-resident-public",
    generatedAt: "2026-11-11T09:00:00Z",
    status: "current",
    places: [],
    residents: [
      resident("resident-bridget", "workshop", "bounded"),
      resident("banjo", "workshop", "active"),
      resident("coach", "lab", "unavailable"),
      resident("someone-new", "garden", "working"),
    ],
    activities: [],
    attention: [],
  });

  assert.deepEqual(
    scene.residents.map(({ tone, pose, area }) => [tone, pose, area]),
    [
      ["banjo", "busy", "workshop"],
      ["other", "busy", "outside"],
      ["bridget", "resting", "workshop"],
      ["coach", "away", "lab"],
    ],
  );
  assert.deepEqual(cutawayScene(null).residents, []);
});
