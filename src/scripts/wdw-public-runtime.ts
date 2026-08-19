import type { WorldProjection } from "../data/world-view";
import type { SystemsProjection } from "../data/systems";

export const PUBLIC_PROJECTION_STALE_AFTER_HOURS = 72;
const STORAGE_KEY = "wdw.public-release.lkg.v1";
const RELEASE_FILES = ["world.v1.json", "systems.v1.json"] as const;
const PRODUCTION_RELEASE_DELAY_HOURS = 24;
const RESIDENTS = {
  bridget: ["Bridget", "Orchestrator", "workshop"],
  coach: ["Coach", "Coaching resident", "workshop"],
  "mini-me": ["Mini Me", "Research resident", "lab"],
  banjo: ["Banjo", "Engineering resident", "workshop"],
} as const;
const PLACES = {
  workshop: ["Workshop", "workshop", "open", "/world/#workshop"],
  lab: ["Lab", "lab", "open", "/world/#lab"],
} as const;
const RESIDENT_IDS = new Set(Object.keys(RESIDENTS));
const PLACE_IDS = new Set(Object.keys(PLACES));

type ReleaseFile = (typeof RELEASE_FILES)[number];
type Integrity = { path: string; sha256: string; bytes: number };

export type PublicReleaseManifest = {
  schema: "wdw.public-release-manifest.v1";
  releaseId: string;
  candidateId: string;
  releasedAt: string;
  sourceObservedAt: string;
  releaseDelayHours: number;
  artifacts: Record<ReleaseFile, Integrity>;
};

export type PublicProjectionResult =
  | {
      availability: "available";
      freshness: "fresh" | "stale" | "partial";
      source: "network" | "last-known-good";
      manifest: PublicReleaseManifest;
      world: WorldProjection;
      systems: SystemsProjection;
    }
  | { availability: "unavailable"; reason: string };

type StorageLike = Pick<Storage, "getItem" | "setItem">;
type CryptoLike = Pick<Crypto, "subtle">;
type FetchLike = typeof fetch;
type StoredRelease = {
  manifest: unknown;
  worldRaw: string;
  systemsRaw: string;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function exactKeys(value: Record<string, unknown>, keys: string[]): boolean {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return (
    actual.length === expected.length &&
    actual.every((key, index) => key === expected[index])
  );
}

function validDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(
      value,
    ) &&
    Number.isFinite(Date.parse(value))
  );
}

function validIntegrity(
  value: unknown,
  releaseId: string,
  file: ReleaseFile,
): value is Integrity {
  if (!isObject(value) || !exactKeys(value, ["path", "sha256", "bytes"]))
    return false;
  return (
    value.path === `releases/${releaseId}/${file}` &&
    typeof value.sha256 === "string" &&
    /^[a-f0-9]{64}$/.test(value.sha256) &&
    Number.isInteger(value.bytes) &&
    (value.bytes as number) >= 0
  );
}

export function parseManifest(
  value: unknown,
  expectedReleaseDelayHours = PRODUCTION_RELEASE_DELAY_HOURS,
): PublicReleaseManifest {
  if (
    !isObject(value) ||
    !exactKeys(value, [
      "schema",
      "releaseId",
      "candidateId",
      "releasedAt",
      "sourceObservedAt",
      "releaseDelayHours",
      "artifacts",
    ])
  ) {
    throw new Error("Invalid public release manifest fields");
  }
  if (
    value.schema !== "wdw.public-release-manifest.v1" ||
    typeof value.releaseId !== "string" ||
    !/^release-[a-f0-9]{20}$/.test(value.releaseId) ||
    typeof value.candidateId !== "string" ||
    !/^candidate-[a-f0-9]{20}$/.test(value.candidateId) ||
    !validDate(value.releasedAt) ||
    !validDate(value.sourceObservedAt) ||
    value.releaseDelayHours !== expectedReleaseDelayHours ||
    !isObject(value.artifacts)
  )
    throw new Error("Invalid public release manifest");
  if (!exactKeys(value.artifacts, [...RELEASE_FILES]))
    throw new Error("Invalid public release artifact allowlist");
  for (const file of RELEASE_FILES) {
    if (!validIntegrity(value.artifacts[file], value.releaseId, file))
      throw new Error(`Invalid integrity metadata for ${file}`);
  }
  return value as PublicReleaseManifest;
}

function parseWorld(value: unknown): WorldProjection {
  if (
    !isObject(value) ||
    !exactKeys(value, [
      "schema",
      "schemaVersion",
      "projectionId",
      "generatedAt",
      "status",
      "places",
      "residents",
      "activities",
      "attention",
    ])
  )
    throw new Error("Invalid World projection fields");
  if (
    value.schema !== "wdw.world.v1" ||
    value.schemaVersion !== "1.0.0" ||
    value.projectionId !== "wdw-resident-public" ||
    !validDate(value.generatedAt) ||
    !["current", "partial"].includes(String(value.status)) ||
    !Array.isArray(value.places) ||
    !Array.isArray(value.residents) ||
    !Array.isArray(value.activities) ||
    !Array.isArray(value.attention) ||
    value.activities.length ||
    value.attention.length
  )
    throw new Error("Invalid World projection");
  const placeIds = new Set<string>();
  for (const place of value.places) {
    if (
      !isObject(place) ||
      !exactKeys(place, ["placeId", "name", "kind", "status", "href"]) ||
      !Object.values(place).every((field) => typeof field === "string") ||
      !PLACE_IDS.has(String(place.placeId))
    )
      throw new Error("Invalid public place");
    if (placeIds.has(String(place.placeId)))
      throw new Error("Duplicate public place");
    const expected = PLACES[String(place.placeId) as keyof typeof PLACES];
    if (
      !expected ||
      [place.name, place.kind, place.status, place.href].some(
        (field, index) => field !== expected[index],
      )
    )
      throw new Error("Invalid public place identity fields");
    placeIds.add(String(place.placeId));
  }
  if (
    placeIds.size !== PLACE_IDS.size ||
    [...PLACE_IDS].some((id) => !placeIds.has(id))
  )
    throw new Error("Incomplete public place allowlist");
  const statuses = new Set([
    "idle",
    "active",
    "waiting",
    "needs-attention",
    "unavailable",
  ]);
  const residentIds = new Set<string>();
  for (const resident of value.residents) {
    if (
      !isObject(resident) ||
      !exactKeys(resident, [
        "residentId",
        "name",
        "role",
        "placeId",
        "status",
      ]) ||
      !Object.values(resident).every((field) => typeof field === "string") ||
      !RESIDENT_IDS.has(String(resident.residentId)) ||
      !PLACE_IDS.has(String(resident.placeId)) ||
      !statuses.has(String(resident.status))
    )
      throw new Error("Invalid public resident");
    if (residentIds.has(String(resident.residentId)))
      throw new Error("Duplicate public resident");
    const expected =
      RESIDENTS[String(resident.residentId) as keyof typeof RESIDENTS];
    if (
      !expected ||
      [resident.name, resident.role, resident.placeId].some(
        (field, index) => field !== expected[index],
      )
    )
      throw new Error("Invalid public resident identity fields");
    residentIds.add(String(resident.residentId));
  }
  return value as unknown as WorldProjection;
}

function nullableNumber(value: unknown): boolean {
  return (
    value === null || (typeof value === "number" && Number.isFinite(value))
  );
}

function parseSystems(
  value: unknown,
  expectedReleaseDelayHours: number,
): SystemsProjection {
  if (
    !isObject(value) ||
    !exactKeys(value, [
      "schema",
      "generatedAt",
      "sourceObservedAt",
      "releaseDelayHours",
      "state",
      "residents",
      "intelligence",
    ])
  )
    throw new Error("Invalid Systems projection fields");
  if (
    value.schema !== "wdw.systems.v1" ||
    !validDate(value.generatedAt) ||
    !validDate(value.sourceObservedAt) ||
    value.releaseDelayHours !== expectedReleaseDelayHours ||
    !["known", "unknown"].includes(String(value.state)) ||
    !isObject(value.residents) ||
    !isObject(value.intelligence)
  )
    throw new Error("Invalid Systems projection");
  if (
    !exactKeys(value.residents, ["total", "active", "needsAttention"]) ||
    !Object.values(value.residents).every(
      (field) => Number.isInteger(field) && (field as number) >= 0,
    )
  )
    throw new Error("Invalid resident aggregates");
  if (
    !exactKeys(value.intelligence, [
      "thoughts",
      "candidates",
      "reviewed",
      "meanSimilarity",
      "precisionAtK",
      "precisionAtKState",
    ]) ||
    !["available", "insufficient-evidence", "unknown"].includes(
      String(value.intelligence.precisionAtKState),
    )
  )
    throw new Error("Invalid intelligence aggregate");
  for (const key of ["thoughts", "candidates", "reviewed"]) {
    const metric = value.intelligence[key];
    if (
      metric !== null &&
      (!Number.isInteger(metric) || (metric as number) < 0)
    )
      throw new Error("Invalid intelligence count");
  }
  for (const key of ["meanSimilarity", "precisionAtK"])
    if (!nullableNumber(value.intelligence[key]))
      throw new Error("Invalid intelligence metric");
  if (
    (value.residents.active as number) > (value.residents.total as number) ||
    (value.residents.needsAttention as number) >
      (value.residents.total as number)
  )
    throw new Error("Invalid resident aggregate relationship");
  return value as unknown as SystemsProjection;
}

function validateBundle(
  manifest: PublicReleaseManifest,
  world: WorldProjection,
  systems: SystemsProjection,
  now: Date,
  expectedReleaseDelayHours: number,
): void {
  const generatedAt = Date.parse(systems.generatedAt);
  const observedAt = Date.parse(systems.sourceObservedAt);
  const releasedAt = Date.parse(manifest.releasedAt);
  if (
    systems.releaseDelayHours !== manifest.releaseDelayHours ||
    systems.generatedAt !== world.generatedAt ||
    systems.sourceObservedAt !== manifest.sourceObservedAt ||
    observedAt > generatedAt ||
    releasedAt > now.getTime() ||
    releasedAt < generatedAt + expectedReleaseDelayHours * 3_600_000 ||
    systems.residents.total !== world.residents.length ||
    systems.residents.active !==
      world.residents.filter((resident) => resident.status === "active")
        .length ||
    systems.residents.needsAttention !==
      world.residents.filter(
        (resident) => resident.status === "needs-attention",
      ).length
  )
    throw new Error("Public release metadata does not match");
}

async function sha256(
  payload: Uint8Array,
  cryptoImpl: CryptoLike,
): Promise<string> {
  const source = payload.buffer.slice(
    payload.byteOffset,
    payload.byteOffset + payload.byteLength,
  ) as ArrayBuffer;
  const digest = await cryptoImpl.subtle.digest("SHA-256", source);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyArtifact(
  value: unknown,
  raw: Uint8Array,
  expected: Integrity,
  cryptoImpl: CryptoLike,
): Promise<void> {
  if (
    raw.byteLength !== expected.bytes ||
    (await sha256(raw, cryptoImpl)) !== expected.sha256
  )
    throw new Error("Public artifact integrity check failed");
  if (value === undefined) throw new Error("Public artifact is not valid JSON");
}

function classify(
  manifest: PublicReleaseManifest,
  world: WorldProjection,
  systems: SystemsProjection,
  now: Date,
  source: "network" | "last-known-good",
): "fresh" | "stale" | "partial" {
  if (
    source === "last-known-good" ||
    now.getTime() - Date.parse(manifest.releasedAt) >
      PUBLIC_PROJECTION_STALE_AFTER_HOURS * 3_600_000
  )
    return "stale";
  if (world.status === "partial" || systems.state !== "known") return "partial";
  return "fresh";
}

function decode(raw: Uint8Array): unknown {
  return JSON.parse(new TextDecoder().decode(raw));
}

async function validateStored(
  stored: StoredRelease,
  cryptoImpl: CryptoLike,
  now: Date,
  expectedReleaseDelayHours: number,
): Promise<{
  manifest: PublicReleaseManifest;
  world: WorldProjection;
  systems: SystemsProjection;
}> {
  const manifest = parseManifest(stored.manifest, expectedReleaseDelayHours);
  if (
    typeof stored.worldRaw !== "string" ||
    typeof stored.systemsRaw !== "string"
  )
    throw new Error("Invalid cached public release");
  const rawWorld = new TextEncoder().encode(stored.worldRaw);
  const rawSystems = new TextEncoder().encode(stored.systemsRaw);
  const worldValue = decode(rawWorld);
  const systemsValue = decode(rawSystems);
  await verifyArtifact(
    worldValue,
    rawWorld,
    manifest.artifacts["world.v1.json"],
    cryptoImpl,
  );
  await verifyArtifact(
    systemsValue,
    rawSystems,
    manifest.artifacts["systems.v1.json"],
    cryptoImpl,
  );
  const world = parseWorld(worldValue);
  const systems = parseSystems(systemsValue, expectedReleaseDelayHours);
  validateBundle(manifest, world, systems, now, expectedReleaseDelayHours);
  return { manifest, world, systems };
}

export async function loadPublicProjection(options: {
  manifestUrl: string;
  fetchImpl?: FetchLike;
  storage?: StorageLike | null;
  cryptoImpl?: CryptoLike;
  now?: Date;
  expectedReleaseDelayHours?: number;
}): Promise<PublicProjectionResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const storage =
    options.storage === undefined
      ? typeof localStorage === "undefined"
        ? null
        : localStorage
      : options.storage;
  const cryptoImpl = options.cryptoImpl ?? globalThis.crypto;
  const now = options.now ?? new Date();
  const expectedReleaseDelayHours =
    options.expectedReleaseDelayHours ?? PRODUCTION_RELEASE_DELAY_HOURS;
  try {
    if (
      !Number.isFinite(expectedReleaseDelayHours) ||
      expectedReleaseDelayHours <= 0
    )
      throw new Error("Invalid expected public release delay");
    const fallbackBase =
      typeof location === "undefined" ? "http://localhost/" : location.href;
    const manifestUrl = new URL(options.manifestUrl, fallbackBase);
    const manifestResponse = await fetchImpl(manifestUrl, {
      cache: "no-store",
      credentials: "omit",
    });
    if (!manifestResponse.ok)
      throw new Error(`Manifest request failed (${manifestResponse.status})`);
    const manifest = parseManifest(
      await manifestResponse.json(),
      expectedReleaseDelayHours,
    );
    const values: Partial<
      Record<ReleaseFile, { value: unknown; raw: Uint8Array }>
    > = {};
    await Promise.all(
      RELEASE_FILES.map(async (file) => {
        const response = await fetchImpl(
          new URL(manifest.artifacts[file].path, manifestUrl),
          { cache: "no-store", credentials: "omit" },
        );
        if (!response.ok)
          throw new Error(`${file} request failed (${response.status})`);
        const raw = new Uint8Array(await response.arrayBuffer());
        let value: unknown;
        try {
          value = decode(raw);
        } catch {
          throw new Error(`${file} is not valid JSON`);
        }
        await verifyArtifact(value, raw, manifest.artifacts[file], cryptoImpl);
        values[file] = { value, raw };
      }),
    );
    const world = parseWorld(values["world.v1.json"]!.value);
    const systems = parseSystems(
      values["systems.v1.json"]!.value,
      expectedReleaseDelayHours,
    );
    validateBundle(manifest, world, systems, now, expectedReleaseDelayHours);
    try {
      storage?.setItem(
        STORAGE_KEY,
        JSON.stringify({
          manifest,
          worldRaw: new TextDecoder().decode(values["world.v1.json"]!.raw),
          systemsRaw: new TextDecoder().decode(values["systems.v1.json"]!.raw),
        }),
      );
    } catch {
      /* Persistence is best-effort; a valid network release remains usable. */
    }
    return {
      availability: "available",
      freshness: classify(manifest, world, systems, now, "network"),
      source: "network",
      manifest,
      world,
      systems,
    };
  } catch (error) {
    try {
      const raw = storage?.getItem(STORAGE_KEY);
      if (raw) {
        const cached = await validateStored(
          JSON.parse(raw) as StoredRelease,
          cryptoImpl,
          now,
          expectedReleaseDelayHours,
        );
        return {
          availability: "available",
          freshness: "stale",
          source: "last-known-good",
          ...cached,
        };
      }
    } catch {
      /* An invalid cache is equivalent to no cache. */
    }
    return {
      availability: "unavailable",
      reason:
        error instanceof Error
          ? error.message
          : "Public projection unavailable",
    };
  }
}
