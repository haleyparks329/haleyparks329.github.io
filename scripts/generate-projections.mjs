import path from "node:path";
import { stageRelease } from "./lib/projection-pipeline.mjs";

const root = process.cwd();
const sourceArgument = process.argv.find((argument) =>
  argument.startsWith("--source="),
);
const sourcePath = sourceArgument
  ? path.resolve(root, sourceArgument.slice("--source=".length))
  : path.join(root, "projection-sources", "public-state.v1.json");
const result = await stageRelease({ root, sourcePath });
console.log(
  JSON.stringify({
    releaseId: result.releaseId,
    releaseDirectory: result.releaseDirectory,
  }),
);
