import path from "node:path";
import { loadRelease, validatePublished } from "./lib/projection-pipeline.mjs";

const root = process.cwd();
const directoryArgument = process.argv.find((argument) =>
  argument.startsWith("--dir="),
);
if (directoryArgument) {
  const directory = path.resolve(
    root,
    directoryArgument.slice("--dir=".length),
  );
  await loadRelease(directory);
  console.log(`Projection release valid: ${directory}`);
} else {
  const { manifest } = await validatePublished(root);
  console.log(`Published projections valid: ${manifest.releaseId}`);
}
