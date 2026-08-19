import type { WorldProjection } from "../data/world-view";
import {
  countResidentsByRoom,
  createRendererCommands,
  type WorldRoomKey,
} from "../data/world-renderer-adapter";
import { loadPublicProjection } from "./wdw-public-runtime";
import { GameWorld } from "../vendor/world-view/iso";
import { WDW_ROOM_REGISTRY } from "../vendor/world-view/world/rooms";

export function loadWorldView(): void {
  const shell = document.querySelector<HTMLElement>("[data-world-shell]");

  if (shell) {
    const worldShell = shell;
    const stage = shell.querySelector<HTMLElement>("[data-world-stage]");
    const loading = shell.querySelector<HTMLElement>("[data-world-loading]");
    const failure = shell.querySelector<HTMLElement>("[data-world-failure]");
    const retry = shell.querySelector<HTMLButtonElement>("[data-world-retry]");
    const roomStatus = shell.querySelector<HTMLElement>("[data-room-status]");
    const publicStatus = shell.querySelector<HTMLElement>(
      "[data-world-public-status]",
    );
    const publicLabel = shell.querySelector<HTMLElement>(
      "[data-world-public-label]",
    );
    const publicDetail = shell.querySelector<HTMLElement>(
      "[data-world-public-detail]",
    );
    const roomButtons = [
      ...shell.querySelectorAll<HTMLButtonElement>("[data-room]"),
    ];
    const zoomOut = shell.querySelector<HTMLButtonElement>(
      "[data-world-zoom-out]",
    );
    const zoomSlider = shell.querySelector<HTMLInputElement>(
      "[data-world-zoom-slider]",
    );
    const zoomIn = shell.querySelector<HTMLButtonElement>(
      "[data-world-zoom-in]",
    );
    const zoomFit = shell.querySelector<HTMLButtonElement>(
      "[data-world-zoom-fit]",
    );
    const zoomValue = shell.querySelector<HTMLOutputElement>(
      "[data-world-zoom-value]",
    );
    const cameraControls = [zoomOut, zoomSlider, zoomIn, zoomFit];

    let activeRoom = (shell.dataset.initialRoom ?? "workshop") as WorldRoomKey;
    let world: GameWorld | null = null;
    let projection: WorldProjection | null = null;
    let destroyed = false;

    function updateProjectionStatus(
      state: "fresh" | "partial" | "stale" | "unavailable",
      detail: string,
    ): void {
      publicStatus?.classList.remove(
        "world-status--loading",
        "world-status--fresh",
        "world-status--partial",
        "world-status--stale",
        "world-status--unavailable",
      );
      publicStatus?.classList.add(`world-status--${state}`);
      if (publicLabel) publicLabel.textContent = `Public state · ${state}`;
      if (publicDetail) publicDetail.textContent = detail;
    }

    function updateRoomCounts(): void {
      const keys = WDW_ROOM_REGISTRY.map((room) => room.key).filter(
        (key): key is WorldRoomKey => key === "workshop" || key === "lab",
      );
      const counts = countResidentsByRoom(projection, keys);
      for (const button of roomButtons) {
        const room = button.dataset.room as WorldRoomKey;
        const count = button.querySelector<HTMLElement>("[data-room-count]");
        if (count) {
          count.textContent = ` (${counts[room] ?? 0})`;
          count.hidden = false;
        }
      }
    }

    function setControlsDisabled(isDisabled: boolean): void {
      for (const control of cameraControls) {
        if (control) control.disabled = isDisabled;
      }
    }

    function syncZoom(): void {
      if (!world) return;
      const zoom = world.getZoom();
      if (zoomSlider) zoomSlider.value = String(zoom);
      if (zoomValue) zoomValue.value = `${zoom.toFixed(2)}×`;
    }

    function setPending(isPending: boolean): void {
      loading?.toggleAttribute("hidden", !isPending);
      failure?.setAttribute("hidden", "");
      setControlsDisabled(isPending);
    }

    function markRoom(room: WorldRoomKey): void {
      for (const button of roomButtons) {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.room === room),
        );
      }
      const label = roomButtons.find((button) => button.dataset.room === room)
        ?.dataset.roomLabel;
      if (roomStatus) roomStatus.textContent = `${label ?? room} room selected`;
    }

    async function showRoom(room: WorldRoomKey): Promise<void> {
      if (!world) return;
      activeRoom = room;
      world.setRoom(room);
      for (const command of createRendererCommands(projection, room)) {
        world.updateAgentState(command.agentId, command.state);
      }
      markRoom(room);
      syncZoom();
    }

    async function start(): Promise<void> {
      if (!stage || destroyed) return;
      setPending(true);

      try {
        const manifestUrl = worldShell.dataset.manifestUrl;
        if (!manifestUrl)
          throw new Error("No public release manifest was configured");
        const release = await loadPublicProjection({ manifestUrl });
        if (release.availability === "unavailable") {
          projection = null;
          updateProjectionStatus(
            "unavailable",
            "No verified public release is available.",
          );
        } else {
          projection = release.world;
          updateProjectionStatus(
            release.freshness,
            release.source === "last-known-good"
              ? "Showing the last locally verified release."
              : "Showing a verified, sanitized release delayed by 24 hours.",
          );
        }
        updateRoomCounts();
        world?.destroy();
        world = null;
        stage.replaceChildren();
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
        setControlsDisabled(false);
        syncZoom();
      } catch (error) {
        console.error("World renderer failed to start", error);
        loading?.setAttribute("hidden", "");
        failure?.removeAttribute("hidden");
        setControlsDisabled(true);
      }
    }

    for (const button of roomButtons) {
      button.addEventListener("click", (): void => {
        void showRoom(button.dataset.room as WorldRoomKey);
      });
    }
    zoomOut?.addEventListener("click", (): void => {
      world?.zoomOut();
      syncZoom();
    });
    zoomSlider?.addEventListener("input", (): void => {
      world?.setZoom(Number(zoomSlider.value));
      syncZoom();
    });
    zoomIn?.addEventListener("click", (): void => {
      world?.zoomIn();
      syncZoom();
    });
    zoomFit?.addEventListener("click", (): void => {
      world?.resetZoom();
      syncZoom();
    });
    retry?.addEventListener("click", (): void => void start());
    window.addEventListener(
      "pagehide",
      (): void => {
        destroyed = true;
        world?.destroy();
        world = null;
      },
      { once: true },
    );

    void start();
  }
}
