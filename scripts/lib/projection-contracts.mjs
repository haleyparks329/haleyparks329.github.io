import { createHash } from "node:crypto";

export const VERSION = "1.0.0";
export const ARTIFACT_FILES = {
  site: "site-state.v1.json",
  projects: "projects.v1.json",
  world: "world.v1.json",
};

const forbiddenKey =
  /(?:password|passwd|secret|token|api[_-]?key|private[_-]?(?:key|content|notes?)|credential|session|cookie|authorization|access[_-]?control|ssn)/i;
const isoDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
const stableId = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

export class ContractError extends Error {
  constructor(code, path) {
    super(`${code} at ${path}`);
    this.name = "ContractError";
    this.code = code;
    this.path = path;
  }
}

function fail(code, path) {
  throw new ContractError(code, path);
}

function object(value, path) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    fail("EXPECTED_OBJECT", path);
  return value;
}

function exact(value, keys, path) {
  object(value, path);
  const allowed = new Set(keys);
  for (const key of Object.keys(value))
    if (!allowed.has(key)) fail("UNEXPECTED_FIELD", `${path}.${key}`);
  for (const key of keys)
    if (!(key in value)) fail("MISSING_FIELD", `${path}.${key}`);
}

function string(value, path) {
  if (typeof value !== "string" || value.trim() === "")
    fail("EXPECTED_STRING", path);
}

function id(value, path) {
  string(value, path);
  if (!stableId.test(value)) fail("INVALID_STABLE_ID", path);
}

function date(value, path) {
  string(value, path);
  if (!isoDate.test(value) || Number.isNaN(Date.parse(value)))
    fail("INVALID_TIMESTAMP", path);
}

function array(value, path) {
  if (!Array.isArray(value)) fail("EXPECTED_ARRAY", path);
}

function oneOf(value, choices, path) {
  if (!choices.includes(value)) fail("INVALID_ENUM", path);
}

function href(value, path, allowAbsolute = true) {
  string(value, path);
  if (value.startsWith("/")) return;
  if (!allowAbsolute) fail("INVALID_PUBLIC_URL", path);
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") fail("INVALID_PUBLIC_URL", path);
  } catch {
    fail("INVALID_PUBLIC_URL", path);
  }
}

export function assertNoSensitiveFields(value, path = "$") {
  if (Array.isArray(value))
    return value.forEach((item, index) =>
      assertNoSensitiveFields(item, `${path}[${index}]`),
    );
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKey.test(key)) fail("PRIVATE_FIELD_BLOCKED", `${path}.${key}`);
    assertNoSensitiveFields(child, `${path}.${key}`);
  }
}

function freshness(value, path) {
  exact(value, ["status", "sourceUpdatedAt"], path);
  oneOf(value.status, ["current", "stale", "partial"], `${path}.status`);
  date(value.sourceUpdatedAt, `${path}.sourceUpdatedAt`);
}

export function validateSource(source) {
  assertNoSensitiveFields(source);
  exact(
    source,
    [
      "schemaVersion",
      "sourceId",
      "updatedAt",
      "visibility",
      "site",
      "projects",
      "world",
    ],
    "$",
  );
  if (source.schemaVersion !== VERSION)
    fail("UNSUPPORTED_VERSION", "$.schemaVersion");
  id(source.sourceId, "$.sourceId");
  date(source.updatedAt, "$.updatedAt");
  if (source.visibility !== "public")
    fail("PRIVATE_SOURCE_BLOCKED", "$.visibility");
  exact(
    source.site,
    ["siteId", "name", "description", "canonicalUrl", "featuredProjectIds"],
    "$.site",
  );
  id(source.site.siteId, "$.site.siteId");
  string(source.site.name, "$.site.name");
  string(source.site.description, "$.site.description");
  href(source.site.canonicalUrl, "$.site.canonicalUrl");
  array(source.site.featuredProjectIds, "$.site.featuredProjectIds");
  array(source.projects, "$.projects");
  if (source.projects.length === 0) fail("EMPTY_PROJECTS", "$.projects");
  const projectIds = new Set();
  source.projects.forEach((project, index) => {
    const path = `$.projects[${index}]`;
    exact(
      project,
      [
        "projectId",
        "slug",
        "title",
        "summary",
        "status",
        "statusLabel",
        "canonicalUrl",
        "updatedAt",
        "visibility",
      ],
      path,
    );
    id(project.projectId, `${path}.projectId`);
    id(project.slug, `${path}.slug`);
    ["title", "summary", "statusLabel"].forEach((key) =>
      string(project[key], `${path}.${key}`),
    );
    oneOf(
      project.status,
      ["active", "experimental", "paused", "archived"],
      `${path}.status`,
    );
    href(project.canonicalUrl, `${path}.canonicalUrl`, false);
    date(project.updatedAt, `${path}.updatedAt`);
    if (project.visibility !== "public")
      fail("PRIVATE_RECORD_BLOCKED", `${path}.visibility`);
    if (projectIds.has(project.projectId))
      fail("DUPLICATE_ID", `${path}.projectId`);
    projectIds.add(project.projectId);
  });
  for (const projectId of source.site.featuredProjectIds)
    if (!projectIds.has(projectId))
      fail("BROKEN_REFERENCE", "$.site.featuredProjectIds");
  validateWorld({
    schemaVersion: VERSION,
    generatedAt: source.updatedAt,
    ...source.world,
  });
  return source;
}

export function validateSite(value) {
  assertNoSensitiveFields(value);
  exact(
    value,
    [
      "schemaVersion",
      "siteId",
      "generatedAt",
      "freshness",
      "identity",
      "navigation",
      "featuredProjectIds",
    ],
    "$",
  );
  if (value.schemaVersion !== VERSION)
    fail("UNSUPPORTED_VERSION", "$.schemaVersion");
  id(value.siteId, "$.siteId");
  date(value.generatedAt, "$.generatedAt");
  freshness(value.freshness, "$.freshness");
  exact(value.identity, ["name", "canonicalUrl", "description"], "$.identity");
  string(value.identity.name, "$.identity.name");
  href(value.identity.canonicalUrl, "$.identity.canonicalUrl");
  string(value.identity.description, "$.identity.description");
  array(value.navigation, "$.navigation");
  value.navigation.forEach((item, index) => {
    exact(item, ["id", "label", "href"], `$.navigation[${index}]`);
    id(item.id, `$.navigation[${index}].id`);
    string(item.label, `$.navigation[${index}].label`);
    href(item.href, `$.navigation[${index}].href`, false);
  });
  array(value.featuredProjectIds, "$.featuredProjectIds");
  value.featuredProjectIds.forEach((item, index) =>
    id(item, `$.featuredProjectIds[${index}]`),
  );
  return value;
}

export function validateProjects(value) {
  assertNoSensitiveFields(value);
  exact(value, ["schemaVersion", "generatedAt", "freshness", "projects"], "$");
  if (value.schemaVersion !== VERSION)
    fail("UNSUPPORTED_VERSION", "$.schemaVersion");
  date(value.generatedAt, "$.generatedAt");
  freshness(value.freshness, "$.freshness");
  array(value.projects, "$.projects");
  if (value.projects.length === 0) fail("EMPTY_PROJECTS", "$.projects");
  const ids = new Set();
  value.projects.forEach((project, index) => {
    const path = `$.projects[${index}]`;
    exact(
      project,
      [
        "projectId",
        "slug",
        "title",
        "summary",
        "status",
        "statusLabel",
        "canonicalUrl",
        "updatedAt",
      ],
      path,
    );
    id(project.projectId, `${path}.projectId`);
    id(project.slug, `${path}.slug`);
    ["title", "summary", "statusLabel"].forEach((key) =>
      string(project[key], `${path}.${key}`),
    );
    oneOf(
      project.status,
      ["active", "experimental", "paused", "archived"],
      `${path}.status`,
    );
    href(project.canonicalUrl, `${path}.canonicalUrl`, false);
    date(project.updatedAt, `${path}.updatedAt`);
    if (ids.has(project.projectId)) fail("DUPLICATE_ID", `${path}.projectId`);
    ids.add(project.projectId);
  });
  return value;
}

export function validateWorld(value) {
  assertNoSensitiveFields(value);
  exact(
    value,
    [
      "schemaVersion",
      "projectionId",
      "generatedAt",
      "status",
      "places",
      "residents",
      "activities",
      "attention",
    ],
    "$",
  );
  if (value.schemaVersion !== VERSION)
    fail("UNSUPPORTED_VERSION", "$.schemaVersion");
  id(value.projectionId, "$.projectionId");
  date(value.generatedAt, "$.generatedAt");
  oneOf(value.status, ["current", "stale", "partial"], "$.status");
  ["places", "residents", "activities", "attention"].forEach((key) =>
    array(value[key], `$.${key}`),
  );
  const places = new Set();
  value.places.forEach((item, index) => {
    const path = `$.places[${index}]`;
    exact(item, ["placeId", "name", "kind", "status", "href"], path);
    id(item.placeId, `${path}.placeId`);
    ["name", "kind", "status"].forEach((key) =>
      string(item[key], `${path}.${key}`),
    );
    href(item.href, `${path}.href`, false);
    if (places.has(item.placeId)) fail("DUPLICATE_ID", `${path}.placeId`);
    places.add(item.placeId);
  });
  const residents = new Set();
  value.residents.forEach((item, index) => {
    const path = `$.residents[${index}]`;
    exact(item, ["residentId", "name", "role", "placeId", "status"], path);
    id(item.residentId, `${path}.residentId`);
    ["name", "role", "status"].forEach((key) =>
      string(item[key], `${path}.${key}`),
    );
    if (!places.has(item.placeId)) fail("BROKEN_REFERENCE", `${path}.placeId`);
    if (residents.has(item.residentId))
      fail("DUPLICATE_ID", `${path}.residentId`);
    residents.add(item.residentId);
  });
  const activities = new Set();
  value.activities.forEach((item, index) => {
    const path = `$.activities[${index}]`;
    exact(
      item,
      ["activityId", "kind", "summary", "occurredAt", "placeId"],
      path,
    );
    id(item.activityId, `${path}.activityId`);
    ["kind", "summary"].forEach((key) => string(item[key], `${path}.${key}`));
    date(item.occurredAt, `${path}.occurredAt`);
    if (!places.has(item.placeId)) fail("BROKEN_REFERENCE", `${path}.placeId`);
    if (activities.has(item.activityId))
      fail("DUPLICATE_ID", `${path}.activityId`);
    activities.add(item.activityId);
  });
  const attention = new Set();
  value.attention.forEach((item, index) => {
    const path = `$.attention[${index}]`;
    exact(item, ["attentionId", "summary", "severity", "placeId"], path);
    id(item.attentionId, `${path}.attentionId`);
    string(item.summary, `${path}.summary`);
    oneOf(item.severity, ["info", "warning", "critical"], `${path}.severity`);
    if (!places.has(item.placeId)) fail("BROKEN_REFERENCE", `${path}.placeId`);
    if (attention.has(item.attentionId))
      fail("DUPLICATE_ID", `${path}.attentionId`);
    attention.add(item.attentionId);
  });
  return value;
}

export function validateArtifacts(artifacts) {
  validateSite(artifacts.site);
  validateProjects(artifacts.projects);
  validateWorld(artifacts.world);
  const ids = new Set(
    artifacts.projects.projects.map(({ projectId }) => projectId),
  );
  for (const projectId of artifacts.site.featuredProjectIds)
    if (!ids.has(projectId))
      fail("BROKEN_REFERENCE", "site.featuredProjectIds");
  return artifacts;
}

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(",")}}`;
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash("sha256")
    .update(typeof value === "string" ? value : canonicalJson(value))
    .digest("hex");
}
