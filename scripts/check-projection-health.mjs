import { validatePublished } from "./lib/projection-pipeline.mjs";

const { artifacts, manifest } = await validatePublished(process.cwd());
const failures = [];
const expectedCanonical = "https://haleyparks329.github.io";

if (artifacts.site.identity.canonicalUrl !== expectedCanonical) {
  failures.push(`canonical URL must be ${expectedCanonical}`);
}

const paths = new Set();
for (const project of artifacts.projects.projects) {
  if (
    !project.canonicalUrl.startsWith("/projects/") ||
    paths.has(project.canonicalUrl)
  ) {
    failures.push(`invalid or duplicate project URL: ${project.canonicalUrl}`);
  }
  paths.add(project.canonicalUrl);
}

const ageDays =
  (Date.now() - Date.parse(artifacts.site.freshness.sourceUpdatedAt)) /
  86_400_000;
if (artifacts.site.freshness.status === "current" && ageDays > 90) {
  failures.push(
    `projection is marked current but is ${Math.floor(ageDays)} days old`,
  );
}
if (
  ["stale", "partial"].includes(artifacts.world.status) &&
  artifacts.world.attention.length === 0
) {
  failures.push(
    `${artifacts.world.status} world projection must explain itself in attention`,
  );
}

if (failures.length) {
  throw new Error(`Projection health failed:\n- ${failures.join("\n- ")}`);
}
console.log(`Projection health valid: ${manifest.releaseId}`);
