import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { projectWorkspaces } from "../src/data/project-workspaces.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(root, "dist");
const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function routeExists(href) {
  const pathname = href.split(/[?#]/, 1)[0];
  if (pathname === "/") return existsSync(path.join(distRoot, "index.html"));
  const clean = pathname.replace(/^\//, "").replace(/\/$/, "");
  return (
    existsSync(path.join(distRoot, clean, "index.html")) ||
    existsSync(path.join(distRoot, clean)) ||
    existsSync(path.join(distRoot, `${clean}.html`))
  );
}

if (!existsSync(distRoot)) fail("dist/ is missing; run the site build first");

const textExtensions = new Set([
  ".astro",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".ts",
  ".xml",
]);
const currentSurfaceRoots = [
  path.join(root, "src"),
  path.join(root, "projection-sources"),
  path.join(root, "public", "projections"),
  distRoot,
];

for (const file of currentSurfaceRoots.flatMap(walk)) {
  if (!textExtensions.has(path.extname(file))) continue;
  const contents = readFileSync(file, "utf8");
  if (/\/field-log\/?|nav-field-log|["'>]Field Log["'<]/i.test(contents)) {
    fail(`retired Field Log reference in ${path.relative(root, file)}`);
  }
}

const headerPath = path.join(
  root,
  "src",
  "components",
  "redesign",
  "EditorialHeader.astro",
);
const header = readFileSync(headerPath, "utf8");
const headerItems = [
  ...header.matchAll(/\{ href: "([^"]+)", label: "([^"]+)" \}/g),
].map(([, href, label]) => ({ href, label }));
const expectedHeaderItems = [
  { href: "/projects/", label: "Projects" },
  { href: "/systems/", label: "Systems" },
  { href: "/writing/", label: "Writing" },
  { href: "/memories/", label: "Memories" },
  { href: "/explore/", label: "Explore" },
];
if (JSON.stringify(headerItems) !== JSON.stringify(expectedHeaderItems)) {
  fail("primary header links or order differ from the canonical navigation");
}
if (
  !/const regularHref = resolveHref\("\/"\);/.test(header) ||
  !/<a\s+class="maria-brand"\s+href=\{regularHref\}/.test(header)
) {
  fail("Haley Parks brand does not link to Home");
}
const siteConfig = readFileSync(
  path.join(root, "src", "site.config.ts"),
  "utf8",
);
if (!/name: "Haley Parks"/.test(siteConfig))
  fail("site name is not Haley Parks");
const footer = readFileSync(
  path.join(root, "src", "components", "redesign", "EditorialFooter.astro"),
  "utf8",
);
if (!/<a href="\/about\/">About<\/a>/.test(footer)) {
  fail("About is missing from secondary footer navigation");
}

for (const workspace of Object.values(projectWorkspaces)) {
  const links = [
    ...(workspace.primaryLinks ?? []),
    ...workspace.groups.flatMap(({ links }) => links),
  ];
  for (const link of links) {
    if (
      !link.external &&
      link.href.startsWith("/") &&
      !routeExists(link.href)
    ) {
      fail(
        `${workspace.slug} project navigation points to missing ${link.href}`,
      );
    }
  }
}

const manifestPath = path.join(
  root,
  "public",
  "projections",
  "manifest.v1.json",
);
if (!existsSync(manifestPath)) {
  fail("public projection manifest is missing");
} else {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const siteArtifact = manifest.artifacts?.find(({ kind }) => kind === "site");
  if (!siteArtifact) {
    fail("public projection manifest has no site artifact");
  } else {
    const artifactPath = path.join(
      root,
      "public",
      siteArtifact.path.replace(/^\/projections\//, "projections/"),
    );
    const siteState = JSON.parse(readFileSync(artifactPath, "utf8"));
    const expectedProjectionNavigation = [
      { id: "nav-home", label: "Home", href: "/" },
      { id: "nav-projects", label: "Projects", href: "/projects/" },
      { id: "nav-writing", label: "Writing", href: "/writing/" },
      { id: "nav-memories", label: "Memories", href: "/memories/" },
      { id: "nav-explore", label: "Explore", href: "/explore/" },
    ];
    if (
      JSON.stringify(siteState.navigation) !==
      JSON.stringify(expectedProjectionNavigation)
    ) {
      fail(
        "public projection navigation differs from the canonical navigation",
      );
    }
  }
}

if (failures.length) {
  console.error(`Site structure validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const workspaceCount = Object.keys(projectWorkspaces).length;
console.log(
  `Site structure valid: canonical navigation, retired routes, public projection, and ${workspaceCount} project workspaces checked.`,
);
