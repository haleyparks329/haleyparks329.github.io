import path from "node:path";
import {
  readJson,
  validateManifest,
  validatePublished,
} from "../../scripts/lib/projection-pipeline.mjs";
import {
  ContractError,
  sha256,
  validateWorld,
} from "../../scripts/lib/projection-contracts.mjs";

export async function loadPublicProjections(root = process.cwd()) {
  return validatePublished(root);
}

export async function createWorldProjectionProvider({
  fetchImpl = globalThis.fetch,
  manifestUrl = "/projections/manifest.v1.json",
} = {}) {
  try {
    const manifestResponse = await fetchImpl(manifestUrl);
    if ([401, 403].includes(manifestResponse.status))
      return { state: "unauthorized" };
    if (!manifestResponse.ok) return { state: "unavailable" };
    const manifest = validateManifest(await manifestResponse.json());
    const worldEntry = manifest.artifacts.find(({ kind }) => kind === "world");
    const worldUrl = new URL(
      worldEntry.path,
      new URL(manifestUrl, "https://projection.invalid"),
    ).pathname;
    const worldResponse = await fetchImpl(worldUrl);
    if ([401, 403].includes(worldResponse.status))
      return { state: "unauthorized" };
    if (!worldResponse.ok) return { state: "unavailable" };
    const projection = validateWorld(await worldResponse.json());
    if (sha256(projection) !== worldEntry.sha256) return { state: "invalid" };
    return { state: projection.status, projection };
  } catch (error) {
    if (error instanceof ContractError || error instanceof SyntaxError)
      return { state: "invalid" };
    return { state: "unavailable" };
  }
}

export async function loadProjectionArtifact(filePath) {
  return readJson(path.resolve(filePath));
}
