import { readFile } from "node:fs/promises";
import { glob } from "node:fs/promises";

const failures = [];
for await (const file of glob("src/**/*.{astro,md,mdx}")) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/<img\b[^>]*>/gis)) {
    if (!/\balt\s*=/.test(match[0]))
      failures.push(`${file}: image is missing alt`);
  }
  for (const match of source.matchAll(/!\[([^\]]*)\]\([^)]+\)/g)) {
    if (!match[1].trim())
      failures.push(`${file}: Markdown image has empty alt`);
  }
}

if (failures.length)
  throw new Error(`Asset validation failed:\n- ${failures.join("\n- ")}`);
console.log("Asset references and alt text valid.");
