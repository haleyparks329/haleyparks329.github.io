import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { createRendererCommands } from "../src/data/world-renderer-adapter.ts";
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

test("website delegates room identity to World View", async () => {
  const [adapter, page, renderer] = await Promise.all([
    readFile(path.join(root, "src/data/world-renderer-adapter.ts"), "utf8"),
    readFile(path.join(root, "src/pages/world/index.astro"), "utf8"),
    readFile(path.join(root, "src/scripts/world-renderer.ts"), "utf8"),
  ]);

  assert.doesNotMatch(adapter, /\b(?:WORLD_ROOMS|PLACE_ROOMS)\b/);
  assert.doesNotMatch(adapter, /place-(?:workbench|archive)/);
  assert.match(adapter, /resolveRendererPlacement/);
  assert.match(page, /WDW_ROOM_REGISTRY/);
  assert.match(page, /room\.key === "workshop"/);
  assert.match(renderer, /shell\.dataset\.initialRoom/);
});

test("renderer commands preserve reviewed resident identity and room membership", () => {
  const projection = {
    schemaVersion: "1.0",
    projectionId: "world-renderer-test",
    generatedAt: "2026-08-16T00:00:00.000Z",
    status: "partial",
    places: [],
    residents: [
      {
        residentId: "resident-bridget",
        name: "Bridget",
        role: "resident",
        placeId: "workshop",
        status: "active",
      },
      {
        residentId: "resident-banjo",
        name: "Banjo",
        role: "resident",
        placeId: "workshop",
        status: "bounded",
      },
      {
        residentId: "resident-coach",
        name: "Coach",
        role: "resident",
        placeId: "lab",
        status: "active",
      },
      {
        residentId: "resident-mini-me",
        name: "Mini Me",
        role: "resident",
        placeId: "lab",
        status: "bounded",
      },
    ],
    activities: [],
    attention: [],
  };

  const workshop = createRendererCommands(projection, "workshop");
  const lab = createRendererCommands(projection, "lab");

  assert.deepEqual(
    workshop.map(({ state }) => state.label),
    ["Bridget", "Banjo"],
  );
  assert.deepEqual(
    lab.map(({ state }) => state.label),
    ["Coach", "Mini Me"],
  );
  assert.equal(lab[1].state.tint, 0xa78bfa);
  assert.deepEqual(createRendererCommands(null, "outside"), []);
});

test("World View camera controls use the renderer API in the visible control order", async () => {
  const [page, renderer] = await Promise.all([
    readFile(path.join(root, "src/pages/world/index.astro"), "utf8"),
    readFile(path.join(root, "src/scripts/world-renderer.ts"), "utf8"),
  ]);
  const controlOrder = [
    "data-world-zoom-out",
    "data-world-zoom-slider",
    "data-world-zoom-in",
    "data-world-zoom-fit",
  ].map((attribute) => page.indexOf(attribute));

  assert.ok(controlOrder.every((index) => index >= 0));
  assert.deepEqual(
    controlOrder,
    [...controlOrder].sort((left, right) => left - right),
  );
  assert.match(renderer, /world\?\.zoomOut\(\)/);
  assert.match(renderer, /world\?\.setZoom\(/);
  assert.match(renderer, /world\?\.zoomIn\(\)/);
  assert.match(renderer, /world\?\.resetZoom\(\)/);
  assert.doesNotMatch(renderer, /style\.transform/);
});

test("World View retains the global view switch and keeps renderer JavaScript route-local", async () => {
  const [header, page, renderer] = await Promise.all([
    readFile(
      path.join(root, "src/components/redesign/EditorialHeader.astro"),
      "utf8",
    ),
    readFile(path.join(root, "src/pages/world/index.astro"), "utf8"),
    readFile(path.join(root, "src/scripts/world-renderer.ts"), "utf8"),
  ]);

  assert.match(header, /class="maria-view-switch" aria-label="Site view"/);
  assert.match(header, />\s*Regular View\s*</);
  assert.match(header, />\s*Digital World\s*</);
  assert.match(page, /scripts\/world-renderer/);
  assert.doesNotMatch(header, /world-renderer/);
  assert.doesNotMatch(renderer, /import\(/);
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
});
