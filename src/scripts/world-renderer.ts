import type { WorldProjection } from "../data/world-view";
import type { WorldRoomKey } from "../data/world-renderer-adapter";

const shell = document.querySelector<HTMLElement>("[data-world-shell]");

if (shell) {
  const stage = shell.querySelector<HTMLElement>("[data-world-stage]");
  const loading = shell.querySelector<HTMLElement>("[data-world-loading]");
  const failure = shell.querySelector<HTMLElement>("[data-world-failure]");
  const retry = shell.querySelector<HTMLButtonElement>("[data-world-retry]");
  const roomStatus = shell.querySelector<HTMLElement>("[data-room-status]");
  const roomButtons = [
    ...shell.querySelectorAll<HTMLButtonElement>("[data-room]"),
  ];

  let activeRoom = (shell.dataset.initialRoom ?? "outside") as WorldRoomKey;
  let world: import("../vendor/world-view/iso").GameWorld | null = null;
  let destroyed = false;

  const projection = (() => {
    const raw = shell.dataset.projection;
    if (!raw) return null;
    try {
      return JSON.parse(raw) as WorldProjection;
    } catch {
      return null;
    }
  })();

  function setPending(isPending: boolean) {
    loading?.toggleAttribute("hidden", !isPending);
    failure?.setAttribute("hidden", "");
  }

  function markRoom(room: WorldRoomKey) {
    for (const button of roomButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.room === room));
    }
    const label = roomButtons.find((button) => button.dataset.room === room)
      ?.dataset.roomLabel;
    if (roomStatus) roomStatus.textContent = `${label ?? room} room selected`;
  }

  async function showRoom(room: WorldRoomKey) {
    if (!world) return;
    const { createRendererCommands } =
      await import("../data/world-renderer-adapter");
    activeRoom = room;
    world.setRoom(room);
    for (const command of createRendererCommands(projection, room)) {
      world.updateAgentState(command.agentId, command.state);
    }
    markRoom(room);
  }

  async function start() {
    if (!stage || destroyed) return;
    setPending(true);

    try {
      world?.destroy();
      stage.replaceChildren();
      const [{ GameWorld }, { WDW_ROOM_REGISTRY }] = await Promise.all([
        import("../vendor/world-view/iso"),
        import("../vendor/world-view/world/rooms"),
      ]);
      const nextWorld = new GameWorld({
        fillMode: "contain",
        initialRoomKey: activeRoom,
        roomRegistry: WDW_ROOM_REGISTRY,
      });
      await nextWorld.init(stage);
      if (destroyed) {
        nextWorld.destroy();
        return;
      }
      world = nextWorld;
      await showRoom(activeRoom);
      loading?.setAttribute("hidden", "");
    } catch (error) {
      console.error("World renderer failed to start", error);
      loading?.setAttribute("hidden", "");
      failure?.removeAttribute("hidden");
    }
  }

  for (const button of roomButtons) {
    button.addEventListener("click", () => {
      void showRoom(button.dataset.room as WorldRoomKey);
    });
  }
  retry?.addEventListener("click", () => void start());
  window.addEventListener(
    "pagehide",
    () => {
      destroyed = true;
      world?.destroy();
      world = null;
    },
    { once: true },
  );

  void start();
}
