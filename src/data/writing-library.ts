import type { CollectionEntry } from "astro:content";

export const writingCollections = [
  {
    id: "keeping-context",
    title: "Keeping Context",
    description:
      "Systems that preserve continuity across fragmented information, tools, and time.",
  },
  {
    id: "evidence-before-autonomy",
    title: "Evidence Before Autonomy",
    description:
      "Deterministic foundations, inspection, and human authority before agentic action.",
  },
  {
    id: "tools-for-whole-people",
    title: "Tools for Whole People",
    description:
      "Technology that models lived context instead of reducing people to transactions or records.",
  },
] as const;

export type WritingCollectionId = (typeof writingCollections)[number]["id"];

export const relationshipLabels = {
  explains: "Explains",
  "origin-of": "Origin of",
  "informed-by": "Informed by",
  continues: "Continues",
  "related-to": "Related to",
  "implementation-of": "Implementation of",
  "reflection-on": "Reflection on",
} as const;

export function writingHref(entry: CollectionEntry<"writing">) {
  return (
    entry.data.canonicalUrl ??
    entry.data.routePath ??
    `/writing/${entry.data.slug}/`
  );
}

export function publishedWriting(entries: CollectionEntry<"writing">[]) {
  return entries.filter((entry) => !entry.data.draft && !entry.data.archived);
}

export function collectionById(id: string) {
  return writingCollections.find((collection) => collection.id === id);
}

export function validateWritingLibrary(
  writings: CollectionEntry<"writing">[],
  projects: CollectionEntry<"projects">[],
) {
  const publicEntries = publishedWriting(writings);
  const writingIds = new Set<string>();
  const writingSlugs = new Set<string>();
  const projectSlugs = new Set(projects.map((project) => project.data.slug));
  const publicSlugs = new Set(publicEntries.map((entry) => entry.data.slug));

  for (const entry of writings) {
    if (writingIds.has(entry.data.writingId)) {
      throw new Error(`Duplicate writingId: ${entry.data.writingId}`);
    }
    if (writingSlugs.has(entry.data.slug)) {
      throw new Error(`Duplicate writing slug: ${entry.data.slug}`);
    }
    writingIds.add(entry.data.writingId);
    writingSlugs.add(entry.data.slug);
  }

  for (const entry of publicEntries) {
    const { data } = entry;
    if (data.collections.length === 0 || !data.primaryCollection) {
      throw new Error(`${data.slug} needs a collection and primaryCollection`);
    }
    if (!data.collections.includes(data.primaryCollection)) {
      throw new Error(
        `${data.slug} has a primaryCollection outside collections`,
      );
    }
    if (!data.canonicalUrl) {
      throw new Error(`${data.slug} needs a canonicalUrl`);
    }

    const relatedSlugs = data.relatedWriting.map(
      (relationship) => relationship.slug,
    );
    const relatedProjectSlugs = data.relatedProjects.map(
      (relationship) => relationship.slug,
    );
    const relationshipCount = relatedSlugs.length + relatedProjectSlugs.length;
    if (relationshipCount < 2 || relationshipCount > 4) {
      throw new Error(`${data.slug} needs two to four curated relationships`);
    }
    if (new Set(relatedSlugs).size !== relatedSlugs.length) {
      throw new Error(`${data.slug} has duplicate writing relationships`);
    }
    if (new Set(relatedProjectSlugs).size !== relatedProjectSlugs.length) {
      throw new Error(`${data.slug} has duplicate project relationships`);
    }

    for (const relationship of data.relatedWriting) {
      if (relationship.slug === data.slug) {
        throw new Error(`${data.slug} cannot relate to itself`);
      }
      if (!publicSlugs.has(relationship.slug)) {
        throw new Error(
          `${data.slug} relates to missing or private writing: ${relationship.slug}`,
        );
      }
    }
    for (const relationship of data.relatedProjects) {
      if (!projectSlugs.has(relationship.slug)) {
        throw new Error(
          `${data.slug} relates to missing project: ${relationship.slug}`,
        );
      }
    }
  }

  for (const collection of writingCollections) {
    if (
      !publicEntries.some((entry) =>
        entry.data.collections.includes(collection.id),
      )
    ) {
      throw new Error(
        `Writing collection has no published entries: ${collection.id}`,
      );
    }
  }
}

export function resolveWritingRelationships(
  entry: CollectionEntry<"writing">,
  writings: CollectionEntry<"writing">[],
) {
  const entriesBySlug = new Map(
    publishedWriting(writings).map((candidate) => [
      candidate.data.slug,
      candidate,
    ]),
  );

  return entry.data.relatedWriting.map((relationship) => ({
    ...relationship,
    entry: entriesBySlug.get(relationship.slug)!,
  }));
}

export function resolveProjectRelationships(
  entry: CollectionEntry<"writing">,
  projects: CollectionEntry<"projects">[],
) {
  const projectsBySlug = new Map(
    projects.map((project) => [project.data.slug, project]),
  );

  return entry.data.relatedProjects.map((relationship) => ({
    ...relationship,
    project: projectsBySlug.get(relationship.slug)!,
  }));
}
