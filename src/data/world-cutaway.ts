import type { WorldProjection } from "./world-view.ts";

export type CutawayPose = "busy" | "resting" | "away";
export type CutawayTone = "bridget" | "mini-me" | "coach" | "banjo" | "other";
export type CutawayArea = "workshop" | "lab" | "outside";

export type CutawayResident = {
  key: string;
  name: string;
  role: string;
  status: string;
  statusLabel: string;
  pose: CutawayPose;
  tone: CutawayTone;
  area: CutawayArea;
  areaName: string;
  /** Horizontal position in percent of the scene width. */
  left: number;
};

export type CutawayScene = {
  roomNames: Record<CutawayArea, string>;
  residents: CutawayResident[];
};

const BUSY = new Set(["active", "working", "thinking"]);
const AWAY = new Set(["unavailable", "offline"]);
const TONES = new Set<CutawayTone>(["bridget", "mini-me", "coach", "banjo"]);

// Scene geometry in percent of the scene width. The house holds the
// workshop and the lab; everything else stands outside.
const AREAS: Record<CutawayArea, { x: number; w: number; busyFrom: number }> = {
  workshop: { x: 4, w: 30.5, busyFrom: 0.42 },
  lab: { x: 34.5, w: 30.5, busyFrom: 0.42 },
  outside: { x: 68, w: 10, busyFrom: 0.1 },
};

export function poseFor(status: string): CutawayPose {
  if (BUSY.has(status)) return "busy";
  if (AWAY.has(status)) return "away";
  return "resting";
}

export function residentKey(residentId: string): string {
  return residentId.replace(/^resident-/, "");
}

function toneFor(key: string): CutawayTone {
  return TONES.has(key as CutawayTone) ? (key as CutawayTone) : "other";
}

function areaFor(placeId: string): CutawayArea {
  return placeId === "workshop" || placeId === "lab" ? placeId : "outside";
}

export function cutawayScene(projection: WorldProjection | null): CutawayScene {
  const roomNames: Record<CutawayArea, string> = {
    workshop: "Workshop",
    lab: "Lab",
    outside: "Outside",
  };
  if (!projection) return { roomNames, residents: [] };

  for (const place of projection.places) {
    const area = areaFor(place.placeId);
    if (place.placeId === area) roomNames[area] = place.name;
  }

  const order: Record<CutawayPose, number> = { busy: 0, resting: 1, away: 2 };
  const placed = projection.residents
    .map((resident) => {
      const key = residentKey(resident.residentId);
      const area = areaFor(resident.placeId);
      return {
        key,
        name: resident.name,
        role: resident.role,
        status: resident.status,
        statusLabel: resident.status.replace(/[_-]+/g, " "),
        pose: poseFor(resident.status),
        tone: toneFor(key),
        area,
        areaName: roomNames[area],
        left: 0,
      };
    })
    .sort((a, b) => order[a.pose] - order[b.pose]);

  // Busy residents stand by the desk or bench; resting and away residents
  // stay near the left wall of their room.
  const used: Record<string, number> = {};
  for (const resident of placed) {
    const area = AREAS[resident.area];
    const group = `${resident.area}:${resident.pose === "busy" ? "busy" : "edge"}`;
    const index = used[group] ?? 0;
    used[group] = index + 1;
    const start = resident.pose === "busy" ? area.busyFrom : 0.08;
    const step = resident.area === "outside" ? 0.45 : 0.16;
    const fraction = Math.min(start + step * index, 0.86);
    resident.left = Math.round((area.x + area.w * fraction) * 10) / 10;
  }

  return { roomNames, residents: placed };
}
