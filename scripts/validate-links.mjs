import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const distDir = new URL("../dist/", import.meta.url).pathname;

if (!existsSync(distDir)) {
  console.error("dist/ does not exist. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (extname(path) === ".html") {
      htmlFiles.push(path);
    }
  }
}

function routeExists(href) {
  const clean = href.replace(/[#?].*$/, "");
  if (!clean || clean.startsWith("#")) return true;
  if (!clean.startsWith("/")) return true;
  if (clean.includes("/haleyparks329.github.io/")) return false;
  if (extname(clean)) return existsSync(join(distDir, clean));
  const target = clean.endsWith("/")
    ? `${clean}index.html`
    : `${clean}/index.html`;
  const direct = clean.endsWith(".html") ? clean : target;
  return existsSync(join(distDir, direct));
}

walk(distDir);

const failures = [];
const hrefPattern = /href="([^"]+)"/g;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      continue;
    }
    if (!routeExists(href)) {
      failures.push(`${relative(distDir, file)} -> ${href}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Broken internal links found:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Checked ${htmlFiles.length} HTML files. Internal links look good.`,
);
