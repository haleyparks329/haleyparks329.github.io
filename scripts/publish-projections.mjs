import path from "node:path";
import { publishRelease, stageRelease } from "./lib/projection-pipeline.mjs";

const root = process.cwd();
const approved = process.argv.includes("--approve");
const automated = process.argv.includes("--automated");
const sourceArgument = process.argv.find((argument) =>
  argument.startsWith("--source="),
);
const sourcePath = sourceArgument
  ? path.resolve(root, sourceArgument.slice("--source=".length))
  : path.join(root, "projection-sources", "public-state.v1.json");
const staged = await stageRelease({ root, sourcePath });
const result = await publishRelease({
  root,
  releaseDirectory: staged.releaseDirectory,
  approved,
  automated,
});
console.log(
  JSON.stringify({
    releaseId: result.manifest.releaseId,
    status: result.receipt.status,
  }),
);
