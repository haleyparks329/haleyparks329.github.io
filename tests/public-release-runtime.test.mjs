import assert from "node:assert/strict";
import { createHash, webcrypto } from "node:crypto";
import test from "node:test";

import { loadPublicProjection } from "../src/scripts/wdw-public-runtime.ts";

const manifestUrl = "https://example.test/projections/wdw/manifest.v1.json";
const now = new Date("2026-08-19T09:00:00Z");

function releaseFixture({
  suffix = "1",
  releasedAt = "2026-08-19T08:00:00Z",
  residentStatus = "active",
  releaseDelayHours = 24,
} = {}) {
  const world = {
    schema: "wdw.world.v1",
    schemaVersion: "1.0.0",
    projectionId: "wdw-resident-public",
    generatedAt: "2026-08-18T08:00:00Z",
    status: "current",
    places: [
      {
        placeId: "workshop",
        name: "Workshop",
        kind: "workshop",
        status: "open",
        href: "/world/#workshop",
      },
      {
        placeId: "lab",
        name: "Lab",
        kind: "lab",
        status: "open",
        href: "/world/#lab",
      },
    ],
    residents: [
      {
        residentId: "bridget",
        name: "Bridget",
        role: "Orchestrator",
        placeId: "workshop",
        status: residentStatus,
      },
    ],
    activities: [],
    attention: [],
  };
  const systems = {
    schema: "wdw.systems.v1",
    generatedAt: world.generatedAt,
    sourceObservedAt: "2026-08-18T07:55:00Z",
    releaseDelayHours,
    state: "known",
    residents: {
      total: 1,
      active: residentStatus === "active" ? 1 : 0,
      needsAttention: residentStatus === "needs-attention" ? 1 : 0,
    },
    intelligence: {
      thoughts: 12,
      candidates: 3,
      reviewed: 2,
      meanSimilarity: 0.75,
      precisionAtK: 0.5,
      precisionAtKState: "available",
    },
  };
  return finalize({ world, systems, suffix, releasedAt });
}

function finalize({ world, systems, suffix, releasedAt }) {
  const releaseId = `release-${suffix.repeat(20)}`;
  const encode = (value) => JSON.stringify(value);
  const worldRaw = encode(world);
  const systemsRaw = encode(systems);
  const integrity = (file, raw) => ({
    path: `releases/${releaseId}/${file}`,
    sha256: createHash("sha256").update(raw).digest("hex"),
    bytes: Buffer.byteLength(raw),
  });
  const manifest = {
    schema: "wdw.public-release-manifest.v1",
    releaseId,
    candidateId: `candidate-${suffix.repeat(20)}`,
    releasedAt,
    sourceObservedAt: systems.sourceObservedAt,
    releaseDelayHours: systems.releaseDelayHours,
    artifacts: {
      "world.v1.json": integrity("world.v1.json", worldRaw),
      "systems.v1.json": integrity("systems.v1.json", systemsRaw),
    },
  };
  return { manifest, world, systems, worldRaw, systemsRaw };
}

function storage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

function fetchRelease(release, replacements = {}) {
  return async (input) => {
    const url = String(input);
    if (url === manifestUrl)
      return Response.json(replacements.manifest ?? release.manifest);
    if (url.endsWith("/world.v1.json"))
      return new Response(replacements.worldRaw ?? release.worldRaw);
    if (url.endsWith("/systems.v1.json"))
      return new Response(replacements.systemsRaw ?? release.systemsRaw);
    return new Response("not found", { status: 404 });
  };
}

function load(release, options = {}) {
  return loadPublicProjection({
    manifestUrl,
    fetchImpl: options.fetchImpl ?? fetchRelease(release, options.replacements),
    storage: options.storage ?? null,
    cryptoImpl: webcrypto,
    now: options.now ?? now,
    expectedReleaseDelayHours: options.expectedReleaseDelayHours,
  });
}

test("accepts a complete verified release with Bridget in the Workshop", async () => {
  const result = await load(releaseFixture());
  assert.equal(result.availability, "available");
  assert.equal(result.source, "network");
  assert.equal(result.freshness, "fresh");
  assert.deepEqual(result.world.residents[0], {
    residentId: "bridget",
    name: "Bridget",
    role: "Orchestrator",
    placeId: "workshop",
    status: "active",
  });
});

test("rejects a tampered artifact when no last-known-good release exists", async () => {
  const release = releaseFixture();
  const result = await load(release, {
    replacements: { worldRaw: `${release.worldRaw} ` },
  });
  assert.equal(result.availability, "unavailable");
  assert.match(result.reason, /integrity check failed/);
});

test("uses a verified last-known-good release when the network fails", async () => {
  const release = releaseFixture();
  const cache = storage();
  assert.equal((await load(release, { storage: cache })).source, "network");
  const result = await load(release, {
    storage: cache,
    fetchImpl: async () => {
      throw new Error("offline");
    },
  });
  assert.equal(result.availability, "available");
  assert.equal(result.source, "last-known-good");
  assert.equal(result.freshness, "stale");
});

test("never mixes a new partial release with the prior release", async () => {
  const oldRelease = releaseFixture({ suffix: "1", residentStatus: "idle" });
  const newRelease = releaseFixture({ suffix: "2", residentStatus: "active" });
  const cache = storage();
  await load(oldRelease, { storage: cache });
  const result = await load(newRelease, {
    storage: cache,
    replacements: { systemsRaw: `${newRelease.systemsRaw} ` },
  });
  assert.equal(result.source, "last-known-good");
  assert.equal(result.manifest.releaseId, oldRelease.manifest.releaseId);
  assert.equal(result.world.residents[0].status, "idle");
  assert.equal(result.systems.residents.active, 0);
});

test("rejects early and future-dated releases", async () => {
  const early = releaseFixture({ releasedAt: "2026-08-19T07:59:59Z" });
  assert.equal((await load(early)).availability, "unavailable");
  const future = releaseFixture({ releasedAt: "2026-08-19T10:00:00Z" });
  assert.equal((await load(future)).availability, "unavailable");
});

test("requires an explicit loader override for a development delay", async () => {
  const developmentRelease = releaseFixture({ releaseDelayHours: 1 / 60 });
  assert.equal((await load(developmentRelease)).availability, "unavailable");

  const commissioned = await load(developmentRelease, {
    expectedReleaseDelayHours: 1 / 60,
  });
  assert.equal(commissioned.availability, "available");
  assert.equal(commissioned.manifest.releaseDelayHours, 1 / 60);
});

test("rejects a re-hashed artifact that changes Bridget's public identity", async () => {
  const release = releaseFixture();
  release.world.residents[0].name = "Private alias";
  const rewritten = finalize({
    world: release.world,
    systems: release.systems,
    suffix: "3",
    releasedAt: release.manifest.releasedAt,
  });
  const result = await load(rewritten);
  assert.equal(result.availability, "unavailable");
  assert.match(result.reason, /identity fields/);
});
