import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { loadWorldView, toWorldViewState } from "../src/data/world-view.ts";
import { withBasePath } from "../src/utils/site-path.ts";

const root = path.resolve(import.meta.dirname, "..");

test("world consumer returns the validated projection without inventing entities", async () => {
  const state = await loadWorldView(root);

  assert.equal(state.state, "partial");
  assert.notEqual(state.state, "unavailable");
  if (state.state === "unavailable") return;

  assert.deepEqual(
    state.projection.places.map(({ placeId }) => placeId),
    ["place-workbench", "place-archive"],
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
});
