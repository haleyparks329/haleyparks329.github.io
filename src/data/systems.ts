import { readFile } from "node:fs/promises";
import { loadPublicRelease } from "./wdw-public-release.ts";

export const SYSTEMS_SCHEMA = "wdw.systems.v1";
export const SYSTEMS_STALE_AFTER_HOURS = 72;

type NullableNumber = number | null;

export type SystemsProjection = {
  schema: string;
  generatedAt: string;
  sourceObservedAt: string;
  releaseDelayHours: number;
  state: string;
  residents: {
    total: number;
    active: number;
    needsAttention: number;
  };
  intelligence: {
    thoughts: NullableNumber;
    candidates: NullableNumber;
    reviewed: NullableNumber;
    meanSimilarity: NullableNumber;
    precisionAtK: NullableNumber;
    precisionAtKState: string;
  };
};

export type SystemsView =
  | { availability: "available"; projection: SystemsProjection; stale: boolean }
  | { availability: "unavailable"; reason: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNullableNumber = (value: unknown): value is NullableNumber =>
  value === null || (typeof value === "number" && Number.isFinite(value));

function parseProjection(value: unknown): SystemsProjection | null {
  if (
    !isRecord(value) ||
    !isRecord(value.residents) ||
    !isRecord(value.intelligence)
  ) {
    return null;
  }

  const { residents, intelligence } = value;
  if (
    value.schema !== SYSTEMS_SCHEMA ||
    typeof value.generatedAt !== "string" ||
    typeof value.sourceObservedAt !== "string" ||
    typeof value.releaseDelayHours !== "number" ||
    typeof value.state !== "string" ||
    typeof residents.total !== "number" ||
    typeof residents.active !== "number" ||
    typeof residents.needsAttention !== "number" ||
    !isNullableNumber(intelligence.thoughts) ||
    !isNullableNumber(intelligence.candidates) ||
    !isNullableNumber(intelligence.reviewed) ||
    !isNullableNumber(intelligence.meanSimilarity) ||
    !isNullableNumber(intelligence.precisionAtK) ||
    typeof intelligence.precisionAtKState !== "string"
  ) {
    return null;
  }

  return {
    schema: value.schema,
    generatedAt: value.generatedAt,
    sourceObservedAt: value.sourceObservedAt,
    releaseDelayHours: value.releaseDelayHours,
    state: value.state,
    residents: {
      total: residents.total,
      active: residents.active,
      needsAttention: residents.needsAttention,
    },
    intelligence: {
      thoughts: intelligence.thoughts,
      candidates: intelligence.candidates,
      reviewed: intelligence.reviewed,
      meanSimilarity: intelligence.meanSimilarity,
      precisionAtK: intelligence.precisionAtK,
      precisionAtKState: intelligence.precisionAtKState,
    },
  };
}

export async function loadSystemsView(
  options: {
    filePath?: string;
    source?: unknown;
    now?: Date;
    root?: string;
  } = {},
): Promise<SystemsView> {
  try {
    let source = options.source;
    if (source === undefined && options.filePath) {
      source = JSON.parse(await readFile(options.filePath, "utf8"));
    }
    if (source === undefined) {
      source = (await loadPublicRelease(options.root, options.now)).artifacts
        .systems;
    }
    if (source === null) {
      return {
        availability: "unavailable",
        reason: "No verified public snapshot is available right now.",
      };
    }
    const projection = parseProjection(source);
    if (!projection) {
      return {
        availability: "unavailable",
        reason: "The public snapshot is invalid.",
      };
    }

    const generatedAt = Date.parse(projection.generatedAt);
    if (!Number.isFinite(generatedAt)) {
      return {
        availability: "unavailable",
        reason: "The public snapshot timestamp is invalid.",
      };
    }

    const ageHours =
      ((options.now ?? new Date()).getTime() - generatedAt) / 3_600_000;
    return {
      availability: "available",
      projection,
      stale: ageHours > SYSTEMS_STALE_AFTER_HOURS,
    };
  } catch {
    return {
      availability: "unavailable",
      reason: "No verified public snapshot is available right now.",
    };
  }
}
