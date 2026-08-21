import { loadPublicProjections } from "./public-projections.mjs";
import { loadPublicRelease } from "./wdw-public-release.ts";

export const WORLD_VIEW_PATH = "/world/";

export type WorldPlace = {
  placeId: string;
  name: string;
  kind: string;
  status: string;
  href: string;
};

export type WorldResident = {
  residentId: string;
  name: string;
  role: string;
  placeId: string;
  status: string;
};

export type WorldActivity = {
  activityId: string;
  kind: string;
  summary: string;
  occurredAt: string;
  placeId: string;
};

export type WorldAttention = {
  attentionId: string;
  summary: string;
  severity: "info" | "warning" | "critical";
  placeId: string;
};

export type WorldProjection = {
  schemaVersion: string;
  projectionId: string;
  generatedAt: string;
  status: "current" | "partial" | "stale";
  places: WorldPlace[];
  residents: WorldResident[];
  activities: WorldActivity[];
  attention: WorldAttention[];
};

type AvailableWorldView = {
  state: "fresh" | "partial" | "stale";
  projection: WorldProjection;
};

type UnavailableWorldView = {
  state: "unavailable";
  reason: string;
};

export type WorldViewState = AvailableWorldView | UnavailableWorldView;

export function toWorldViewState(
  projection: WorldProjection,
): AvailableWorldView {
  return {
    state: projection.status === "current" ? "fresh" : projection.status,
    projection,
  };
}

export async function loadWorldView(
  root = process.cwd(),
): Promise<WorldViewState> {
  try {
    const release = await loadPublicRelease(root);
    return toWorldViewState(release.artifacts.world as WorldProjection);
  } catch {
    // Keep reading the previous publication layout during the producer rollout.
  }
  try {
    const published = (await loadPublicProjections(root)) as unknown as {
      artifacts: { world: WorldProjection };
    };
    return toWorldViewState(published.artifacts.world);
  } catch {
    return {
      state: "unavailable",
      reason: "The reviewed public projection could not be verified.",
    };
  }
}
