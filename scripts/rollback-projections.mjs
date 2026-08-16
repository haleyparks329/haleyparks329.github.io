import { rollbackRelease } from "./lib/projection-pipeline.mjs";

const root = process.cwd();
const target = process.argv.find((argument) =>
  argument.startsWith("--release="),
);
const result = await rollbackRelease({
  root,
  targetReleaseId: target?.slice("--release=".length),
  approved: process.argv.includes("--approve"),
});
console.log(
  JSON.stringify({
    releaseId: result.manifest.releaseId,
    status: result.receipt.status,
  }),
);
