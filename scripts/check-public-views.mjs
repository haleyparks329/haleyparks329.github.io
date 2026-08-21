import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const [systemsPage, worldPage] = await Promise.all([
  readFile(path.join(root, "dist/systems/index.html"), "utf8"),
  readFile(path.join(root, "dist/world/index.html"), "utf8"),
]);

assert.match(systemsPage, /Command Center/);
assert.match(systemsPage, /Sanitized 24-hour-delayed projection/);
assert.doesNotMatch(systemsPage, /data-systems-view/);
assert.doesNotMatch(systemsPage, /Loading verified delayed projection/);

assert.match(worldPage, /data-projection=/);
assert.match(worldPage, /Bridget/);
assert.doesNotMatch(worldPage, /data-manifest-url/);

console.log("Public view build smoke check passed.");
