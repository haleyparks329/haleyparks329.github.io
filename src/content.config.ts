import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projectAccent = z.enum(["rust", "olive", "plum", "blue", "khaki"]);
const writingCollection = z.enum([
  "keeping-context",
  "evidence-before-autonomy",
  "tools-for-whole-people",
]);
const relationshipKind = z.enum([
  "explains",
  "origin-of",
  "informed-by",
  "continues",
  "related-to",
  "implementation-of",
  "reflection-on",
]);
const curatedRelationship = z.object({
  slug: z.string(),
  relationship: relationshipKind,
  note: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    longDescription: z.string(),
    coreQuestion: z.string(),
    status: z.string(),
    featured: z.boolean(),
    accent: projectAccent,
    tags: z.array(z.string()),
    topics: z.array(z.string()).default([]),
    repositoryUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    order: z.number(),
  }),
});

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    writingId: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.string().min(1),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    status: z.enum(["published", "evolving", "archived"]).default("published"),
    tags: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    collections: z.array(writingCollection).default([]),
    primaryCollection: writingCollection.optional(),
    relatedProjects: z.array(curatedRelationship).default([]),
    relatedWriting: z.array(curatedRelationship).default([]),
    relatedMemories: z.array(curatedRelationship).default([]),
    relatedProject: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    routeBacked: z.boolean().default(false),
    routePath: z.string().startsWith("/").optional(),
    readingTime: z.string().optional(),
    canonicalUrl: z.string().optional(),
    externalSource: z
      .object({
        name: z.string(),
        url: z.url(),
      })
      .optional(),
    editorialWeight: z.number().int().nonnegative().default(0),
    archived: z.boolean().default(false),
    subjectName: z.string().optional(),
    subjectUrl: z.url().optional(),
    disclaimer: z.string().optional(),
    repositoryUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    externalUrl: z.url().optional(),
  }),
});

export const collections = { projects, writing };
