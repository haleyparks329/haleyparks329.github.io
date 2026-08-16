import type { AgentState } from "../vendor/world-view/iso/types";
import type { WorldProjection, WorldResident } from "./world-view";

export const WORLD_ROOMS = [
  { key: "outside", label: "Outside" },
  { key: "poker", label: "Poker" },
  { key: "court", label: "Court" },
  { key: "office", label: "Office" },
  { key: "home", label: "Home" },
] as const;

export type WorldRoomKey = (typeof WORLD_ROOMS)[number]["key"];

export type RendererCommand = {
  agentId: string;
  state: AgentState;
};

const PLACE_ROOMS: Readonly<Record<string, WorldRoomKey>> = {
  "place-workbench": "office",
  "place-archive": "home",
};

const ROOM_PLACEMENTS: Readonly<Record<WorldRoomKey, AgentState>> = {
  outside: { x: 30, y: 24 },
  poker: { x: 6, y: 9 },
  court: { x: 6, y: 8 },
  office: { x: 2, y: 10 },
  home: { x: 6, y: 9 },
};

const KNOWN_TINTS: Readonly<Record<string, number>> = {
  bridget: 0xe88ec2,
  banjo: 0x60a5fa,
  coach: 0xfacc15,
  "mini me": 0xa78bfa,
};

const FALLBACK_TINTS = [0x7fc8a9, 0x60a5fa, 0xf59e0b, 0xa78bfa, 0xf472b6];

function roomForResident(resident: WorldResident): WorldRoomKey {
  return PLACE_ROOMS[resident.placeId] ?? "outside";
}

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
): Record<WorldRoomKey, number> {
  const counts = Object.fromEntries(
    WORLD_ROOMS.map(({ key }) => [key, 0]),
  ) as Record<WorldRoomKey, number>;

  for (const resident of projection?.residents ?? []) {
    counts[roomForResident(resident)] += 1;
  }

  return counts;
}

export function createRendererCommands(
  projection: WorldProjection | null,
  room: WorldRoomKey,
): RendererCommand[] {
  if (!projection) return [];

  return projection.residents
    .filter((resident) => roomForResident(resident) === room)
    .map((resident, index) => {
      const placement = ROOM_PLACEMENTS[room];
      return {
        agentId: `public:${resident.residentId}`,
        state: {
          ...placement,
          x: placement.x + (index % 3),
          y: placement.y + Math.floor(index / 3),
          action: resident.status === "active" ? "inspecting" : "idle",
          label: `${resident.name} · public`,
          tint: tintForResident(resident),
        },
      };
    });
}
