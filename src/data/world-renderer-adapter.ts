import type { AgentState } from "../vendor/world-view/iso/types";
import {
  resolveRendererPlacement,
  type RendererRoomKey,
} from "../vendor/world-view/world/placement.ts";
import type { WorldProjection, WorldResident } from "./world-view";

export type WorldRoomKey = RendererRoomKey;

export type RendererCommand = {
  agentId: string;
  state: AgentState;
};

const KNOWN_TINTS: Readonly<Record<string, number>> = {
  bridget: 0xe88ec2,
  banjo: 0x60a5fa,
  coach: 0xfacc15,
  "mini me": 0xa78bfa,
};

const FALLBACK_TINTS = [0x7fc8a9, 0x60a5fa, 0xf59e0b, 0xa78bfa, 0xf472b6];

function tintForResident(resident: WorldResident): number {
  const known = KNOWN_TINTS[resident.name.toLowerCase()];
  if (known !== undefined) return known;

  const hash = [...resident.residentId].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return FALLBACK_TINTS[hash % FALLBACK_TINTS.length]!;
}

export function countResidentsByRoom(
  projection: WorldProjection | null,
  roomKeys: ReadonlyArray<WorldRoomKey>,
): Record<WorldRoomKey, number> {
  const counts = Object.fromEntries(roomKeys.map((key) => [key, 0])) as Record<
    WorldRoomKey,
    number
  >;

  for (const resident of projection?.residents ?? []) {
    if (Object.hasOwn(counts, resident.placeId)) {
      counts[resident.placeId as WorldRoomKey] += 1;
    }
  }

  return counts;
}

export function createRendererCommands(
  projection: WorldProjection | null,
  room: WorldRoomKey,
): RendererCommand[] {
  if (!projection) return [];

  return projection.residents
    .filter((resident) => resident.placeId === room)
    .map((resident, index) => {
      const placement = resolveRendererPlacement(
        room,
        resident.status === "active" ? "working" : "idle",
        index,
      );
      return {
        agentId: `public:${resident.residentId}`,
        state: {
          ...placement,
          label: resident.name,
          tint: tintForResident(resident),
        },
      };
    });
}
